export default function Loading() {
  return (
    <main className="page-loading">
      <div className="page-loading-symbol">
        <span>✦</span>
      </div>

      <div className="page-loading-brand">ScholarSeva</div>

      <p className="page-loading-text">Finding scholarships for you...</p>

      <div className="page-loading-bar">
        <span />
      </div>
    </main>
  );
}