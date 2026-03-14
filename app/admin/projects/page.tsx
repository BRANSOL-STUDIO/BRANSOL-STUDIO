import { createClient } from "@/lib/supabase/server";
import { fmtDate } from "@/lib/utils";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("id, title, organisation_id, status, due_date, organisations(name)")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <h1
        className="text-2xl font-bold tracking-tight"
        style={{ fontFamily: "var(--font-syne)", color: "var(--text-pri)" }}
      >
        Projects
      </h1>
      <ul className="space-y-2">
        {(projects ?? []).map((p) => (
          <li
            key={p.id}
            className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border"
            style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}
          >
            <span style={{ color: "var(--text-pri)" }}>{p.title}</span>
            <div className="flex items-center gap-4 text-sm" style={{ color: "var(--text-sec)" }}>
              <span>{(p as unknown as { organisations?: { name: string } }).organisations?.name ?? "—"}</span>
              <span>{p.status}</span>
              <span>{fmtDate(p.due_date)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
