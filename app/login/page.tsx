"use client";

import { FormEvent, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-left">
        <div className="brand-large">
          <span className="brand-icon">🎓</span>
          <span>Scholar<span>Seva</span></span>
        </div>

        <div className="auth-hero">
          <div className="mini-badge">SMART SCHOLARSHIP PLATFORM</div>

          <h1>
            Find the right
            <br />
            scholarship for your <span>future.</span>
          </h1>

          <p>
            Discover scholarships, check eligibility, track applications
            and make your education journey easier.
          </p>

          <div className="auth-features">
            <div>
              <strong>01</strong>
              <span>Discover scholarships</span>
            </div>
            <div>
              <strong>02</strong>
              <span>Check eligibility</span>
            </div>
            <div>
              <strong>03</strong>
              <span>Track applications</span>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-card-heading">
            <p className="eyebrow">
              {isSignup ? "CREATE ACCOUNT" : "WELCOME BACK"}
            </p>

            <h2>{isSignup ? "Create your account" : "Student Login"}</h2>

            <p>
              {isSignup
                ? "Join ScholarSeva and discover opportunities."
                : "Sign in to access your scholarship dashboard."}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="field">
                <label>Student Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="field">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            {error && <div className="error-box">{error}</div>}

            <button className="primary-btn full-btn" disabled={loading}>
              {loading
                ? "Please wait..."
                : isSignup
                ? "Create Account"
                : "Login to ScholarSeva"}
            </button>
          </form>

          <div className="auth-switch">
            {isSignup
              ? "Already have an account?"
              : "Don't have an account?"}

            <button
              onClick={() => {
                setIsSignup(!isSignup);
                setError("");
              }}
            >
              {isSignup ? "Login" : "Create Account"}
            </button>
          </div>

          <Link href="/" className="back-link">
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}