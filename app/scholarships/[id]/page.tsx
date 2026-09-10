"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/firebase";

type Scholarship = {
  id: string;
  title: string;
  provider: string;
  amount: string;
  deadline: string;
  category: string;
  description: string;
  eligibility: string;
  benefits: string;
};

const demoScholarships: Record<string, Scholarship> = {
  "demo-1": {
    id: "demo-1",
    title: "National Scholarship Programme",
    provider: "Government of India",
    amount: "₹50,000",
    deadline: "30 Sep 2026",
    category: "Government",
    description:
      "Financial assistance for eligible students pursuing higher education.",
    eligibility:
      "Students enrolled in recognized undergraduate or postgraduate programs and meeting the applicable scheme requirements.",
    benefits:
      "Financial support towards eligible education-related expenses.",
  },

  "demo-2": {
    id: "demo-2",
    title: "Post Matric Scholarship",
    provider: "Maharashtra Government",
    amount: "₹35,000",
    deadline: "15 Oct 2026",
    category: "State",
    description:
      "Scholarship assistance for eligible students pursuing post-matric education in Maharashtra.",
    eligibility:
      "Eligible post-matric students in Maharashtra according to applicable department and category requirements.",
    benefits:
      "Financial assistance towards eligible educational expenses.",
  },

  "demo-3": {
    id: "demo-3",
    title: "Future Leaders Scholarship",
    provider: "ScholarSeva Foundation",
    amount: "₹75,000",
    deadline: "25 Oct 2026",
    category: "Merit",
    description:
      "A merit-focused opportunity designed to support ambitious students with strong academic performance.",
    eligibility:
      "Undergraduate students meeting the academic and application requirements.",
    benefits:
      "Merit recognition and financial assistance towards higher education.",
  },

  "demo-4": {
    id: "demo-4",
    title: "Digital India Student Scholarship",
    provider: "Digital India Initiative",
    amount: "₹40,000",
    deadline: "05 Nov 2026",
    category: "Technology",
    description:
      "Financial support for students pursuing technology and digital education.",
    eligibility:
      "Students pursuing eligible technology-related academic programs.",
    benefits:
      "Financial support for eligible technology-focused educational expenses.",
  },

  "demo-5": {
    id: "demo-5",
    title: "Women in Education Scholarship",
    provider: "Education Empowerment Trust",
    amount: "₹60,000",
    deadline: "20 Nov 2026",
    category: "Women",
    description:
      "An educational support opportunity designed to encourage students to continue higher education.",
    eligibility:
      "Students meeting the scholarship's academic and application requirements.",
    benefits:
      "Financial assistance towards higher education expenses.",
  },

  "demo-6": {
    id: "demo-6",
    title: "Academic Excellence Award",
    provider: "ScholarSeva Foundation",
    amount: "₹1,00,000",
    deadline: "10 Dec 2026",
    category: "Merit",
    description:
      "Recognition and financial support for students demonstrating excellent academic performance.",
    eligibility:
      "High-performing undergraduate students meeting the stated criteria.",
    benefits:
      "Academic recognition and financial support for continued education.",
  },
};

function getMatchScore(
  scholarship: Scholarship
): number {
  switch (scholarship.category) {
    case "Merit":
      return 95;
    case "Government":
      return 92;
    case "Women":
      return 90;
    case "State":
      return 88;
    case "Technology":
      return 86;
    case "General":
      return 91;
    default:
      return 89;
  }
}

