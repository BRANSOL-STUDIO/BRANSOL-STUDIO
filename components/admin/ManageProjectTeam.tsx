"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getInitials, getAvatarColor } from "@/lib/utils";
import { updateProjectTeam } from "@/app/actions/project-team";

export type StudioMember = { id: string; name: string | null; email: string | null; avatar: string | null };

type Props = {
  projectId: string;
  projectTitle: string;
  assignedProfileIds: string[];
  studioMembers: StudioMember[];
};

export function ManageProjectTeam({ projectId, projectTitle, assignedProfileIds, studioMembers }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set(assignedProfileIds));
  const [saving, setSaving] = useState(false);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProjectTeam(projectId, Array.from(selected));
      setOpen(false);
      router.refresh();
    } catch (e) {
      console.error(e);
      setSaving(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setSelected(new Set(assignedProfileIds));
        }}
        className="dashboard-tbl-action"
        style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 9, letterSpacing: "0.14em", padding: "5px 12px", border: "1px solid rgba(255,255,255,.1)", color: "var(--text-sec)", background: "rgba(255,255,255,.03)", cursor: "pointer", borderRadius: 4 }}
      >
        + Manage Team
      </button>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Manage project team"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0,0,0,.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div
            className="dashboard-card"
            style={{ width: "100%", maxWidth: 420, maxHeight: "85vh", overflow: "auto", padding: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="dashboard-card-header" style={{ padding: "16px 20px", borderBottom: "1px solid var(--glass-border)" }}>
              <span className="dashboard-card-title">Team — {projectTitle}</span>
            </div>
            <p style={{ fontSize: 13, color: "var(--text-ter)", margin: "0 20px 16px", fontFamily: "var(--font-dm-mono), monospace", letterSpacing: "0.08em" }}>
              Select studio members to assign to this project. Changes take effect immediately.
            </p>
            <div style={{ padding: "0 20px 16px", maxHeight: 320, overflowY: "auto" }}>
              {studioMembers.map((m, i) => {
                const assigned = selected.has(m.id);
                return (
                  <div
                    key={m.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => toggle(m.id)}
                    onKeyDown={(e) => e.key === "Enter" && toggle(m.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 14px",
                      border: `1px solid ${assigned ? "rgba(124,131,229,.35)" : "var(--glass-border)"}`,
                      background: assigned ? "rgba(124,131,229,.08)" : "rgba(255,255,255,.02)",
                      cursor: "pointer",
                      transition: "all .18s",
                      marginBottom: 6,
                    }}
                  >
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        border: `1px solid ${assigned ? "var(--iris)" : "var(--glass-border)"}`,
                        background: assigned ? "var(--iris)" : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {assigned && (
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="#060608" strokeWidth="1.5">
                          <path d="M1 4l2 2 4-4" />
                        </svg>
                      )}
                    </div>
                    {m.avatar ? (
                      <img src={m.avatar} alt="" style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                    ) : (
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: getAvatarColor(i),
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "var(--font-dm-mono), monospace",
                          fontSize: 8,
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
                      <div style={{ fontSize: 11, color: "var(--text-ter)" }}>{m.email ?? ""}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ padding: "12px 20px 20px", display: "flex", gap: 10, justifyContent: "flex-end", borderTop: "1px solid var(--glass-border)" }}>
              <button type="button" onClick={() => setOpen(false)} className="dashboard-tbl-action" style={{ padding: "8px 16px" }}>
                Cancel
              </button>
              <button type="button" onClick={handleSave} disabled={saving} className="dashboard-tbl-action" style={{ padding: "8px 16px", background: "var(--iris)", color: "#060608", borderColor: "var(--iris)" }}>
                {saving ? "Saving…" : "Save Assignment"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
