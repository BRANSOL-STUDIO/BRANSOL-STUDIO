"use client";

interface Phase {
  id: string;
  label: string;
  done: boolean;
  active: boolean;
}

interface ProjectDrawerProps {
  phases: Phase[];
  projectId: string;
}

export function ProjectDrawer({ phases, projectId }: ProjectDrawerProps) {
  return (
    <div
      className="p-6 rounded-xl border"
      style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}
    >
      <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-ter)" }}>
        Phases
      </h2>
      <ul className="space-y-3">
        {phases.map((ph) => (
          <li
            key={ph.id}
            className="flex items-center gap-3 py-2"
          >
            <span
              className={`w-4 h-4 rounded-full border flex-shrink-0 ${
                ph.done ? "bg-[var(--r4)] border-[var(--r4)]" : "border-[var(--border-hi)]"
              }`}
            />
            <span style={{ color: ph.active ? "var(--text-pri)" : "var(--text-sec)" }}>
              {ph.label}
            </span>
            {ph.active && (
              <span className="text-[10px] uppercase tracking-wider" style={{ color: "var(--iris)" }}>
                Active
              </span>
            )}
          </li>
        ))}
      </ul>
      {phases.length === 0 && (
        <p className="text-sm" style={{ color: "var(--text-ter)" }}>No phases defined</p>
      )}
    </div>
  );
}
