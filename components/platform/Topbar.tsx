"use client";

import Link from "next/link";

export function Topbar() {
  return (
    <header
      className="h-14 flex-shrink-0 flex items-center justify-between px-6 border-b"
      style={{
        background: "rgba(255,255,255,.03)",
        borderColor: "var(--glass-border)",
      }}
    >
      <span className="text-xs uppercase tracking-wider" style={{ color: "var(--text-ter)" }}>
        Client workspace
      </span>
      <Link
        href="/"
        className="text-[10px] tracking-[0.2em] uppercase"
        style={{ color: "var(--text-ter)" }}
      >
        Back to site
      </Link>
    </header>
  );
}
