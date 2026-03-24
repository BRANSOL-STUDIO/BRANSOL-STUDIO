import type { CSSProperties } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { fmtDate } from "@/lib/utils";
import { BillingToolbar } from "@/components/admin/BillingToolbar";

type BillingTab = "all" | "invoices" | "quotes";

/** Match prototype: ZAR with 2 decimals (narrow space may appear per locale). */
function fmtBillingZAR(amount: number): string {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function statusLabel(status: string | null | undefined): string {
  const s = (status ?? "").toLowerCase();
  if (s === "paid") return "Paid";
  if (s === "pending") return "Pending";
  if (s === "open") return "Open";
  if (s === "accepted") return "Accepted";
  if (s === "declined") return "Declined";
  if (s === "expired") return "Expired";
  return status ?? "Unknown";
}

function statusTone(status: string | null | undefined): {
  color: string;
  background: string;
  border: string;
} {
  const s = (status ?? "").toLowerCase();
  if (s === "paid") {
    return {
      color: "var(--r4)",
      background: "rgba(6,214,160,.08)",
      border: "rgba(6,214,160,.25)",
    };
  }
  if (s === "pending") {
    return {
      color: "var(--r3)",
      background: "rgba(255,209,102,.08)",
      border: "rgba(255,209,102,.25)",
    };
  }
  if (s === "open") {
    return {
      color: "var(--iris)",
      background: "rgba(124,131,229,.08)",
      border: "rgba(124,131,229,.25)",
    };
  }
  if (s === "accepted") {
    return {
      color: "var(--r4)",
      background: "rgba(6,214,160,.08)",
      border: "rgba(6,214,160,.25)",
    };
  }
  if (s === "declined") {
    return {
      color: "var(--rose)",
      background: "rgba(255,107,157,.08)",
      border: "rgba(255,107,157,.25)",
    };
  }
  return {
    color: "var(--text-ter)",
    background: "rgba(255,255,255,.03)",
    border: "var(--glass-border)",
  };
}

export default async function AdminBillingPage({
  searchParams,
}: {
  searchParams?: Promise<{ tab?: string }>;
}) {
  const supabase = await createClient();
  const params = searchParams ? await searchParams : {};
  const requestedTab = (params.tab ?? "all") as BillingTab;
  const tab: BillingTab =
    requestedTab === "invoices" || requestedTab === "quotes" ? requestedTab : "all";

  const [{ data: invoices }, { data: quotes }] = await Promise.all([
    supabase
      .from("invoices")
      .select("id, status, date, due_date, organisations(name), invoice_items(quantity, rate, name)")
      .order("date", { ascending: false })
      .limit(50),
    supabase
      .from("quotes")
      .select("id, status, date, valid_until, organisations(name), quote_items(quantity, rate, name)")
      .order("date", { ascending: false })
      .limit(50),
  ]);

  type BillingDoc = {
    id: string;
    type: "invoice" | "quote";
    status: string | null;
    description: string;
    client: string;
    amount: number;
    date: string | null;
    dueLabel: string;
    href: string;
  };

  const invoiceDocs: BillingDoc[] = (invoices ?? []).map((inv) => {
    const items =
      ((
        inv as unknown as {
          invoice_items?: { quantity: number | null; rate: number | null; name?: string | null }[];
        }
      ).invoice_items ?? []);
    const amount = items.reduce(
      (sum, item) => sum + Number(item.quantity ?? 0) * Number(item.rate ?? 0),
      0
    );
    return {
      id: inv.id as string,
      type: "invoice",
      status: inv.status as string | null,
      description: items[0]?.name ?? "Invoice document",
      client:
        ((inv as unknown as { organisations?: { name?: string | null } }).organisations?.name as string | undefined) ??
        "—",
      amount,
      date: (inv as { date?: string | null }).date ?? null,
      dueLabel: fmtDate((inv as { due_date?: string | null }).due_date ?? null),
      href: `/admin/billing/invoices/${inv.id}`,
    };
  });

  const quoteDocs: BillingDoc[] = (quotes ?? []).map((q) => {
    const items =
      ((
        q as unknown as {
          quote_items?: { quantity: number | null; rate: number | null; name?: string | null }[];
        }
      ).quote_items ?? []);
    const amount = items.reduce(
      (sum, item) => sum + Number(item.quantity ?? 0) * Number(item.rate ?? 0),
      0
    );
    return {
      id: q.id as string,
      type: "quote",
      status: q.status as string | null,
      description: items[0]?.name ?? "Quote document",
      client:
        ((q as unknown as { organisations?: { name?: string | null } }).organisations?.name as string | undefined) ??
        "—",
      amount,
      date: (q as { date?: string | null }).date ?? null,
      dueLabel: fmtDate((q as { valid_until?: string | null }).valid_until ?? null),
      href: `/admin/billing/quotes/${q.id}`,
    };
  });

  const pendingInvoices = invoiceDocs.filter((d) => (d.status ?? "").toLowerCase() === "pending");
  const paidInvoices = invoiceDocs.filter((d) => (d.status ?? "").toLowerCase() === "paid");
  const openQuotes = quoteDocs.filter((d) => (d.status ?? "").toLowerCase() === "open");
  const acceptedQuotes = quoteDocs.filter((d) => (d.status ?? "").toLowerCase() === "accepted");
  const totalBilled = invoiceDocs.reduce((sum, d) => sum + d.amount, 0);
  const totalPaid = paidInvoices.reduce((sum, d) => sum + d.amount, 0);
  const totalPending = pendingInvoices.reduce((sum, d) => sum + d.amount, 0);
  const totalQuoted = quoteDocs.reduce((sum, d) => sum + d.amount, 0);
  const paidPct =
    totalBilled > 0 ? Math.round((totalPaid / totalBilled) * 100) : 0;
  const outPct = totalBilled > 0 ? 100 - paidPct : 0;

  const docs =
    tab === "invoices"
      ? invoiceDocs
      : tab === "quotes"
        ? quoteDocs
        : [...invoiceDocs, ...quoteDocs].sort(
            (a, b) => new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime()
          );

  return (
    <>
      <header className="billing-page-header">
        <div>
          <h2
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: "-.03em",
              marginBottom: 3,
            }}
          >
            Billing
          </h2>
          <div
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: 11,
              color: "var(--text-ter)",
              letterSpacing: ".14em",
            }}
          >
            {invoiceDocs.length} invoices · {quoteDocs.length} quotes
          </div>
        </div>
        <BillingToolbar />
      </header>

      <div className="billing-kpi-grid">
        <div className="billing-kpi-card">
          <div className="billing-kpi-label">Total Billed</div>
          <div className="billing-kpi-value">{fmtBillingZAR(totalBilled)}</div>
          <div className="billing-kpi-sub">{invoiceDocs.length} invoices raised</div>
        </div>
        <div className="billing-kpi-card">
          <div className="billing-kpi-label">Collected</div>
          <div className="billing-kpi-value" style={{ color: "var(--r4)" }}>
            {fmtBillingZAR(totalPaid)}
          </div>
          <div className="billing-kpi-sub">{paidPct}% of billed</div>
        </div>
        <div className="billing-kpi-card">
          <div className="billing-kpi-label">Outstanding</div>
          <div
            className="billing-kpi-value"
            style={{ color: totalPending > 0 ? "var(--r3)" : "var(--text-ter)" }}
          >
            {fmtBillingZAR(totalPending)}
          </div>
          <div className="billing-kpi-sub">{pendingInvoices.length} pending</div>
        </div>
        <div className="billing-kpi-card">
          <div className="billing-kpi-label">Open Quotes</div>
          <div className="billing-kpi-value" style={{ color: "var(--iris)" }}>
            {fmtBillingZAR(totalQuoted)}
          </div>
          <div className="billing-kpi-sub">
            {openQuotes.length} open · {acceptedQuotes.length} accepted
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            height: 3,
            background: "var(--glass-border)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${paidPct}%`,
              background: "var(--r4)",
              borderRadius: 2,
              transition: "width .6s cubic-bezier(.16,1,.3,1)",
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          <span className="billing-progress-label" style={{ color: "var(--r4)" }}>
            {paidPct}% collected
          </span>
          <span className="billing-progress-label">{outPct}% outstanding</span>
        </div>
      </div>

      <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
        {[
          { key: "all", label: "All", count: null },
          { key: "invoices", label: "Invoices", count: invoiceDocs.length },
          { key: "quotes", label: "Quotes", count: quoteDocs.length },
        ].map((tabItem) => {
          const active = tab === tabItem.key;
          return (
            <Link
              key={tabItem.key}
              href={tabItem.key === "all" ? "/admin/billing" : `/admin/billing?tab=${tabItem.key}`}
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: 11,
                letterSpacing: ".2em",
                textTransform: "uppercase",
                padding: "8px 16px",
                border: `1px solid ${active ? "rgba(124,131,229,.4)" : "var(--glass-border)"}`,
                background: active ? "rgba(124,131,229,.1)" : "transparent",
                color: active ? "var(--iris)" : "var(--text-ter)",
                textDecoration: "none",
              }}
            >
              {tabItem.label}
              {tabItem.count != null ? (
                <span style={{ opacity: 0.6 }}> {tabItem.count}</span>
              ) : null}
            </Link>
          );
        })}
      </div>

      <div className="billing-table-scroll">
        <div className="billing-table-inner">
          {docs.length > 0 ? (
            <>
          <div className="billing-table-head-row">
            {["Ref", "Description", "Client", "Amount", "Status", ""].map((h) => (
              <div key={h || "actions"} className="billing-table-head">
                {h}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {docs.map((d) => {
              const tone = statusTone(d.status);
              const statusNorm = (d.status ?? "").toLowerCase();
              const actionBtn: CSSProperties = {
                padding: "5px 10px",
                fontSize: 10,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              };
              return (
                <div key={`${d.type}-${d.id}`} className="billing-row-wrap">
                  <Link href={d.href} style={{ display: "contents" }} aria-label={`Open ${d.id}`}>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 3 }}>
                      <div className="billing-ref">{d.id}</div>
                      <div style={{ display: "inline-flex" }}>
                        <span
                          style={{
                            fontFamily: "var(--font-dm-mono), monospace",
                            fontSize: 9,
                            letterSpacing: ".16em",
                            textTransform: "uppercase",
                            padding: "2px 7px",
                            color: d.type === "invoice" ? "var(--iris)" : "var(--teal)",
                            border: `1px solid ${
                              d.type === "invoice"
                                ? "rgba(124,131,229,.25)"
                                : "rgba(78,205,196,.25)"
                            }`,
                            background:
                              d.type === "invoice"
                                ? "rgba(124,131,229,.06)"
                                : "rgba(78,205,196,.06)",
                          }}
                        >
                          {d.type === "invoice" ? "INV" : "QUO"}
                        </span>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: 3,
                        paddingRight: 12,
                        minWidth: 0,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 13,
                          color: "var(--text-pri)",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {d.description}
                      </div>
                      <div className="billing-row-sub">
                        {fmtDate(d.date)}
                        {d.dueLabel !== "—" ? ` · Due ${d.dueLabel}` : ""}
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", paddingRight: 12, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 12,
                          color: "var(--text-sec)",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {d.client}
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          fontFamily: "var(--font-syne), sans-serif",
                          fontSize: 14,
                          fontWeight: 700,
                          letterSpacing: "-.02em",
                        }}
                      >
                        {fmtBillingZAR(d.amount)}
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                      <span
                        style={{
                          fontFamily: "var(--font-dm-mono), monospace",
                          fontSize: 9,
                          letterSpacing: ".18em",
                          textTransform: "uppercase",
                          padding: "3px 8px",
                          color: tone.color,
                          border: `1px solid ${tone.border}`,
                          background: tone.background,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {statusLabel(d.status)}
                      </span>
                    </div>
                  </Link>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      justifyContent: "flex-end",
                      flexWrap: "wrap",
                    }}
                  >
                    {d.type === "invoice" && statusNorm === "pending" ? (
                      <span
                        className="dashboard-tb-btn"
                        style={{
                          ...actionBtn,
                          color: "var(--r4)",
                          borderColor: "rgba(6,214,160,.25)",
                          cursor: "not-allowed",
                          opacity: 0.65,
                        }}
                        title="Mark paid — connect workflow in settings"
                      >
                        Mark Paid
                      </span>
                    ) : null}
                    {d.type === "quote" && statusNorm === "accepted" ? (
                      <Link
                        href={`/admin/billing/invoices/new?fromQuote=${encodeURIComponent(d.id)}`}
                        className="dashboard-tb-btn"
                        style={actionBtn}
                      >
                        → Invoice
                      </Link>
                    ) : null}
                    <Link href={d.href} className="dashboard-tb-btn" style={actionBtn}>
                      Edit
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
            </>
          ) : (
            <div className="billing-empty">NO DOCUMENTS</div>
          )}
        </div>
      </div>
    </>
  );
}
