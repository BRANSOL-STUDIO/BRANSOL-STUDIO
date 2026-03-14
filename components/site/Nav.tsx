"use client";

import Link from "next/link";

const links = [
  { href: "/work", label: "Work" },
  { href: "/expertise", label: "Expertise" },
  { href: "/platform", label: "Platform" },
  { href: "/studio", label: "Studio" },
  { href: "/perspectives", label: "Perspectives" },
  { href: "/begin", label: "Begin" },
];

export function Nav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-6 py-5 md:px-[72px] border-b border-[var(--border)]"
      style={{
        background: "rgba(6,6,8,0.7)",
        backdropFilter: "blur(20px)",
      }}
    >
      <Link
        href="/"
        className="font-[family-name:var(--font-syne)] text-lg font-extrabold tracking-tight"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        <span className="chrome-text">BRANSOL</span>
      </Link>
      <ul className="hidden md:flex gap-8 list-none">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-[10px] tracking-[0.2em] uppercase transition-colors hover:opacity-100"
              style={{ color: "var(--text-ter)" }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/auth/login"
        className="text-[10px] tracking-[0.2em] uppercase"
        style={{ color: "var(--text-ter)" }}
      >
        Client login
      </Link>
    </nav>
  );
}
