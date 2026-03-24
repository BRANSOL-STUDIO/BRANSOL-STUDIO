"use client";

import Link from "next/link";
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
  avatarUrl?: string | null;
  color: string;
  projectCount?: number;
  joinedDate?: string | null;
};

const ACCESS_LABELS: Record<UserRole, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  client: "Client",
};

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

  const shown =
    filter === "studio"
      ? members.filter((m) => m.type === "studio")
      : filter === "clients"
        ? members.filter((m) => m.type === "client")
        : members;

  return (
    <>
      <header className="dashboard-page-header" style={{ marginBottom: 20 }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2 style={{ marginBottom: 4 }}>{members.length} Members</h2>
            <div
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: 11,
                color: "var(--text-ter)",
                letterSpacing: ".14em",
              }}
            >
              <span style={{ color: "var(--aqua)" }}>{onlineCount} online</span>
              {" · "}
              {studioCount} studio
              {" · "}
              {clientCount} clients
            </div>
          </div>
          <button type="button" className="dashboard-tb-btn primary">
            + Invite Admin
          </button>
        </div>
      </header>

      <div className="dashboard-members-tabs" style={{ marginBottom: 16 }}>
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

      <div className="dashboard-members-grid">
        {shown.length === 0 ? (
          <div className="dashboard-card boxed" style={{ gridColumn: "1 / -1" }}>
            <div className="dashboard-card-title" style={{ marginBottom: 8 }}>
              No members in this segment
            </div>
            <p style={{ color: "var(--text-sec)", fontSize: 13 }}>
              Switch filters or invite a new member to get started.
            </p>
          </div>
        ) : (
          shown.map((m) => (
            <Link
              key={m.id}
              href={`/admin/team/${m.id}`}
              className="dashboard-member-card-link"
            >
              <span className="dashboard-member-card-accent" style={{ background: m.color }} />
              <div className="dashboard-member-card-top">
                <div style={{ position: "relative", flexShrink: 0 }}>
                  {m.avatarUrl ? (
                    <img
                      src={m.avatarUrl}
                      alt=""
                      className="dashboard-member-avatar dashboard-member-avatar-lg"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      className="dashboard-member-avatar dashboard-member-avatar-lg"
                      style={{ background: m.color, opacity: 0.9 }}
                    >
                      {m.avatar}
                    </div>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="dashboard-member-name">{m.name || m.email || m.id}</div>
                  <div className="dashboard-member-email">{m.type === "studio" ? "Studio Team" : "Client User"}</div>
                </div>
                <span className={`dashboard-access-badge ${m.role}`}>
                  {ACCESS_LABELS[m.role]}
                </span>
              </div>

              <div className="dashboard-member-card-meta">
                {m.orgName ? (
                  <div className="dashboard-member-card-meta-row">
                    <span className="dashboard-member-card-k">Org</span>
                    <span className="dashboard-member-card-v">{m.orgName}</span>
                  </div>
                ) : null}
                <div className="dashboard-member-card-meta-row">
                  <span className="dashboard-member-card-k">Status</span>
                  <span className="dashboard-member-card-v">{m.type === "studio" ? "Studio active" : "Client active"}</span>
                </div>
                <div className="dashboard-member-card-meta-row">
                  <span className="dashboard-member-card-k">Projects</span>
                  <span className="dashboard-member-card-v">
                    {m.projectCount != null && m.projectCount > 0 ? `${m.projectCount}` : "—"}
                  </span>
                </div>
                <div className="dashboard-member-card-meta-row">
                  <span className="dashboard-member-card-k">Member since</span>
                  <span className="dashboard-member-card-v">{m.joinedDate ?? "—"}</span>
                </div>
              </div>

              <div className="dashboard-member-card-footer">
                <span>{m.email ?? "—"}</span>
                <span className="member-profile-row-arrow">›</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
}
