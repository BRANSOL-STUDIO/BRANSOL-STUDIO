import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default async function AdminClientsPage() {
  const supabase = await createClient();
  const { data: orgs } = await supabase
    .from("organisations")
    .select("id, name, contact_name, email, status")
    .order("name");

  return (
    <div className="space-y-8">
      <h1
        className="text-2xl font-bold tracking-tight"
        style={{ fontFamily: "var(--font-syne)", color: "var(--text-pri)" }}
      >
        Clients
      </h1>
      <ul className="space-y-2">
        {(orgs ?? []).map((o) => (
          <li key={o.id}>
            <Link
              href={`/admin/clients/${o.id}`}
              className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border hover:border-[var(--border-hi)] transition-colors"
              style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}
            >
              <span className="font-medium" style={{ color: "var(--text-pri)" }}>{o.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-sm" style={{ color: "var(--text-sec)" }}>{o.contact_name ?? "—"}</span>
                <StatusBadge status={o.status} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {(!orgs || orgs.length === 0) && (
        <p className="p-8 rounded-xl border border-dashed" style={{ color: "var(--text-ter)", borderColor: "var(--border)" }}>
          No clients yet
        </p>
      )}
    </div>
  );
}
