import Link from "next/link";
import { HomePageBg } from "@/components/site/HomePageBg";
import { HomeHero } from "@/components/site/HomeHero";
import { DisciplineTicker } from "@/components/site/DisciplineTicker";
import { WorkScrollSection } from "@/components/site/WorkScrollSection";

const expertiseCards = [
  { num: "01", title: "Brand Identity", body: "Strategy, naming, visual identity systems, and brand guidelines built for longevity — not trends.", tags: ["Naming", "Identity Systems", "Brand Guidelines"] },
  { num: "02", title: "Digital Design", body: "Web, platform, and product design that converts and endures. We design digital experiences with the same rigour we apply to physical ones.", tags: ["Web Design", "Product UI", "Design Systems"] },
  { num: "03", title: "Campaign Creative", body: "Integrated campaigns across print, digital, and environmental media. Built around a single strategic idea, executed across every channel.", tags: ["Print", "Digital", "Environmental"] },
  { num: "04", title: "Credentials & Presentations", body: "Pitch-ready presentations, investor decks, and formal credentials for boards, procurement panels, and C-suite audiences.", tags: ["Pitch Decks", "Investor Materials", "Credentials"] },
  { num: "05", title: "Environmental & Spatial", body: "Wayfinding, signage, and spatial identity for organisations commissioning at scale — from single sites to national rollouts.", tags: ["Wayfinding", "Signage Systems", "Spatial Identity"] },
];

const platformFeatures = [
  { icon: "brief", name: "Brief Management", desc: "All requests documented, structured, and version-controlled from day one. No lost emails, no ambiguous briefs.", color: "var(--iris)" },
  { icon: "milestone", name: "Live Milestones", desc: "Track project progress in real time. No chasing, no status emails. Every milestone visible at a glance.", color: "var(--aqua)" },
  { icon: "feedback", name: "Feedback Loops", desc: "Contextual comments pinned to deliverables. Every revision tracked, every decision documented.", color: "var(--violet)" },
  { icon: "asset", name: "Secure Asset Delivery", desc: "Files delivered, versioned, and permanently archived. Your assets are always accessible, always safe.", color: "var(--rose)" },
  { icon: "history", name: "Engagement History", desc: "Every project, brief, and conversation stored. Returning clients benefit from full continuity without repetition.", color: "var(--gold)" },
  { icon: "compliance", name: "Compliance Ready", desc: "Role-based access, audit trails, and documented approvals for formal procurement environments.", color: "var(--sky)" },
];

const diffCards = [
  { title: "Proprietary Client Platform", body: "Every client receives a dedicated workspace. Briefs, assets, milestones, and approvals — in one considered environment. Not a Trello board. Not a shared folder.", color: "var(--iris)" },
  { title: "Outcomes, Not Hours", body: "We don't sell time blocks or subscriptions. We scope engagements to outcomes — what will be different when this work is complete, and how we will both know.", color: "var(--aqua)" },
  { title: "Formal Commission Capability", body: "BRANSOL operates professionally within structured procurement processes — credentials, proposals, scoped briefs, and senior accountability at every stage.", color: "var(--violet)" },
  { title: "No Public Pricing", body: "Investment is scoped to the brief. Discussed directly — privately, precisely, and without awkwardness. We don't publish rates. Every engagement is individual.", color: "var(--rose)" },
];

