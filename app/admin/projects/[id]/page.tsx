import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { fmtDate, fmtDueDate, getInitials, getAvatarColor } from "@/lib/utils";
import { ManageProjectTeam } from "@/components/admin/ManageProjectTeam";

export default async function AdminProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase
    .from("projects")
    .select("id, title, organisation_id, status, due_date, scope, progress, milestone, organisations(name)")
    .eq("id", id)
    .single();
  if (!project) notFound();

  const [{ data: deliverables }, { data: teamRows }, { data: studioProfiles }] = await Promise.all([
    supabase.from("deliverables").select("id, name, status, created_at").eq("project_id", id).order("created_at", { ascending: false }),
    supabase.from("project_team").select("profile_id").eq("project_id", id),
    supabase.from("profiles").select("id, name, email, avatar, role").or("role.eq.admin,role.eq.super_admin").order("name"),
  ]);

  const assignedProfileIds = (teamRows ?? []).map((r) => r.profile_id).filter(Boolean);
  const studioList = studioProfiles ?? [];
  const studioMembers = studioList.map((p) => ({
    id: p.id,
    name: p.name ?? null,
    email: p.email ?? null,
    avatar: p.avatar ?? null,
  }));
  const teamProfiles = studioList.filter((p) => assignedProfileIds.includes(p.id));

  const clientName = (project as unknown as { organisations?: { name: string } }).organisations?.name ?? "—";
  const dueLabel = fmtDueDate(project.due_date);

  return (
    <>
      <Link
        href="/admin/projects"
        className="dashboard-tbl-action"
        style={{ display: "inline-block", marginBottom: 16 }}
      >
        ← All Projects
      </Link>
      <header className="dashboard-page-header">
        <h2>{project.title}</h2>
        <p>{clientName} · {(project.status || "active").charAt(0).toUpperCase() + (project.status || "active").slice(1)} · Due {dueLabel}</p>
      </header>
      <div className="dashboard-card" style={{ marginBottom: 24 }}>
        <div className="dashboard-card-header">
          <span className="dashboard-card-title">Details</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
          <div>
            <div className="dashboard-client-meta" style={{ marginBottom: 4 }}>Scope</div>
            <p style={{ color: "var(--text-sec)", fontSize: 14 }}>{project.scope ?? "—"}</p>
          </div>
          <div>
            <div className="dashboard-client-meta" style={{ marginBottom: 4 }}>Progress</div>
            <p style={{ color: "var(--text-pri)", fontWeight: 600 }}>{project.progress ?? 0}%</p>
          </div>
          <div>
            <div className="dashboard-client-meta" style={{ marginBottom: 4 }}>Milestone</div>
            <p style={{ color: "var(--text-sec)", fontSize: 14 }}>{project.milestone ?? "—"}</p>
          </div>
        </div>
      </div>
      <div className="dashboard-card">
        <div className="dashboard-card-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <span className="dashboard-card-title">Project Team</span>
          <ManageProjectTeam
            projectId={id}
            projectTitle={project.title}
            assignedProfileIds={assignedProfileIds}
            studioMembers={studioMembers}
          />
        </div>
        <div style={{ padding: "12px 20px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
          {teamProfiles.length === 0 ? (
            <p style={{ fontSize: 12, color: "var(--text-ter)", padding: "4px 0" }}>No team members assigned yet.</p>
          ) : (
            teamProfiles.map((m, i) => (
              <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "rgba(255,255,255,.025)", border: "1px solid var(--glass-border)" }}>
                {m.avatar ? (
                  <img src={m.avatar} alt="" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                ) : (
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: getAvatarColor(studioList.findIndex((x) => x.id === m.id)),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: 9,
                      fontWeight: 700,
                      color: "#060608",
                      flexShrink: 0,
                    }}
                  >
                    {getInitials(m.name, m.email)}
                  </div>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: 12, fontWeight: 700, color: "var(--text-pri)" }}>{m.name || m.email || "—"}</div>
                  <div style={{ fontSize: 11, color: "var(--text-ter)" }}>{m.role ?? "Studio"}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <span className="dashboard-card-title">Deliverables</span>
          <Link href={`/admin/deliverables?project=${id}`} className="dashboard-tbl-action">
            View all →
          </Link>
        </div>
        {(deliverables ?? []).length === 0 ? (
          <p style={{ padding: 24, color: "var(--text-ter)", fontSize: 14 }}>No deliverables yet</p>
        ) : (
          (deliverables ?? []).slice(0, 10).map((d) => (
            <div key={d.id} className="dashboard-file-row">
              <div className="dashboard-file-icon">{d.name?.toUpperCase().includes("PDF") ? "📄" : "📦"}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="dashboard-file-name">{d.name}</div>
                <div className="dashboard-file-meta">{(d.status ?? "—").charAt(0).toUpperCase() + (d.status ?? "").slice(1)} · {fmtDate(d.created_at)}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
