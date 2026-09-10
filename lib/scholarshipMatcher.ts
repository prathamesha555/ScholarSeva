export type StudentProfile = {
  course?: string;
  college?: string;
  year?: string;
  percentage?: string;
  category?: string;
};

export type ScholarshipForMatch = {
  category: string;
  title?: string;
  provider?: string;
  description?: string;
  eligibility?: string;
};

export type MatchResult = {
  score: number;
  reasons: string[];
  label: string;
};

function normalize(value?: string): string {
  return (value || "").trim().toLowerCase();
}

function getPercentage(profile: StudentProfile): number {
  const value = Number(
    (profile.percentage || "").replace(/[^0-9.]/g, "")
  );

  return Number.isFinite(value) ? value : 0;
}

function hasValue(value?: string): boolean {
  return Boolean(value && value.trim());
}

function courseMatchesTechnology(course: string): boolean {
  const technologyKeywords = [
    "computer",
    "computer science",
    "information technology",
    "it",
    "software",
    "artificial intelligence",
    "machine learning",
    "data science",
    "cyber",
    "electronics",
    "engineering",
    "bca",
    "mca",
    "btech",
    "mtech",
    "b.e",
    "be",
    "me",
    "technology",
  ];

  return technologyKeywords.some((keyword) =>
    course.includes(keyword)
  );
}

function collegeMatchesMaharashtra(college: string): boolean {
  const keywords = [
    "maharashtra",
    "nashik",
    "mumbai",
    "pune",
    "nagpur",
    "aurangabad",
    "chhatrapati sambhajinagar",
    "kolhapur",
    "thane",
    "jalgaon",
    "ahmednagar",
    "ahilyanagar",
    "satara",
    "sangli",
    "dhule",
    "nanded",
  ];

  return keywords.some((keyword) =>
    college.includes(keyword)
  );
}

export function getProfileCompleteness(
  profile: StudentProfile
): number {
  const fields = [
    profile.course,
    profile.college,
    profile.year,
    profile.percentage,
    profile.category,
  ];

  const completed = fields.filter(hasValue).length;

  return Math.round((completed / fields.length) * 100);
}

export function getScholarshipMatch(
  scholarship: ScholarshipForMatch,
  profile: StudentProfile
): MatchResult {
  const scholarshipCategory = normalize(
    scholarship.category
  );

  const course = normalize(profile.course);
  const college = normalize(profile.college);
  const percentage = getPercentage(profile);

  const completeness = getProfileCompleteness(profile);

  let score = 62;

  const reasons: string[] = [];

  /*
   * ------------------------------------------------------
   * PROFILE COMPLETENESS
   * ------------------------------------------------------
   */

  if (completeness >= 80) {
    score += 8;
    reasons.push("Complete profile");
  } else if (completeness >= 60) {
    score += 5;
    reasons.push("Profile information");
  }


  /*
   * ------------------------------------------------------
   * ACADEMIC PERFORMANCE
   * ------------------------------------------------------
   */

  if (percentage >= 90) {
    score += 12;
    reasons.push("Excellent academics");
  } else if (percentage >= 80) {
    score += 9;
    reasons.push("Strong academics");
  } else if (percentage >= 70) {
    score += 5;
    reasons.push("Academic eligibility");
  } else if (percentage > 0) {
    score += 2;
  }


  /*
   * ------------------------------------------------------
   * MERIT SCHOLARSHIPS
   * ------------------------------------------------------
   */

  if (scholarshipCategory === "merit") {
    if (percentage >= 90) {
      score += 10;
      reasons.push("Strong merit fit");
    } else if (percentage >= 80) {
      score += 6;
      reasons.push("Merit eligibility");
    } else if (percentage >= 70) {
      score += 2;
      reasons.push("Academic consideration");
    } else {
      score -= 3;
    }
  }


  /*
   * ------------------------------------------------------
   * GOVERNMENT SCHOLARSHIPS
   * ------------------------------------------------------
   */

  if (scholarshipCategory === "government") {
    score += 5;
    reasons.push("Government opportunity");
  }


  /*
   * ------------------------------------------------------
   * STATE SCHOLARSHIPS
   * ------------------------------------------------------
   */

  if (scholarshipCategory === "state") {
    if (collegeMatchesMaharashtra(college)) {
      score += 12;
      reasons.push("Maharashtra connection");
    } else {
      score += 3;
      reasons.push("State opportunity");
    }
  }


  /*
   * ------------------------------------------------------
   * TECHNOLOGY SCHOLARSHIPS
   * ------------------------------------------------------
   */

  if (scholarshipCategory === "technology") {
    if (courseMatchesTechnology(course)) {
      score += 13;
      reasons.push("Course matches technology");
    } else {
      score += 2;
      reasons.push("Technology opportunity");
    }
  }


  /*
   * ------------------------------------------------------
   * GENERAL SCHOLARSHIPS
   * ------------------------------------------------------
   */

  if (scholarshipCategory === "general") {
    score += 5;
    reasons.push("Broad eligibility");
  }


  /*
   * ------------------------------------------------------
   * WOMEN SCHOLARSHIP
   *
   * We intentionally do not infer gender from the existing
   * student category field.
   * ------------------------------------------------------
   */

  if (scholarshipCategory === "women") {
    score += 2;
    reasons.push("Specialized opportunity");
  }


  /*
   * ------------------------------------------------------
   * ELIGIBILITY TEXT
   * ------------------------------------------------------
   */

  const eligibility = normalize(
    scholarship.eligibility
  );

  if (percentage >= 75 && eligibility.includes("academic")) {
    score += 3;
    reasons.push("Academic requirement fit");
  }

  if (
    (course.includes("undergraduate") ||
      course.includes("bachelor") ||
      course.includes("btech") ||
      course.includes("bca") ||
      course.includes("degree")) &&
    eligibility.includes("undergraduate")
  ) {
    score += 3;
    reasons.push("Study level fit");
  }


  /*
   * ------------------------------------------------------
   * FINAL NORMALIZATION
   * ------------------------------------------------------
   */

  score = Math.max(45, Math.min(99, score));

  const uniqueReasons = Array.from(
    new Set(reasons)
  ).slice(0, 4);

  while (uniqueReasons.length < 3) {
    uniqueReasons.push("Profile alignment");
  }

  let label = "Good Match";

  if (score >= 92) {
    label = "Excellent Match";
  } else if (score >= 85) {
    label = "Strong Match";
  } else if (score >= 75) {
    label = "Good Match";
  } else {
    label = "Possible Match";
  }

  return {
    score,
    reasons: uniqueReasons,
    label,
  };
}