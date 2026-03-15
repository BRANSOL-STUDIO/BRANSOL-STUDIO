import { createClient } from "@/lib/supabase/server";
import { getInitials, getAvatarColor } from "@/lib/utils";
import Link from "next/link";

export default async function ClientTeamPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("organisation_id")
    .eq("id", user.id)
    .maybeSingle();
  const orgId = profile?.organisation_id ?? null;
  if (!orgId) {
    return (
      <>
        <header className="dashboard-page-header">
          <h2>Your Team</h2>
          <p>No organisation linked to your account.</p>
        </header>
        <div className="dashboard-card" style={{ padding: 40, textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-ter)", marginBottom: 8 }}>No team</div>
          <p style={{ fontSize: 14, color: "var(--text-sec)" }}>Your BRANSOL team will appear here once you’re assigned to projects.</p>
        </div>
      </>
    );
  }

  const { data: projects } = await supabase
    .from("projects")
    .select("id, title, color")
    .eq("organisation_id", orgId);
  const projectIds = (projects ?? []).map((p) => p.id);
  if (projectIds.length === 0) {
    return (
      <>
        <header className="dashboard-page-header">
          <h2>Your Team</h2>
          <p>No team members have been assigned yet.</p>
        </header>
        <div className="dashboard-card" style={{ padding: 40, textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--text-ter)", marginBottom: 8 }}>Awaiting Assignment</div>
          <p style={{ fontSize: 14, color: "var(--text-sec)" }}>Your BRANSOL team will be assigned when your project kicks off.</p>
        </div>
      </>
    );
  }

  const { data: teamRows } = await supabase
    .from("project_team")
    .select("project_id, profile_id")
    .in("project_id", projectIds);
  const profileIds = Array.from(new Set((teamRows ?? []).map((r) => r.profile_id).filter(Boolean)));
  const { data: profiles } = profileIds.length > 0
    ? await supabase.from("profiles").select("id, name, email, avatar").in("id", profileIds)
    : { data: [] };

  const projectMap = new Map((projects ?? []).map((p) => [p.id, p]));
  const memberProjects: Record<string, string[]> = {};
  (teamRows ?? []).forEach((r) => {
    const pid = r.project_id;
    const uid = r.profile_id;
    if (!uid || !pid) return;
    const title = projectMap.get(pid)?.title;
    if (!title) return;
    if (!memberProjects[uid]) memberProjects[uid] = [];
    if (!memberProjects[uid].includes(title)) memberProjects[uid].push(title);
  });

  const teamEntries = (profiles ?? []).map((m, i) => ({
    id: m.id,
    name: m.name ?? m.email ?? "—",
    email: m.email ?? "",
    avatar: m.avatar,
    initials: getInitials(m.name, m.email),
    color: getAvatarColor(i),
    projectsOn: memberProjects[m.id] ?? [],
  }));

  return (
    <>
      <header className="dashboard-page-header" style={{ marginBottom: 24 }}>
        <h2>Your Team</h2>
        <p>
          {teamEntries.length} designer{teamEntries.length !== 1 ? "s" : ""} assigned
        </p>
      </header>

      <div className="client-team-grid">
        {teamEntries.map((m) => (
          <div key={m.id} className="client-team-card">
            <div className="client-team-card-accent" style={{ background: m.color }} />
            <div className="client-team-card-body">
              <div className="client-team-card-avatar-row">
                {m.avatar ? (
                  <img src={m.avatar} alt="" className="client-team-card-avatar" style={{ objectFit: "cover" }} />
                ) : (
                  <div className="client-team-card-avatar" style={{ background: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-dm-mono), monospace", fontSize: 13, fontWeight: 700, color: "#060608" }}>
                    {m.initials}
                  </div>
                )}
                <div className="client-team-card-identity">
                  <div className="client-team-card-name">{m.name}</div>
                  <div className="client-team-card-role">Studio</div>
                </div>
              </div>
              <div className="client-team-card-section">
                <div className="client-team-card-label">Assigned to</div>
                {m.projectsOn.map((title) => (
                  <div key={title} className="client-team-card-project-row">
                    <div className="client-team-card-project-bar" style={{ background: "var(--iris)" }} />
                    <span className="client-team-card-project-title">{title}</span>
                  </div>
                ))}
              </div>
              {m.email && (
                <a href={`mailto:${m.email}`} className="client-team-card-email">
                  {m.email}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="client-team-contact-note">
        <div className="client-team-contact-dot" />
        <p>All communication goes through your workspace. Use the feedback tools on each deliverable, or post a message in the project thread. Your team will respond within 48 hours.</p>
      </div>
    </>
  );
}