export default function ScholarshipDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [user, setUser] =
    useState<User | null>(null);

  const [scholarship, setScholarship] =
    useState<Scholarship | null>(null);

  const [showApplicationForm, setShowApplicationForm] =
    useState(false);

  const [submitted, setSubmitted] =
    useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    education: "",
    percentage: "",
    category: "",
  });

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (currentUser) => {
          if (!currentUser) {
            router.push("/login");
            return;
          }

          setUser(currentUser);

          setForm((previous) => ({
            ...previous,
            fullName:
              currentUser.displayName || "",
            email:
              currentUser.email || "",
          }));

          const scholarshipId =
            String(params.id);

          // Demo scholarship lookup
          if (
            demoScholarships[
              scholarshipId
            ]
          ) {
            setScholarship(
              demoScholarships[
                scholarshipId
              ]
            );

            return;
          }

          // Firestore lookup for real records
          try {
            const {
              doc,
              getDoc,
            } = await import(
              "firebase/firestore"
            );

            const { db } =
              await import(
                "@/lib/firebase"
              );

            const snapshot =
              await getDoc(
                doc(
                  db,
                  "scholarships",
                  scholarshipId
                )
              );

            if (snapshot.exists()) {
              const data =
                snapshot.data();

              setScholarship({
                id: snapshot.id,

                title:
                  data.title ||
                  data.name ||
                  "Scholarship",

                provider:
                  data.provider ||
                  data.organization ||
                  "ScholarSeva",

                amount: String(
                  data.amount ||
                    data.scholarshipAmount ||
                    "Amount varies"
                ),

                deadline:
                  data.deadline ||
                  data.lastDate ||
                  "Check official portal",

                category:
                  data.category ||
                  data.type ||
                  "General",

                description:
                  data.description ||
                  "Financial support for eligible students.",

                eligibility:
                  data.eligibility ||
                  data.eligibilityCriteria ||
                  "See official eligibility requirements.",

                benefits:
                  data.benefits ||
                  "Financial support for eligible education expenses.",
              });
            }
          } catch (error) {
            console.error(
              "Scholarship loading error:",
              error
            );
          }
        }
      );

    return () => unsubscribe();
  }, [params.id, router]);

  function openApplication() {
    setShowApplicationForm(true);

    setTimeout(() => {
      document
        .getElementById(
          "application-form"
        )
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  }

  function handleChange(
    field: keyof typeof form,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function submitApplication(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!user || !scholarship) {
      return;
    }

    const application = {
      id: `application-${scholarship.id}`,

      scholarshipId:
        scholarship.id,

      scholarshipTitle:
        scholarship.title,

      provider:
        scholarship.provider,

      amount:
        scholarship.amount,

      status: "Applied",

      appliedAt:
        new Date().toISOString(),

      studentId:
        user.uid,

      studentEmail:
        user.email,

      studentName:
        form.fullName,
    };

    localStorage.setItem(
      `scholarseva-application-${scholarship.id}`,
      JSON.stringify(application)
    );

    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (!user || !scholarship) {
    return (
      <main className="loading-page">
        <div className="loader"></div>

        <p>
          Loading scholarship...
        </p>
      </main>
    );
  }

  const matchScore =
    getMatchScore(
      scholarship
    );

  /* =====================================================
     SUCCESS SCREEN
  ===================================================== */

  if (submitted) {
    return (
      <main className="dashboard-page">

        <nav className="dashboard-nav">

          <Link
            href="/dashboard"
            className="dashboard-logo"
          >
            <span>🎓</span>
            Scholar<span>Seva</span>
          </Link>

          <div className="dashboard-nav-links">

            <Link href="/dashboard">
              Dashboard
            </Link>

            <Link href="/scholarships">
              Scholarships
            </Link>

            <Link href="/applications">
              My Applications
            </Link>

            <Link href="/profile">
              Profile
            </Link>

          </div>

        </nav>

        <section className="detail-success-page">

          <div className="success-check-circle">
            ✓
          </div>

          <span className="success-overline">
            APPLICATION SUBMITTED
          </span>

          <h1>
            Your application is on its way.
          </h1>

          <p>
            Your application for{" "}
            <strong>
              {scholarship.title}
            </strong>{" "}
            has been recorded successfully.
          </p>

          <div className="success-info-grid">

            <div>
              <span>
                APPLICANT
              </span>

              <strong>
                {form.fullName}
              </strong>
            </div>

            <div>
              <span>
                SCHOLARSHIP
              </span>

              <strong>
                {scholarship.title}
              </strong>
            </div>

            <div>
              <span>
                STATUS
              </span>

              <strong>
                Applied
              </strong>
            </div>

          </div>

          <div className="detail-success-actions">

            <Link
              href="/applications"
              className="primary-btn"
            >
              Track My Application →
            </Link>

            <Link
              href="/scholarships"
              className="success-secondary"
            >
              Explore More Scholarships
            </Link>

          </div>

        </section>

      </main>
    );
  }

  return (
    <main className="dashboard-page">

      {/* =================================================
          NAVBAR
      ================================================= */}

      <nav className="dashboard-nav">

        <Link
          href="/dashboard"
          className="dashboard-logo"
        >
          <span>🎓</span>
          Scholar<span>Seva</span>
        </Link>

        <div className="dashboard-nav-links">

          <Link href="/dashboard">
            Dashboard
          </Link>

          <Link
            href="/scholarships"
            className="active"
          >
            Scholarships
          </Link>

          <Link href="/applications">
            My Applications
          </Link>

          <Link href="/profile">
            Profile
          </Link>

        </div>

        <div className="nav-user">

          <div className="avatar">
            {(user.email?.[0] ||
              "S").toUpperCase()}
          </div>

          <div className="nav-user-info">

            <strong>
              {user.displayName ||
                "Student"}
            </strong>

            <small>
              {user.email}
            </small>

          </div>

        </div>

      </nav>

      {/* =================================================
          PAGE
      ================================================= */}

      <section className="scholarship-detail-page">

        {/* BREADCRUMB */}

        <div className="detail-breadcrumb">

          <Link href="/dashboard">
            Dashboard
          </Link>

          <span>
            /
          </span>

          <Link href="/scholarships">
            Scholarships
          </Link>

          <span>
            /
          </span>

          <strong>
            Details
          </strong>

        </div>

        {/* HERO */}

        <section className="modern-scholarship-hero">

          <div className="detail-hero-content">

            <div className="detail-category-row">

              <span className="detail-category">
                {scholarship.category}
              </span>

              <span className="detail-opportunity">
                ✦ SCHOLARSEVA OPPORTUNITY
              </span>

            </div>

            <h1>
              {scholarship.title}
            </h1>

            <p className="detail-provider">
              {scholarship.provider}
            </p>

            <p className="detail-hero-description">
              {scholarship.description}
            </p>

            <div className="detail-hero-actions">

              <button
                type="button"
                className="hero-apply-button"
                onClick={openApplication}
              >
                Apply Now
                <span>
                  →
                </span>
              </button>

              <div className="hero-match-mini">

                <div>
                  <span>
                    PROFILE MATCH
                  </span>

                  <strong>
                    {matchScore}%
                  </strong>
                </div>

                <div className="hero-mini-bar">
                  <div
                    style={{
                      width: `${matchScore}%`,
                    }}
                  />
                </div>

              </div>

            </div>

          </div>

          <div className="detail-hero-award">

            <span>
              SCHOLARSHIP AWARD
            </span>

            <strong>
              {scholarship.amount}
            </strong>

            <div className="hero-award-divider" />

            <span>
              APPLICATION DEADLINE
            </span>

            <b>
              {scholarship.deadline}
            </b>

          </div>

        </section>

        {/* MAIN CONTENT */}

        <div className="detail-main-grid">

          <div className="detail-information">

            {/* OVERVIEW */}

            <section className="detail-section">

              <div className="detail-section-title">

                <span>
                  01
                </span>

                <div>

                  <small>
                    ABOUT THE OPPORTUNITY
                  </small>

                  <h2>
                    Opportunity Overview
                  </h2>

                </div>

              </div>

              <p>
                {scholarship.description}
              </p>

            </section>

            {/* ELIGIBILITY */}

            <section className="detail-section">

              <div className="detail-section-title">

                <span>
                  02
                </span>

                <div>

                  <small>
                    WHO CAN APPLY
                  </small>

                  <h2>
                    Eligibility
                  </h2>

                </div>

              </div>

              <div className="detail-eligibility">

                <div className="detail-eligibility-icon">
                  ✓
                </div>

                <p>
                  {scholarship.eligibility}
                </p>

              </div>

            </section>

            {/* BENEFITS */}

            <section className="detail-section">

              <div className="detail-section-title">

                <span>
                  03
                </span>

                <div>

                  <small>
                    WHAT YOU RECEIVE
                  </small>

                  <h2>
                    Benefits
                  </h2>

                </div>

              </div>

              <div className="benefit-item">
                <span>✓</span>

                <p>
                  {scholarship.benefits}
                </p>
              </div>

              <div className="benefit-item">
                <span>✓</span>

                <p>
                  Application progress can be
                  tracked from your ScholarSeva
                  account.
                </p>
              </div>

              <div className="benefit-item">
                <span>✓</span>

                <p>
                  Relevant scholarship information
                  is organized in one place.
                </p>
              </div>

            </section>

          </div>

          {/* SIDEBAR */}

          <aside className="detail-sidebar-new">

            <div className="detail-action-card">

              <div className="action-card-label">
                READY TO APPLY?
              </div>

              <h3>
                Take the next step toward your
                education.
              </h3>

              <p>
                Complete a short application form
                before submitting your request.
              </p>

              <button
                type="button"
                className="primary-btn full-btn"
                onClick={openApplication}
              >
                Start Application →
              </button>

              <div className="action-note">
                <span>
                  🔒
                </span>

                <p>
                  Your application is saved to your
                  ScholarSeva account.
                </p>
              </div>

            </div>

            <div className="detail-match-card">

              <span>
                SMART MATCH
              </span>

              <div className="detail-match-score">

                <strong>
                  {matchScore}%
                </strong>

                <span>
                  profile match
                </span>

              </div>

              <div className="detail-match-bar">

                <div
                  style={{
                    width: `${matchScore}%`,
                  }}
                />

              </div>

              <p>
                Based on the information currently
                available in your ScholarSeva
                profile.
              </p>

              <Link href="/profile">
                Improve My Profile →
              </Link>

            </div>

          </aside>

        </div>

        {/* APPLICATION FORM */}

        {showApplicationForm && (
          <section
            id="application-form"
            className="modern-application-form"
          >

            <div className="modern-form-header">

              <div>

                <span>
                  APPLICATION
                </span>

                <h2>
                  Complete your application
                </h2>

                <p>
                  Please provide your details and
                  review them before submitting.
                </p>

              </div>

              <button
                type="button"
                className="form-close-button"
                onClick={() =>
                  setShowApplicationForm(false)
                }
              >
                ×
              </button>

            </div>

            <form
              onSubmit={submitApplication}
            >

              <div className="modern-form-grid">

                <div className="field">

                  <label>
                    FULL NAME
                  </label>

                  <input
                    type="text"
                    value={
                      form.fullName
                    }
                    onChange={(e) =>
                      handleChange(
                        "fullName",
                        e.target.value
                      )
                    }
                    placeholder="Enter your full name"
                    required
                  />

                </div>

                <div className="field">

                  <label>
                    EMAIL ADDRESS
                  </label>

                  <input
                    type="email"
                    value={
                      form.email
                    }
                    onChange={(e) =>
                      handleChange(
                        "email",
                        e.target.value
                      )
                    }
                    placeholder="Enter your email"
                    required
                  />

                </div>

                <div className="field">

                  <label>
                    PHONE NUMBER
                  </label>

                  <input
                    type="tel"
                    value={
                      form.phone
                    }
                    onChange={(e) =>
                      handleChange(
                        "phone",
                        e.target.value
                      )
                    }
                    placeholder="Enter your phone number"
                    required
                  />

                </div>

                <div className="field">

                  <label>
                    EDUCATION LEVEL
                  </label>

                  <select
                    value={
                      form.education
                    }
                    onChange={(e) =>
                      handleChange(
                        "education",
                        e.target.value
                      )
                    }
                    required
                  >

                    <option value="">
                      Select education level
                    </option>

                    <option>
                      Diploma
                    </option>

                    <option>
                      Undergraduate
                    </option>

                    <option>
                      Postgraduate
                    </option>

                    <option>
                      PhD
                    </option>

                  </select>

                </div>

                <div className="field">

                  <label>
                    ACADEMIC PERCENTAGE
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={
                      form.percentage
                    }
                    onChange={(e) =>
                      handleChange(
                        "percentage",
                        e.target.value
                      )
                    }
                    placeholder="e.g. 82"
                    required
                  />

                </div>

                <div className="field">

                  <label>
                    STUDENT CATEGORY
                  </label>

                  <select
                    value={
                      form.category
                    }
                    onChange={(e) =>
                      handleChange(
                        "category",
                        e.target.value
                      )
                    }
                    required
                  >

                    <option value="">
                      Select category
                    </option>

                    <option>
                      General
                    </option>

                    <option>
                      OBC
                    </option>

                    <option>
                      SC
                    </option>

                    <option>
                      ST
                    </option>

                    <option>
                      EWS
                    </option>

                  </select>

                </div>

              </div>

              {/* REVIEW */}

              <div className="modern-review-box">

                <div>

                  <span>
                    APPLYING FOR
                  </span>

                  <strong>
                    {scholarship.title}
                  </strong>

                </div>

                <div>

                  <span>
                    AWARD
                  </span>

                  <strong>
                    {scholarship.amount}
                  </strong>

                </div>

                <div>

                  <span>
                    DEADLINE
                  </span>

                  <strong>
                    {scholarship.deadline}
                  </strong>

                </div>

              </div>

              <div className="modern-form-actions">

                <button
                  type="button"
                  className="form-cancel"
                  onClick={() =>
                    setShowApplicationForm(
                      false
                    )
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="hero-apply-button"
                >
                  Submit Application
                  <span>
                    →
                  </span>
                </button>

              </div>

            </form>

          </section>
        )}

      </section>

      <footer className="site-footer">

        <strong>
          ScholarSeva
        </strong>

        <span>
          Making scholarship discovery
          simpler for every student.
        </span>

      </footer>

    </main>
  );
}