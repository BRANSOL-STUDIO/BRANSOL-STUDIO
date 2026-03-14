"use client";

import Link from "next/link";

type CardItem = {
  href: string;
  name: string;
  discipline: string;
  c: string;
  artColor: string;
  height?: "tall" | "short" | "default";
};

/* Column A — scroll up */
const colA: CardItem[] = [
  { href: "/work/national-communications-agency", name: "National Communications Agency", discipline: "Brand Identity · Design System", c: "ws-c1", artColor: "var(--iris)", height: "tall" },
  { href: "/work/pan-african-law-practice", name: "Pan-African Law Practice", discipline: "Brand Identity · Credentials", c: "ws-c5", artColor: "var(--sky)", height: "short" },
  { href: "/work/renewable-energy-ipp", name: "Renewable Energy IPP", discipline: "Digital Design · Pitch Deck", c: "ws-c6", artColor: "var(--ember)", height: "default" },
  { href: "/work/property-development-consortium", name: "Property Development Consortium", discipline: "Spatial Identity · Wayfinding", c: "ws-c3", artColor: "var(--gold)", height: "tall" },
];

/* Column B — scroll down */
const colB: CardItem[] = [
  { href: "/work/listed-asset-management-group", name: "Listed Asset Management Group", discipline: "Design System · Investor Decks", c: "ws-c2", artColor: "var(--aqua)", height: "default" },
  { href: "/work/regional-medical-foundation", name: "Regional Medical Foundation", discipline: "Campaign Creative · Print", c: "ws-c4", artColor: "var(--violet)", height: "tall" },
  { href: "/work/pan-african-law-practice", name: "Pan-African Law Practice", discipline: "Credentials Design", c: "ws-c5", artColor: "var(--sky)", height: "short" },
  { href: "/work/national-communications-agency", name: "NCA Annual Report 2025", discipline: "Editorial Design · Print", c: "ws-c1", artColor: "var(--iris)", height: "default" },
];

/* Column C — scroll up */
const colC: CardItem[] = [
  { href: "/work/regional-medical-foundation", name: "Regional Medical Foundation", discipline: "Campaign Creative · Print", c: "ws-c4", artColor: "var(--violet)", height: "short" },
  { href: "/work/national-communications-agency", name: "Annual Report Commission", discipline: "Editorial Design · Print", c: "ws-c1", artColor: "var(--iris)", height: "tall" },
  { href: "/work/listed-asset-management-group", name: "Investor Deck Series", discipline: "Presentation Design", c: "ws-c2", artColor: "var(--aqua)", height: "default" },
  { href: "/work/property-development-consortium", name: "Property Development Consortium", discipline: "Spatial Identity · Wayfinding", c: "ws-c3", artColor: "var(--gold)", height: "short" },
];

function WsArt({ color }: { color: string }) {
  return (
    <div className="ws-art" style={{ color }}>
      <div className="ws-vrow" style={{ alignItems: "flex-end", height: 80, gap: 5 }}>
        <div className="ws-vblock" style={{ height: "38%", flex: 1 }} />
        <div className="ws-vblock" style={{ height: "70%", flex: 2 }} />
        <div className="ws-vblock" style={{ height: "52%", flex: 1 }} />
        <div className="ws-vblock" style={{ height: "88%", flex: 1.5 }} />
        <div className="ws-vblock" style={{ height: "44%", flex: 1 }} />
      </div>
      <div className="ws-vline" style={{ width: "58%", marginTop: 10 }} />
    </div>
  );
}

function WorkStripCard({ href, name, discipline, c, artColor, height }: CardItem) {
  const heightClass = height === "tall" ? "ws-tall" : height === "short" ? "ws-short" : "";
  return (
    <Link href={href} className={`ws-card ${c} ${heightClass}`}>
      <WsArt color={artColor} />
      <div className="ws-scrim" />
      <div className="ws-overlay" />
      <div className="ws-inner">
        <div className="ws-bottom">
          <div className="ws-name">{name}</div>
          <div className="ws-discipline">{discipline}</div>
        </div>
      </div>
      <div className="ws-arrow">
        <svg viewBox="0 0 12 12" fill="none" width={11} height={11}>
          <path d="M2.5 9.5l7-7M9.5 9.5V2.5H2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Link>
  );
}

export function HomeHero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <div className="hero-kicker">Strategic Design Studio — Johannesburg</div>
        <h1 className="hero-headline">
          <span className="line">
            <span className="line-inner">We don&apos;t</span>
          </span>
          <span className="line">
            <span className="line-inner">
              <span className="chrome-text">compete</span>
            </span>
          </span>
          <span className="line">
            <span className="line-inner">on price.</span>
          </span>
        </h1>
        <div className="hero-rule" />
        <div className="hero-bottom-row">
          <div>
            <p className="hero-sub">
              BRANSOL is a strategic design studio working with organisations whose ambitions demand more than execution. We work selectively — a limited number of commissions each year, each one fully considered.
            </p>
            <Link href="/platform" className="hero-platform-pill">
              <div className="hero-pill-dot" />
              <span>Proprietary client platform — included with every engagement</span>
              <svg viewBox="0 0 12 12" fill="none" width={12} height={12}>
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Link>
          </div>
          <div className="hero-right-meta">
            <span>Est. 2018</span>
            <span>Johannesburg · ZA</span>
            <div className="hero-scroll">
              <div className="scroll-track" />
              <span>Scroll</span>
            </div>
          </div>
        </div>
      </div>

      <div className="work-strip">
        <div className="ws-col">
          <div className="ws-track-up" style={{ animationDuration: "28s" }}>
            {colA.map((item) => (
              <WorkStripCard key={`a-${item.href}-${item.name}`} {...item} />
            ))}
            {colA.map((item) => (
              <WorkStripCard key={`a2-${item.href}-${item.name}`} {...item} />
            ))}
          </div>
        </div>
        <div className="ws-col" style={{ marginTop: 120 }}>
          <div className="ws-track-down" style={{ animationDuration: "34s" }}>
            {colB.map((item) => (
              <WorkStripCard key={`b-${item.href}-${item.name}`} {...item} />
            ))}
            {colB.map((item) => (
              <WorkStripCard key={`b2-${item.href}-${item.name}`} {...item} />
            ))}
          </div>
        </div>
        <div className="ws-col" style={{ marginTop: 60 }}>
          <div className="ws-track-up" style={{ animationDuration: "22s" }}>
            {colC.map((item) => (
              <WorkStripCard key={`c-${item.href}-${item.name}`} {...item} />
            ))}
            {colC.map((item) => (
              <WorkStripCard key={`c2-${item.href}-${item.name}`} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
