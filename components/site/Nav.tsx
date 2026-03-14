"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const links = [
  { href: "/work", label: "Work" },
  { href: "/expertise", label: "Expertise" },
  { href: "/platform", label: "Platform" },
  { href: "/studio", label: "Studio" },
  { href: "/perspectives", label: "Perspectives" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      id="nav"
      className={`nav fixed top-0 left-0 right-0 z-[50] grid grid-cols-[1fr_auto_1fr] items-center px-6 md:px-[72px] border-b border-white/5 ${scrolled ? "scrolled" : ""}`}
      style={{
        height: scrolled ? "58px" : "var(--nav-h)",
        paddingLeft: "calc(var(--pad-x) + 3px)",
        background: scrolled ? "rgba(6,6,8,.92)" : "rgba(6,6,8,.65)",
        backdropFilter: scrolled ? "blur(28px)" : "blur(20px)",
        borderColor: scrolled ? "var(--border)" : "rgba(255,255,255,0.05)",
        transition: "background 0.4s ease, border-color 0.35s ease, height 0.3s ease",
      }}
    >
      <Link
        href="/"
        className="nav-logo justify-self-start font-[family-name:var(--font-syne)] text-lg font-extrabold tracking-tight flex-shrink-0 no-underline"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        <span className="chrome-text">BRAN</span>
        <span style={{ color: "var(--text-pri)" }}>SOL</span>
      </Link>
      <ul className="hidden md:flex items-center gap-8 list-none justify-self-center">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-[9px] tracking-[0.28em] uppercase no-underline transition-colors"
              style={{ color: "var(--ter)" }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-6 justify-self-end">
        <Link
          href="/auth/login"
          className="text-[9px] tracking-[0.28em] uppercase no-underline transition-colors hover:opacity-90"
          style={{ color: "var(--sub)" }}
        >
          Login
        </Link>
        <Link
          href="/begin"
          className="nav-cta text-[9px] tracking-[0.28em] uppercase px-6 py-2.5 no-underline whitespace-nowrap"
          style={{
            color: "#060608",
            background: "var(--chrome)",
            backgroundSize: "300% 300%",
            animation: "cSpin 4s ease infinite",
          }}
        >
          Begin
        </Link>
      </div>
    </nav>
  );
}
