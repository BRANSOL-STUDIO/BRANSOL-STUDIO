import Link from "next/link";

const adminNav = [
  { href: "/admin/overview", label: "Overview" },
  { href: "/admin/clients", label: "Clients" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/deliverables", label: "Deliverables" },
  { href: "/admin/billing", label: "Billing" },
  { href: "/admin/onboard", label: "Onboard" },
  { href: "/admin/subscriptions", label: "Subscriptions" },
  { href: "/admin/team", label: "Team" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--void)]">
      <aside
        className="w-56 flex-shrink-0 flex flex-col border-r overflow-y-auto"
        style={{
          background: "rgba(4,4,10,.55)",
          backdropFilter: "blur(28px)",
          borderColor: "rgba(255,255,255,.12)",
        }}
      >
        <div className="p-4 border-b" style={{ borderColor: "var(--glass-border)" }}>
          <Link href="/admin/overview" className="font-[family-name:var(--font-syne)] font-extrabold text-sm" style={{ fontFamily: "var(--font-syne)" }}>
            <span className="chrome-text">BRANSOL</span>
          </Link>
          <span className="block text-[9px] tracking-wider uppercase mt-1" style={{ color: "var(--text-ter)" }}>
            Admin
          </span>
        </div>
        <nav className="p-2">
          {adminNav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="block py-2 px-3 text-sm rounded-md mb-0.5 transition-colors hover:bg-[rgba(255,255,255,.06)]"
              style={{ color: "var(--text-sec)" }}
            >
              {label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
