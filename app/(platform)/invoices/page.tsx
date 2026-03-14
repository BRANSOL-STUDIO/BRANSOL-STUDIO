import { createClient } from "@/lib/supabase/server";
import { BillingDocRow } from "@/components/platform/BillingDocRow";
import { fmtDate, fmtCurrency } from "@/lib/utils";

export default async function InvoicesPage() {
  const supabase = await createClient();
  const { data: invoices } = await supabase
    .from("invoices")
    .select("id, status, date, due_date")
    .order("date", { ascending: false });

  return (
    <div className="space-y-8">
      <h1
        className="text-2xl font-bold tracking-tight"
        style={{ fontFamily: "var(--font-syne)", color: "var(--text-pri)" }}
      >
        Invoices
      </h1>
      <ul className="space-y-2">
        {(invoices ?? []).map((inv) => (
          <li key={inv.id}>
            <BillingDocRow
              id={inv.id}
              type="invoice"
              status={inv.status}
              date={inv.date}
              dueDate={inv.due_date}
            />
          </li>
        ))}
      </ul>
      {(!invoices || invoices.length === 0) && (
        <p className="p-8 rounded-xl border border-dashed" style={{ color: "var(--text-ter)", borderColor: "var(--border)" }}>
          No invoices yet
        </p>
      )}
    </div>
  );
}
