"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="scholarseva-home">

      {/* BACKGROUND DECORATION */}
      <div className="home-glow home-glow-one" />
      <div className="home-glow home-glow-two" />

      {/* NAVBAR */}
      <nav className="home-nav">

        <Link href="/" className="home-logo">
          <span className="home-logo-mark">S</span>

          <span className="home-logo-text">
            Scholar<span>Seva</span>
          </span>
        </Link>

        <div className="home-nav-links">
          <a href="#how-it-works">
            How It Works
          </a>

          <a href="#features">
            Features
          </a>

          <Link href="/login">
            Sign In
          </Link>

          <Link
            href="/login"
            className="home-nav-button"
          >
            Get Started
            <span>→</span>
          </Link>
        </div>

      </nav>


      {/* HERO */}
      <section className="home-hero">

        <div className="home-hero-content">

          <div className="home-eyebrow">
            <span className="home-live-dot" />
            SMART SCHOLARSHIP DISCOVERY
          </div>

          <h1>
            Your education.
            <br />

            <span>
              Your opportunity.
            </span>
          </h1>

          <p>
            ScholarSeva helps students discover,
            compare and track scholarship
            opportunities in one intelligent
            platform.
          </p>

          <div className="home-hero-actions">

            <Link
              href="/login"
              className="home-primary-button"
            >
              Discover Scholarships
              <span>→</span>
            </Link>

            <a
              href="#how-it-works"
              className="home-secondary-button"
            >
              See How It Works
            </a>

          </div>

          <div className="home-trust-row">

            <div className="home-trust-item">
              <strong>120+</strong>
              <span>Opportunities</span>
            </div>

            <div className="home-trust-divider" />

            <div className="home-trust-item">
              <strong>Profile</strong>
              <span>Based Matching</span>
            </div>

            <div className="home-trust-divider" />

            <div className="home-trust-item">
              <strong>1</strong>
              <span>Simple Platform</span>
            </div>

          </div>

        </div>


        {/* HERO VISUAL */}
        <div className="home-hero-visual">

          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />

          <div className="hero-symbol">

            <div className="hero-symbol-core">
              S
            </div>

            <div className="hero-star star-top">
              ✦
            </div>

            <div className="hero-star star-bottom">
              ✦
            </div>

            <div className="hero-dot hero-dot-one" />
            <div className="hero-dot hero-dot-two" />

          </div>


          {/* FLOATING OPPORTUNITY CARD */}
          <div className="hero-floating-card hero-card-top">

            <div className="floating-icon">
              ✦
            </div>

            <div>
              <span>PROFILE MATCH</span>
              <strong>95%</strong>
            </div>

          </div>


          {/* FLOATING SCHOLARSHIP CARD */}
          <div className="hero-floating-card hero-card-bottom">

            <div className="floating-mini-icon">
              ₹
            </div>

            <div>
              <span>BEST OPPORTUNITY</span>
              <strong>₹1,00,000</strong>
            </div>

          </div>

        </div>

      </section>


      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="home-section home-how"
      >

        <div className="home-section-heading">

          <span>
            SIMPLE BY DESIGN
          </span>

          <h2>
            From searching to applying,
            <br />
            everything in one place.
          </h2>

          <p>
            ScholarSeva turns a confusing
            scholarship search into a clear,
            guided journey.
          </p>

        </div>


        <div className="home-steps">

          <div className="home-step">

            <div className="step-number">
              01
            </div>

            <div className="step-icon">
              ⌕
            </div>

            <h3>
              Discover
            </h3>

            <p>
              Explore scholarships from
              different categories and providers
              through one simple interface.
            </p>

          </div>


          <div className="home-step-line" />


          <div className="home-step">

            <div className="step-number">
              02
            </div>

            <div className="step-icon">
              ✦
            </div>

            <h3>
              Match
            </h3>

            <p>
              Compare opportunities using your
              academic profile and personalized
              matching indicators.
            </p>

          </div>


          <div className="home-step-line" />


          <div className="home-step">

            <div className="step-number">
              03
            </div>

            <div className="step-icon">
              ✓
            </div>

            <h3>
              Apply
            </h3>

            <p>
              Open scholarship details, complete
              your application and track its
              progress from one dashboard.
            </p>

          </div>

        </div>

      </section>


      {/* FEATURES */}
      <section
        id="features"
        className="home-section home-features"
      >

        <div className="home-section-heading">

          <span>
            BUILT FOR STUDENTS
          </span>

          <h2>
            Everything you need to
            <br />
            find the right opportunity.
          </h2>

        </div>


        <div className="home-feature-grid">

          <div className="home-feature-card">

            <div className="feature-icon burgundy-icon">
              ✦
            </div>

            <h3>
              Smart Matching
            </h3>

            <p>
              Quickly identify scholarships
              that align with your student
              profile.
            </p>

            <div className="feature-mini-bar">
              <span style={{ width: "92%" }} />
            </div>

            <small>
              Example profile match · 92%
            </small>

          </div>


          <div className="home-feature-card">

            <div className="feature-icon gold-icon">
              ₹
            </div>

            <h3>
              Scholarship Discovery
            </h3>

            <p>
              Search, filter and compare
              opportunities without jumping
              between websites.
            </p>

            <div className="feature-tags">
              <span>Merit</span>
              <span>Government</span>
              <span>State</span>
            </div>

          </div>


          <div className="home-feature-card">

            <div className="feature-icon dark-icon">
              ✓
            </div>

            <h3>
              Application Tracking
            </h3>

            <p>
              Keep your scholarship applications
              organized and understand their
              current progress.
            </p>

            <div className="feature-status">
              <span />
              Application Under Review
            </div>

          </div>


          <div className="home-feature-card">

            <div className="feature-icon burgundy-icon">
              ◉
            </div>

            <h3>
              Student Profile
            </h3>

            <p>
              Build one academic profile that
              helps ScholarSeva personalize your
              discovery experience.
            </p>

            <div className="profile-strength-mini">
              <div>
                <span>Profile Strength</span>
                <strong>83%</strong>
              </div>

              <div className="mini-strength-track">
                <span />
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* FINAL CTA */}
      <section className="home-final-cta">

        <div className="final-cta-orbit" />

        <div className="final-cta-content">

          <span>
            START YOUR JOURNEY
          </span>

          <h2>
            The right opportunity
            <br />
            could be one search away.
          </h2>

          <p>
            Create your ScholarSeva profile and
            start exploring opportunities built
            around your academic journey.
          </p>

          <Link
            href="/login"
            className="home-final-button"
          >
            Enter ScholarSeva
            <span>→</span>
          </Link>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="home-footer">

        <div className="home-footer-brand">

          <div className="home-footer-logo">
            S
          </div>

          <div>
            <strong>
              ScholarSeva
            </strong>

            <span>
              Smart Scholarship Discovery
            </span>
          </div>

        </div>

        <div className="home-footer-links">

          <Link href="/login">
            Sign In
          </Link>

          <Link href="/login">
            Get Started
          </Link>

        </div>

        <span className="home-footer-copy">
          © 2026 ScholarSeva
        </span>

      </footer>

    </main>
  );
}