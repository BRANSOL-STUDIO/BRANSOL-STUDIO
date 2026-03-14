"use client";

import Link from "next/link";
import {
  MANIFESTO,
  TEAM,
  VALUES,
  MODEL_BLOCKS,
  CLIENT_PRINCIPLES,
  SECTOR_TYPES,
} from "@/lib/studio-data";
import type { TeamMember } from "@/lib/studio-data";

function TeamAvatarGeo({ id, accent }: { id: string; accent: string }) {
  return (
    <svg
      className="tc-geo"
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
          <stop offset="100%" stopColor={accent} stopOpacity="0.06" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill={`url(#${id})`} />
      <circle cx="200" cy="160" r="120" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.4" />
      <circle cx="200" cy="160" r="80" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.3" />
      <line x1="0" y1="400" x2="400" y2="0" stroke={accent} strokeWidth="0.5" opacity="0.2" />
      <ellipse cx="200" cy="130" rx="55" ry="65" fill={accent} opacity="0.12" />
      <ellipse cx="200" cy="280" rx="90" ry="70" fill={accent} opacity="0.08" />
    </svg>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="team-card">
      <div className="tc-avatar">
        <div className="tc-avatar-bg">
          <TeamAvatarGeo id={`studio-geo-${member.initials}`} accent={member.accent} />
        </div>
        <div className="tc-initials">{member.initials}</div>
        <div className="tc-overlay">
          <div className="tc-overlay-quote">{member.quote}</div>
        </div>
      </div>
      <div className="tc-info">
        <div className="tc-name">{member.name}</div>
        <div className="tc-role">{member.role}</div>
        <div className="tc-bio">{member.bio}</div>
        <div className="tc-tags">
          {member.tags.map((tag) => (
            <span key={tag} className="tc-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StudioPageView() {
  return (
    <div className="studio-page">
      <section className="hero">
        <span className="hero-eyebrow">Studio</span>
        <h1 className="hero-title">
          We make
          <br />
          <span className="chrome-text">design</span>
          <br />
          <em>that holds.</em>
        </h1>
        <div className="hero-cols">
          <div className="hero-col">
            <span className="hc-label">Who we are</span>
            <p className="hc-text">
              BRANSOL is a strategic design studio based in Ballito, KwaZulu-Natal. We work with institutions, listed companies, government entities, and ambitious private organisations on commissions that require more than decoration.
            </p>
          </div>
          <div className="hero-col">
            <span className="hc-label">How we work</span>
            <p className="hc-text">
              Selectively. We take on a limited number of engagements each year — not because of capacity, but because depth requires choice. Every client gets the studio&apos;s full attention, not a fraction of it.
            </p>
          </div>
          <div className="hero-col">
            <span className="hc-label">What we believe</span>
            <p className="hc-text">
              That design is not decoration. That strategy without execution is just a conversation. That the best work happens when client and studio operate as genuine partners — not vendor and buyer.
            </p>
          </div>
        </div>
      </section>

      <div className="stat-strip">
        <div className="stat-tile">
          <span className="st-val chrome-text">6+</span>
          <span className="st-label">Years operating</span>
          <span className="st-sub">Founded in Ballito. Built for the continent.</span>
        </div>
        <div className="stat-tile">
          <span className="st-val chrome-text">94%</span>
          <span className="st-label">Client retention</span>
          <span className="st-sub">Most clients commission again. That is the measure we care about.</span>
        </div>
        <div className="stat-tile">
          <span className="st-val chrome-text">1:3</span>
          <span className="st-label">Commission win rate</span>
          <span className="st-sub">We decline two in three enquiries. Selectivity is not arrogance — it&apos;s how we protect quality.</span>
        </div>
        <div className="stat-tile">
          <span className="st-val chrome-text">5</span>
          <span className="st-label">Disciplines</span>
          <span className="st-sub">Identity, digital, campaign, credentials, spatial. One studio. No outsourcing without disclosure.</span>
        </div>
      </div>

      <section className="philosophy">
        <div className="ph-inner">
          <div>
            <span className="ph-eyebrow">Philosophy</span>
            <h2 className="ph-label">
              What we
              <br />
              actually
              <br />
              believe.
            </h2>
          </div>
          <div className="ph-right">
            <div className="manifesto-lines">
              {MANIFESTO.map((line) => (
                <div key={line.num} className="manifesto-line">
                  <span className="ml-num">{line.num}</span>
                  <div className="ml-body">
                    <div className="ml-statement">{line.statement}</div>
                    <div className="ml-expand">{line.expand}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="pull-quote-section">
        <div className="pull-quote">
          <p className="pq-text">
            &ldquo;The organisations that endure are the ones that understood, early, that how you <em>present</em> what you do is inseparable from what you <em>actually</em> do.&rdquo;
          </p>
          <div className="pq-source">BRANSOL — Studio Position, 2026</div>
        </div>
      </div>

      <section className="team">
        <div className="team-header">
          <div>
            <span className="team-eyebrow">The Team</span>
            <h2 className="team-title">
              Small
              <br />
              <span className="chrome-text">by design.</span>
            </h2>
          </div>
          <div className="team-right">
            <p>
              We do not scale by adding bodies. Every senior team member works directly on client projects — not as oversight, but as execution. When you commission BRANSOL, you work with the people whose names are on the studio.
            </p>
            <p>
              We bring in specialist collaborators when the work requires it — photographers, fabricators, developers — but always transparently, and always under BRANSOL direction.
            </p>
          </div>
        </div>
        <div className="team-grid">
          {TEAM.map((member) => (
            <TeamCard key={member.initials} member={member} />
          ))}
          <div className="team-card join-card">
            <span className="join-eyebrow">We are selective here too</span>
            <div className="join-title">
              We occasionally
              <br />
              work with
              <br />
              <span className="chrome-text">exceptional people.</span>
            </div>
            <p className="join-desc">
              Not internships. Not junior positions. If you have deep expertise in one of our disciplines and share our values, we want to hear from you.
            </p>
            <a href="mailto:hello@bransol.com" className="join-link">
              hello@bransol.com
            </a>
          </div>
        </div>
      </section>

      <section className="values">
        <div className="values-header">
          <span className="values-eyebrow">What we stand for</span>
          <h2 className="values-title">
            Five principles.
            <br />
            <span className="chrome-text">Non-negotiable.</span>
          </h2>
        </div>
        <div className="value-rows">
          {VALUES.map((row) => (
            <div key={row.num} className="value-row">
              <span className="vr-num">{row.num}</span>
              <div className="vr-title">{row.title}</div>
              <div className="vr-body">{row.body}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="model">
        <div className="model-header">
          <div>
            <span className="model-eyebrow">Operating Model</span>
            <h2 className="model-title">
              How we
              <br />
              <span className="chrome-text">actually work.</span>
            </h2>
          </div>
          <div className="model-right">
            <p>
              Most agencies describe a process. We describe a set of commitments. These are the things that are true of every BRANSOL engagement — not aspirationally, but as a matter of how we are structured.
            </p>
            <p>If any of these are not achievable for a given commission, we say so during the conversation before any work begins.</p>
          </div>
        </div>
        <div className="model-grid">
          {MODEL_BLOCKS.map((block, i) => (
            <div key={block.num} className="model-block">
              <span className="mb-num">{block.num}</span>
              <div className="mb-icon">
                {i === 0 && (
                  <svg viewBox="0 0 16 16" stroke={block.iconStroke}>
                    <path d="M2 4h12v9H2z" />
                    <path d="M5 4V2h6v2" />
                    <path d="M5 8h6M5 11h4" />
                  </svg>
                )}
                {i === 1 && (
                  <svg viewBox="0 0 16 16" stroke={block.iconStroke}>
                    <circle cx="8" cy="8" r="6" />
                    <path d="M8 4v4l3 2" />
                  </svg>
                )}
                {i === 2 && (
                  <svg viewBox="0 0 16 16" stroke={block.iconStroke}>
                    <path d="M2 11V5a1 1 0 011-1h10a1 1 0 011 1v5a1 1 0 01-1 1H5l-3 2z" />
                  </svg>
                )}
                {i === 3 && (
                  <svg viewBox="0 0 16 16" stroke={block.iconStroke}>
                    <path d="M8 1v7M5 5l3-4 3 4" />
                    <path d="M2 12h12v3H2z" />
                  </svg>
                )}
              </div>
              <div className="mb-title">{block.title}</div>
              <div className="mb-body">{block.body}</div>
              <div className="mb-note">{block.note}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="client-approach">
        <div className="ca-inner">
          <div className="ca-left">
            <span className="ca-eyebrow">Who we work with</span>
            <h2 className="ca-title">
              We are selective
              <br />
              <span className="chrome-text">on purpose.</span>
            </h2>
            <div className="ca-body">
              <p>
                We review every enquiry personally. We do not run a qualification funnel or a sales process. We have a conversation. If the commission is right — right fit, right timing, right client — we proceed. If it is not, we say so and we are honest about why.
              </p>
              <p>
                We decline commissions when we believe another studio would serve the client better, when the timeline is incompatible with the quality required, or when the scope is outside our disciplines.
              </p>
            </div>
            <div className="client-strip">
              <span className="cs-label">Sectors we regularly serve</span>
              <div className="cs-types">
                {SECTOR_TYPES.map((s) => (
                  <div key={s.label} className="cs-type">
                    <span className="cs-dot" style={{ background: s.color }} />
                    {s.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="ca-right">
            {CLIENT_PRINCIPLES.map((p) => (
              <div key={p.num} className="ca-principle">
                <span className="cap-num">{p.num}</span>
                <div className="cap-body">
                  <div className="cap-title">{p.title}</div>
                  <div className="cap-text">{p.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="location">
        <div className="loc-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d221816.575!2d31.1!3d-29.53!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ef7027b3477b8c5%3A0x42feb5e1e0e0e0e0!2sBallito!5e0!3m2!1sen!2sza!4v1"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.4) brightness(0.85)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="BRANSOL Studio — Ballito, KwaZulu-Natal"
          />
          <div className="loc-map-badge">
            <div className="loc-map-badge-dot" />
            <span>Ballito · KZN North Coast</span>
          </div>
        </div>
        <div className="loc-left">
          <div className="loc-gradient" aria-hidden />
          <div className="loc-content">
            <span className="loc-eyebrow">Where we are</span>
            <h2 className="loc-title">
              Ballito,
              <br />
              <span className="chrome-text">KwaZulu-Natal.</span>
            </h2>
            <p className="loc-body">
              We are a Ballito-based studio on the KZN North Coast. We work across South Africa and the African continent — but our home is here, where the Indian Ocean meets serious ambition. Distance has never been a limitation for how we work, and our platform means clients from Cape Town to Nairobi operate without friction.
            </p>
            <div className="loc-details">
              <div className="loc-detail">
                Studio<span> Ballito, KwaZulu-Natal</span>
              </div>
              <div className="loc-detail">
                Contact
                <span>
                  <a href="mailto:hello@bransol.com">hello@bransol.com</a>
                </span>
              </div>
              <div className="loc-detail">
                Hours<span> Monday – Friday, 08:00 – 17:00 SAST</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-cta">
        <div>
          <span className="cta-eyebrow">Begin</span>
          <h2 className="cta-title">
            If this sounds
            <br />
            like your kind
            <br />
            of <span className="chrome-text">studio.</span>
          </h2>
        </div>
        <div className="cta-actions">
          <Link href="/begin" className="cta-btn-primary">
            Begin a commission
          </Link>
          <Link href="/work" className="cta-btn-ghost">
            View our work
          </Link>
        </div>
      </section>
    </div>
  );
}
