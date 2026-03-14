import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminBillingPage() {
  const supabase = await createClient();
  const { data: invoices } = await supabase.from("invoices").select("id, status").order("created_at", { ascending: false }).limit(10);
  const { data: quotes } = await supabase.from("quotes").select("id, status").order("created_at", { ascending: false }).limit(10);

  return (
    <div className="space-y-8">
      <h1
        className="text-2xl font-bold tracking-tight"
        style={{ fontFamily: "var(--font-syne)", color: "var(--text-pri)" }}
      >
        Billing
      </h1>
      <div className="grid gap-8 md:grid-cols-2">
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-ter)" }}>
            Recent invoices
          </h2>
          <ul className="space-y-2">
            {(invoices ?? []).map((inv) => (
              <li key={inv.id}>
                <Link
                  href={`/admin/billing/invoices/${inv.id}`}
                  className="block p-3 rounded-lg border"
                  style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}
                >
                  {inv.id} · {inv.status}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-ter)" }}>
            Recent quotes
          </h2>
          <ul className="space-y-2">
            {(quotes ?? []).map((q) => (
              <li key={q.id}>
                <Link
                  href={`/admin/billing/quotes/${q.id}`}
                  className="block p-3 rounded-lg border"
                  style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}
                >
                  {q.id} · {q.status}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
