"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

type AcademicProfile = {
  course: string;
  college: string;
  year: string;
  percentage: string;
  category: string;
};

const emptyProfile: AcademicProfile = {
  course: "",
  college: "",
  year: "",
  percentage: "",
  category: "",
};

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] =
    useState<User | null>(null);

  const [academicProfile, setAcademicProfile] =
    useState<AcademicProfile>(
      emptyProfile
    );

  const [showForm, setShowForm] =
    useState(false);

  const [saved, setSaved] =
    useState(false);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {
          if (!currentUser) {
            router.push("/login");
            return;
          }

          setUser(currentUser);

          const storageKey =
            `scholarseva-profile-${currentUser.uid}`;

          const storedProfile =
            localStorage.getItem(
              storageKey
            );

          if (storedProfile) {
            try {
              setAcademicProfile(
                JSON.parse(
                  storedProfile
                )
              );
            } catch {
              setAcademicProfile(
                emptyProfile
              );
            }
          }
        }
      );

    return () => unsubscribe();
  }, [router]);

  const displayName =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "Scholar";

  const initial =
    displayName
      .charAt(0)
      .toUpperCase();

  const completedFields =
    useMemo(() => {
      let count = 0;

      if (user?.email) count++;
      if (academicProfile.course)
        count++;
      if (academicProfile.college)
        count++;
      if (academicProfile.year)
        count++;
      if (academicProfile.percentage)
        count++;
      if (academicProfile.category)
        count++;

      return count;
    }, [
      user,
      academicProfile,
    ]);

  const totalFields = 6;

  const profilePercentage =
    Math.round(
      (completedFields /
        totalFields) *
        100
    );

  const profileItems = [
    {
      name: "Email verified",
      completed: !!user?.email,
    },
    {
      name: "Course / Program",
      completed:
        !!academicProfile.course,
    },
    {
      name: "College / Institute",
      completed:
        !!academicProfile.college,
    },
    {
      name: "Academic Year",
      completed:
        !!academicProfile.year,
    },
    {
      name: "Academic Percentage",
      completed:
        !!academicProfile.percentage,
    },
    {
      name: "Student Category",
      completed:
        !!academicProfile.category,
    },
  ];

  function handleChange(
    field: keyof AcademicProfile,
    value: string
  ) {
    setAcademicProfile(
      (previous) => ({
        ...previous,
        [field]: value,
      })
    );

    setSaved(false);
  }

  function saveProfile(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!user) return;

    const storageKey =
      `scholarseva-profile-${user.uid}`;

    localStorage.setItem(
      storageKey,
      JSON.stringify(
        academicProfile
      )
    );

    setSaved(true);
    setShowForm(false);
  }

  if (!user) {
    return (
      <main className="loading-page">
        <div className="loader"></div>

        <p>
          Loading profile...
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

          Scholar<span>
            Seva
          </span>
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

          <Link
            href="/profile"
            className="active"
          >
            Profile
          </Link>

        </div>

        <div className="nav-user">

          <div className="avatar">
            {initial}
          </div>

          <div className="nav-user-info">

            <strong>
              {displayName}
            </strong>

            <small>
              {user.email}
            </small>

          </div>

        </div>

      </nav>

      {/* ==================================================
          PROFILE PAGE
      ================================================== */}

      <section className="professional-profile-page">

        {/* HEADER */}

        <div className="professional-profile-header">

          <div>

            <p className="eyebrow">
              STUDENT PROFILE
            </p>

            <h1>
              Build your scholarship profile.
            </h1>

            <p>
              A complete profile helps ScholarSeva
              surface opportunities that are more
              relevant to you.
            </p>

          </div>

          <div className="profile-live-status">

            <span></span>

            Profile active

          </div>

        </div>

        {/* HERO PROFILE */}

        <section className="professional-profile-hero">

          <div className="profile-hero-orb orb-one"></div>

          <div className="profile-hero-orb orb-two"></div>

          <div className="professional-avatar">
            {initial}
          </div>

          <div className="professional-identity">

            <span>
              SCHOLARSEVA STUDENT
            </span>

            <h2>
              {displayName}
            </h2>

            <p>
              {user.email}
            </p>

            <div className="identity-pills">

              <span>
                ✓ Verified Account
              </span>

              <span>
                🎓 Student
              </span>

            </div>

          </div>

          <div className="profile-strength-hero">

            <span>
              PROFILE STRENGTH
            </span>

            <strong>
              {profilePercentage}%
            </strong>

            <div className="hero-strength-bar">

              <div
                style={{
                  width:
                    `${profilePercentage}%`,
                }}
              />

            </div>

            <small>
              {profilePercentage ===
              100
                ? "Profile complete"
                : "Complete your profile"}
            </small>

          </div>

        </section>

        {/* CONTENT */}

        <div className="professional-profile-grid">

          {/* MAIN */}

          <div className="professional-profile-main">

            {/* PERSONAL */}

            <section className="professional-card">

              <div className="professional-card-heading">

                <div className="professional-card-icon">
                  👤
                </div>

                <div>

                  <span>
                    PERSONAL INFORMATION
                  </span>

                  <h2>
                    Account Details
                  </h2>

                </div>

              </div>

              <div className="professional-details-grid">

                <div className="professional-detail">

                  <label>
                    FULL NAME
                  </label>

                  <strong>
                    {displayName}
                  </strong>

                </div>

                <div className="professional-detail">

                  <label>
                    EMAIL ADDRESS
                  </label>

                  <strong>
                    {user.email}
                  </strong>

                </div>

                <div className="professional-detail">

                  <label>
                    ACCOUNT STATUS
                  </label>

                  <strong className="active-account">
                    ● Active
                  </strong>

                </div>

                <div className="professional-detail">

                  <label>
                    PROFILE ID
                  </label>

                  <strong className="profile-id-value">
                    {user.uid.slice(0, 18)}...
                  </strong>

                </div>

              </div>

            </section>

            {/* ACADEMIC */}

            <section className="professional-card">

              <div className="professional-card-heading">

                <div className="professional-card-icon">
                  🎓
                </div>

                <div>

                  <span>
                    ACADEMIC PROFILE
                  </span>

                  <h2>
                    Education Details
                  </h2>

                </div>

                <button
                  type="button"
                  className="profile-header-action"
                  onClick={() =>
                    setShowForm(
                      !showForm
                    )
                  }
                >
                  {showForm
                    ? "Close"
                    : academicProfile.course
                    ? "Edit Profile"
                    : "Add Details"}
                </button>

              </div>

              {!showForm ? (

                academicProfile.course ||
                academicProfile.college ||
                academicProfile.year ||
                academicProfile.percentage ||
                academicProfile.category ? (

                  <div className="saved-academic-content">

                    <div className="academic-info-grid">

                      <div>
                        <span>
                          COURSE / PROGRAM
                        </span>

                        <strong>
                          {academicProfile.course ||
                            "Not added"}
                        </strong>
                      </div>

                      <div>
                        <span>
                          COLLEGE / INSTITUTE
                        </span>

                        <strong>
                          {academicProfile.college ||
                            "Not added"}
                        </strong>
                      </div>

                      <div>
                        <span>
                          ACADEMIC YEAR
                        </span>

                        <strong>
                          {academicProfile.year ||
                            "Not added"}
                        </strong>
                      </div>

                      <div>
                        <span>
                          PERCENTAGE
                        </span>

                        <strong>
                          {academicProfile.percentage
                            ? `${academicProfile.percentage}%`
                            : "Not added"}
                        </strong>
                      </div>

                      <div>
                        <span>
                          CATEGORY
                        </span>

                        <strong>
                          {academicProfile.category ||
                            "Not added"}
                        </strong>
                      </div>

                    </div>

                    {saved && (
                      <div className="profile-saved-message">
                        ✓ Your profile details
                        were saved successfully.
                      </div>
                    )}

                  </div>

                ) : (

                  <div className="academic-profile-empty">

                    <div className="academic-empty-icon">
                      ✦
                    </div>

                    <div>

                      <h3>
                        Your academic profile
                        is incomplete
                      </h3>

                      <p>
                        Add your education details
                        so ScholarSeva can provide
                        more relevant scholarship
                        recommendations.
                      </p>

                    </div>

                    <button
                      type="button"
                      className="profile-header-action"
                      onClick={() =>
                        setShowForm(
                          true
                        )
                      }
                    >
                      Complete Profile
                    </button>

                  </div>

                )

              ) : (

                <form
                  className="professional-academic-form"
                  onSubmit={
                    saveProfile
                  }
                >

                  <div className="academic-form-grid">

                    <div className="field">

                      <label>
                        COURSE / PROGRAM
                      </label>

                      <input
                        type="text"
                        placeholder="e.g. B.Tech Computer Science"
                        value={
                          academicProfile.course
                        }
                        onChange={(e) =>
                          handleChange(
                            "course",
                            e.target.value
                          )
                        }
                        required
                      />

                    </div>

                    <div className="field">

                      <label>
                        COLLEGE / INSTITUTE
                      </label>

                      <input
                        type="text"
                        placeholder="Enter your college"
                        value={
                          academicProfile.college
                        }
                        onChange={(e) =>
                          handleChange(
                            "college",
                            e.target.value
                          )
                        }
                        required
                      />

                    </div>

                    <div className="field">

                      <label>
                        ACADEMIC YEAR
                      </label>

                      <select
                        value={
                          academicProfile.year
                        }
                        onChange={(e) =>
                          handleChange(
                            "year",
                            e.target.value
                          )
                        }
                        required
                      >

                        <option value="">
                          Select year
                        </option>

                        <option>
                          1st Year
                        </option>

                        <option>
                          2nd Year
                        </option>

                        <option>
                          3rd Year
                        </option>

                        <option>
                          4th Year
                        </option>

                        <option>
                          Postgraduate
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
                        placeholder="e.g. 82"
                        value={
                          academicProfile.percentage
                        }
                        onChange={(e) =>
                          handleChange(
                            "percentage",
                            e.target.value
                          )
                        }
                        required
                      />

                    </div>

                    <div className="field">

                      <label>
                        STUDENT CATEGORY
                      </label>

                      <select
                        value={
                          academicProfile.category
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

                  <div className="academic-form-actions">

                    <button
                      type="button"
                      className="form-cancel"
                      onClick={() =>
                        setShowForm(
                          false
                        )
                      }
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="primary-btn"
                    >
                      Save Profile →
                    </button>

                  </div>

                </form>

              )}

            </section>

          </div>

          {/* SIDEBAR */}

          <aside className="professional-profile-sidebar">

            {/* STRENGTH */}

            <div className="profile-strength-card">

              <div className="strength-heading">

                <div>

                  <span>
                    PROFILE STRENGTH
                  </span>

                  <h3>
                    {profilePercentage ===
                    100
                      ? "You're all set"
                      : "Complete your profile"}
                  </h3>

                </div>

                <strong>
                  {profilePercentage}%
                </strong>

              </div>

              <div className="profile-strength-track">

                <div
                  style={{
                    width:
                      `${profilePercentage}%`,
                  }}
                />

              </div>

              <p>
                {profilePercentage ===
                100
                  ? "Your profile is complete and ready for personalized scholarship discovery."
                  : "Complete the remaining details to improve your scholarship matches."}
              </p>

              <div className="profile-checklist">

                {profileItems.map(
                  (item) => (

                    <div
                      className="profile-check-item"
                      key={item.name}
                    >

                      <span
                        className={
                          item.completed
                            ? "check-complete"
                            : "check-incomplete"
                        }
                      >
                        {item.completed
                          ? "✓"
                          : "○"}
                      </span>

                      <span>
                        {item.name}
                      </span>

                    </div>

                  )
                )}

              </div>

            </div>

            {/* SMART MATCH */}

            <div className="profile-smart-match">

              <span>
                SMART SCHOLARSHIP MATCHING
              </span>

              <h3>
                Your profile powers
                your recommendations.
              </h3>

              <p>
                The more information you provide,
                the better ScholarSeva can identify
                relevant opportunities.
              </p>

              <Link
                href="/scholarships"
                className="smart-match-link"
              >
                See My Matches →
              </Link>

            </div>

            {/* QUICK LINKS */}

            <div className="profile-quick-links">

              <span>
                QUICK ACCESS
              </span>

              <Link
                href="/applications"
                className="profile-quick-link"
              >

                <div>
                  📋
                </div>

                <section>

                  <strong>
                    My Applications
                  </strong>

                  <small>
                    Track your applications
                  </small>

                </section>

                <b>
                  →
                </b>

              </Link>

              <Link
                href="/scholarships"
                className="profile-quick-link"
              >

                <div>
                  🔎
                </div>

                <section>

                  <strong>
                    Scholarships
                  </strong>

                  <small>
                    Explore opportunities
                  </small>

                </section>

                <b>
                  →
                </b>

              </Link>

              <Link
                href="/dashboard"
                className="profile-quick-link"
              >

                <div>
                  ✦
                </div>

                <section>

                  <strong>
                    Dashboard
                  </strong>

                  <small>
                    Return to dashboard
                  </small>

                </section>

                <b>
                  →
                </b>

              </Link>

            </div>

            {/* SECURITY */}

            <div className="profile-security">

              <div>
                ✓
              </div>

              <section>

                <strong>
                  Account protected
                </strong>

                <p>
                  Your ScholarSeva account is
                  protected with secure
                  authentication.
                </p>

              </section>

            </div>

          </aside>

        </div>

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