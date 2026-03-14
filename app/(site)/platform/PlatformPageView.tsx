"use client";

import { useState } from "react";
import Link from "next/link";

type MockTab = "projects" | "deliverables" | "billing";

export function PlatformPageView() {
  const [mockTab, setMockTab] = useState<MockTab>("projects");

  return (
    <div className="platform-page">
      <section className="hero">
        <div className="hero-inner">
          <div>
            <span className="hero-eyebrow">Client Platform</span>
            <h1 className="hero-title">
              Your work.
              <br />
              <span className="chrome-text">One place.</span>
              <br />
              Always.
            </h1>
          </div>
          <div className="hero-right">
            <div className="hero-included">
              <div className="hi-dot" />
              <span className="hi-text">Included with every engagement — no extra cost</span>
            </div>
            <p className="hero-desc">
              Every BRANSOL commission includes a dedicated client workspace. Not a shared folder. Not an email thread. A structured environment built for institutional work — with full audit trails, live milestone tracking, AI-assisted workflows, and direct integration with Asana and Figma.
            </p>
            <div className="hero-stats">
              <div className="hs-item">
                <div className="hs-num chrome-text">94%</div>
                <div className="hs-label">Client retention rate</div>
              </div>
              <div className="hs-divider" />
              <div className="hs-item">
                <div className="hs-num chrome-text">48h</div>
                <div className="hs-label">Average response time</div>
              </div>
              <div className="hs-divider" />
              <div className="hs-item">
                <div className="hs-num chrome-text">0</div>
                <div className="hs-label">Lost deliverables</div>
              </div>
            </div>
            <div className="honest-callout">
              <span className="hc-label">Honest assessment</span>
              <p className="hc-text">
                This platform was not built to impress. It was built because our government and institutional clients required documented approvals, audit trails, and structured delivery records. We built it. Now we include it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mock-wrap">
        <div className="mock-label">
          <div className="mock-label-dot" />
          Live Platform Preview — BRANSOL Client Workspace
        </div>
        <div className="mock-shell">
          <div className="mock-header">
            <div className="mh-logo">
              <span className="chrome-text">BRAN</span>
              <span>SOL</span>
              <span className="mh-badge">Client Platform</span>
            </div>
            <div className="mh-right">
              <div className="mh-tabs">
                <button
                  type="button"
                  className={`mh-tab ${mockTab === "projects" ? "active" : ""}`}
                  onClick={() => setMockTab("projects")}
                >
                  Projects
                </button>
                <button
                  type="button"
                  className={`mh-tab ${mockTab === "deliverables" ? "active" : ""}`}
                  onClick={() => setMockTab("deliverables")}
                >
                  Deliverables
                </button>
                <button
                  type="button"
                  className={`mh-tab ${mockTab === "billing" ? "active" : ""}`}
                  onClick={() => setMockTab("billing")}
                >
                  Billing
                </button>
              </div>
              <span className="mh-org">National Communications Agency</span>
              <div className="mh-avatar">NCA</div>
            </div>
          </div>

          <div className="mock-body">
            <div className="mock-sidebar">
              <div className="ms-section">
                <span className="ms-label">Workspace</span>
                <div className="ms-item active">
                  <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <rect x="1" y="1" width="5" height="5" />
                    <rect x="7" y="1" width="5" height="5" />
                    <rect x="1" y="7" width="5" height="5" />
                    <rect x="7" y="7" width="5" height="5" />
                  </svg>
                  Overview
                </div>
                <div className="ms-item">
                  <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <rect x="1" y="2" width="11" height="9" rx="1" />
                    <path d="M4 5h5M4 8h3" />
                  </svg>
                  Briefs
                </div>
                <div className="ms-item">
                  <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <circle cx="6.5" cy="6.5" r="5" />
                    <path d="M6.5 3.5v3l2 1.5" />
                  </svg>
                  Milestones
                </div>
                <div className="ms-item">
                  <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M2 9V3a1 1 0 011-1h7a1 1 0 011 1v5a1 1 0 01-1 1H4L2 11V9z" />
                  </svg>
                  Feedback
                </div>
                <div className="ms-item">
                  <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M6.5 1.5v7M3.5 5.5l3 3 3-3" />
                    <path d="M1.5 10.5h11" />
                  </svg>
                  Assets
                </div>
              </div>
              <div className="ms-section">
                <span className="ms-label">Integrations</span>
                <div className="ms-asana">
                  <div className="ms-asana-dot" />
                  Asana Sync
                </div>
                <div className="ms-item">
                  <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M6.5 2c-2.5 3-4 5.5-4 7.5 0 2 1.5 3 4 3.5" />
                    <path d="M6.5 2c2.5 3 4 5.5 4 7.5 0 2-1.5 3-4 3.5" />
                  </svg>
                  AI Assistant
                </div>
              </div>
            </div>

            <div className="mock-main">
              {mockTab === "projects" && (
                <>
                  <div className="mm-heading">Active Engagements</div>
                  <div className="mm-sub">3 active · 1 in review · Updated now</div>
                  <div className="mock-projects">
                    <div className="mp-card mp-active">
                      <div className="mp-bar" style={{ background: "var(--iris)" }} />
                      <div className="mp-info">
                        <div className="mp-name">Brand Identity Redesign</div>
                        <div className="mp-phase">Phase 3 of 5 · Visual System Development</div>
                      </div>
                      <div className="mp-progress-wrap">
                        <div className="mp-pct" style={{ color: "var(--iris)" }}>68%</div>
                        <div className="mp-track">
                          <div className="mp-fill" style={{ width: "68%", background: "var(--iris)" }} />
                        </div>
                      </div>
                      <div className="mp-meta">
                        <span className="mp-tag" style={{ color: "var(--iris)", borderColor: "rgba(124,131,229,.3)" }}>Active</span>
                        <span className="mp-days">5d to milestone</span>
                      </div>
                    </div>
                    <div className="mp-card">
                      <div className="mp-bar" style={{ background: "var(--r4)" }} />
                      <div className="mp-info">
                        <div className="mp-name">Annual Report 2025</div>
                        <div className="mp-phase">Phase 2 of 4 · Content Layout</div>
                      </div>
                      <div className="mp-progress-wrap">
                        <div className="mp-pct" style={{ color: "var(--r4)" }}>30%</div>
                        <div className="mp-track">
                          <div className="mp-fill" style={{ width: "30%", background: "var(--r4)" }} />
                        </div>
                      </div>
                      <div className="mp-meta">
                        <span className="mp-tag" style={{ color: "var(--r4)", borderColor: "rgba(6,214,160,.3)" }}>Active</span>
                        <span className="mp-days">12d to milestone</span>
                      </div>
                    </div>
                    <div className="mp-card">
                      <div className="mp-bar" style={{ background: "var(--r3)" }} />
                      <div className="mp-info">
                        <div className="mp-name">Digital Design System</div>
                        <div className="mp-phase">Phase 1 of 3 · Discovery</div>
                      </div>
                      <div className="mp-progress-wrap">
                        <div className="mp-pct" style={{ color: "var(--r3)" }}>0%</div>
                        <div className="mp-track">
                          <div className="mp-fill" style={{ width: "0%", background: "var(--r3)" }} />
                        </div>
                      </div>
                      <div className="mp-meta">
                        <span className="mp-tag" style={{ color: "var(--r3)", borderColor: "rgba(255,209,102,.3)" }}>Starting</span>
                        <span className="mp-days">Kick-off 20 Mar</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
              {mockTab === "deliverables" && (
                <>
                  <div className="mm-heading">Deliverables</div>
                  <div className="mm-sub">3 awaiting your review · 18 approved</div>
                  <div className="mock-deliv-list">
                    <div className="md-item md-review">
                      <div className="md-icon">
                        <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
                          <rect x="2" y="2" width="10" height="10" rx="1" />
                          <path d="M4 7h6M4 9.5h4" strokeWidth="1.2" />
                        </svg>
                      </div>
                      <div className="md-info">
                        <div className="md-name">Brand Guidelines v2 — Final</div>
                        <div className="md-meta">PDF · 4.2MB · Uploaded 12 Mar 2026</div>
                      </div>
                      <span className="md-status md-s-review">Needs Review</span>
                    </div>
                    <div className="md-item md-review">
                      <div className="md-icon">
                        <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
                          <rect x="2" y="2" width="10" height="10" rx="1" />
                          <path d="M5 5h4M5 7.5h4M5 10h2" strokeWidth="1.2" />
                        </svg>
                      </div>
                      <div className="md-info">
                        <div className="md-name">Logo System — All Variants</div>
                        <div className="md-meta">ZIP · 12.8MB · Uploaded 10 Mar 2026</div>
                      </div>
                      <span className="md-status md-s-review">Needs Review</span>
                    </div>
                    <div className="md-item md-approved">
                      <div className="md-icon">
                        <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
                          <rect x="2" y="2" width="10" height="10" rx="1" />
                          <path d="M4.5 7l2 2 3-3" />
                        </svg>
                      </div>
                      <div className="md-info">
                        <div className="md-name">Brand Strategy Deck</div>
                        <div className="md-meta">PPTX · 8.1MB · Approved 05 Mar 2026</div>
                      </div>
                      <span className="md-status md-s-approved">Approved</span>
                    </div>
                    <div className="md-item md-approved">
                      <div className="md-icon">
                        <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
                          <rect x="2" y="2" width="10" height="10" rx="1" />
                          <path d="M4.5 7l2 2 3-3" />
                        </svg>
                      </div>
                      <div className="md-info">
                        <div className="md-name">Colour & Typography System</div>
                        <div className="md-meta">PDF · 2.4MB · Approved 28 Feb 2026</div>
                      </div>
                      <span className="md-status md-s-approved">Approved</span>
                    </div>
                  </div>
                </>
              )}
              {mockTab === "billing" && (
                <>
                  <div className="mm-heading">Billing & Invoices</div>
                  <div className="mm-sub">2 outstanding · R75,000 due</div>
                  <div className="mock-billing-list">
                    <div className="mb-item">
                      <div className="mb-info">
                        <div className="mb-num">INV-2025-047</div>
                        <div className="mb-desc">Brand Identity Redesign — Phase 3</div>
                      </div>
                      <div className="mb-amount" style={{ color: "var(--r3)" }}>R45,000</div>
                      <span className="mb-status mb-s-due">Due 20 Mar</span>
                    </div>
                    <div className="mb-item">
                      <div className="mb-info">
                        <div className="mb-num">INV-2025-046</div>
                        <div className="mb-desc">Annual Report 2025 — Phase 1 & 2</div>
                      </div>
                      <div className="mb-amount" style={{ color: "var(--r3)" }}>R30,000</div>
                      <span className="mb-status mb-s-due">Due 28 Mar</span>
                    </div>
                    <div className="mb-item">
                      <div className="mb-info">
                        <div className="mb-num">INV-2025-041</div>
                        <div className="mb-desc">Brand Strategy & Discovery Phase</div>
                      </div>
                      <div className="mb-amount">R22,000</div>
                      <span className="mb-status mb-s-paid">Paid</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="mock-ai">
              <div className="mai-header">
                <div className="mai-icon">
                  <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 1c-1.5 2.2-2 4-2 5.5 0 1.5.7 2.5 2 3" />
                    <path d="M5 1c1.5 2.2 2 4 2 5.5 0 1.5-.7 2.5-2 3" />
                  </svg>
                </div>
                <span className="mai-title">BRANSOL AI</span>
              </div>
              <div className="mai-body">
                <div className="mai-msg ai">
                  <strong>2 deliverables need your review.</strong> Brand Guidelines v2 has been waiting 48 hours. Shall I draft a reminder to the relevant approvers?
                </div>
                <div className="mai-msg user">Yes, send to the marketing director.</div>
                <div className="mai-msg ai">
                  Done. I&apos;ve also noted that your milestone on 20 March depends on this approval. If it&apos;s not signed off by Thursday, I&apos;ll flag it as at-risk.
                </div>
              </div>
              <div className="mai-input">
                <input className="mai-input-field" placeholder="Ask BRANSOL AI…" readOnly />
                <div className="mai-send">
                  <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 5h8M6 2l3 3-3 3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="why-section">
        <div className="why-header">
          <div>
            <span className="why-eyebrow">The Case For It</span>
            <h2 className="why-title">
              Why a client
              <br />
              <span className="chrome-text">platform matters</span>
              <br />
              for serious work.
            </h2>
          </div>
          <div className="why-right">
            <p>
              Most agencies manage projects over WhatsApp groups and shared Google Drives. That works fine for small, fast-turnaround work. It breaks down for institutional commissions where accountability, traceability, and documentation are not optional.
            </p>
            <p>
              The BRANSOL platform was built specifically for the procurement realities our clients navigate: formal approval chains, audit requirements, multi-stakeholder reviews, and the need for a complete paper trail from brief to final delivery.
            </p>
          </div>
        </div>
        <div className="why-grid">
          <div className="why-block">
            <div className="wb-icon">
              <svg viewBox="0 0 20 20" fill="none" stroke="var(--iris)" strokeWidth="1.5">
                <path d="M2 14V6a1 1 0 011-1h14a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1z" />
                <path d="M5 9h10M5 12h7" />
              </svg>
            </div>
            <div className="wb-title">Audit Trails</div>
            <div className="wb-text">Every approval, revision, and decision is timestamped and documented. For government and listed-company clients, this is not a nice-to-have — it is a procurement requirement.</div>
            <div className="wb-verdict" style={{ color: "var(--iris)" }}>Critical for institutional clients</div>
          </div>
          <div className="why-block">
            <div className="wb-icon">
              <svg viewBox="0 0 20 20" fill="none" stroke="var(--r4)" strokeWidth="1.5">
                <circle cx="10" cy="10" r="8" />
                <path d="M10 6v4l3 3" />
              </svg>
            </div>
            <div className="wb-title">Real-Time Visibility</div>
            <div className="wb-text">Clients see exactly where their project stands — without chasing. Live milestone tracking synced with our Asana workspace means you always have an accurate, current picture.</div>
            <div className="wb-verdict" style={{ color: "var(--r4)" }}>Removes the status-email cycle</div>
          </div>
          <div className="why-block">
            <div className="wb-icon">
              <svg viewBox="0 0 20 20" fill="none" stroke="var(--r3)" strokeWidth="1.5">
                <path d="M3 3h14v11H3z" />
                <path d="M7 17h6M10 14v3" />
                <path d="M7 7h6M7 10h4" />
              </svg>
            </div>
            <div className="wb-title">Structured Briefs</div>
            <div className="wb-text">Ambiguous briefs are the leading cause of expensive revisions. Our platform enforces structured brief documentation — every scope, constraint, and success criterion agreed and signed off before work begins.</div>
            <div className="wb-verdict" style={{ color: "var(--r3)" }}>Prevents scope creep</div>
          </div>
          <div className="why-block">
            <div className="wb-icon">
              <svg viewBox="0 0 20 20" fill="none" stroke="var(--r8)" strokeWidth="1.5">
                <path d="M10 2l2.5 5.5L18 8.5l-4 3.9 1 5.6L10 15l-5 3 1-5.6-4-3.9 5.5-.9L10 2z" />
              </svg>
            </div>
            <div className="wb-title">Multi-Stakeholder Access</div>
            <div className="wb-text">CEOs, marketing heads, and procurement officers all need different levels of visibility. Role-based access means each stakeholder sees exactly what they need — nothing more.</div>
            <div className="wb-verdict" style={{ color: "var(--r8)" }}>Built for committee decisions</div>
          </div>
          <div className="why-block">
            <div className="wb-icon">
              <svg viewBox="0 0 20 20" fill="none" stroke="var(--r1)" strokeWidth="1.5">
                <path d="M10 2v8M6 6l4-4 4 4" />
                <path d="M3 16h14v2H3z" />
                <path d="M5 10v6M10 10v6M15 10v6" />
              </svg>
            </div>
            <div className="wb-title">Permanent Asset Archive</div>
            <div className="wb-text">Files delivered through the platform are permanently archived and versioned. Returning clients have full access to every asset ever produced — no hunting through old emails or outdated shared drives.</div>
            <div className="wb-verdict" style={{ color: "var(--r1)" }}>No lost files, ever</div>
          </div>
          <div className="why-block">
            <div className="wb-icon">
              <svg viewBox="0 0 20 20" fill="none" stroke="var(--r6)" strokeWidth="1.5">
                <path d="M15 8a5 5 0 00-10 0c0 3.5 5 9 5 9s5-5.5 5-9z" />
                <circle cx="10" cy="8" r="2" />
              </svg>
            </div>
            <div className="wb-title">Continuity Across Projects</div>
            <div className="wb-text">Your organisation&apos;s history, preferences, and brand context are stored permanently. Each new commission begins informed — not from a blank slate. For long-term clients, this compounds in value.</div>
            <div className="wb-verdict" style={{ color: "var(--r6)" }}>The longer you work with us</div>
          </div>
        </div>
      </section>

      <section className="integrations">
        <div className="int-header">
          <span className="int-eyebrow">Integrations</span>
          <h2 className="int-title">
            Built on tools
            <br />
            <span className="chrome-text">you already trust.</span>
          </h2>
          <p className="int-desc">
            We do not ask clients to learn a new system. Our platform integrates directly with Asana for project management and Claude AI for intelligent workflow assistance — tools that are already best-in-class.
          </p>
        </div>
        <div className="int-grid">
          <div className="integration-card">
            <div className="ic-header">
              <div className="ic-logo">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="20" r="6" fill="#F06A6A" />
                  <circle cx="8" cy="12" r="5" fill="#F06A6A" opacity="0.7" />
                  <circle cx="24" cy="12" r="5" fill="#F06A6A" opacity="0.7" />
                </svg>
              </div>
              <div className="ic-meta">
                <div className="ic-name">Asana</div>
                <div className="ic-type">Project Management · Live Sync</div>
              </div>
            </div>
            <p className="ic-desc">
              Every project milestone, task, and deadline managed in Asana — synced in real time to your client workspace. You see our project board. We see your feedback. No duplication, no gaps.
            </p>
            <div className="ic-features">
              {["Live task status synced to your workspace dashboard", "Milestone notifications sent directly to your preferred email", "Approval workflows documented and timestamped in Asana", "Client-facing view strips out internal studio notes automatically", "Full project history exportable as PDF for procurement records"].map((f) => (
                <div key={f} className="ic-feature">
                  <span className="ic-feat-dot" style={{ background: "#F06A6A" }} />
                  {f}
                </div>
              ))}
            </div>
            <div className="ic-badge">
              <div className="ic-badge-dot" style={{ background: "#F06A6A" }} />
              Live integration · Zero setup for clients
            </div>
          </div>
          <div className="integration-card">
            <div className="ic-header">
              <div className="ic-logo">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 4c-2.8 4.5-4.5 8.5-4.5 12 0 3.2 1.8 5.5 4.5 7" stroke="#D97757" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M16 4c2.8 4.5 4.5 8.5 4.5 12 0 3.2-1.8 5.5-4.5 7" stroke="#D97757" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="ic-meta">
                <div className="ic-name">Claude AI</div>
                <div className="ic-type">AI Workflow Assistant · Always On</div>
              </div>
            </div>
            <p className="ic-desc">
              BRANSOL AI — powered by Claude — is embedded across our entire workflow. From brief analysis to stakeholder communication drafts, it handles the administrative and analytical work so our designers focus on design.
            </p>
            <div className="ic-features">
              {["Brief analysis — flags ambiguities before work begins", "Stakeholder update drafting — tone-matched to your organisation", "Feedback summarisation — consolidates multi-stakeholder comments", "Milestone risk flagging — predicts delays before they happen", "Document generation — briefs, specs, reports, approval records"].map((f) => (
                <div key={f} className="ic-feature">
                  <span className="ic-feat-dot" style={{ background: "#D97757" }} />
                  {f}
                </div>
              ))}
            </div>
            <div className="ic-badge">
              <div className="ic-badge-dot" style={{ background: "#D97757" }} />
              Anthropic Claude · Enterprise-grade privacy
            </div>
          </div>
          <div className="integration-card">
            <div className="ic-header">
              <div className="ic-logo">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M13 27a4 4 0 100-8 4 4 0 000 8z" fill="#1ABCFE" />
                  <path d="M9 15a4 4 0 018 0 4 4 0 01-8 0z" fill="#FF7262" />
                  <path d="M9 7a4 4 0 008 0 4 4 0 00-8 0z" fill="#F24E1E" />
                  <path d="M17 7h4a4 4 0 110 8h-4V7z" fill="#FF7262" />
                  <path d="M21 15a4 4 0 110 8 4 4 0 010-8z" fill="#A259FF" />
                </svg>
              </div>
              <div className="ic-meta">
                <div className="ic-name">Figma</div>
                <div className="ic-type">Design Review · Comment Sync</div>
              </div>
            </div>
            <p className="ic-desc">
              Design deliverables shared directly via Figma — clients can view, comment, and approve without needing a Figma account. Comments feed back into the project record automatically.
            </p>
            <div className="ic-features">
              {["View-only client access — no account required", "Contextual comments pinned to specific design elements", "Version history showing every design iteration", "Approval status tracked and logged per deliverable"].map((f) => (
                <div key={f} className="ic-feature">
                  <span className="ic-feat-dot" style={{ background: "#A259FF" }} />
                  {f}
                </div>
              ))}
            </div>
            <div className="ic-badge">
              <div className="ic-badge-dot" style={{ background: "#A259FF" }} />
              No Figma account needed for clients
            </div>
          </div>
          <div className="integration-card">
            <div className="ic-header">
              <div className="ic-logo">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="4" y="8" width="24" height="17" rx="2" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M4 12l12 8 12-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </div>
              <div className="ic-meta">
                <div className="ic-name">Smart Notifications</div>
                <div className="ic-type">Email · Digest · Escalation</div>
              </div>
            </div>
            <p className="ic-desc">
              Notifications configured to your organisation&apos;s preferences — daily digest, real-time alerts for approvals, or escalation triggers when milestones are at risk. You control the cadence.
            </p>
            <div className="ic-features">
              {["Configurable digest — daily, weekly, or milestone-triggered", "Approval reminders with AI-drafted follow-up messages", "Escalation alerts when approval delays risk milestone dates", "Multi-recipient support for complex stakeholder structures"].map((f) => (
                <div key={f} className="ic-feature">
                  <span className="ic-feat-dot" style={{ background: "var(--iris)" }} />
                  {f}
                </div>
              ))}
            </div>
            <div className="ic-badge">
              <div className="ic-badge-dot" style={{ background: "var(--iris)" }} />
              Configured per engagement on setup
            </div>
          </div>
        </div>
      </section>

      <section className="ai-section">
        <div className="ai-header">
          <div>
            <span className="ai-eyebrow">AI Workflows</span>
            <h2 className="ai-title">
              Where AI does
              <br />
              <span className="chrome-text">the heavy lifting.</span>
            </h2>
          </div>
          <div className="ai-right">
            <p>
              We are honest about how we use AI. It does not design for us. It handles the operational and analytical work that used to consume hours of senior designer time — so that senior designer time goes to your work instead.
            </p>
            <p>Every AI output is reviewed by a human before it reaches a client. Always.</p>
          </div>
        </div>
        <div className="ai-rows">
          {[
            { num: "01", title: "Brief Analysis & Ambiguity Detection", desc: "When a brief arrives, Claude reads it and flags any ambiguous scope, missing constraints, or conflicting objectives — before any design work starts. Saves 2–3 revision rounds on average.", tools: ["Claude", "Asana"] },
            { num: "02", title: "Stakeholder Communication Drafting", desc: "Update emails, approval requests, and follow-ups drafted in your organisation's tone. Our team reviews and sends. What used to take 20 minutes takes 2.", tools: ["Claude"] },
            { num: "03", title: "Multi-Stakeholder Feedback Consolidation", desc: "When five people send five different sets of feedback, AI consolidates, de-duplicates, and identifies conflicts — delivering a single coherent instruction set to the design team.", tools: ["Claude", "Figma"] },
            { num: "04", title: "Milestone Risk Prediction", desc: "By analysing approval velocity and task completion patterns, AI flags when a project is drifting before a deadline is actually missed — giving all parties time to act.", tools: ["Claude", "Asana"] },
            { num: "05", title: "AI-Assisted Design Research", desc: "Competitor brand audits, sector visual analysis, and trend research — processed at speed. Human designers still make the creative judgements; AI gives them better raw material to judge against.", tools: ["Claude", "Midjourney"] },
            { num: "06", title: "Automated Procurement Documentation", desc: "For formal tender engagements: AI generates delivery schedules, compliance checklists, and project registers in the format required by procurement frameworks — ready for submission.", tools: ["Claude", "Asana"] },
          ].map((row) => (
            <div key={row.num} className="ai-row">
              <span className="ar-num">{row.num}</span>
              <div className="ar-body">
                <div className="ar-title">{row.title}</div>
                <div className="ar-desc">{row.desc}</div>
              </div>
              <div className="ar-tools">
                {row.tools.map((t) => (
                  <span key={t} className="ar-tool">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="verdict">
        <div className="verdict-inner">
          <div>
            <span className="v-eyebrow">The Honest Verdict</span>
            <h2 className="v-title">
              Is the platform
              <br />
              <span className="chrome-text">worth it?</span>
            </h2>
            <div className="v-body">
              <p>
                For organisations that commission design through formal procurement channels — government entities, state-owned enterprises, listed companies, professional services firms — <strong>yes, unambiguously.</strong>
              </p>
              <p>
                The platform exists because our clients needed it. We were repeatedly asked for documented approval trails, compliance-ready project records, and structured communication channels. We built rather than patched.
              </p>
              <p>
                For a small business commissioning a once-off logo — <strong>it is probably more than you need.</strong> We would tell you that directly, and we would still deliver your project with the same care. The platform would simply sit unused.
              </p>
              <p>
                The honest case: if your organisation has multiple stakeholders, a formal procurement process, or a need for documented deliverable sign-off — this platform removes friction that otherwise costs real time and real money.
              </p>
            </div>
          </div>
          <div className="honest-panel">
            <div className="hp-title">Where it genuinely helps</div>
            <div className="hp-item">
              <div className="hp-icon" style={{ background: "rgba(6,214,160,.1)", color: "var(--r4)" }}>
                <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 5l2 2 4-4" /></svg>
              </div>
              <div>
                <div className="hp-verdict" style={{ color: "var(--r4)", marginBottom: 4 }}>Government & Public Sector</div>
                <div className="hp-text">Formal procurement requirements demand documented approvals, delivery schedules, and audit-ready project records. The platform generates these automatically.</div>
              </div>
            </div>
            <div className="hp-item">
              <div className="hp-icon" style={{ background: "rgba(6,214,160,.1)", color: "var(--r4)" }}>
                <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 5l2 2 4-4" /></svg>
              </div>
              <div>
                <div className="hp-verdict" style={{ color: "var(--r4)", marginBottom: 4 }}>Listed & Regulated Companies</div>
                <div className="hp-text">JSE-listed companies and regulated entities need version-controlled deliverables and documented change requests. The platform handles this without administrative overhead.</div>
              </div>
            </div>
            <div className="hp-item">
              <div className="hp-icon" style={{ background: "rgba(6,214,160,.1)", color: "var(--r4)" }}>
                <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 5l2 2 4-4" /></svg>
              </div>
              <div>
                <div className="hp-verdict" style={{ color: "var(--r4)", marginBottom: 4 }}>Multi-Stakeholder Commissions</div>
                <div className="hp-text">When five people need to approve a direction, the platform consolidates feedback, tracks who has signed off, and prevents the same conversation happening in three different email threads.</div>
              </div>
            </div>
            <div className="hp-item">
              <div className="hp-icon" style={{ background: "rgba(255,107,157,.08)", color: "var(--r1)" }}>
                <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 8l6-6M8 8L2 2" /></svg>
              </div>
              <div>
                <div className="hp-verdict" style={{ color: "var(--r1)", marginBottom: 4 }}>Small once-off commissions</div>
                <div className="hp-text">If you need a single deliverable with one decision-maker, the platform adds more structure than the project requires. We will still deliver well — the platform just will not see much use.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-cta">
        <div>
          <h2 className="cta-title">
            Experience it
            <br />
            <span className="chrome-text">on your commission.</span>
          </h2>
        </div>
        <div className="cta-actions">
          <Link href="/begin" className="cta-btn-primary">Begin a commission</Link>
          <Link href="/expertise" className="cta-btn-ghost">View expertise</Link>
        </div>
      </section>
    </div>
  );
}
