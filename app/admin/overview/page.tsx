import { createClient } from "@/lib/supabase/server";

export default async function AdminOverviewPage() {
  const supabase = await createClient();
  const { count: orgCount } = await supabase.from("organisations").select("id", { count: "exact", head: true });
  const { count: projectCount } = await supabase.from("projects").select("id", { count: "exact", head: true });

  return (
    <div className="space-y-8">
      <h1
        className="text-2xl font-bold tracking-tight"
        style={{ fontFamily: "var(--font-syne)", color: "var(--text-pri)" }}
      >
        Overview
      </h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div
          className="p-6 rounded-xl border"
          style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}
        >
          <p className="text-[10px] tracking-wider uppercase mb-2" style={{ color: "var(--text-ter)" }}>
            Organisations
          </p>
          <p className="text-3xl font-bold chrome-text">{orgCount ?? 0}</p>
        </div>
        <div
          className="p-6 rounded-xl border"
          style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}
        >
          <p className="text-[10px] tracking-wider uppercase mb-2" style={{ color: "var(--text-ter)" }}>
            Projects
          </p>
          <p className="text-3xl font-bold chrome-text">{projectCount ?? 0}</p>
        </div>
      </div>
    </div>
  );
}
