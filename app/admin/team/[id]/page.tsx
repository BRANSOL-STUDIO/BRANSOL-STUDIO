import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient, createServiceClient } from "@/lib/supabase/server";
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
  const service = createServiceClient();

  const { data: authData } = await supabase.auth.getUser();
  const currentUserId = authData?.user?.id;
  const currentProfile = currentUserId
    ? await service.from("profiles").select("role").eq("id", currentUserId).maybeSingle()
    : { data: null };
  const isSuperAdmin =
    (currentProfile.data?.role as string)?.toLowerCase() === "super_admin";

  const { data: profile } = await service
    .from("profiles")
    .select("id, name, email, role, organisation_id, created_at, avatar")
    .eq("id", id)
    .single();
  if (!profile) notFound();

  const studioRoles = ["admin", "super_admin"];
  const type = studioRoles.includes((profile.role as string) || "") ? "studio" : "client";

  let orgName: string | null = null;
  if (profile.organisation_id) {
    const { data: org } = await service
      .from("organisations")
      .select("name")
      .eq("id", profile.organisation_id)
      .single();
    orgName = org?.name ?? null;
  }

  const { data: teamRows } = await service
    .from("project_team")
    .select("project_id")
    .eq("profile_id", id);
  const projectIds = (teamRows ?? []).map((r) => r.project_id).filter(Boolean);
  const { data: projects } =
    projectIds.length > 0
      ? await service
          .from("projects")
          .select("id, title, status, progress, color, organisations(name)")
          .in("id", projectIds)
      : { data: [] };

  const memberProjects = projects ?? [];
  const memberProjectIds = memberProjects.map((p) => p.id).filter(Boolean) as string[];
  const { data: collaboratorRows } =
    memberProjectIds.length > 0
      ? await service
          .from("project_team")
          .select("profile_id")
          .in("project_id", memberProjectIds)
      : { data: [] };
  const collaboratorIds = Array.from(
    new Set(
      (collaboratorRows ?? [])
        .map((r) => r.profile_id)
        .filter((pid): pid is string => Boolean(pid && pid !== id))
    )
  );
  const { data: collaboratorProfiles } =
    collaboratorIds.length > 0
      ? await service
          .from("profiles")
          .select("id, name, email, role, avatar")
          .in("id", collaboratorIds)
      : { data: [] };

  const collaboratorMembers = (collaboratorProfiles ?? []).map((m, idx) => ({
    id: m.id as string,
    name: m.name as string | null,
    email: m.email as string | null,
    role: ((m.role as string | null) ?? "client").replace(/_/g, " "),
    avatar: m.avatar as string | null,
    initials: getInitials(m.name as string | null, m.email as string | null),
    color: [
      "var(--iris)",
      "var(--aqua)",
      "var(--violet)",
      "var(--gold)",
      "var(--sky)",
      "var(--ember)",
      "var(--rose)",
    ][idx % 7],
  }));
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
  const lastActive = "Now";
  const collaboratorCount = collaboratorMembers.length;
  const roleClass = ((profile.role as string | null) ?? "client").toLowerCase();
  const membershipTheme =
    roleClass === "super_admin"
      ? {
          tier: "OBSIDIAN",
          label: "Founding Member",
          bg: "#000000",
          orb: "radial-gradient(ellipse at 70% 0%,rgba(124,131,229,.38) 0%,transparent 55%)",
          orb2: "radial-gradient(ellipse at 20% 100%,rgba(6,214,160,.16) 0%,transparent 50%)",
          logo: "linear-gradient(120deg,#ff6b9d,#ffd166,#06d6a0,#7c83e5,#c77dff)",
          tierColor: "rgba(160,160,210,.16)",
          nameColor: "#d0d0e8",
          subColor: "rgba(180,180,220,.2)",
          numberColor: "rgba(200,200,240,.28)",
          rule: "linear-gradient(90deg,transparent,rgba(124,131,229,.55),rgba(199,125,255,.35),transparent)",
          shadow: "0 16px 32px rgba(0,0,0,.6)",
        }
      : roleClass === "admin"
        ? {
            tier: "GOLD",
            label: "Designer",
            bg: "#000000",
            orb: "radial-gradient(ellipse at 70% 0%,rgba(124,131,229,.38) 0%,transparent 55%)",
            orb2: "radial-gradient(ellipse at 20% 100%,rgba(6,214,160,.16) 0%,transparent 50%)",
            logo: "linear-gradient(120deg,#a06010,#ffd166,#f0c040,#c89020)",
            tierColor: "rgba(160,160,210,.16)",
            nameColor: "#d0d0e8",
            subColor: "rgba(180,180,220,.2)",
            numberColor: "rgba(200,155,40,.45)",
            rule: "linear-gradient(90deg,transparent,rgba(255,200,80,.6),rgba(200,130,20,.3),transparent)",
            shadow: "0 16px 32px rgba(0,0,0,.6)",
          }
        : {
            tier: "SILVER",
            label: "Member",
            bg: "#000000",
            orb: "radial-gradient(ellipse at 70% 0%,rgba(150,150,195,.28) 0%,transparent 55%)",
            orb2: "radial-gradient(ellipse at 20% 100%,rgba(80,80,130,.14) 0%,transparent 50%)",
            logo: "linear-gradient(120deg,#606080,#a8a8c8,#c8c8e0,#8080a0)",
            tierColor: "rgba(130,130,170,.16)",
            nameColor: "#9898b8",
            subColor: "rgba(140,140,180,.18)",
            numberColor: "rgba(150,150,195,.25)",
            rule: "linear-gradient(90deg,transparent,rgba(150,150,200,.5),rgba(110,110,160,.28),transparent)",
            shadow: "0 16px 32px rgba(0,0,0,.6)",
          };
  const idSeed = id.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const n1 = String(1000 + (idSeed % 9000)).padStart(4, "0");
  const n2 = String(2000 + ((idSeed * 7) % 8000)).padStart(4, "0");
  const n3 = String(idSeed % 10000).padStart(4, "0");
  const cardNumber = `BSL ${n1}  ${n2}  ${n3}`;
  const shortName =
    (profile.name || profile.email || "Member").length > 18
      ? (profile.name || profile.email || "Member")
          .split(" ")
          .map((word, idx) => (idx === 0 ? word : `${word[0]}.`))
          .join(" ")
      : profile.name || profile.email || "Member";

  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <Link
          href="/admin/team"
          className="dashboard-tb-btn"
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
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
              <h1 className="member-profile-name" style={{ marginBottom: 0 }}>
                {profile.name || profile.email || "—"}
              </h1>
              <span className={`dashboard-access-badge ${roleClass}`}>
                {ACCESS_LABELS[(profile.role as string) ?? "client"]}
              </span>
            </div>
            <div className="member-profile-role">
              {type === "studio" ? "Studio Team" : orgName ?? "Client"}
            </div>
            {orgName && type === "client" && (
              <div className="member-profile-org">{orgName}</div>
            )}
            <div className="member-profile-badges">
              <span className="member-profile-joined">Member since {joinedLabel}</span>
            </div>
            <div className="member-profile-meta-line">
              <span>{lastActive}</span>
              <span>·</span>
              <span>{profile.email ?? "—"}</span>
            </div>
          </div>
          <div className="member-profile-contact">
            <button type="button" className="dashboard-tb-btn primary">
              Send Message
            </button>
            {showAccessActions && (
              <button
                type="button"
                className="dashboard-tb-btn"
                style={{ marginTop: 8, width: "100%" }}
                disabled
              >
                Reset PW
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stat strip */}
      <div className="member-profile-stats">
        <div className="member-profile-stat">
          <div className="member-profile-stat-val">0</div>
          <div className="member-profile-stat-label">Total Logins</div>
        </div>
        <div className="member-profile-stat">
          <div className="member-profile-stat-val">{memberProjects.length}</div>
          <div className="member-profile-stat-label">Projects</div>
        </div>
        <div className="member-profile-stat">
          <div className="member-profile-stat-val">{lastActive}</div>
          <div className="member-profile-stat-label">Last Active</div>
        </div>
        <div className="member-profile-stat">
          <div className="member-profile-stat-val">{collaboratorCount}</div>
          <div className="member-profile-stat-label">Collaborators</div>
        </div>
      </div>

      {/* Main grid: Projects | Login activity | Account details */}
      <div className="member-profile-grid">
        <div className="member-profile-main">
          <div className="dashboard-card" style={{ padding: 0, overflow: "hidden" }}>
            <div className="member-profile-card-head">
              <span>Active Projects</span>
              <span style={{ color: "var(--iris)", fontFamily: "var(--font-dm-mono), monospace", fontSize: 12 }}>
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
        </div>

        <div className="member-profile-mid">
          <div className="dashboard-card" style={{ padding: 0, overflow: "hidden" }}>
            <div className="member-profile-card-head">
              <span>Login Activity</span>
              <span style={{ color: "var(--iris)", fontFamily: "var(--font-dm-mono), monospace", fontSize: 9 }}>
                0 sessions
              </span>
            </div>
            <div className="member-profile-activity-empty">
              Activity heatmap coming soon
            </div>
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
          <div className="member-membership-wrap">
          <div
            className="member-membership-card"
            style={{ background: membershipTheme.bg, boxShadow: membershipTheme.shadow }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: membershipTheme.orb,
              }}
              aria-hidden
            />
            <div style={{ position: "absolute", inset: 0, background: membershipTheme.orb2 }} aria-hidden />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(0,0,0,.5) 100%)",
              }}
              aria-hidden
            />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                padding: "16px 18px 14px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxSizing: "border-box",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-syne), sans-serif",
                      fontSize: 13,
                      fontWeight: 800,
                      letterSpacing: ".02em",
                      background: membershipTheme.logo,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      lineHeight: 1,
                    }}
                  >
                    BRANSOL
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: 6.5,
                      letterSpacing: ".3em",
                      textTransform: "uppercase",
                      color: membershipTheme.subColor,
                      marginTop: 3,
                    }}
                  >
                    Studio Platform
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-dm-mono), monospace",
                    fontSize: 6.5,
                    letterSpacing: ".38em",
                    textTransform: "uppercase",
                    color: membershipTheme.tierColor,
                    marginTop: 2,
                  }}
                >
                  {membershipTheme.tier}
                </div>
              </div>

              {roleClass === "client" ? (
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-dm-mono), monospace",
                      fontSize: 6,
                      letterSpacing: ".28em",
                      textTransform: "uppercase",
                      color: membershipTheme.subColor,
                      marginBottom: 4,
                    }}
                  >
                    Organisation
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-syne), sans-serif",
                      fontSize: 11,
                      fontWeight: 800,
                      letterSpacing: ".02em",
                      color: membershipTheme.nameColor,
                      lineHeight: 1.15,
                    }}
                  >
                    {(orgName || "BRANSOL Client").slice(0, 28)}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    fontFamily: "var(--font-dm-mono), monospace",
                    fontSize: 11,
                    fontWeight: 300,
                    letterSpacing: ".24em",
                    color: membershipTheme.numberColor,
                    textAlign: "center",
                  }}
                >
                  {cardNumber}
                </div>
              )}

              <div>
                <div style={{ height: 1, background: membershipTheme.rule, marginBottom: 9 }} />
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 6 }}>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div
                      style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        fontSize: 6,
                        letterSpacing: ".28em",
                        textTransform: "uppercase",
                        color: membershipTheme.subColor,
                        marginBottom: 3,
                      }}
                    >
                      {membershipTheme.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        fontSize: 9,
                        letterSpacing: ".1em",
                        color: membershipTheme.nameColor,
                        textTransform: "uppercase",
                        lineHeight: 1,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {shortName}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div
                      style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        fontSize: 6,
                        letterSpacing: ".24em",
                        textTransform: "uppercase",
                        color: membershipTheme.subColor,
                        marginBottom: 3,
                      }}
                    >
                      {roleClass === "client" ? "Client Since" : "Since"}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        fontSize: 8.5,
                        letterSpacing: ".1em",
                        color: membershipTheme.nameColor,
                        opacity: 0.6,
                      }}
                    >
                      {joinedLabel}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>

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

          {collaboratorMembers.length > 0 && (
            <div className="dashboard-card" style={{ padding: 0, overflow: "hidden" }}>
              <div className="member-profile-card-head">
                <span>Works With</span>
              </div>
              <div>
                {collaboratorMembers.map((m) => (
                  <Link
                    key={m.id}
                    href={`/admin/team/${m.id}`}
                    className="member-profile-collab-row"
                  >
                    <div className="member-profile-collab-avatar-wrap">
                      {m.avatar ? (
                        <img
                          src={m.avatar}
                          alt=""
                          className="member-profile-collab-avatar"
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <div
                          className="member-profile-collab-avatar"
                          style={{ background: m.color }}
                        >
                          {m.initials}
                        </div>
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="member-profile-collab-name">
                        {m.name || m.email || m.id}
                      </div>
                      <div className="member-profile-collab-role">{m.role}</div>
                    </div>
                    <span className="member-profile-collab-arrow">›</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

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
