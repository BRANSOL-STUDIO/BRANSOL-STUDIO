import { createClient } from "@/lib/supabase/server";
import { fmtDate, fmtCurrency } from "@/lib/utils";

type InvoiceRow = {
  id: string;
  status: string;
  date: string | null;
  due_date: string | null;
  items?: { quantity: number; rate: number }[];
};

function totalFromItems(items: { quantity: number; rate: number }[] | undefined): number {
  if (!items?.length) return 0;
  return items.reduce((sum, i) => sum + i.quantity * i.rate, 0);
}

export default async function InvoicesPage() {
  const supabase = await createClient();
  const { data: invoices } = await supabase
    .from("invoices")
    .select("id, status, date, due_date, invoice_items(quantity, rate)")
    .order("date", { ascending: false });

  const rows = (invoices ?? []) as InvoiceRow[];
  const totalPaid = rows.filter((i) => i.status === "paid").reduce((s, i) => s + totalFromItems(i.items), 0);
  const pendingAmount = rows.filter((i) => i.status === "pending").reduce((s, i) => s + totalFromItems(i.items), 0);
  const paidCount = rows.filter((i) => i.status === "paid").length;
  const pendingCount = rows.filter((i) => i.status === "pending").length;

  return (
    <div className="space-y-6">
      <header className="dashboard-page-header">
        <h2>Invoices & Billing</h2>
        <p>View and pay your invoices</p>
      </header>
      <div className="dashboard-grid-3" style={{ marginBottom: 32 }}>
        <div className="dashboard-stat-card c-aqua">
          <span className="dashboard-card-title" style={{ marginBottom: 10, display: "block" }}>Total Paid</span>
          <div className="dashboard-stat-val">{totalPaid ? fmtCurrency(totalPaid) : "—"}</div>
          <div className="dashboard-stat-delta">{paidCount} invoice{paidCount !== 1 ? "s" : ""}</div>
        </div>
        <div className="dashboard-stat-card c-gold">
          <span className="dashboard-card-title" style={{ marginBottom: 10, display: "block" }}>Outstanding</span>
          <div className="dashboard-stat-val" style={pendingAmount ? { color: "var(--r3)" } : undefined}>
            {pendingAmount ? fmtCurrency(pendingAmount) : "—"}
          </div>
          <div className="dashboard-stat-delta warn">{pendingCount ? `${pendingCount} pending` : "All paid"}</div>
        </div>
        <div className="dashboard-stat-card c-iris">
          <span className="dashboard-card-title" style={{ marginBottom: 10, display: "block" }}>Invoices</span>
          <div className="dashboard-stat-val">{rows.length}</div>
          <div className="dashboard-stat-delta">Total issued</div>
        </div>
      </div>
      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <span className="dashboard-card-title">Invoice History</span>
        </div>
        {rows.map((inv) => {
          const amount = totalFromItems(inv.items);
          const isPaid = (inv.status || "").toLowerCase() === "paid";
          return (
            <div key={inv.id} className={`dashboard-inv-row ${isPaid ? "i-paid" : "i-pending"}`}>
              <div className="dashboard-inv-bar" />
              <div className="dashboard-inv-body">
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-pri)", marginBottom: 2 }}>
                    {inv.id}
                  </div>
                  <div className="dashboard-file-meta">{inv.date ? fmtDate(inv.date) : "—"}</div>
                </div>
                <div className="dashboard-inv-amount">{amount ? fmtCurrency(amount) : "—"}</div>
                <div style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: isPaid ? "var(--r4)" : "var(--r3)", width: 64, textAlign: "right" }}>
                  {isPaid ? "Paid" : "Pending"}
                </div>
                <div>
                  {isPaid ? (
                    <a href={`/api/invoices/${inv.id}/pdf`} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--iris)", cursor: "pointer", background: "none", border: "none", padding: 0, textDecoration: "none" }}>Download</a>
                  ) : (
                    <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-ter)" }}>Pay</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {rows.length === 0 && (
          <p className="py-4 text-sm" style={{ color: "var(--text-ter)" }}>No invoices yet</p>
        )}
      </div>
    </div>
  );
}
