import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { fmtDate } from "@/lib/utils";

function taskStatusClass(status: string | null): string {
  const s = (status || "").toLowerCase();
  if (s === "active" || s === "in progress") return "s-active";
  if (s === "pending") return "s-pending";
  if (s === "review") return "s-review";
  if (s === "overdue") return "s-overdue";
  if (s === "completed" || s === "complete") return "s-complete";
  return "s-pending";
}

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("id, title, scope, status, progress, milestone, due_date")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <header className="dashboard-page-header">
        <h2>Projects</h2>
        <p>Your active and upcoming commissions</p>
      </header>
      {(projects ?? []).map((p) => (
        <Link
          key={p.id}
          href={`/projects/${p.id}`}
          className={`dashboard-task-row ${taskStatusClass(p.status)}`}
          style={{ marginBottom: 10, alignItems: "stretch", textDecoration: "none", color: "inherit" }}
        >
          <div className="dashboard-task-bar" style={{ minHeight: "auto" }} />
          <div className="dashboard-task-body" style={{ flexDirection: "column", alignItems: "stretch", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <div>
                <div className="dashboard-task-title" style={{ fontSize: 15, marginBottom: 4 }}>{p.title}</div>
                <div className="dashboard-task-status-label">{p.status ? p.status.charAt(0).toUpperCase() + p.status.slice(1) : "Pending"}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div className="dashboard-file-meta">Due {p.due_date ? fmtDate(p.due_date) : "—"}</div>
              </div>
            </div>
            {p.milestone && (
              <div>
                <div style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 8, letterSpacing: "0.16em", color: "var(--text-ter)", marginBottom: 5 }}>CURRENT MILESTONE</div>
                <div style={{ fontSize: 13, color: "var(--text-sec)" }}>{p.milestone}</div>
              </div>
            )}
            {p.progress > 0 && (
              <div>
                <div style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 8, letterSpacing: "0.12em", color: "var(--text-ter)", marginBottom: 4 }}>PROGRESS · {p.progress}%</div>
                <div className="dashboard-progress-track">
                  <div className="dashboard-progress-fill" style={{ width: `${p.progress}%` }} />
                </div>
              </div>
            )}
          </div>
        </Link>
      ))}
      {(!projects || projects.length === 0) && (
        <p className="py-8 text-sm" style={{ color: "var(--text-ter)" }}>No projects yet</p>
      )}
    </div>
  );
}
