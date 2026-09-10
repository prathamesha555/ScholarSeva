"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("ScholarSeva application error:", error);
  }, [error]);

  return (
    <main className="smart-error-page">
      <div className="smart-error-orb smart-error-orb-one" />
      <div className="smart-error-orb smart-error-orb-two" />

      <section className="smart-error-card">
        <div className="smart-error-icon">!</div>

        <span className="smart-error-label">SCHOLARSEVA</span>

        <h1>Something went wrong</h1>

        <p>
          We couldn&apos;t load this part of ScholarSeva right now. Please try
          again. Your account and saved information remain protected.
        </p>

        <div className="smart-error-actions">
          <button
            type="button"
            onClick={() => reset()}
            className="smart-error-primary"
          >
            Try Again
          </button>

          <button
            type="button"
            onClick={() => {
              window.location.href = "/dashboard";
            }}
            className="smart-error-secondary"
          >
            Back to Dashboard
          </button>
        </div>

        {error?.digest && (
          <small className="smart-error-code">
            Reference: {error.digest}
          </small>
        )}
      </section>
    </main>
  );
}