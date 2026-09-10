"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Application = {
  id: string;
  scholarshipTitle: string;
  provider: string;
  amount: string;
  status: string;
  appliedAt: string;
};

const demoApplications: Application[] = [
  {
    id: "demo-application-1",
    scholarshipTitle: "National Scholarship Programme",
    provider: "Government of India",
    amount: "₹50,000",
    status: "Under Review",
    appliedAt: "2026-09-05",
  },
  {
    id: "demo-application-2",
    scholarshipTitle: "Post Matric Scholarship",
    provider: "Maharashtra Government",
    amount: "₹35,000",
    status: "Applied",
    appliedAt: "2026-09-07",
  },
];

const timelineSteps = [
  {
    title: "Application Submitted",
    description:
      "Your application has been successfully received.",
    icon: "✓",
  },
  {
    title: "Documents Verified",
    description:
      "Application documents are checked for completeness.",
    icon: "✓",
  },
  {
    title: "Application Under Review",
    description:
      "The scholarship application is being evaluated.",
    icon: "●",
  },
  {
    title: "Decision Pending",
    description:
      "The final scholarship decision is awaited.",
    icon: "○",
  },
];

function getStatusStep(status: string): number {
  switch (status) {
    case "Applied":
      return 1;

    case "Documents Verified":
      return 2;

    case "Under Review":
      return 3;

    case "Decision Pending":
      return 4;

    case "Approved":
      return 5;

    default:
      return 1;
  }
}

function formatDate(date: string): string {
  try {
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  } catch {
    return "Recently";
  }
}