export default function HomePage() {
  return (
    <>
      <HomePageBg />
      <HomeHero />
      <DisciplineTicker />

      {/* 01 · Manifesto */}
      <section className="manifesto section-pad" id="about">
        <div className="manifesto-inner">
          <div>
            <span className="eyebrow">01 · Who We Are</span>
            <h2 className="manifesto-statement">
              We compete on <span className="chrome-text">consequence.</span>
            </h2>
            <div className="stat-row">
              <div className="stat">
                <span className="stat-num chrome-text">94%</span>
                <span className="stat-lbl">Client Retention</span>
              </div>
              <div className="stat">
                <span className="stat-num chrome-text">6+</span>
                <span className="stat-lbl">Years Operating</span>
              </div>
              <div className="stat">
                <span className="stat-num chrome-text">1:3</span>
                <span className="stat-lbl">Win Rate</span>
              </div>
            </div>
          </div>
          <div className="manifesto-body">
            <p>BRANSOL brings <strong>clarity to complex briefs</strong>, craft to every deliverable, and strategic accountability to every engagement. We are not a production house. We are a considered partner.</p>
            <p>Every commission begins with a conversation. Every deliverable is tracked in our <strong>proprietary client platform</strong> — a dedicated workspace designed around your work, not our workflow.</p>
            <p>We don&apos;t publish rates. We don&apos;t take on every brief. We do take <strong>full responsibility for outcomes.</strong></p>
          </div>
        </div>
      </section>

      {/* 02 · Selected Work / Commissions — animated chrome cards + column scroll */}
      <WorkScrollSection />

      {/* 03 · Expertise */}
      <section className="expertise section-pad" id="expertise">
        <div className="expertise-inner">
          <div className="expertise-left">
            <span className="eyebrow">03 · Expertise</span>
            <h2 className="section-title">What We Do</h2>
            <p className="expertise-desc">We work across disciplines — always with strategy as the foundation and craft as the standard. No outsourcing. No queues. Your work receives the studio&apos;s full attention.</p>
            <div className="expertise-left-glass">
              <span className="elg-label">Studio focus</span>
              <div className="elg-stat chrome-text">5</div>
              <div className="elg-stat-sub">Core disciplines</div>
            </div>
          </div>
          <div className="expertise-glass-grid">
            {expertiseCards.map((card) => (
              <div key={card.num} className="exp-glass-card">
                <div className="egc-bar" />
                <span className="egc-num">{card.num}</span>
                <div className="egc-content">
                  <div className="egc-icon-wrap">
                    <svg viewBox="0 0 20 20"><circle cx="10" cy="10" r="6" /><path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.4" fill="none" /></svg>
                  </div>
                  <div className="egc-text-block">
                    <span className="egc-label">{card.num} · Discipline</span>
                    <div className="egc-title">{card.title}</div>
                    <p className="egc-body">{card.body}</p>
                  </div>
                  <div className="egc-tags">
                    {card.tags.map((t) => <span key={t} className="egc-tag">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 · Platform */}
      <section className="platform section-pad" id="platform">
        <span className="eyebrow">04 · Client Platform</span>
        <div className="platform-intro">
          <div>
            <h2 className="platform-title">Your work.<br />One environment.</h2>
            <p className="platform-desc">Every BRANSOL engagement includes access to a dedicated client workspace. Not a shared folder. Not a ticketing system. A considered environment designed around the way serious work gets done.</p>
            <div className="platform-pill">
              <div className="platform-pill-dot" />
              Invitation-only · Included with every engagement
            </div>
          </div>
          <div className="platform-right-intro">
            <p>When you commission BRANSOL, you receive your own named workspace — pre-loaded with your brief, your team&apos;s access levels, and a structured project environment before the first call.</p>
            <p>No onboarding. No configuration. Your environment is ready when you are.</p>
          </div>
        </div>
        <div className="platform-features">
          {platformFeatures.map((f) => (
            <div key={f.name} className="pf-card">
              <div className="pf-icon" style={{ color: f.color }}>
                <svg viewBox="0 0 18 18"><rect x="2" y="2" width="14" height="14" rx="1" /><path d="M5 7h8M5 11h5" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>
              </div>
              <div className="pf-name">{f.name}</div>
              <p className="pf-desc">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="platform-ui">
          <div className="platform-ui-bar">
            <div className="pui-logo"><span className="chrome-text">BRAN</span><span>SOL</span> <span style={{ color: "var(--ter)", fontFamily: "var(--font-dm-mono)", fontSize: "9px", letterSpacing: "0.15em", marginLeft: 12 }}>Client Platform</span></div>
            <div className="pui-dots">
              <div className="pui-dot" style={{ background: "var(--iris)", border: "none", opacity: 0.6 }} />
              <div className="pui-dot" style={{ background: "var(--aqua)", border: "none", opacity: 0.4 }} />
              <div className="pui-dot" />
            </div>
          </div>
          <div className="platform-ui-body">
            <div className="pui-sidebar">
              <div className="pui-nav-item active">
                <svg viewBox="0 0 13 13"><rect x="1" y="1" width="5" height="5" /><rect x="7" y="1" width="5" height="5" /><rect x="1" y="7" width="5" height="5" /><rect x="7" y="7" width="5" height="5" /></svg>
                Overview
              </div>
              <div className="pui-nav-item">
                <svg viewBox="0 0 13 13"><rect x="1" y="2" width="11" height="9" rx="1" /><path d="M4 5h5M4 8h3" stroke="currentColor" fill="none" /></svg>
                Briefs
              </div>
              <div className="pui-nav-item">
                <svg viewBox="0 0 13 13"><circle cx="6.5" cy="6.5" r="5" /><path d="M6.5 3.5v3l2 1.5" stroke="currentColor" fill="none" /></svg>
                Milestones
              </div>
              <div className="pui-nav-item">
                <svg viewBox="0 0 13 13"><path d="M2 9V3a1 1 0 011-1h7a1 1 0 011 1v5a1 1 0 01-1 1H4L2 11V9z" stroke="currentColor" fill="none" /></svg>
                Feedback
              </div>
              <div className="pui-nav-item">
                <svg viewBox="0 0 13 13"><path d="M6.5 1.5v7M3.5 5.5l3 3 3-3" /><path d="M1.5 10.5h11" stroke="currentColor" fill="none" /></svg>
                Assets
              </div>
            </div>
            <div className="pui-main">
              <div className="pui-section-label">Active Engagements</div>
              <div className="pui-cards">
                <div className="pui-card">
                  <div className="pui-card-label">Active Briefs</div>
                  <div className="pui-card-val chrome-text">3</div>
                </div>
                <div className="pui-card">
                  <div className="pui-card-label">Pending Review</div>
                  <div className="pui-card-val" style={{ color: "var(--gold)" }}>2</div>
                </div>
                <div className="pui-card">
                  <div className="pui-card-label">Assets Delivered</div>
                  <div className="pui-card-val" style={{ color: "var(--aqua)" }}>18</div>
                </div>
              </div>
              <div className="pui-section-label">Current Projects</div>
              <div className="pui-table-head">
                <span>Project</span>
                <span>Milestone</span>
                <span>Due</span>
                <span>Status</span>
              </div>
              <div className="pui-table-row">
                <span>Brand Identity System</span>
                <span className="pui-label">Phase 2</span>
                <span className="pui-label">14 Mar</span>
                <span><span className="pui-badge badge-active">Active</span></span>
              </div>
              <div className="pui-table-row">
                <span>Digital Style Guide</span>
                <span className="pui-label">Review</span>
                <span className="pui-label">18 Mar</span>
                <span><span className="pui-badge badge-review">Review</span></span>
              </div>
              <div className="pui-table-row">
                <span>Credentials Deck</span>
                <span className="pui-label">Complete</span>
                <span className="pui-label">03 Mar</span>
                <span><span className="pui-badge badge-done">Done</span></span>
              </div>
            </div>
          </div>
          <div className="platform-ui-footer">
            <span className="pui-note">National Communications Agency · Private Workspace</span>
            <div className="pui-status">
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--aqua)", animation: "dashPulse 2s ease-in-out infinite" }} />
              <span className="pui-note">Platform live</span>
            </div>
          </div>
        </div>
      </section>

      {/* 05 · Differentiators */}
      <section className="diff section-pad" id="studio">
        <span className="eyebrow">05 · Why BRANSOL</span>
        <h2 className="section-title">What sets us apart</h2>
        <div className="diff-grid">
          {diffCards.map((card) => (
            <div key={card.title} className="diff-card">
              <div className="diff-icon" style={{ color: card.color }}>
                <svg viewBox="0 0 20 20"><rect x="2" y="2" width="16" height="16" rx="1" /><path d="M6 7h8M6 11h5M6 15h3" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>
              </div>
              <div className="diff-title">{card.title}</div>
              <p className="diff-body">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 06 · Begin */}
      <section className="begin section-pad" id="begin">
        <div className="begin-inner">
          <div>
            <span className="eyebrow">06 · Begin</span>
            <h2 className="begin-headline">Ready to<br /><span className="chrome-text">begin.</span></h2>
            <p className="begin-text">We take on a limited number of commissions each year. Every engagement begins with a conversation — not a brief form, not a quote request. Tell us about your organisation and what you are trying to achieve.</p>
          </div>
          <div className="begin-right">
            <Link href="/begin" className="btn-primary">
              Start a conversation
              <svg viewBox="0 0 14 14"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
            </Link>
            <a href="mailto:hello@bransol.co.za" className="begin-email">
              <svg viewBox="0 0 14 14"><rect x="1" y="3" width="12" height="9" rx="1" /><path d="M1 4l6 5 6-5" stroke="currentColor" fill="none" /></svg>
              hello@bransol.co.za
            </a>
            <Link href="/work" className="btn-ghost">
              <span className="btn-ghost-line" />View our work first
            </Link>
            <div className="begin-note">Johannesburg, South Africa · bransol.com/begin</div>
          </div>
        </div>
      </section>
    </>
  );
}
