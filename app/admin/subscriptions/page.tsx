import { createClient } from "@/lib/supabase/server";
import { fmtCurrency, fmtDate } from "@/lib/utils";

export default async function AdminSubscriptionsPage() {
  const supabase = await createClient();
  const { data: orgs } = await supabase
    .from("organisations")
    .select("id, name, tier, mrr, renewal_date")
    .not("tier", "is", null)
    .order("mrr", { ascending: false });

  return (
    <div className="space-y-8">
      <h1
        className="text-2xl font-bold tracking-tight"
        style={{ fontFamily: "var(--font-syne)", color: "var(--text-pri)" }}
      >
        Subscriptions
      </h1>
      <ul className="space-y-2">
        {(orgs ?? []).map((o) => (
          <li
            key={o.id}
            className="flex items-center justify-between gap-4 p-4 rounded-xl border"
            style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}
          >
            <span style={{ color: "var(--text-pri)" }}>{o.name}</span>
            <div className="flex items-center gap-4 text-sm" style={{ color: "var(--text-sec)" }}>
              <span>{o.tier}</span>
              <span>{o.mrr != null ? fmtCurrency(Number(o.mrr)) : "—"}</span>
              <span>{fmtDate(o.renewal_date)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
