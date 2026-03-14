import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { fmtDate } from "@/lib/utils";

export default async function DashboardPage() {
  let projects: { id: string; title: string; status: string; progress: number; due_date: string | null }[] | null = null;
  let deliverables: { id: string; name: string; status: string; created_at: string }[] | null = null;

  try {
    const supabase = await createClient();
    const [projRes, delivRes] = await Promise.all([
      supabase
        .from("projects")
        .select("id, title, status, progress, due_date")
        .order("created_at", { ascending: false })
        .limit(5),
      supabase
        .from("deliverables")
        .select("id, name, status, created_at")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);
    projects = projRes.data ?? null;
    deliverables = delivRes.data ?? null;
  } catch {
    // Missing env or Supabase unreachable: show empty state instead of 500
  }

  return (
    <div className="space-y-10">
      <div>
        <h1
          className="text-2xl font-bold tracking-tight mb-1"
          style={{ fontFamily: "var(--font-syne)", color: "var(--text-pri)" }}
        >
          Dashboard
        </h1>
        <p style={{ color: "var(--text-sec)", fontSize: "14px" }}>
          Overview of your projects and deliverables
        </p>
      </div>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--text-ter)" }}>
            Recent projects
          </h2>
          <Link href="/projects" className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--iris)" }}>
            View all
          </Link>
        </div>
        <ul className="space-y-2">
          {(projects ?? []).map((p) => (
            <li key={p.id}>
              <Link
                href={`/projects/${p.id}`}
                className="block p-4 rounded-xl border transition-colors hover:border-[var(--border-hi)]"
                style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}
              >
                <span className="font-medium" style={{ color: "var(--text-pri)" }}>{p.title}</span>
                <span className="ml-2 text-xs" style={{ color: "var(--text-ter)" }}>{p.status} · {p.progress}%</span>
                {p.due_date && (
                  <span className="block text-xs mt-1" style={{ color: "var(--text-sec)" }}>Due {fmtDate(p.due_date)}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
        {(!projects || projects.length === 0) && (
          <p className="p-4 rounded-xl border border-dashed" style={{ color: "var(--text-ter)", borderColor: "var(--border)" }}>
            No projects yet
          </p>
        )}
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--text-ter)" }}>
            Recent deliverables
          </h2>
          <Link href="/deliverables" className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--iris)" }}>
            View all
          </Link>
        </div>
        <ul className="space-y-2">
          {(deliverables ?? []).map((d) => (
            <li key={d.id}>
              <Link
                href="/deliverables"
                className="block p-4 rounded-xl border transition-colors hover:border-[var(--border-hi)]"
                style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}
              >
                <span className="font-medium" style={{ color: "var(--text-pri)" }}>{d.name}</span>
                <span className="ml-2 text-xs" style={{ color: "var(--text-ter)" }}>{d.status}</span>
                <span className="block text-xs mt-1" style={{ color: "var(--text-sec)" }}>{fmtDate(d.created_at)}</span>
              </Link>
            </li>
          ))}
        </ul>
        {(!deliverables || deliverables.length === 0) && (
          <p className="p-4 rounded-xl border border-dashed" style={{ color: "var(--text-ter)", borderColor: "var(--border)" }}>
            No deliverables yet
          </p>
        )}
      </section>
    </div>
  );
}
