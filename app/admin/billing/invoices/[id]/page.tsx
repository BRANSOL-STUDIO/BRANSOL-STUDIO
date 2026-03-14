import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { fmtDate, fmtCurrency } from "@/lib/utils";

export default async function AdminInvoiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: invoice } = await supabase
    .from("invoices")
    .select("*, invoice_items(*), organisations(name)")
    .eq("id", id)
    .single();
  if (!invoice) notFound();

  const items = (invoice as { invoice_items?: { name: string; quantity: number; rate: number }[] }).invoice_items ?? [];
  const total = items.reduce((sum, i) => sum + i.quantity * i.rate, 0);

  return (
    <div className="space-y-8">
      <Link href="/admin/billing" className="text-[10px] tracking-[0.2em] uppercase inline-block" style={{ color: "var(--text-ter)" }}>
        ← Billing
      </Link>
      <div>
        <h1 className="text-2xl font-bold font-mono" style={{ fontFamily: "var(--font-syne)", color: "var(--text-pri)" }}>
          {invoice.id}
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-sec)" }}>
          {(invoice as { organisations?: { name: string } }).organisations?.name} · {invoice.status}
        </p>
      </div>
      <div className="p-6 rounded-xl border" style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}>
        <p>Date: {fmtDate(invoice.date)}</p>
        <p>Due: {fmtDate(invoice.due_date)}</p>
        <ul className="mt-4 space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex justify-between text-sm">
              <span>{item.name} × {item.quantity}</span>
              <span>{fmtCurrency(item.rate * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-bold">Total: {fmtCurrency(total)}</p>
      </div>
    </div>
  );
}
