"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/projects": "Projects",
  "/deliverables": "Deliverables",
  "/files": "Files",
  "/invoices": "Invoices & Billing",
  "/subscription": "Subscription",
};

function getTitle(pathname: string): string {
  for (const [path, title] of Object.entries(titles)) {
    if (pathname === path || (path !== "/dashboard" && pathname.startsWith(path))) return title;
  }
  return "Dashboard";
}

export function Topbar() {
  const pathname = usePathname();
  const title = getTitle(pathname ?? "/dashboard");
  const isFiles = pathname === "/files";

  return (
    <header className="dashboard-topbar">
      <div className="dashboard-topbar-title">{title}</div>
      <div className="dashboard-topbar-actions">
        {isFiles && (
          <a href="#upload" className="dashboard-tb-btn primary">
            + Upload File
          </a>
        )}
        <Link
          href="/"
          className="text-[10px] tracking-[0.2em] uppercase"
          style={{ color: "var(--text-ter)", textDecoration: "none" }}
        >
          Back to site
        </Link>
      </div>
    </header>
  );
}
