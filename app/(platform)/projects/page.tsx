import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { fmtDate, getInitials, getAvatarColor } from "@/lib/utils";

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
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = user
    ? await supabase.from("profiles").select("organisation_id").eq("id", user.id).maybeSingle()
    : { data: null };
  const orgId = profile?.organisation_id ?? null;

  const { data: projects } = orgId
    ? await supabase
        .from("projects")
        .select("id, title, scope, status, progress, milestone, due_date, project_phases(id, label, done, active)")
        .eq("organisation_id", orgId)
        .order("created_at", { ascending: false })
    : { data: [] };

  const list = (projects ?? []) as Project[];
  const projectIds = list.map((p) => p.id);
  const { data: teamRows } = projectIds.length > 0
    ? await supabase.from("project_team").select("project_id, profile_id").in("project_id", projectIds)
    : { data: [] };
  const profileIds = Array.from(new Set((teamRows ?? []).map((r) => r.profile_id).filter(Boolean)));
  const { data: teamProfiles } = profileIds.length > 0
    ? await supabase.from("profiles").select("id, name, email, avatar").in("id", profileIds)
    : { data: [] };
  const teamByProject: Record<string, { name: string; initials: string; color: string }[]> = {};
  (teamRows ?? []).forEach((r) => {
    const pid = r.project_id;
    const uid = r.profile_id;
    if (!pid || !uid) return;
    const p = (teamProfiles ?? []).find((x) => x.id === uid);
    if (!p) return;
    if (!teamByProject[pid]) teamByProject[pid] = [];
    if (teamByProject[pid].some((t) => t.name === (p.name || p.email))) return;
    teamByProject[pid].push({
      name: p.name || p.email || "—",
      initials: getInitials(p.name, p.email),
      color: getAvatarColor(profileIds.indexOf(uid)),
    });
  });

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
              <div className="proj-foot-sep" />
              <div className="proj-foot-stat">
                <span className="proj-foot-label">Due</span>
                <span className="proj-foot-val">{p.due_date ? fmtDate(p.due_date) : "—"}</span>
              </div>
              {(teamByProject[p.id] ?? []).length > 0 && (
                <>
                  <div className="proj-foot-sep" />
                  <div className="proj-foot-stat proj-foot-team">
                    <span className="proj-foot-label">Team</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                      {(teamByProject[p.id] ?? []).map((t, i) => (
                        <div
                          key={i}
                          className="proj-avatar"
                          title={t.name}
                          style={{ background: t.color, color: "#060608" }}
                        >
                          {t.initials}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              <div style={{ marginLeft: 4, fontFamily: "var(--font-dm-mono), monospace", fontSize: 9, color: "var(--text-ter)", letterSpacing: "0.1em" }}>View →</div>
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