export default function ApplicationsPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const [applications, setApplications] =
    useState<Application[]>([]);

  const [selectedApplication, setSelectedApplication] =
    useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        if (!currentUser) {
          router.push("/login");
          return;
        }

        setUser(currentUser);
        loadApplications();
      }
    );

    return () => unsubscribe();
  }, [router]);

  function loadApplications() {
    const savedApplications: Application[] = [];

    for (
      let i = 0;
      i < localStorage.length;
      i++
    ) {
      const key = localStorage.key(i);

      if (
        !key ||
        !key.startsWith(
          "scholarseva-application-"
        )
      ) {
        continue;
      }

      try {
        const value =
          localStorage.getItem(key);

        if (!value) continue;

        const application =
          JSON.parse(value);

        savedApplications.push({
          id:
            application.id ||
            key,

          scholarshipTitle:
            application.scholarshipTitle ||
            "Scholarship",

          provider:
            application.provider ||
            "ScholarSeva",

          amount:
            application.amount ||
            "Amount varies",

          status:
            application.status ||
            "Applied",

          appliedAt:
            application.appliedAt ||
            new Date().toISOString(),
        });
      } catch {
        // Ignore invalid records
      }
    }

    if (savedApplications.length > 0) {
      setApplications(
        savedApplications
      );
    } else {
      setApplications(
        demoApplications
      );
    }
  }

  if (!user) {
    return (
      <main className="loading-page">
        <div className="loader"></div>

        <p>
          Loading your applications...
        </p>
      </main>
    );
  }

  const totalApplications =
    applications.length;

  const underReview =
    applications.filter(
      (item) =>
        item.status ===
        "Under Review"
    ).length;

  const approved =
    applications.filter(
      (item) =>
        item.status === "Approved"
    ).length;

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

          <Link href="/dashboard">
            Dashboard
          </Link>

          <Link href="/scholarships">
            Scholarships
          </Link>

          <Link
            href="/applications"
            className="active"
          >
            My Applications
          </Link>

          <Link href="/profile">
            Profile
          </Link>

        </div>

        <div className="nav-user">

          <div className="avatar">
            {(
              user.email?.[0] ||
              "S"
            ).toUpperCase()}
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

      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <section className="applications-premium-page">

        {/* HEADER */}

        <div className="applications-premium-header">

          <div>

            <p className="eyebrow">
              APPLICATION CENTER
            </p>

            <h1>
              My Applications
            </h1>

            <p>
              Keep track of your scholarship
              applications from submission to
              decision.
            </p>

          </div>

          <Link
            href="/scholarships"
            className="application-find-button"
          >
            <span>+</span>
            Find Scholarships
          </Link>

        </div>

        {/* SUMMARY */}

        <div className="application-premium-summary">

          <div className="application-summary-card">

            <div className="application-summary-icon">
              📄
            </div>

            <div>

              <span>
                TOTAL APPLICATIONS
              </span>

              <strong>
                {totalApplications}
              </strong>

            </div>

            <div className="summary-accent">
              →
            </div>

          </div>

          <div className="application-summary-card">

            <div className="application-summary-icon">
              ⏳
            </div>

            <div>

              <span>
                UNDER REVIEW
              </span>

              <strong>
                {underReview}
              </strong>

            </div>

            <div className="summary-accent">
              →
            </div>

          </div>

          <div className="application-summary-card">

            <div className="application-summary-icon">
              ✓
            </div>

            <div>

              <span>
                APPROVED
              </span>

              <strong>
                {approved}
              </strong>

            </div>

            <div className="summary-accent">
              →
            </div>

          </div>

        </div>

        {/* APPLICATION LIST */}

        <div className="applications-section-heading">

          <div>

            <span>
              YOUR APPLICATIONS
            </span>

            <h2>
              Application Activity
            </h2>

          </div>

          <span className="application-count-label">
            {applications.length}{" "}
            {applications.length === 1
              ? "application"
              : "applications"}
          </span>

        </div>

        <div className="premium-application-list">

          {applications.length === 0 ? (

            <div className="application-empty">

              <div className="application-empty-icon">
                📋
              </div>

              <span>
                NO APPLICATIONS YET
              </span>

              <h2>
                Your scholarship journey
                starts here.
              </h2>

              <p>
                Discover scholarships that match
                your profile and submit your first
                application.
              </p>

              <Link
                href="/scholarships"
                className="primary-btn"
              >
                Explore Scholarships →
              </Link>

            </div>

          ) : (

            applications.map(
              (application) => {

                const currentStep =
                  getStatusStep(
                    application.status
                  );

                const isExpanded =
                  selectedApplication ===
                  application.id;

                return (
                  <article
                    className="premium-application-card"
                    key={application.id}
                  >

                    {/* CARD TOP */}

                    <div className="premium-application-top">

                      <div className="premium-application-identity">

                        <div className="premium-application-logo">
                          🎓
                        </div>

                        <div>

                          <span className="premium-application-category">
                            SCHOLARSHIP APPLICATION
                          </span>

                          <h2>
                            {
                              application.scholarshipTitle
                            }
                          </h2>

                          <p>
                            {application.provider}
                          </p>

                        </div>

                      </div>

                      <div className="premium-application-award">

                        <span>
                          AWARD
                        </span>

                        <strong>
                          {application.amount}
                        </strong>

                      </div>

                    </div>

                    {/* INFO */}

                    <div className="premium-application-info">

                      <div>

                        <span>
                          APPLICATION ID
                        </span>

                        <strong>
                          {application.id.slice(
                            0,
                            20
                          )}
                        </strong>

                      </div>

                      <div>

                        <span>
                          SUBMITTED
                        </span>

                        <strong>
                          {formatDate(
                            application.appliedAt
                          )}
                        </strong>

                      </div>

                      <div>

                        <span>
                          CURRENT STATUS
                        </span>

                        <strong className="application-current-status">
                          {application.status}
                        </strong>

                      </div>

                    </div>

                    {/* STATUS STRIP */}

                    <div className="application-status-strip">

                      <span>
                        {application.status ===
                        "Approved"
                          ? "Application approved"
                          : application.status ===
                            "Under Review"
                          ? "Application is being reviewed"
                          : "Application successfully submitted"}
                      </span>

                      <span className="status-strip-icon">
                        {application.status ===
                        "Approved"
                          ? "✓"
                          : "●"}
                      </span>

                    </div>

                    {/* TOGGLE */}

                    <button
                      type="button"
                      className="timeline-toggle"
                      onClick={() =>
                        setSelectedApplication(
                          isExpanded
                            ? null
                            : application.id
                        )
                      }
                    >
                      <span>
                        {isExpanded
                          ? "Hide application progress"
                          : "View application progress"}
                      </span>

                      <span
                        className={
                          isExpanded
                            ? "toggle-arrow open"
                            : "toggle-arrow"
                        }
                      >
                        ↓
                      </span>
                    </button>

                    {/* TIMELINE */}

                    {isExpanded && (
                      <div className="premium-timeline">

                        {timelineSteps.map(
                          (step, index) => {

                            const stepNumber =
                              index + 1;

                            const completed =
                              stepNumber <
                              currentStep;

                            const active =
                              stepNumber ===
                              currentStep;

                            return (
                              <div
                                className={`premium-timeline-step ${
                                  completed
                                    ? "timeline-completed"
                                    : ""
                                } ${
                                  active
                                    ? "timeline-active"
                                    : ""
                                }`}
                                key={
                                  step.title
                                }
                              >

                                <div className="premium-timeline-node">

                                  {completed
                                    ? "✓"
                                    : active
                                    ? "●"
                                    : "○"}

                                </div>

                                <div className="premium-timeline-content">

                                  <strong>
                                    {step.title}
                                  </strong>

                                  <p>
                                    {step.description}
                                  </p>

                                  <span>
                                    {completed
                                      ? "Completed"
                                      : active
                                      ? "In progress"
                                      : "Upcoming"}
                                  </span>

                                </div>

                                {index <
                                  timelineSteps.length -
                                    1 && (
                                  <div
                                    className={`premium-timeline-line ${
                                      completed
                                        ? "timeline-line-completed"
                                        : ""
                                    }`}
                                  />
                                )}

                              </div>
                            );
                          }
                        )}

                      </div>
                    )}

                    {/* FOOTER */}

                    <div className="premium-application-footer">

                      <div>

                        <span>
                          ✦
                        </span>

                        <p>
                          Keep your ScholarSeva
                          profile updated for better
                          scholarship recommendations.
                        </p>

                      </div>

                      <Link
                        href="/scholarships"
                      >
                        Find More →
                      </Link>

                    </div>

                  </article>
                );
              }
            )

          )}

        </div>

        {/* HELP */}

        <div className="applications-help">

          <div className="applications-help-icon">
            ?
          </div>

          <div>

            <strong>
              Need help with your applications?
            </strong>

            <p>
              Make sure your profile and academic
              information are complete to improve
              your scholarship opportunities.
            </p>

          </div>

          <Link href="/profile">
            View Profile →
          </Link>

        </div>

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