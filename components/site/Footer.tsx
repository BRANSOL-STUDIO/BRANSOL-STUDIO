import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="relative z-10 flex flex-wrap justify-between items-center gap-4 px-6 py-12 md:px-[72px] border-t border-[var(--border)]"
    >
      <Link
        href="/"
        className="font-[family-name:var(--font-syne)] text-xl font-extrabold tracking-tight"
        style={{ fontFamily: "var(--font-syne)" }}
      >
        <span className="chrome-text">BRANSOL</span>
      </Link>
      <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--text-ter)" }}>
        © {new Date().getFullYear()} BRANSOL
      </p>
    </footer>
  );
}
