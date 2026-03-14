import { createClient } from "@/lib/supabase/server";
import { fmtDate } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default async function AdminDeliverablesPage() {
  const supabase = await createClient();
  const { data: deliverables } = await supabase
    .from("deliverables")
    .select("id, name, status, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <h1
        className="text-2xl font-bold tracking-tight"
        style={{ fontFamily: "var(--font-syne)", color: "var(--text-pri)" }}
      >
        Deliverables
      </h1>
      <ul className="space-y-2">
        {(deliverables ?? []).map((d) => (
          <li
            key={d.id}
            className="flex items-center justify-between gap-4 p-4 rounded-xl border"
            style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}
          >
            <span style={{ color: "var(--text-pri)" }}>{d.name}</span>
            <div className="flex items-center gap-4">
              <StatusBadge status={d.status} />
              <span className="text-xs" style={{ color: "var(--text-ter)" }}>{fmtDate(d.created_at)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
