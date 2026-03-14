import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { fmtDate, fmtCurrency } from "@/lib/utils";

export default async function AdminQuoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: quote } = await supabase
    .from("quotes")
    .select("*, quote_items(*), organisations(name)")
    .eq("id", id)
    .single();
  if (!quote) notFound();

  const items = (quote as { quote_items?: { name: string; quantity: number; rate: number }[] }).quote_items ?? [];
  const total = items.reduce((sum, i) => sum + i.quantity * i.rate, 0);

  return (
    <div className="space-y-8">
      <Link href="/admin/billing" className="text-[10px] tracking-[0.2em] uppercase inline-block" style={{ color: "var(--text-ter)" }}>
        ← Billing
      </Link>
      <div>
        <h1 className="text-2xl font-bold font-mono" style={{ fontFamily: "var(--font-syne)", color: "var(--text-pri)" }}>
          {quote.id}
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-sec)" }}>
          {(quote as { organisations?: { name: string } }).organisations?.name} · {quote.status}
        </p>
      </div>
      <div className="p-6 rounded-xl border" style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}>
        <p>Date: {fmtDate(quote.date)}</p>
        <p>Valid until: {fmtDate(quote.valid_until)}</p>
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
