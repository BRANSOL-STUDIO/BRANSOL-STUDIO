import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getInitials } from "@/lib/utils";
import { fmtDate } from "@/lib/utils";

const ACCESS_LABELS: Record<string, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  client: "Client",
};

export default async function AdminMemberProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: authData } = await supabase.auth.getUser();
  const currentUserId = authData?.user?.id;
  const currentProfile = currentUserId
    ? await supabase.from("profiles").select("role").eq("id", currentUserId).maybeSingle()
    : { data: null };
  const isSuperAdmin =
    (currentProfile.data?.role as string)?.toLowerCase() === "super_admin";

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, name, email, role, organisation_id, created_at, avatar")
    .eq("id", id)
    .single();
  if (!profile) notFound();

  const studioRoles = ["admin", "super_admin"];
  const type = studioRoles.includes((profile.role as string) || "") ? "studio" : "client";

  let orgName: string | null = null;
  if (profile.organisation_id) {
    const { data: org } = await supabase
      .from("organisations")
      .select("name")
      .eq("id", profile.organisation_id)
      .single();
    orgName = org?.name ?? null;
  }

  const { data: teamRows } = await supabase
    .from("project_team")
    .select("project_id")
    .eq("profile_id", id);
  const projectIds = (teamRows ?? []).map((r) => r.project_id).filter(Boolean);
  const { data: projects } =
    projectIds.length > 0
      ? await supabase
          .from("projects")
          .select("id, title, status, progress, color, organisations(name)")
          .in("id", projectIds)
      : { data: [] };

  const memberProjects = projects ?? [];
  const colorIndex = Math.abs(id.split("").reduce((a, c) => a + c.charCodeAt(0), 0)) % 7;
  const avatarColor = [
    "var(--iris)",
    "var(--aqua)",
    "var(--violet)",
    "var(--gold)",
    "var(--sky)",
    "var(--ember)",
    "var(--rose)",
  ][colorIndex];
  const avatar = getInitials(profile.name, profile.email);
  const joinedLabel = profile.created_at ? fmtDate(profile.created_at) : "—";
  const showAccessActions = isSuperAdmin && (profile.role as string) !== "super_admin";

  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <Link
          href="/admin/team"
          className="dashboard-tbl-action"
          style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
        >
          ← All Members
        </Link>
      </div>

      {/* Profile hero — v7 */}
      <div className="member-profile-hero">
        <div
          className="member-profile-hero-orb"
          style={{ background: avatarColor }}
          aria-hidden
        />
        <div
          className="member-profile-hero-accent"
          style={{ background: avatarColor }}
          aria-hidden
        />
        <div className="member-profile-hero-inner">
          <div className="member-profile-avatar-wrap">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt=""
                className="member-profile-avatar"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <div
                className="member-profile-avatar"
                style={{ background: avatarColor }}
              >
                {avatar}
              </div>
            )}
          </div>
          <div className="member-profile-identity">
            <h1 className="member-profile-name">{profile.name || profile.email || "—"}</h1>
            <div className="member-profile-role">
              {type === "studio" ? "Studio Team" : orgName ?? "Client"}
            </div>
            {orgName && type === "client" && (
              <div className="member-profile-org">{orgName}</div>
            )}
            <div className="member-profile-badges">
              <span className={`dashboard-access-badge ${profile.role}`}>
                {ACCESS_LABELS[(profile.role as string) ?? "client"]}
              </span>
              <span className="member-profile-joined">Member since {joinedLabel}</span>
            </div>
          </div>
          <div className="member-profile-contact">
            <div className="member-profile-email">{profile.email ?? "—"}</div>
            <button type="button" className="member-profile-msg-btn" disabled>
              Send Message
            </button>
          </div>
        </div>
      </div>

      {/* Stat strip */}
      <div className="member-profile-stats">
        <div className="member-profile-stat">
          <div className="member-profile-stat-val">—</div>
          <div className="member-profile-stat-label">Total Logins</div>
        </div>
        <div className="member-profile-stat">
          <div className="member-profile-stat-val">{memberProjects.length}</div>
          <div className="member-profile-stat-label">Active Projects</div>
        </div>
        <div className="member-profile-stat">
          <div className="member-profile-stat-val">—</div>
          <div className="member-profile-stat-label">Last Active</div>
        </div>
        <div className="member-profile-stat">
          <div className="member-profile-stat-val">—</div>
          <div className="member-profile-stat-label">Recent Actions</div>
        </div>
      </div>

      {/* Main grid: Projects + Activity | Account details */}
      <div className="member-profile-grid">
        <div className="member-profile-main">
          <div className="dashboard-card" style={{ padding: 0, overflow: "hidden" }}>
            <div className="member-profile-card-head">
              <span>Active Projects</span>
              <span style={{ color: "var(--iris)", fontFamily: "var(--font-dm-mono), monospace", fontSize: 9 }}>
                {memberProjects.length}
              </span>
            </div>
            {memberProjects.length > 0 ? (
              memberProjects.map((p) => {
                const clientName = (p as unknown as { organisations?: { name: string } }).organisations?.name ?? "—";
                const color = (p.color as string) || "var(--iris)";
                return (
                  <Link
                    key={p.id}
                    href={`/admin/projects/${p.id}`}
                    className="member-profile-project-row"
                  >
                    <div className="member-profile-project-bar" style={{ background: color }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="member-profile-project-title">{p.title}</div>
                      <div className="member-profile-project-meta">{clientName}</div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div className="member-profile-project-pct" style={{ color }}>{p.progress ?? 0}%</div>
                      <div className="member-profile-project-meta">complete</div>
                    </div>
                    <div style={{ width: 80, flexShrink: 0 }}>
                      <div className="member-profile-progress-track">
                        <div className="member-profile-progress-fill" style={{ width: `${p.progress ?? 0}%`, background: color }} />
                      </div>
                    </div>
                    <span style={{ color: "var(--text-ter)", fontSize: 14 }}>›</span>
                  </Link>
                );
              })
            ) : (
              <div className="member-profile-empty">No active projects</div>
            )}
          </div>

          <div className="dashboard-card" style={{ padding: 0, overflow: "hidden" }}>
            <div className="member-profile-card-head">
              <span>Recent Activity</span>
            </div>
            <div className="member-profile-activity-empty">
              Activity log coming soon
            </div>
          </div>
        </div>

        <aside className="member-profile-sidebar">
          <div className="dashboard-card" style={{ padding: 0, overflow: "hidden" }}>
            <div className="member-profile-card-head">
              <span>Account Details</span>
            </div>
            <div className="member-profile-details-list">
              {[
                ["Email", profile.email ?? "—"],
                ["Type", type === "studio" ? "Studio Team" : "Client User"],
                ["Access", (profile.role as string)?.replace("_", " ") ?? "—"],
                ["Joined", joinedLabel],
                ["Logins", "—"],
                ["Last seen", "—"],
              ].map(([label, val]) => (
                <div key={String(label)} className="member-profile-detail-row">
                  <span className="member-profile-detail-label">{label}</span>
                  <span className="member-profile-detail-val">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {showAccessActions && (
            <>
              <div className="dashboard-card" style={{ padding: 0, overflow: "hidden" }}>
                <div className="member-profile-card-head">
                  <span>Access Level</span>
                </div>
                <div style={{ padding: 16 }}>
                  <p style={{ fontSize: 11, color: "var(--text-ter)" }}>
                    Change access from the Members list.
                  </p>
                </div>
              </div>
              <div className="dashboard-card member-profile-danger" style={{ padding: 0, overflow: "hidden" }}>
                <div className="member-profile-card-head member-profile-danger-head">
                  <span>Account Actions</span>
                </div>
                <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                  <button type="button" className="member-profile-action-btn" disabled>Send Password Reset</button>
                  <button type="button" className="member-profile-action-btn danger" disabled>Suspend Account</button>
                  {type !== "studio" && (
                    <button type="button" className="member-profile-action-btn danger" disabled>Remove Account</button>
                  )}
                </div>
              </div>
            </>
          )}
        </aside>
      </div>
    </>
  );
}
