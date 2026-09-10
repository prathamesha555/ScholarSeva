"use client";

import { useState } from "react";

type Opportunity = {
  id: string;
  title: string;
  type: "Scholarship" | "Government Scheme";
  state: "All India" | "Maharashtra";
  education: "School" | "Undergraduate" | "Postgraduate";
  description: string;
};

const opportunities: Opportunity[] = [
  {
    id: "scholarship-1",
    title: "National Scholarship Programme",
    type: "Scholarship",
    state: "All India",
    education: "Undergraduate",
    description:
      "Financial support for eligible students pursuing higher education.",
  },
  {
    id: "scholarship-2",
    title: "Post Matric Scholarship",
    type: "Scholarship",
    state: "Maharashtra",
    education: "Undergraduate",
    description:
      "Scholarship assistance for eligible students pursuing post-matric education.",
  },
  {
    id: "scholarship-3",
    title: "Future Leaders Scholarship",
    type: "Scholarship",
    state: "All India",
    education: "Undergraduate",
    description:
      "Merit-based support for ambitious students with strong academic records.",
  },
  {
    id: "scholarship-4",
    title: "Digital India Student Scholarship",
    type: "Scholarship",
    state: "All India",
    education: "Postgraduate",
    description:
      "Support for students pursuing technology and digital education.",
  },
  {
    id: "scholarship-5",
    title: "Women in Education Scholarship",
    type: "Scholarship",
    state: "All India",
    education: "Undergraduate",
    description:
      "Financial assistance supporting students pursuing higher education.",
  },
  {
    id: "scholarship-6",
    title: "Academic Excellence Award",
    type: "Scholarship",
    state: "Maharashtra",
    education: "Postgraduate",
    description:
      "Recognition and financial support for students demonstrating excellent academic performance.",
  },
  {
    id: "scheme-1",
    title: "Maharashtra Student Support Scheme",
    type: "Government Scheme",
    state: "Maharashtra",
    education: "Undergraduate",
    description:
      "Government support for eligible students continuing their education in Maharashtra.",
  },
  {
    id: "scheme-2",
    title: "National Education Assistance Scheme",
    type: "Government Scheme",
    state: "All India",
    education: "Postgraduate",
    description:
      "Education assistance designed to support eligible students across India.",
  },
  {
    id: "scheme-3",
    title: "School Education Support Programme",
    type: "Government Scheme",
    state: "All India",
    education: "School",
    description:
      "Support initiative for eligible school students to continue their education.",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [state, setState] = useState("All");
  const [education, setEducation] = useState("All");

  const filteredOpportunities = opportunities.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType =
      type === "All" || item.type === type;

    const matchesState =
      state === "All" || item.state === state;

    const matchesEducation =
      education === "All" ||
      item.education === education;

    return (
      matchesSearch &&
      matchesType &&
      matchesState &&
      matchesEducation
    );
  });

  return (
    <main>
      <nav className="navbar">
        <div className="logo">ScholarSeva</div>

        <div className="nav-links">
          <a href="/">Home</a>

          <a href="/scholarships">
            Scholarships
          </a>

          <a href="/schemes">
            Government Schemes
          </a>

          <a href="/about">
            About
          </a>
        </div>
      </nav>

      <section className="hero">
        <h1>
          Discover Scholarships & Government Schemes
        </h1>

        <p>
          Find official opportunities and government
          benefits that you may be eligible for.
        </p>

        <div className="search-box">
          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search scholarships and schemes..."
          />

          <button
            type="button"
            onClick={() => {
              // Search is already applied live while typing.
            }}
          >
            Search
          </button>
        </div>
      </section>

      <section className="section">
        <h2>
          Find the Right Opportunity
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(3, 1fr)",
            gap: "15px",
            marginBottom: "30px",
          }}
        >
          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
          >
            <option value="All">
              All Types
            </option>

            <option value="Scholarship">
              Scholarships
            </option>

            <option value="Government Scheme">
              Government Schemes
            </option>
          </select>

          <select
            value={state}
            onChange={(e) =>
              setState(e.target.value)
            }
          >
            <option value="All">
              All States
            </option>

            <option value="All India">
              All India
            </option>

            <option value="Maharashtra">
              Maharashtra
            </option>
          </select>

          <select
            value={education}
            onChange={(e) =>
              setEducation(e.target.value)
            }
          >
            <option value="All">
              All Education Levels
            </option>

            <option value="School">
              School
            </option>

            <option value="Undergraduate">
              Undergraduate
            </option>

            <option value="Postgraduate">
              Postgraduate
            </option>
          </select>
        </div>

        <h2>
          Available Opportunities
        </h2>

        {filteredOpportunities.length === 0 ? (
          <p>
            No scholarships or schemes found.
          </p>
        ) : (
          <div className="cards">
            {filteredOpportunities.map(
              (item) => (
                <div
                  className="card"
                  key={item.id}
                >
                  <small>
                    {item.type}
                  </small>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.description}
                  </p>

                  <p>
                    <strong>
                      State:
                    </strong>{" "}
                    {item.state}
                  </p>

                  <p>
                    <strong>
                      Education:
                    </strong>{" "}
                    {item.education}
                  </p>

                  <a
                    href={
                      item.type ===
                      "Scholarship"
                        ? `/scholarships/${item.id}`
                        : `/schemes/${item.id}`
                    }
                  >
                    <button type="button">
                      View Details
                    </button>
                  </a>
                </div>
              )
            )}
          </div>
        )}
      </section>

      <footer className="footer">
        © 2026 ScholarSeva — Discover. Check. Apply.
      </footer>
    </main>
  );
}

