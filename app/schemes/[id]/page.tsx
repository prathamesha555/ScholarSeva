import { opportunities } from "../../../data/opportunities";

export default async function SchemeDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const scheme = opportunities.find(
    (item) => item.id === Number(id) && item.type === "Government Scheme"
  );

  if (!scheme) {
    return (
      <main style={{ padding: "50px" }}>
        <h1>Government Scheme Not Found</h1>
        <p>The scheme you are looking for does not exist.</p>
      </main>
    );
  }

  return (
    <main>
      <nav className="navbar">
        <div className="logo">ScholarSeva</div>

        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/scholarships">Scholarships</a>
          <a href="/schemes">Government Schemes</a>
          <a href="/about">About</a>
        </div>
      </nav>

      <section className="section">
        <small>{scheme.type}</small>

        <h1>{scheme.title}</h1>

        <p>{scheme.description}</p>

        <br />

        <h2>Eligibility</h2>
        <p>{scheme.eligibility}</p>

        <h2>Benefits</h2>
        <p>{scheme.benefit}</p>

        <h2>Deadline</h2>
        <p>{scheme.deadline}</p>

        <h2>State</h2>
        <p>{scheme.state}</p>

        <br />

        <a
          href={scheme.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>Visit Official Website</button>
        </a>
      </section>

      <footer className="footer">
        © 2026 ScholarSeva — Discover. Check. Apply.
      </footer>
    </main>
  );
}