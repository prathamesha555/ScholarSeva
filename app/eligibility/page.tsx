"use client";

import { useState } from "react";
import { opportunities } from "../../data/opportunities";

export default function Eligibility() {
  const [state, setState] = useState("All");
  const [education, setEducation] = useState("All");
  const [type, setType] = useState("All");
  const [checked, setChecked] = useState(false);

  const results = opportunities.filter((item) => {
    const matchesState =
      state === "All" ||
      item.state === "All India" ||
      item.state === state;

    const matchesEducation =
      education === "All" ||
      item.education === "All" ||
      item.education === education;

    const matchesType =
      type === "All" || item.type === type;

    return matchesState && matchesEducation && matchesType;
  });

  return (
    <main>
      <nav className="navbar">
        <div className="logo">ScholarSeva</div>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/scholarships">Scholarships</a>
          <a href="/schemes">Government Schemes</a>
          <a href="/eligibility">Check Eligibility</a>
          <a href="/about">About</a>
        </div>
      </nav>

      <section className="hero">
        <h1>Check Your Eligibility</h1>

        <p>
          Tell us a little about yourself and discover opportunities that
          may match your profile.
        </p>
      </section>

      <section className="section">
        <h2>Tell Us About Yourself</h2>

        <div
          style={{
            maxWidth: "700px",
            display: "grid",
            gap: "20px",
          }}
        >
          <div>
            <label>State</label>

            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "8px",
              }}
            >
              <option value="All">Any State</option>
              <option value="All India">All India</option>
              <option value="Maharashtra">Maharashtra</option>
            </select>
          </div>

          <div>
            <label>Education Level</label>

            <select
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "8px",
              }}
            >
              <option value="All">Any Education Level</option>
              <option value="School">School</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
            </select>
          </div>

          <div>
            <label>Opportunity Type</label>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "8px",
              }}
            >
              <option value="All">Scholarships & Schemes</option>
              <option value="Scholarship">Scholarships</option>
              <option value="Government Scheme">
                Government Schemes
              </option>
            </select>
          </div>

          <button
            onClick={() => setChecked(true)}
            style={{
              padding: "14px",
              background: "#1d4ed8",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Find Opportunities
          </button>
        </div>
      </section>

      {checked && (
        <section className="section">
          <h2>
            {results.length} Potentially Matching Opportunities
          </h2>

          {results.length === 0 ? (
            <p>
              We couldn't find matching opportunities in our current
              development data.
            </p>
          ) : (
            <div className="cards">
              {results.map((item) => (
                <div className="card" key={item.id}>
                  <small>{item.type}</small>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>

                  <p>
                    <strong>State:</strong> {item.state}
                  </p>

                  <p>
                    <strong>Education:</strong> {item.education}
                  </p>

                  <a
                    href={
                      item.type === "Scholarship"
                        ? `/scholarships/${item.id}`
                        : `/schemes/${item.id}`
                    }
                  >
                    <button>View Details</button>
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      <footer className="footer">
        © 2026 ScholarSeva — Discover. Check. Apply.
      </footer>
    </main>
  );
}