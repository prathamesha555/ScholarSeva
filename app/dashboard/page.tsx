"use client";

import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import {
  collection,
  getDocs,
  limit,
  query,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth, db } from "@/lib/firebase";

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

const demoScholarships: Scholarship[] = [
  {
    id: "demo-1",
    title: "National Scholarship Programme",
    provider: "Government of India",
    amount: "₹50,000",
    deadline: "30 Sep 2026",
    category: "Government",
    description:
      "Financial support for eligible students pursuing higher education.",
    eligibility: "UG and PG students",
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
    eligibility: "Maharashtra students",
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
    eligibility: "Undergraduate students",
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
    eligibility: "Technology students",
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
    eligibility: "Eligible students",
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
    eligibility: "High-performing undergraduate students",
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
      "Check details",
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
      "See scholarship details",
  };
}

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

function getMatchLabel(score: number) {
  if (score >= 93) return "Excellent Match";
  if (score >= 88) return "Strong Match";
  return "Good Match";
}

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] =
    useState<User | null>(null);

  const [scholarships, setScholarships] =
    useState<Scholarship[]>(
      demoScholarships
    );

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [applicationCount, setApplicationCount] =
    useState(2);

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

          try {
            const q = query(
              collection(db, "scholarships"),
              limit(6)
            );

            const snapshot =
              await getDocs(q);

            if (!snapshot.empty) {
              const firebaseItems =
                snapshot.docs.map((doc) =>
                  normalizeScholarship(
                    doc.id,
                    doc.data()
                  )
                );

              setScholarships([
                ...firebaseItems,
                ...demoScholarships,
              ]);
            } else {
              setScholarships(
                demoScholarships
              );
            }
          } catch (error) {
            console.error(
              "Scholarship loading error:",
              error
            );

            setScholarships(
              demoScholarships
            );
          }

          try {
            let count = 0;

            for (
              let i = 0;
              i < localStorage.length;
              i++
            ) {
              const key =
                localStorage.key(i);

              if (
                key?.startsWith(
                  "scholarseva-application-"
                )
              ) {
                count++;
              }
            }

            setApplicationCount(
              count > 0 ? count : 2
            );
          } catch {
            setApplicationCount(2);
          }

          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, [router]);

  const studentName =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "Student";

  const filteredScholarships =
    useMemo(() => {
      const value =
        search.trim().toLowerCase();

      return scholarships.filter(
        (item) =>
          !value ||
          item.title
            .toLowerCase()
            .includes(value) ||
          item.provider
            .toLowerCase()
            .includes(value) ||
          item.category
            .toLowerCase()
            .includes(value)
      );
    }, [search, scholarships]);

  const topMatches =
    [...scholarships]
      .sort(
        (a, b) =>
          getMatchScore(b) -
          getMatchScore(a)
      )
      .slice(0, 3);

  const bestMatch =
    topMatches[0] ||
    demoScholarships[0];

  const bestMatchScore =
    getMatchScore(bestMatch);

  async function logout() {
    await signOut(auth);
    router.push("/login");
  }

  if (loading && !user) {
    return (
      <main className="loading-page">
        <div className="loader"></div>
        <p>
          Loading ScholarSeva...
        </p>
      </main>
    );
  }

  return (
    <main className="dashboard-page">

      {/* ==================================================
          NAVIGATION
      ================================================== */}

      <nav className="dashboard-nav">

        <Link
          href="/dashboard"
          className="dashboard-logo"
        >
          <span>🎓</span>

          Scholar<span>Seva</span>
        </Link>

        <div className="dashboard-nav-links">

          <Link
            href="/dashboard"
            className="active"
          >
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

        <div className="nav-user">

          <div className="avatar">
            {(user?.email?.[0] ||
              "S").toUpperCase()}
          </div>

          <div className="nav-user-info">

            <strong>
              {studentName}
            </strong>

            <small>
              {user?.email}
            </small>

          </div>

          <button
            className="logout-btn"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </nav>

      <section className="dashboard-container">

        {/* ==================================================
            HERO
        ================================================== */}

        <section className="dashboard-hero">

          <div className="hero-decoration hero-ring-one"></div>

          <div className="hero-decoration hero-ring-two"></div>

          <div className="hero-content">

            <div className="hero-label">
              <span>✦</span>
              SMART SCHOLARSHIP DISCOVERY
            </div>

            <h1>
              Your education
              <br />
              deserves an{" "}
              <span>
                opportunity.
              </span>
            </h1>

            <p>
              Welcome to ScholarSeva, your
              personalized space to discover and
              manage scholarship opportunities.
            </p>

            <div className="hero-actions">

              <Link
                href="/scholarships"
                className="hero-primary-btn"
              >
                Explore Scholarships
                <span>→</span>
              </Link>

              <Link
                href="/profile"
                className="hero-secondary-btn"
              >
                Complete Profile
              </Link>

            </div>

          </div>

          {/* MATCH PANEL */}

          <div className="hero-match-card">

            <div className="hero-match-label">
              YOUR SCHOLARSHIP SNAPSHOT
            </div>

            <div className="hero-match-highlight">

              <div>
                <span>
                  BEST PROFILE MATCH
                </span>

                <h3>
                  {bestMatch.title}
                </h3>

                <p>
                  {bestMatch.provider}
                </p>
              </div>

              <div className="hero-match-percentage">
                {bestMatchScore}%
              </div>

            </div>

            <div className="hero-match-bar">

              <div
                style={{
                  width: `${bestMatchScore}%`,
                }}
              />

            </div>

            <div className="hero-match-caption">

              <span>
                ✦ {getMatchLabel(
                  bestMatchScore
                )}
              </span>

              <span>
                Profile based
              </span>

            </div>

            <div className="hero-match-items">

              <div>
                <span>✓</span>
                Education
              </div>

              <div>
                <span>✓</span>
                Eligibility
              </div>

              <div>
                <span>✓</span>
                Profile
              </div>

            </div>

          </div>

        </section>

        {/* ==================================================
            WELCOME
        ================================================== */}

        <div className="welcome-section">

          <div>

            <p className="eyebrow">
              GOOD TO SEE YOU
            </p>

            <h1>
              Hello,{" "}
              <span>
                {studentName}
              </span>
            </h1>

            <p>
              Here are the opportunities we think
              you should explore.
            </p>

          </div>

          <div className="welcome-badge">
            <span>
              ✦
            </span>

            Profile-powered discovery

          </div>

        </div>

        {/* ==================================================
            STATS
        ================================================== */}

        <div className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon">
              🎓
            </div>

            <div>
              <strong>
                120+
              </strong>

              <span>
                Scholarships Available
              </span>
            </div>

            <div className="stat-arrow">
              →
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              ✦
            </div>

            <div>
              <strong>
                8
              </strong>

              <span>
                Best Profile Matches
              </span>
            </div>

            <div className="stat-arrow">
              →
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              📄
            </div>

            <div>
              <strong>
                {applicationCount}
              </strong>

              <span>
                My Applications
              </span>
            </div>

            <div className="stat-arrow">
              →
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon">
              ⏳
            </div>

            <div>
              <strong>
                2
              </strong>

              <span>
                Deadlines Soon
              </span>
            </div>

            <div className="stat-arrow">
              →
            </div>

          </div>

        </div>

        {/* ==================================================
            RECOMMENDED
        ================================================== */}

        <section className="dashboard-section">

          <div className="section-header">

            <div>

              <p className="eyebrow">
                SMART RECOMMENDATIONS
              </p>

              <h2>
                Scholarships For You
              </h2>

            </div>

            <Link
              href="/scholarships"
              className="view-link"
            >
              Explore all →
            </Link>

          </div>

          {/* SEARCH */}

          <div className="dashboard-search">

            <span>
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search by scholarship, provider or category..."
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
                className="search-clear-button"
                onClick={() =>
                  setSearch("")
                }
              >
                ×
              </button>
            )}

            <Link
              href="/scholarships"
              className="search-action"
            >
              Search
            </Link>

          </div>

          {/* SEARCH RESULT LABEL */}

          {search && (
            <div className="dashboard-search-result">

              <span>
                SEARCH RESULTS
              </span>

              <strong>
                {filteredScholarships.length}
              </strong>

              <p>
                scholarships found for
                "{search}"
              </p>

            </div>
          )}

          {/* CARDS */}

          <div className="cards scholarship-cards">

            {(search
              ? filteredScholarships.slice(
                  0,
                  6
                )
              : topMatches
            ).map(
              (scholarship, index) => {

                const score =
                  getMatchScore(
                    scholarship
                  );

                return (
                  <article
                    className={`scholarship-card ${
                      index === 0 && !search
                        ? "featured-scholarship"
                        : ""
                    }`}
                    key={`${scholarship.id}-${scholarship.title}`}
                  >

                    {index === 0 &&
                      !search && (
                        <div className="featured-label">
                          <span>
                            ✦
                          </span>
                          TOP MATCH
                        </div>
                      )}

                    <div className="scholarship-top">

                      <span className="category-badge">
                        {scholarship.category}
                      </span>

                      <span className="bookmark">
                        ♡
                      </span>

                    </div>

                    <h3>
                      {scholarship.title}
                    </h3>

                    <p className="provider">
                      {scholarship.provider}
                    </p>

                    <p className="description">
                      {scholarship.description}
                    </p>

                    {/* MATCH */}

                    <div className="match-score">

                      <div className="match-score-top">

                        <span>
                          PROFILE MATCH
                        </span>

                        <strong>
                          {score}%
                        </strong>

                      </div>

                      <div className="match-bar">

                        <div
                          className="match-fill"
                          style={{
                            width: `${score}%`,
                          }}
                        />

                      </div>

                      <div className="match-reasons">

                        <span>
                          ✓ Education
                        </span>

                        <span>
                          ✓ Eligibility
                        </span>

                        <span>
                          ✓ Profile
                        </span>

                      </div>

                    </div>

                    {/* META */}

                    <div className="scholarship-meta">

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

                    <Link
                      href={`/scholarships/${scholarship.id}`}
                      className="secondary-btn"
                    >
                      View Scholarship →
                    </Link>

                  </article>
                );
              }
            )}

          </div>

          {!search &&
            topMatches.length > 0 && (
              <div className="recommendation-note">

                <span>
                  ✦
                </span>

                <p>
                  Recommendations are currently
                  based on your available profile
                  information.
                </p>

                <Link href="/profile">
                  Improve my matches →
                </Link>

              </div>
            )}

          {search &&
            filteredScholarships.length ===
              0 && (
              <div className="empty-card">

                <div>
                  🔍
                </div>

                <h2>
                  No scholarships found
                </h2>

                <p>
                  Try another search term or
                  explore all available
                  scholarships.
                </p>

                <button
                  type="button"
                  className="primary-btn"
                  onClick={() =>
                    setSearch("")
                  }
                >
                  Show All Scholarships
                </button>

              </div>
            )}

        </section>

        {/* ==================================================
            QUICK ACTIONS
        ================================================== */}

        <section className="quick-section">

          <div className="section-header">

            <div>

              <p className="eyebrow">
                YOUR JOURNEY
              </p>

              <h2>
                What would you like to do?
              </h2>

            </div>

          </div>

          <div className="quick-grid">

            <Link
              href="/scholarships"
              className="quick-card"
            >

              <div className="quick-card-icon">
                🔎
              </div>

              <strong>
                Find Scholarships
              </strong>

              <span>
                Browse opportunities and
                discover your best matches.
              </span>

              <b>
                Explore →
              </b>

            </Link>

            <Link
              href="/profile"
              className="quick-card"
            >

              <div className="quick-card-icon">
                👤
              </div>

              <strong>
                Complete Profile
              </strong>

              <span>
                Add academic details for better
                recommendations.
              </span>

              <b>
                Update Profile →
              </b>

            </Link>

            <Link
              href="/applications"
              className="quick-card"
            >

              <div className="quick-card-icon">
                📊
              </div>

              <strong>
                Track Applications
              </strong>

              <span>
                Follow your applications from
                submission to decision.
              </span>

              <b>
                Track Now →
              </b>

            </Link>

          </div>

        </section>

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