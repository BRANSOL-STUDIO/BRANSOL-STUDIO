export default function AdminLoading() {
  return (
    <div className="admin-loading" aria-label="Loading">
      <div className="dashboard-page-header">
        <div className="admin-loading-line admin-loading-title" />
        <div className="admin-loading-line admin-loading-sub" />
      </div>
      <div className="dashboard-grid-4" style={{ marginBottom: 32 }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="dashboard-stat-card c-iris" style={{ borderColor: "var(--glass-border)" }}>
            <div className="admin-loading-line" style={{ width: "60%", marginBottom: 10 }} />
            <div className="admin-loading-line admin-loading-stat" />
            <div className="admin-loading-line" style={{ width: "40%", marginTop: 6 }} />
          </div>
        ))}
      </div>
      <div className="dashboard-card">
        <div className="admin-loading-line" style={{ width: "30%", marginBottom: 16 }} />
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="admin-loading-row" />
        ))}
      </div>
    </div>
  );
}
