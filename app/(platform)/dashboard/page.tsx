import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { fmtDate } from "@/lib/utils";
import { getInitials, getAvatarColor } from "@/lib/utils";

function taskStatusClass(status: string): string {
  const s = (status || "").toLowerCase();
  if (s === "active" || s === "in progress") return "s-active";
  if (s === "pending") return "s-pending";
  if (s === "review") return "s-review";
  if (s === "overdue") return "s-overdue";
  if (s === "completed" || s === "complete" || s === "approved") return "s-complete";
  return "s-pending";
}

export default async function DashboardPage() {
  let projects: {
    id: string;
    title: string;
    status: string;
    progress: number;
    due_date: string | null;
    milestone: string | null;
  }[] = [];
  let deliverables: { id: string; name: string; status: string; created_at: string; file_type: string | null }[] = [];
  let filesCount = 0;
  let invoiceSummary: { totalPaid: number; pending: number; nextDue: string | null } = { totalPaid: 0, pending: 0, nextDue: null };
  let userName: string | null = null;
  let assignedTeam: { id: string; name: string | null; email: string | null; avatar: string | null; initials: string; color: string }[] = [];

  try {
    const supabase = await createClient();
    const authRes = await supabase.auth.getUser();
    const userId = authRes.data?.user?.id;
    userName = authRes.data?.user?.user_metadata?.full_name ?? authRes.data?.user?.email?.split("@")[0] ?? null;

    const { data: profile } = userId
      ? await supabase.from("profiles").select("organisation_id").eq("id", userId).maybeSingle()
      : { data: null };
    const orgId = profile?.organisation_id ?? null;

    const [projRes, delivRes, filesRes, invRes] = await Promise.all([
      orgId
        ? supabase
            .from("projects")
            .select("id, title, status, progress, due_date, milestone")
            .eq("organisation_id", orgId)
            .order("created_at", { ascending: false })
            .limit(10)
        : { data: [] },
      supabase
        .from("deliverables")
        .select("id, name, status, created_at, file_type")
        .order("created_at", { ascending: false })
        .limit(10),
      supabase.from("files").select("id", { count: "exact", head: true }),
      supabase
        .from("invoices")
        .select("id, status, due_date")
        .order("date", { ascending: false })
        .limit(20),
    ]);
    projects = (projRes.data ?? []) as typeof projects;
    deliverables = (delivRes.data ?? []) as typeof deliverables;
    filesCount = filesRes.count ?? 0;
    const invoices = invRes.data ?? [];
    const paidCount = invoices.filter((i) => i.status === "paid").length;
    const pendingInv = invoices.find((i) => i.status === "pending");
    invoiceSummary = {
      totalPaid: paidCount,
      pending: pendingInv ? 1 : 0,
      nextDue: pendingInv?.due_date ?? null,
    };

    if (orgId && projects.length > 0) {
      const projectIds = projects.map((p) => p.id);
      const { data: teamRows } = await supabase
        .from("project_team")
        .select("profile_id")
        .in("project_id", projectIds);
      const profileIds = Array.from(new Set((teamRows ?? []).map((r) => r.profile_id).filter(Boolean)));
      if (profileIds.length > 0) {
        const { data: teamProfiles } = await supabase
          .from("profiles")
          .select("id, name, email, avatar")
          .in("id", profileIds);
        assignedTeam = (teamProfiles ?? []).map((p, i) => ({
          id: p.id,
          name: p.name ?? null,
          email: p.email ?? null,
          avatar: p.avatar ?? null,
          initials: getInitials(p.name, p.email),
          color: getAvatarColor(i),
        }));
      }
    }
  } catch {
    // show empty state
  }

  const activeCount = projects.filter((p) => (p.status || "").toLowerCase() === "active" || (p.status || "").toLowerCase() === "in progress").length;
  const pendingReview = deliverables.filter((d) => (d.status || "").toLowerCase() === "review").length;
  const firstWord = userName ? userName.split(/\s+/)[0] : null;

  const activityPlaceholder = [
    { text: "Your projects and deliverables are synced with the studio.", time: "Just now" },
    { text: "Upload briefs and references in <strong>Files</strong> to get started.", time: "Today" },
  ];

  return (
    <div className="space-y-8">
      <header className="dashboard-page-header">
        <h2>Welcome back{firstWord ? `, ${firstWord}` : ""}.</h2>
        <p>Overview of your projects and deliverables</p>
      </header>

      <div className="dashboard-grid-4" style={{ marginBottom: 32 }}>
        <div className="dashboard-stat-card c-iris">
          <span className="dashboard-card-title" style={{ marginBottom: 10, display: "block" }}>Active Projects</span>
          <div className="dashboard-stat-val">{activeCount}</div>
          <div className="dashboard-stat-delta">↑ {projects.length} total</div>
        </div>
        <div className="dashboard-stat-card c-gold">
          <span className="dashboard-card-title" style={{ marginBottom: 10, display: "block" }}>Pending Approval</span>
          <div className="dashboard-stat-val">{pendingReview}</div>
          <div className="dashboard-stat-delta warn">{pendingReview ? "Awaiting your review" : "All caught up"}</div>
        </div>
        <div className="dashboard-stat-card c-aqua">
          <span className="dashboard-card-title" style={{ marginBottom: 10, display: "block" }}>Files Uploaded</span>
          <div className="dashboard-stat-val">{filesCount}</div>
          <div className="dashboard-stat-delta">By your team</div>
        </div>
        <div className="dashboard-stat-card c-rose">
          <span className="dashboard-card-title" style={{ marginBottom: 10, display: "block" }}>Next Invoice</span>
          <div className="dashboard-stat-val">{invoiceSummary.pending ? "—" : "—"}</div>
          <div className="dashboard-stat-delta warn">{invoiceSummary.nextDue ? `Due ${fmtDate(invoiceSummary.nextDue)}` : "View Invoices"}</div>
        </div>
      </div>

      <div className="dashboard-grid-2" style={{ marginBottom: 16 }}>
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <span className="dashboard-card-title">Active Projects</span>
            <Link href="/projects" className="dashboard-card-action">All projects →</Link>
          </div>
          {(projects ?? []).slice(0, 3).map((p) => (
            <Link key={p.id} href={`/projects/${p.id}`} className={`dashboard-task-row ${taskStatusClass(p.status)}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div className="dashboard-task-bar" />
              <div className="dashboard-task-body">
                <div className="dashboard-task-main">
                  <div className="dashboard-task-title">{p.title}</div>
                  <div className="dashboard-task-sub">
                    {p.milestone || p.status} · Due {p.due_date ? fmtDate(p.due_date) : "—"}
                  </div>
                  {p.progress > 0 && (
                    <div className="dashboard-progress-track" style={{ marginTop: 8, maxWidth: 260 }}>
                      <div className="dashboard-progress-fill" style={{ width: `${p.progress}%` }} />
                    </div>
                  )}
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div className="dashboard-task-status-label">{p.status || "Pending"}</div>
                  <div style={{ fontSize: 11, color: "var(--text-ter)", marginTop: 4 }}>{p.progress}%</div>
                </div>
              </div>
            </Link>
          ))}
          {(!projects || projects.length === 0) && (
            <p className="py-4 text-sm" style={{ color: "var(--text-ter)" }}>No projects yet</p>
          )}
        </div>
        {assignedTeam.length > 0 && (
          <div className="dashboard-card">
            <div className="dashboard-card-header">
              <span className="dashboard-card-title">Your Studio Team</span>
              <Link href="/team" className="dashboard-card-action">View all →</Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {assignedTeam.slice(0, 5).map((m) => (
                <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: "1px solid var(--glass-border)" }}>
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    {m.avatar ? (
                      <img src={m.avatar} alt="" style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: 28, height: 28, borderRadius: "50%", background: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-dm-mono), monospace", fontSize: 8, fontWeight: 700, color: "#060608" }}>
                        {m.initials}
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: 12, fontWeight: 700, color: "var(--text-pri)" }}>{m.name || m.email || "—"}</div>
                    <div style={{ fontSize: 11, color: "var(--text-ter)" }}>Studio</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <span className="dashboard-card-title">Recent Activity</span>
          </div>
          {activityPlaceholder.map((a, i) => (
            <div key={i} className="dashboard-activity-item">
              <div className="dashboard-activity-dot" />
              <div>
                <div className="dashboard-activity-text" dangerouslySetInnerHTML={{ __html: a.text }} />
                <div className="dashboard-activity-time">{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {pendingReview > 0 && (
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <span className="dashboard-card-title">Awaiting Your Approval</span>
            <Link href="/deliverables" className="dashboard-card-action">View all →</Link>
          </div>
          {deliverables
            .filter((d) => (d.status || "").toLowerCase() === "review")
            .slice(0, 5)
            .map((d) => (
              <div key={d.id} className={`dashboard-task-row s-review`} style={{ marginBottom: 6 }}>
                <div className="dashboard-task-bar" />
                <div className="dashboard-task-body">
                  <div className="dashboard-file-icon" style={{ marginRight: 4 }}>{d.file_type === "PDF" || (d.file_type || "").toUpperCase().includes("PDF") ? "📄" : "📦"}</div>
                  <div className="dashboard-task-main">
                    <div className="dashboard-task-title">{d.name}</div>
                    <div className="dashboard-task-sub">{d.file_type ?? "—"} · {fmtDate(d.created_at)}</div>
                  </div>
                  <div className="dashboard-task-status-label" style={{ marginRight: 12 }}>Review</div>
                  <Link href="/deliverables" className="dashboard-approve-btn">Approve</Link>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
