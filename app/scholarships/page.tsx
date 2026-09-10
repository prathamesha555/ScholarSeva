"use client";

import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth, db } from "@/lib/firebase";

import {
  getScholarshipMatch,
  StudentProfile,
} from "@/lib/scholarshipMatcher";

type Scholarship = {
  id: string;
  title: string;
  provider: string;
  amount: string;
  deadline: string;
  category: string;
  description: string;
  eligibility: string;
};

const fallbackScholarships: Scholarship[] = [
  {
    id: "demo-1",
    title: "National Scholarship Programme",
    provider: "Government of India",
    amount: "₹50,000",
    deadline: "30 Sep 2026",
    category: "Government",
    description:
      "Financial support for eligible students pursuing higher education.",
    eligibility:
      "UG and PG students meeting applicable requirements.",
  },
  {
    id: "demo-2",
    title: "Post Matric Scholarship",
    provider: "Maharashtra Government",
    amount: "₹35,000",
    deadline: "15 Oct 2026",
    category: "State",
    description:
      "Scholarship assistance for eligible students pursuing post-matric education.",
    eligibility:
      "Eligible post-matric students in Maharashtra.",
  },
  {
    id: "demo-3",
    title: "Future Leaders Scholarship",
    provider: "ScholarSeva Foundation",
    amount: "₹75,000",
    deadline: "25 Oct 2026",
    category: "Merit",
    description:
      "Merit-based support for ambitious students with strong academic records.",
    eligibility:
      "Undergraduate students meeting academic requirements.",
  },
  {
    id: "demo-4",
    title: "Digital India Student Scholarship",
    provider: "Digital India Initiative",
    amount: "₹40,000",
    deadline: "05 Nov 2026",
    category: "Technology",
    description:
      "Support for students pursuing technology and digital education.",
    eligibility:
      "Students pursuing eligible technology-related programs.",
  },
  {
    id: "demo-5",
    title: "Women in Education Scholarship",
    provider: "Education Empowerment Trust",
    amount: "₹60,000",
    deadline: "20 Nov 2026",
    category: "Women",
    description:
      "Financial assistance supporting students pursuing higher education.",
    eligibility:
      "Eligible students meeting application requirements.",
  },
  {
    id: "demo-6",
    title: "Academic Excellence Award",
    provider: "ScholarSeva Foundation",
    amount: "₹1,00,000",
    deadline: "10 Dec 2026",
    category: "Merit",
    description:
      "Recognition and financial support for students demonstrating excellent academic performance.",
    eligibility:
      "High-performing undergraduate students.",
  },
];

function normalizeScholarship(
  id: string,
  data: any
): Scholarship {
  return {
    id,
    title:
      data.title ||
      data.name ||
      data.scholarshipName ||
      "Scholarship",
    provider:
      data.provider ||
      data.organization ||
      data.institute ||
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
      "Scholarship opportunity available for eligible students.",
    eligibility:
      data.eligibility ||
      data.eligibilityCriteria ||
      "See eligibility requirements.",
  };
}

function getAmountValue(amount: string): number {
  const value = amount.replace(
    /[^0-9]/g,
    ""
  );

  return Number(value) || 0;
}

function getDeadlineValue(
  deadline: string
): number {
  const date = new Date(deadline);

  if (!Number.isNaN(date.getTime())) {
    return date.getTime();
  }

  return Number.MAX_SAFE_INTEGER;
}

