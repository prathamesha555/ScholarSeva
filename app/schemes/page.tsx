import { opportunities } from "../../data/opportunities";

export default function Schemes() {
  const schemes = opportunities.filter(
    (item) => item.type === "Government Scheme"
  );

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

      <section className="hero">
        <h1>Government Schemes</h1>

        <p>
          Discover government schemes and support programs that may be
          available to you.
        </p>
      </section>

      <section className="section">
        <h2>Available Government Schemes</h2>

        <div className="cards">
          {schemes.map((item) => (
            <div className="card" key={item.id}>
              <small>{item.state}</small>

              <h3>{item.title}</h3>

              <p>{item.description}</p>

              <p>
                <strong>Benefit:</strong> {item.benefit}
              </p>

              <p>
                <strong>Deadline:</strong> {item.deadline}
              </p>

              <a href={`/schemes/${item.id}`}>
                <button>View Details</button>
              </a>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        © 2026 ScholarSeva — Discover. Check. Apply.
      </footer>
    </main>
  );
}