"use client";

import Link from "next/link";

export function BillingToolbar() {
  return (
    <div className="billing-toolbar">
      <Link href="/admin/billing/quotes/new" className="dashboard-tb-btn">
        + New Quote
      </Link>
      <Link href="/admin/billing/invoices/new" className="dashboard-tb-btn primary" style={{ marginLeft: 8 }}>
        + New Invoice
      </Link>
    </div>
  );
}
