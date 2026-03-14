"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const size = 18;

const icons = {
  overview: (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  clients: (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  projects: (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      <line x1="12" y1="11" x2="12" y2="17" />
      <line x1="9" y1="14" x2="15" y2="14" />
    </svg>
  ),
  deliverables: (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  team: (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  billing: (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
      <path d="M7 15h.01" />
      <path d="M12 15h3" />
    </svg>
  ),
  onboard: (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="20" y1="8" x2="20" y2="14" />
      <line x1="23" y1="11" x2="17" y2="11" />
    </svg>
  ),
  subscriptions: (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
};

const adminNav = [
  { href: "/admin/overview", label: "Overview", iconKey: "overview" as const },
  { href: "/admin/clients", label: "Clients", iconKey: "clients" as const },
  { href: "/admin/projects", label: "Projects", iconKey: "projects" as const },
  { href: "/admin/deliverables", label: "Deliverables", iconKey: "deliverables" as const },
  { href: "/admin/team", label: "Members", iconKey: "team" as const },
  { href: "/admin/billing", label: "Billing", iconKey: "billing" as const },
  { href: "/admin/onboard", label: "Onboard", iconKey: "onboard" as const },
  { href: "/admin/subscriptions", label: "Subscriptions", iconKey: "subscriptions" as const },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="w-56 flex-shrink-0 flex flex-col border-r overflow-y-auto dashboard-sidebar"
      style={{
        background: "rgba(4,4,10,.55)",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        borderColor: "rgba(255,255,255,.12)",
      }}
    >
      <div className="p-4 border-b" style={{ borderColor: "var(--glass-border)" }}>
        <Link
          href="/admin/overview"
          className="font-extrabold text-sm no-underline"
          style={{ fontFamily: "var(--font-syne)", color: "inherit" }}
        >
          <span className="chrome-text">BRAN</span>
          <span style={{ color: "var(--text-pri)" }}>SOL</span>
        </Link>
        <span className="block text-[9px] tracking-wider uppercase mt-1" style={{ color: "var(--text-ter)" }}>
          Studio
        </span>
      </div>
      <nav className="dashboard-nav-section flex-1 p-2">
        {adminNav.map(({ href, label, iconKey }) => {
          const active =
            pathname === href ||
            (href !== "/admin/overview" && pathname?.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`dashboard-nav-item ${active ? "active" : ""}`}
            >
              <span className="dashboard-nav-icon">{icons[iconKey]}</span>
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
