import Link from "next/link";

export default function AdminNewQuotePage() {
  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <Link href="/admin/billing" className="dashboard-tb-btn" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          ← Billing
        </Link>
      </div>
      <header className="dashboard-page-header">
        <h2>New Quote</h2>
        <p>Create a draft quotation — full builder is coming soon.</p>
      </header>
    </>
  );
}
