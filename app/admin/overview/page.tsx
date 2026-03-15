import { createClient } from "@/lib/supabase/server";

export default async function AdminOverviewPage() {
  const supabase = await createClient();
  const [
    { count: orgCount },
    { count: projectCount },
    { count: clientCount },
    { count: teamCount },
  ] = await Promise.all([
    supabase.from("organisations").select("id", { count: "exact", head: true }),
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase.from("profiles").select("id", { count: "exact", head: true }).eq("role", "client"),
    supabase.from("profiles").select("id", { count: "exact", head: true }).in("role", ["admin", "super_admin"]),
  ]);

  const dateLabel = new Date().toLocaleDateString("en-ZA", { month: "long", year: "numeric" });

  return (
    <>
      <header className="dashboard-page-header">
        <h2>Studio Overview</h2>
        <p>BRANSOL · {dateLabel}</p>
      </header>
      <div className="dashboard-grid-4" style={{ marginBottom: 32 }}>
        <div className="dashboard-stat-card c-iris">
          <span className="dashboard-card-title" style={{ marginBottom: 10, display: "block" }}>Organisations</span>
          <div className="dashboard-stat-val chrome-text">{orgCount ?? 0}</div>
          <div className="dashboard-stat-delta">Clients</div>
        </div>
        <div className="dashboard-stat-card c-aqua">
          <span className="dashboard-card-title" style={{ marginBottom: 10, display: "block" }}>Active Projects</span>
          <div className="dashboard-stat-val">{projectCount ?? 0}</div>
          <div className="dashboard-stat-delta">Total</div>
        </div>
        <div className="dashboard-stat-card c-rose">
          <span className="dashboard-card-title" style={{ marginBottom: 10, display: "block" }}>Client Users</span>
          <div className="dashboard-stat-val">{clientCount ?? 0}</div>
          <div className="dashboard-stat-delta">Profiles</div>
        </div>
        <div className="dashboard-stat-card c-gold">
          <span className="dashboard-card-title" style={{ marginBottom: 10, display: "block" }}>Studio Team</span>
          <div className="dashboard-stat-val">{teamCount ?? 0}</div>
          <div className="dashboard-stat-delta">Admins & super admins</div>
        </div>
      </div>
    </>
  );
}
