import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="relative z-10 overflow-hidden border-t px-6 py-16 md:px-[72px] md:pl-[calc(72px+3px)]"
      style={{
        borderColor: "rgba(255,255,255,.07)",
        paddingTop: 64,
        paddingBottom: 52,
      }}
    >
      <div className="footer-top">
        <Link href="/" className="footer-logo">
          <span className="chrome-text">BRAN</span>
          <span style={{ color: "var(--text-pri)" }}>SOL</span>
        </Link>
        <div className="footer-nav">
          <div className="footer-col">
            <span className="footer-col-label">Studio</span>
            <Link href="/#work">Work</Link>
            <Link href="/expertise">Expertise</Link>
            <Link href="/#platform">Platform</Link>
            <Link href="/studio">Studio</Link>
            <Link href="/perspectives">Perspectives</Link>
          </div>
          <div className="footer-col">
            <span className="footer-col-label">Sectors</span>
            <Link href="/work">Government</Link>
            <Link href="/work">Financial Services</Link>
            <Link href="/work">Infrastructure</Link>
            <Link href="/work">Professional Services</Link>
          </div>
          <div className="footer-col">
            <span className="footer-col-label">Contact</span>
            <a href="mailto:hello@bransol.co.za">hello@bransol.co.za</a>
            <Link href="/#begin">Begin a commission</Link>
            <Link href="/#platform">Client platform</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">© 2026 BRANSOL — Ballito, KwaZulu-Natal</span>
        <div className="footer-social">
          <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
