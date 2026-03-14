"use client";

import { useState } from "react";
import type { UserRole } from "@/lib/types";

export type MemberForList = {
  id: string;
  name: string | null;
  email: string | null;
  role: UserRole;
  type: "studio" | "client";
  orgName: string | null;
  avatar: string;
  color: string;
  projectCount?: number;
};

const ACCESS_LABELS: Record<UserRole, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  client: "Client",
};

const COLORS = [
  "var(--iris)",
  "var(--aqua)",
  "var(--violet)",
  "var(--gold)",
  "var(--sky)",
  "var(--ember)",
  "var(--rose)",
];

function getColor(index: number) {
  return COLORS[index % COLORS.length];
}

function getInitials(name: string | null, email: string | null): string {
  if (name?.trim()) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0].slice(0, 2).toUpperCase();
  }
  if (email) return email.slice(0, 2).toUpperCase();
  return "??";
}

export function MembersView({
  members,
  studioCount,
  clientCount,
}: {
  members: MemberForList[];
  studioCount: number;
  clientCount: number;
}) {
  const [filter, setFilter] = useState<"all" | "studio" | "clients">("all");
  const onlineCount = 0; // placeholder until we have last_seen
  const totalLogins = 0; // placeholder until we have login_count

  const shown =
    filter === "studio"
      ? members.filter((m) => m.type === "studio")
      : filter === "clients"
        ? members.filter((m) => m.type === "client")
        : members;

  return (
    <>
      <header
        className="dashboard-page-header"
        style={{ marginBottom: 24 }}
      >
        <h2>Members</h2>
        <p>
          {members.length} members
          {" · "}
          <span style={{ color: "var(--aqua)" }}>{onlineCount} online now</span>
        </p>
      </header>

      <div className="dashboard-grid-4" style={{ marginBottom: 24 }}>
        <div className="dashboard-stat-card c-aqua">
          <div className="dashboard-card-title" style={{ marginBottom: 8 }}>Online Now</div>
          <div className="dashboard-stat-val" style={{ color: "var(--aqua)" }}>{onlineCount}</div>
          <div className="dashboard-stat-delta">Active in last 15 min</div>
        </div>
        <div className="dashboard-stat-card c-iris">
          <div className="dashboard-card-title" style={{ marginBottom: 8 }}>Studio Team</div>
          <div className="dashboard-stat-val">{studioCount}</div>
          <div className="dashboard-stat-delta">Admins & super admins</div>
        </div>
        <div className="dashboard-stat-card c-violet">
          <div className="dashboard-card-title" style={{ marginBottom: 8 }}>Client Users</div>
          <div className="dashboard-stat-val">{clientCount}</div>
          <div className="dashboard-stat-delta">Client accounts</div>
        </div>
        <div className="dashboard-stat-card c-gold">
          <div className="dashboard-card-title" style={{ marginBottom: 8 }}>Total Logins</div>
          <div className="dashboard-stat-val">{totalLogins}</div>
          <div className="dashboard-stat-delta">All time</div>
        </div>
      </div>

      <div className="dashboard-members-tabs">
        {(["all", "studio", "clients"] as const).map((f) => (
          <button
            key={f}
            type="button"
            className={`dashboard-members-tab ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f === "all" ? "All Members" : f === "studio" ? "Studio Team" : "Clients"}
            <span style={{ marginLeft: 6, fontSize: 9, color: filter === f ? "var(--iris)" : "var(--text-ter)" }}>
              {f === "all" ? members.length : f === "studio" ? studioCount : clientCount}
            </span>
          </button>
        ))}
      </div>

      <div className="dashboard-members-thead">
        <div style={{ width: 36, flexShrink: 0 }} />
        <div style={{ flex: 1 }}><span>Member</span></div>
        <div style={{ width: 180, flexShrink: 0 }}><span>Role</span></div>
        <div style={{ width: 140, flexShrink: 0 }}><span>Projects</span></div>
        <div style={{ width: 90, flexShrink: 0 }}><span>Access</span></div>
        <div style={{ width: 80, flexShrink: 0, marginLeft: 8 }} />
      </div>

      <div className="dashboard-card" style={{ padding: 0, overflow: "hidden" }}>
        {shown.map((m) => (
          <div key={m.id} className="dashboard-member-row">
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div
                className="dashboard-member-avatar"
                style={{ background: m.color, opacity: 0.9 }}
              >
                {m.avatar}
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="dashboard-member-name">{m.name || m.email || m.id}</div>
              <div className="dashboard-member-email">{m.email ?? "—"}</div>
            </div>
            <div style={{ width: 180, flexShrink: 0 }}>
              <div style={{ fontSize: 12, color: "var(--text-sec)", marginBottom: 2 }}>
                {m.type === "studio" ? "Studio" : "Client"}
              </div>
              {m.orgName && (
                <div style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 8, color: "var(--text-ter)", letterSpacing: "0.08em" }}>
                  {m.orgName}
                </div>
              )}
            </div>
            <div style={{ width: 140, flexShrink: 0 }}>
              <div style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 8, color: "var(--text-ter)" }}>
                {m.projectCount != null && m.projectCount > 0 ? `${m.projectCount} project(s)` : "—"}
              </div>
            </div>
            <div style={{ width: 90, flexShrink: 0 }}>
              <span className={`dashboard-access-badge ${m.role}`}>
                {ACCESS_LABELS[m.role]}
              </span>
            </div>
            <div style={{ flexShrink: 0, marginLeft: 8 }}>
              {m.type === "studio" && m.role !== "super_admin" ? (
                <select
                  className="dashboard-members-access-select"
                  defaultValue={m.role}
                  onChange={() => {}}
                  style={{
                    background: "rgba(255,255,255,.04)",
                    border: "1px solid var(--glass-border)",
                    color: "var(--text-ter)",
                    fontFamily: "var(--font-dm-mono), monospace",
                    fontSize: 8,
                    letterSpacing: "0.1em",
                    padding: "5px 8px",
                    cursor: "pointer",
                  }}
                >
                  <option value="admin">admin</option>
                  <option value="super_admin">super_admin</option>
                </select>
              ) : (
                <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 8, color: "var(--text-ter)" }}>
                  {m.type === "studio" ? "Owner" : "Client"}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