export default function ScholarshipsPage() {
  const router = useRouter();

  const [user, setUser] =
    useState<User | null>(null);

  const [scholarships, setScholarships] =
    useState<Scholarship[]>(
      fallbackScholarships
    );

  const [profile, setProfile] =
    useState<StudentProfile>({});

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("match");

  const [loading, setLoading] =
    useState(true);

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

          /*
           * Load the student's saved academic profile.
           */
          try {
            const savedProfile =
              localStorage.getItem(
                `scholarseva-profile-${currentUser.uid}`
              );

            if (savedProfile) {
              setProfile(
                JSON.parse(savedProfile)
              );
            }
          } catch (error) {
            console.error(
              "Profile loading error:",
              error
            );
          }

          /*
           * Load scholarships from Firestore.
           */
          try {
            const snapshot =
              await getDocs(
                collection(
                  db,
                  "scholarships"
                )
              );

            if (!snapshot.empty) {
              const firebaseScholarships =
                snapshot.docs.map(
                  (doc) =>
                    normalizeScholarship(
                      doc.id,
                      doc.data()
                    )
                );

              setScholarships([
                ...firebaseScholarships,
                ...fallbackScholarships,
              ]);
            } else {
              setScholarships(
                fallbackScholarships
              );
            }
          } catch (error) {
            console.error(
              "Scholarship loading error:",
              error
            );

            setScholarships(
              fallbackScholarships
            );
          } finally {
            setLoading(false);
          }
        }
      );

    return () => unsubscribe();
  }, [router]);

  const categories = [
    "All",
    "General",
    "Government",
    "State",
    "Merit",
    "Technology",
    "Women",
  ];

  const scholarshipMatches =
    useMemo(() => {
      return scholarships.map(
        (scholarship) => ({
          scholarship,
          match: getScholarshipMatch(
            scholarship,
            profile
          ),
        })
      );
    }, [scholarships, profile]);

  const filteredScholarships =
    useMemo(() => {
      const value =
        search.trim().toLowerCase();

      const results =
        scholarshipMatches.filter(
          ({ scholarship }) => {
            const matchesSearch =
              !value ||
              scholarship.title
                .toLowerCase()
                .includes(value) ||
              scholarship.provider
                .toLowerCase()
                .includes(value) ||
              scholarship.category
                .toLowerCase()
                .includes(value);

            const matchesCategory =
              category === "All" ||
              scholarship.category ===
                category;

            return (
              matchesSearch &&
              matchesCategory
            );
          }
        );

      return [...results].sort(
        (a, b) => {
          if (sortBy === "match") {
            return (
              b.match.score -
              a.match.score
            );
          }

          if (sortBy === "amount") {
            return (
              getAmountValue(
                b.scholarship.amount
              ) -
              getAmountValue(
                a.scholarship.amount
              )
            );
          }

          if (sortBy === "deadline") {
            return (
              getDeadlineValue(
                a.scholarship.deadline
              ) -
              getDeadlineValue(
                b.scholarship.deadline
              )
            );
          }

          return 0;
        }
      );
    }, [
      scholarshipMatches,
      search,
      category,
      sortBy,
    ]);

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setSortBy("match");
  };

  if (loading) {
    return (
      <main className="scholarships-loading-screen">
        <div className="scholarships-loading-glow loading-glow-left" />

        <div className="scholarships-loading-glow loading-glow-right" />

        <div className="scholarships-loading-content">

          <div className="scholarships-loading-symbol">
            <svg
              viewBox="0 0 120 120"
              width="110"
              height="110"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <ellipse
                cx="60"
                cy="60"
                rx="46"
                ry="28"
                fill="none"
                stroke="#d9b75c"
                strokeWidth="1.5"
                opacity="0.45"
                transform="rotate(-24 60 60)"
              />

              <ellipse
                cx="60"
                cy="60"
                rx="37"
                ry="50"
                fill="none"
                stroke="#f2d991"
                strokeWidth="1"
                opacity="0.25"
                transform="rotate(35 60 60)"
              />

              <rect
                x="32"
                y="32"
                width="56"
                height="56"
                rx="18"
                fill="#741b32"
                stroke="#d9b75c"
                strokeWidth="1.5"
              />

              <path
                d="M73 45C70 41 65 39 59 39C51 39 46 42.5 46 47.5C46 52 49.5 54 58 56C66 58 72 60.5 72 66.5C72 73 66.5 77 58.5 77C52 77 46.5 74.5 43 70"
                fill="none"
                stroke="#f0d787"
                strokeWidth="5"
                strokeLinecap="round"
              />

              <path
                d="M92 18L95 25L102 28L95 31L92 38L89 31L82 28L89 25L92 18Z"
                fill="#e8c868"
              />

              <circle
                cx="18"
                cy="59"
                r="4"
                fill="#e2c36d"
              />

              <circle
                cx="103"
                cy="72"
                r="3"
                fill="#e2c36d"
                opacity="0.8"
              />
            </svg>
          </div>

          <div className="scholarships-loading-brand">
            Scholar<span>Seva</span>
          </div>

          <h1>
            Finding your opportunities
          </h1>

          <p>
            Matching scholarships with your
            academic profile.
          </p>

          <div className="scholarships-loading-track">
            <div className="scholarships-loading-progress" />
          </div>

          <div className="scholarships-loading-status">
            <span />
            Building your best matches
          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="dashboard-page">

      {/* NAVIGATION */}
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
            {(user?.email?.[0] ||
              "S").toUpperCase()}
          </div>

          <div className="nav-user-info">

            <strong>
              {user?.displayName ||
                "Student"}
            </strong>

            <small>
              {user?.email}
            </small>

          </div>

        </div>

      </nav>

      {/* PAGE */}
      <section className="scholarship-discovery-page">

        {/* HEADER */}
        <div className="scholarship-discovery-header">

          <div>

            <p className="eyebrow">
              SCHOLARSHIP DISCOVERY
            </p>

            <h1>
              Opportunities for your future.
            </h1>

            <p>
              Explore scholarships, compare
              opportunities and find the ones
              that best fit your profile.
            </p>

          </div>

          <div className="discovery-trust">

            <div className="trust-icon">
              ✦
            </div>

            <div>
              <strong>
                Profile-powered
              </strong>

              <span>
                recommendations
              </span>
            </div>

          </div>

        </div>

        {/* SEARCH + SORT */}
        <div className="discovery-main-toolbar">

          <div className="discovery-search">

            <div className="search-icon">
              ⌕
            </div>

            <input
              type="text"
              placeholder="Search scholarships, providers or categories..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

            {search && (
              <button
                type="button"
                className="search-reset"
                onClick={() =>
                  setSearch("")
                }
              >
                ×
              </button>
            )}

          </div>

          <div className="discovery-sort">

            <span>
              SORT
            </span>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value
                )
              }
            >
              <option value="match">
                Best Match
              </option>

              <option value="amount">
                Highest Award
              </option>

              <option value="deadline">
                Nearest Deadline
              </option>
            </select>

          </div>

        </div>

        {/* FILTER BAR */}
        <div className="category-filter">

          <div className="category-filter-title">

            <span>
              FILTER BY
            </span>

            <strong>
              Scholarship Type
            </strong>

          </div>

          <div className="category-pills">

            {categories.map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  className={
                    category === item
                      ? "category-pill active-pill"
                      : "category-pill"
                  }
                  onClick={() =>
                    setCategory(item)
                  }
                >
                  {item}
                </button>
              )
            )}

          </div>

        </div>

        {/* RESULTS HEADER */}
        <div className="discovery-results-header">

          <div>

            <strong>
              {filteredScholarships.length}
            </strong>

            <span>
              opportunities found
            </span>

          </div>

          {(search ||
            category !== "All" ||
            sortBy !== "match") && (
            <button
              type="button"
              className="clear-discovery"
              onClick={clearFilters}
            >
              Reset filters
            </button>
          )}

        </div>

        {/* SCHOLARSHIP GRID */}
        {filteredScholarships.length >
        0 ? (

          <div className="scholarship-discovery-grid">

            {filteredScholarships.map(
              ({ scholarship, match }, index) => {

                return (
                  <article
                    className="premium-scholarship-card"
                    key={`${scholarship.id}-${scholarship.title}`}
                  >

                    {/* TOP */}
                    <div className="premium-card-top">

                      <span className="premium-category">
                        {scholarship.category}
                      </span>

                      {index === 0 &&
                        sortBy ===
                          "match" && (
                          <span className="best-match-badge">
                            ✦ BEST MATCH
                          </span>
                        )}

                    </div>

                    {/* TITLE */}
                    <h2>
                      {scholarship.title}
                    </h2>

                    <p className="premium-provider">
                      {scholarship.provider}
                    </p>

                    <p className="premium-description">
                      {scholarship.description}
                    </p>

                    {/* MATCH */}
                    <div className="premium-match">

                      <div className="premium-match-heading">

                        <span>
                          PROFILE MATCH
                        </span>

                        <strong>
                          {match.score}%
                        </strong>

                      </div>

                      <div className="premium-match-track">

                        <div
                          style={{
                            width: `${match.score}%`,
                          }}
                        />

                      </div>

                      <div className="premium-match-reasons">

                        {match.reasons.map(
                          (reason, reasonIndex) => (
                            <span
                              key={`${reason}-${reasonIndex}`}
                            >
                              ✓ {reason}
                            </span>
                          )
                        )}

                      </div>

                    </div>

                    {/* INFO */}
                    <div className="premium-card-info">

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

                    {/* CTA */}
                    <Link
                      href={`/scholarships/${scholarship.id}`}
                      className="premium-card-button"
                    >
                      View Scholarship
                      <span>→</span>
                    </Link>

                  </article>
                );
              }
            )}

          </div>

        ) : (

          <div className="premium-discovery-empty">

            <div className="empty-discovery-icon">
              ⌕
            </div>

            <span>
              NO RESULTS
            </span>

            <h2>
              No scholarship matches found
            </h2>

            <p>
              Try another keyword or reset
              your filters to explore all
              available opportunities.
            </p>

            <button
              type="button"
              className="primary-btn"
              onClick={clearFilters}
            >
              Explore All Scholarships
            </button>

          </div>

        )}

      </section>

      {/* FOOTER */}
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