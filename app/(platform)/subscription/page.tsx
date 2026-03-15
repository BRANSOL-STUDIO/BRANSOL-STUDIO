import { createClient } from "@/lib/supabase/server";
import { fmtCurrency, fmtDate } from "@/lib/utils";

const DEFAULT_FEATURES = [
  "Unlimited active projects",
  "Dedicated Creative Director",
  "Priority turnaround",
  "Monthly strategy session",
  "Full platform access",
  "Dedicated account manager",
];

export default async function SubscriptionPage() {
  const supabase = await createClient();
  const { data: org } = await supabase
    .from("organisations")
    .select("tier, mrr, renewal_date")
    .limit(1)
    .single();

  const tier = org?.tier ?? "—";
  const mrr = org?.mrr ?? 0;
  const renewal = fmtDate(org?.renewal_date);

  return (
    <div className="space-y-6">
      <header className="dashboard-page-header">
        <h2>Subscription</h2>
        <p>Manage your BRANSOL retainer</p>
      </header>
      <div className="dashboard-grid-2" style={{ marginBottom: 16 }}>
        <div className="dashboard-card boxed" style={{ borderColor: "rgba(124,131,229,.25)" }}>
          <div className="dashboard-card-header">
            <span className="dashboard-card-title">Current Plan</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: "var(--font-dm-mono), monospace", fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase", padding: "4px 10px", border: "1px solid rgba(6,214,160,.35)", color: "var(--r4)", background: "rgba(6,214,160,.09)" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor" }} /> Active
            </span>
          </div>
          <div className="dashboard-sub-tier">
            {tier !== "—" ? <span className="chrome-text">{tier}</span> : tier}
          </div>
          <div className="dashboard-sub-price">
            {mrr ? fmtCurrency(mrr) : "—"}<span>/month</span>
          </div>
          <ul className="dashboard-sub-features">
            {DEFAULT_FEATURES.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          {renewal !== "—" && (
            <div style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 8, letterSpacing: "0.18em", color: "var(--text-ter)", marginTop: 8 }}>RENEWS {renewal.toUpperCase()}</div>
          )}
        </div>
        <div>
          <div className="dashboard-card boxed" style={{ marginBottom: 12 }}>
            <div className="dashboard-card-header">
              <span className="dashboard-card-title">Subscription Details</span>
            </div>
            {[
              ["Tier", tier],
              ["Monthly", mrr ? fmtCurrency(mrr) : "—"],
              ["Billing", "1st of each month"],
              ["Renewal", renewal],
              ["Status", "Active"],
            ].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-ter)" }}>{k}</span>
                <span style={{ fontSize: 13, color: "var(--text-pri)" }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
