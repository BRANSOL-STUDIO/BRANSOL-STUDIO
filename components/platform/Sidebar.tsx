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
    <aside
      className="w-60 flex-shrink-0 flex flex-col border-r overflow-y-auto"
      style={{
        background: "rgba(4,4,10,.55)",
        backdropFilter: "blur(28px)",
        borderColor: "rgba(255,255,255,.12)",
      }}
    >
      <div
        className="p-5 border-b flex items-center gap-2 flex-shrink-0"
        style={{ borderColor: "var(--glass-border)" }}
      >
        <Link
          href="/dashboard"
          className="font-[family-name:var(--font-syne)] text-base font-extrabold tracking-tight"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          <span className="chrome-text">BRANSOL</span>
        </Link>
      </div>
      <nav className="p-3 flex-1">
        {nav.map(({ href, label }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`block py-2.5 px-3 rounded-md text-sm mb-0.5 transition-colors ${
                active ? "bg-[rgba(124,131,229,.15)] border border-[rgba(124,131,229,.35)]" : "border border-transparent"
              }`}
              style={{ color: active ? "var(--iris)" : "var(--text-sec)" }}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
