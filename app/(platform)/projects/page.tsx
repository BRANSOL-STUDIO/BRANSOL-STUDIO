import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { fmtDate } from "@/lib/utils";

function projCardStatusClass(status: string | null): string {
  const s = (status || "").toLowerCase();
  if (s === "active" || s === "in progress") return "s-active";
  if (s === "pending") return "s-pending";
  if (s === "review") return "s-review";
  if (s === "overdue") return "s-overdue";
  if (s === "completed" || s === "complete") return "s-complete";
  return "s-pending";
}

type Phase = { id: string; label: string; done: boolean; active: boolean };
type Project = {
  id: string;
  title: string;
  scope: string | null;
  status: string | null;
  progress: number;
  milestone: string | null;
  due_date: string | null;
  project_phases?: Phase[];
};

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("id, title, scope, status, progress, milestone, due_date, project_phases(id, label, done, active)")
    .order("created_at", { ascending: false });

  const list = (projects ?? []) as Project[];

  return (
    <div className="space-y-6">
      <header className="dashboard-page-header">
        <h2>Projects</h2>
        <p>Your active and upcoming commissions</p>
      </header>
      <div className="proj-filter-bar">
        <button type="button" className="proj-filter-btn active">All</button>
        <button type="button" className="proj-filter-btn">Active</button>
        <button type="button" className="proj-filter-btn">Pending</button>
        <button type="button" className="proj-filter-btn">Complete</button>
        <span className="proj-filter-sep" />
        <span className="proj-sort">Sort: Newest</span>
      </div>
      {list.map((p) => {
        const statusClass = projCardStatusClass(p.status);
        const phases = (p.project_phases ?? []).sort((a, b) => (a.label || "").localeCompare(b.label || ""));
        return (
          <Link key={p.id} href={`/projects/${p.id}`} className={`proj-card ${statusClass}`}>
            <div className="proj-accent" />
            <div className="proj-header">
              <div className="proj-title-block">
                <div className="proj-title">{p.title}</div>
                <div className="proj-client-tag">Project</div>
              </div>
              <div className="proj-meta-right">
                <span className="proj-status-badge">{p.status ? p.status.charAt(0).toUpperCase() + p.status.slice(1) : "Pending"}</span>
                <span className="proj-due">Due {p.due_date ? fmtDate(p.due_date) : "—"}</span>
              </div>
            </div>
            {p.scope && <div className="proj-scope">{p.scope.slice(0, 120)}{p.scope.length > 120 ? "…" : ""}</div>}
            <div className="proj-progress-wrap">
              <div className="proj-progress-label">
                <span className="proj-phase-name">{p.milestone || "Progress"}</span>
                <span className="proj-pct">{p.progress}%</span>
              </div>
              <div className="proj-track">
                <div className="proj-fill" style={{ width: `${p.progress}%` }} />
              </div>
            </div>
            {phases.length > 0 && (
              <div className="proj-phases">
                {phases.map((ph, i) => (
                  <div key={ph.id} className={`proj-phase-step ${ph.done ? "done" : ph.active ? "active" : "upcoming"}`}>
                    <div className="proj-phase-dot" />
                    <div className="proj-phase-label">{ph.label}</div>
                  </div>
                ))}
              </div>
            )}
            <div className="proj-footer">
              <div className="proj-foot-stat">
                <span className="proj-foot-label">Progress</span>
                <span className="proj-foot-val">{p.progress}%</span>
              </div>
              <div className="proj-foot-stat">
                <span className="proj-foot-label">Due</span>
                <span className="proj-foot-val">{p.due_date ? fmtDate(p.due_date) : "—"}</span>
              </div>
            </div>
          </Link>
        );
      })}
      {list.length === 0 && (
        <p className="py-8 text-sm" style={{ color: "var(--text-ter)" }}>No projects yet</p>
      )}
    </div>
  );
}