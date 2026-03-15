import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { fmtDate } from "@/lib/utils";
import { getInitials, getAvatarColor } from "@/lib/utils";
import { ProjectDrawer } from "@/components/platform/ProjectDrawer";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase
    .from("projects")
    .select("*, project_phases(*)")
    .eq("id", id)
    .single();
  if (!project) notFound();

  const { data: teamRows } = await supabase
    .from("project_team")
    .select("profile_id")
    .eq("project_id", id);
  const profileIds = Array.from(new Set((teamRows ?? []).map((r) => r.profile_id).filter(Boolean)));
  const { data: teamProfiles } = profileIds.length > 0
    ? await supabase.from("profiles").select("id, name, email, avatar").in("id", profileIds)
    : { data: [] };
  const teamMembers = (teamProfiles ?? []).map((p, i) => ({
    id: p.id,
    name: p.name ?? p.email ?? "—",
    email: p.email ?? "",
    avatar: p.avatar,
    initials: getInitials(p.name, p.email),
    color: getAvatarColor(i),
  }));

  return (
    <div className="space-y-8">
      <Link
        href="/projects"
        className="text-[10px] tracking-[0.2em] uppercase inline-block"
        style={{ color: "var(--text-ter)" }}
      >
        ← Projects
      </Link>
      <div className="flex flex-wrap justify-between items-start gap-4">
        <div>
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-syne)", color: "var(--text-pri)" }}
          >
            {project.title}
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-sec)" }}>
            {project.status} · {project.progress}% {project.due_date && `· Due ${fmtDate(project.due_date)}`}
          </p>
        </div>
      </div>
      {project.scope && (
        <div
          className="p-6 rounded-xl border"
          style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}
        >
          <h2 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-ter)" }}>
            Scope
          </h2>
          <p style={{ color: "var(--text-sec)" }}>{project.scope}</p>
        </div>
      )}
      <ProjectDrawer
        phases={(project as { project_phases?: { id: string; label: string; done: boolean; active: boolean }[] }).project_phases ?? []}
        projectId={project.id}
      />
      {teamMembers.length > 0 && (
        <div className="pd-section" style={{ marginTop: 24 }}>
          <div className="pd-label" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span>Project Team</span>
            <Link href="/team" className="dashboard-tbl-action" style={{ fontSize: 9, letterSpacing: "0.14em" }}>
              Your Team →
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {teamMembers.map((m) => (
              <div key={m.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "rgba(255,255,255,.025)", border: "1px solid var(--glass-border)" }}>
                {m.avatar ? (
                  <img src={m.avatar} alt="" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                ) : (
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-dm-mono), monospace", fontSize: 9, fontWeight: 700, color: "#060608", flexShrink: 0 }}>
                    {m.initials}
                  </div>
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: 12, fontWeight: 700, color: "var(--text-pri)" }}>{m.name}</div>
                  <div style={{ fontSize: 11, color: "var(--text-ter)" }}>Studio</div>
                </div>
                {m.email && (
                  <a href={`mailto:${m.email}`} style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 9, letterSpacing: "0.12em", padding: "5px 10px", border: "1px solid rgba(255,255,255,.1)", color: "var(--text-ter)", background: "none", cursor: "pointer", textDecoration: "none", borderRadius: 4 }}>
                    Message
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
