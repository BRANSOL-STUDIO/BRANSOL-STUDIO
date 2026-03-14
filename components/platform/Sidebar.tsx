"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/projects", label: "Projects" },
  { href: "/deliverables", label: "Deliverables" },
  { href: "/files", label: "Files" },
  { href: "/invoices", label: "Invoices" },
  { href: "/subscription", label: "Subscription" },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-sidebar-logo">
        <Link href="/dashboard" style={{ textDecoration: "none", color: "inherit" }}>
          <span className="chrome-text">BRAN</span>
          <span style={{ color: "var(--text-pri)" }}>SOL</span>
        </Link>
        <span className="dashboard-role-tag">Client</span>
      </div>
      <nav className="dashboard-nav-section" style={{ flex: 1 }}>
        {nav.map(({ href, label }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname?.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`dashboard-nav-item ${active ? "active" : ""}`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
