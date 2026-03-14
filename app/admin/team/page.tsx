import { createClient } from "@/lib/supabase/server";

export default async function AdminTeamPage() {
  const supabase = await createClient();
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, name, email, role")
    .in("role", ["admin", "super_admin"]);

  return (
    <div className="space-y-8">
      <h1
        className="text-2xl font-bold tracking-tight"
        style={{ fontFamily: "var(--font-syne)", color: "var(--text-pri)" }}
      >
        Team
      </h1>
      <ul className="space-y-2">
        {(profiles ?? []).map((p) => (
          <li
            key={p.id}
            className="flex items-center justify-between gap-4 p-4 rounded-xl border"
            style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}
          >
            <span style={{ color: "var(--text-pri)" }}>{p.name ?? p.email ?? p.id}</span>
            <span className="text-xs uppercase" style={{ color: "var(--text-ter)" }}>{p.role}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
