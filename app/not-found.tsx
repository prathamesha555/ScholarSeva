import Link from "next/link";

export default function NotFound() {
  return (
    <main className="smart-not-found-page">
      <div className="smart-not-found-orb smart-not-found-orb-one" />
      <div className="smart-not-found-orb smart-not-found-orb-two" />

      <section className="smart-not-found-card">
        <div className="smart-not-found-number">404</div>

        <span className="smart-not-found-label">SCHOLARSEVA</span>

        <h1>Page not found</h1>

        <p>
          The scholarship or page you&apos;re looking for may have moved,
          expired, or does not exist anymore.
        </p>

        <div className="smart-not-found-actions">
          <Link
            href="/scholarships"
            className="smart-not-found-primary"
          >
            Explore Scholarships
          </Link>

          <Link
            href="/dashboard"
            className="smart-not-found-secondary"
          >
            Go to Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}