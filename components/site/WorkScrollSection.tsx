"use client";

import Link from "next/link";

import { WORK_CASE_STUDIES } from "@/lib/work-case-studies";

type Card = {
  href: string;
  sector: string;
  title: string;
  scope: string;
  color: string;
  imageSrc?: string;
};

const colA: Card[] = [
  { href: "/work/national-communications-agency", sector: "Government", title: "National Communications Agency", scope: "Brand Identity · Design System", color: "wss-iris" },
  { href: "/work/regional-medical-foundation", sector: "Healthcare", title: "Regional Medical Foundation", scope: "Campaign Creative · Print", color: "wss-violet" },
  { href: "/work/pan-african-law-practice", sector: "Professional Services", title: "Pan-African Law Practice", scope: "Brand Identity · Credentials", color: "wss-sky" },
];
const colB: Card[] = [
  { href: "/work/listed-asset-management-group", sector: "Financial Services", title: "Listed Asset Management Group", scope: "Design System · Investor Decks", color: "wss-aqua" },
  { href: "/work/property-development-consortium", sector: "Infrastructure", title: "Property Development Consortium", scope: "Spatial Identity · Wayfinding", color: "wss-gold" },
  { href: "/work/renewable-energy-ipp", sector: "Energy", title: "Renewable Energy IPP", scope: "Digital Design · Pitch Deck", color: "wss-ember" },
];
const colC: Card[] = [
  {
    href: "/work/globtek",
    sector: "Professional Services",
    title: "Globtek",
    scope: "Brand Identity · Outdoor · Vehicle",
    color: "wss-sky",
    imageSrc: WORK_CASE_STUDIES.globtek.images.cardHero?.src,
  },
  { href: "/work/listed-insurer", sector: "Financial Services", title: "Listed Short-Term Insurer", scope: "Brand Refresh · Digital", color: "wss-aqua" },
  { href: "/work/development-finance", sector: "Development Finance", title: "Continental DFI", scope: "Identity · Annual Report", color: "wss-gold" },
];

function WssCard({ card, duplicate }: { card: Card; duplicate?: boolean }) {
  return (
    <Link
      href={card.href}
      className={`wss-item ${card.color}`}
      {...(duplicate ? { "aria-hidden": true } : {})}
    >
      <div
        className="wss-img-bg"
        style={
          card.imageSrc
            ? {
                backgroundImage: `url(${card.imageSrc})`,
                backgroundSize: "cover",
                backgroundPosition: "top center",
                backgroundRepeat: "no-repeat",
              }
            : undefined
        }
      />
      {card.imageSrc ? null : (
        <div className="wss-img-art">
          <div className="wia-row">
            <div className="wia-b tall" />
            <div className="wia-b tall" style={{ flex: 2 }} />
          </div>
          <div className="wia-line" style={{ width: "65%" }} />
          <div className="wia-row">
            <div className="wia-b" style={{ flex: 3 }} />
            <div className="wia-b" />
          </div>
        </div>
      )}
      <div className="wss-item-overlay" />
      <div className="wss-item-info">
        <span className="wss-item-sector">{card.sector}</span>
        <span className="wss-item-title">{card.title}</span>
        <span className="wss-item-scope">{card.scope}</span>
      </div>
    </Link>
  );
}

function WssColumn({ id, cards }: { id: string; cards: Card[] }) {
  return (
    <div className="wss-col" id={id}>
      {cards.map((card) => (
        <WssCard key={`${card.href}-${card.title}`} card={card} />
      ))}
      {cards.map((card) => (
        <WssCard key={`${card.href}-${card.title}-dup`} card={card} duplicate />
      ))}
    </div>
  );
}

export function WorkScrollSection() {
  return (
    <section id="work" className="work-scroll-section">
      <div className="wss-left">
        <div className="wss-left-inner">
          <span className="eyebrow">02 · Selected Work</span>
          <h2 className="section-title">Commissions</h2>
          <p className="wss-desc">
            A selection of engagements across government, financial services, infrastructure, and professional sectors. Each one fully considered.
          </p>
          <Link href="/work" className="wss-cta">
            <span>View all work</span>
            <svg viewBox="0 0 12 12" fill="none" width={12} height={12}>
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
          <div className="wss-counter">
            <span className="wss-counter-num chrome-text">01</span>
            <span className="wss-counter-sep">/</span>
            <span className="wss-counter-total">09</span>
          </div>
        </div>
      </div>
      <div className="wss-right">
        <div className="wss-grid">
          <WssColumn id="wssColA" cards={colA} />
          <WssColumn id="wssColB" cards={colB} />
          <WssColumn id="wssColC" cards={colC} />
        </div>
      </div>
    </section>
  );
}
