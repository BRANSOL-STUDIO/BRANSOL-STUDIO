"use client";

import Link from "next/link";

const workStripLeft = [
  { href: "/work/national-communications-agency", sector: "Government", name: "National Communications Agency", discipline: "Brand Identity · Design System", c: "ws-c1" },
  { href: "/work/property-development-consortium", sector: "Infrastructure", name: "Property Development Consortium", discipline: "Spatial Identity · Wayfinding", c: "ws-c3" },
  { href: "/work/pan-african-law-practice", sector: "Professional Services", name: "Pan-African Law Practice", discipline: "Brand Identity · Credentials", c: "ws-c5" },
];

const workStripRight = [
  { href: "/work/listed-asset-management-group", sector: "Financial Services", name: "Listed Asset Management Group", discipline: "Design System · Investor Decks", c: "ws-c2" },
  { href: "/work/regional-medical-foundation", sector: "Healthcare", name: "Regional Medical Foundation", discipline: "Campaign Creative · Print", c: "ws-c4" },
  { href: "/work/renewable-energy-ipp", sector: "Energy", name: "Renewable Energy IPP", discipline: "Digital Design · Pitch Deck", c: "ws-c6" },
];

function WorkStripCard({
  href,
  sector,
  name,
  discipline,
  c,
}: {
  href: string;
  sector: string;
  name: string;
  discipline: string;
  c: string;
}) {
  return (
    <Link href={href} className={`ws-card ${c}`}>
      <div className="ws-accent-bar" />
      <div className="ws-inner">
        <div className="ws-top">
          <span className="ws-sector">{sector}</span>
          <span className="ws-num">01</span>
        </div>
        <div className="ws-bottom">
          <div className="ws-name">{name}</div>
          <div className="ws-discipline">{discipline}</div>
        </div>
      </div>
      <div className="ws-overlay" />
      <div className="ws-arrow">
        <svg viewBox="0 0 10 10">
          <path d="M1 5h8M5 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
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
        <div className="ws-col ws-col-left">
          <div className="ws-track-up">
            {workStripLeft.map((item) => (
              <WorkStripCard key={item.href + "1"} {...item} />
            ))}
            {workStripLeft.map((item) => (
              <WorkStripCard key={item.href + "2"} {...item} />
            ))}
          </div>
        </div>
        <div className="ws-col">
          <div className="ws-track-down">
            {workStripRight.map((item) => (
              <WorkStripCard key={item.href + "1"} {...item} />
            ))}
            {workStripRight.map((item) => (
              <WorkStripCard key={item.href + "2"} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
