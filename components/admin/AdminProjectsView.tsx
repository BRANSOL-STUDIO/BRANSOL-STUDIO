"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export interface ProjectPhase {
  label: string;
  phase_date: string | null;
  done: boolean;
  active: boolean;
}

export interface AdminProjectCard {
  id: string;
  title: string;
  client: string;
  status: string;
  dueLabel: string;
  scope: string | null;
  progress: number;
  milestone: string | null;
  color: string;
  deliverables: number;
  approved: number;
  phases: ProjectPhase[];
  team: string[];
}

const FILTER_OPTIONS: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "review", label: "In Review" },
  { value: "overdue", label: "Overdue" },
];

const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: "client", label: "Sort: Client" },
  { value: "progress", label: "Sort: Progress" },
  { value: "due", label: "Sort: Due / Overdue" },
];

function statusLabel(s: string): string {
  if (s === "review") return "In Review";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function AdminProjectsView({
  projects,
  activeClientsCount,
}: {
  projects: AdminProjectCard[];
  activeClientsCount: number;
}) {
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("client");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: projects.length };
    FILTER_OPTIONS.slice(1).forEach(({ value }) => {
      c[value] = projects.filter((p) => (p.status || "").toLowerCase() === value).length;
    });
    return c;
  }, [projects]);

  const list = useMemo(() => {
    let out = filterStatus === "all" ? [...projects] : projects.filter((p) => (p.status || "").toLowerCase() === filterStatus);
    if (sortBy === "progress") out = [...out].sort((a, b) => b.progress - a.progress);
    else if (sortBy === "due") {
      out = [...out].sort((a, b) => {
        const aOverdue = a.dueLabel === "Overdue" ? 1 : 0;
        const bOverdue = b.dueLabel === "Overdue" ? 1 : 0;
        if (aOverdue !== bOverdue) return bOverdue - aOverdue;
        return a.dueLabel.localeCompare(b.dueLabel);
      });
    } else out = [...out].sort((a, b) => a.client.localeCompare(b.client));
    return out;
  }, [projects, filterStatus, sortBy]);

  return (
    <>
      <header className="dashboard-page-header" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <h2>All Projects</h2>
          <p>{list.length} project{list.length !== 1 ? "s" : ""} · {activeClientsCount} active clients</p>
        </div>
        <Link href="/admin/onboard" className="dashboard-tbl-action" style={{ padding: "8px 14px", border: "1px solid var(--iris)", borderRadius: 6 }}>
          + New Project
        </Link>
      </header>

      <div className="proj-filter-bar">
        {FILTER_OPTIONS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={`proj-filter-btn ${filterStatus === value ? "active" : ""}`}
            onClick={() => setFilterStatus(value)}
          >
            {label} <span style={{ opacity: 0.5 }}>{counts[value] ?? 0}</span>
          </button>
        ))}
        <div className="proj-filter-sep" />
        <select
          className="proj-sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          {SORT_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {list.length === 0 && (
        <div style={{ padding: 48, textAlign: "center", color: "var(--text-ter)", fontFamily: "var(--font-dm-mono), monospace", fontSize: 11, letterSpacing: "0.2em" }}>
          NO PROJECTS MATCH
        </div>
      )}

      {list.map((p) => (
        <Link
          key={p.id}
          href={`/admin/projects/${p.id}`}
          className={`proj-card s-${(p.status || "active").toLowerCase()}`}
        >
          <div className="proj-accent" style={{ background: p.color || "var(--iris)" }} />
          <div className="proj-header">
            <div className="proj-title-block">
              <div className="proj-title">{p.title}</div>
              <div className="proj-client-tag">{p.client}</div>
            </div>
            <div className="proj-meta-right">
              <div className="proj-status-badge">{statusLabel(p.status)}</div>
              <div className={`proj-due ${p.dueLabel === "Overdue" ? "overdue" : ""}`}>Due {p.dueLabel}</div>
            </div>
          </div>
          {p.scope && <div className="proj-scope">{p.scope}</div>}
          {p.progress > 0 ? (
            <div className="proj-progress-wrap">
              <div className="proj-progress-label">
                <span className="proj-phase-name">{p.milestone || "In progress"}</span>
                <span className="proj-pct">{p.progress}%</span>
              </div>
              <div className="proj-track"><div className="proj-fill" style={{ width: `${p.progress}%` }} /></div>
            </div>
          ) : (
            p.milestone && (
              <div style={{ padding: "0 22px 14px", color: "var(--text-ter)", fontFamily: "var(--font-dm-mono), monospace", fontSize: 9, letterSpacing: "0.14em" }}>
                {p.milestone}
              </div>
            )
          )}
          {p.phases.length > 0 && (
            <div className="proj-phases">
              {p.phases.map((ph, i) => {
                const cls = ph.done ? "done" : ph.active ? "active" : "upcoming";
                return (
                  <div key={i} className={`proj-phase-step ${cls}`}>
                    <div className="proj-phase-dot" />
                    <div className="proj-phase-label">{ph.label}</div>
                    <div className="proj-phase-date">{ph.phase_date || "—"}</div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="proj-footer">
            <div className="proj-foot-stat">
              <div className="proj-foot-label">Deliverables</div>
              <div className="proj-foot-val">{p.deliverables}</div>
            </div>
            <div className="proj-foot-sep" />
            <div className="proj-foot-stat">
              <div className="proj-foot-label">Approved</div>
              <div className="proj-foot-val" style={{ color: "var(--r4)" }}>{p.approved}</div>
            </div>
            <div className="proj-foot-sep" />
            <div className="proj-foot-stat">
              <div className="proj-foot-label">Team</div>
              <div className="proj-foot-team" style={{ marginTop: 2 }}>
                {p.team.length > 0 ? p.team.map((t, i) => (
                  <div key={i} className="proj-avatar" title={t}>{t}</div>
                )) : <span style={{ fontSize: 12, color: "var(--text-ter)" }}>—</span>}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
