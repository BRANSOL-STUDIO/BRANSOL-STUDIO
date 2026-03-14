"use client";

import { useState } from "react";
import Link from "next/link";
import { DISCIPLINES, TICKER_ITEMS, STACK_TOOLS } from "@/lib/expertise-data";

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M1 11V1h10M1 1l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path d="M5 1v2M5 7v2M1 5h2M7 5h2M2.5 2.5l1 1M6.5 6.5l1 1M2.5 7.5l1-1M6.5 3.5l1-1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function ExpertisePageView() {
  const [openDisc, setOpenDisc] = useState<number | null>(0);

  function toggleDisc(index: number) {
    setOpenDisc((prev) => (prev === index ? null : index));
  }

  return (
    <div className="expertise-page">
      <header className="page-header">
        <div className="ph-inner">
          <div>
            <span className="page-eyebrow">Expertise</span>
            <h1 className="page-title">
              Five<br />
              <span className="chrome-text">disciplines.</span>
              <br />
              One studio.
            </h1>
          </div>
          <div className="page-right">
            <p className="page-desc">
              We do not scatter across verticals. BRANSOL operates with deliberate depth across five interconnected disciplines — each supported by rigorous process, senior craft, and the right tools for institutional-grade work.
            </p>
            <div className="ph-stats">
              <div className="ph-stat">
                <span className="ph-stat-val chrome-text">5</span>
                <span className="ph-stat-label">Core disciplines</span>
              </div>
              <div className="ph-stat">
                <span className="ph-stat-val chrome-text">18+</span>
                <span className="ph-stat-label">Specialised tools</span>
              </div>
              <div className="ph-stat">
                <span className="ph-stat-val chrome-text">94%</span>
                <span className="ph-stat-label">Client retention</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="ticker-wrap">
        <div className="ticker-inner">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((label, i) => (
            <span key={i} className="ticker-item">
              {label}
              <span className="ticker-dot" />
            </span>
          ))}
        </div>
      </div>

      <section className="disciplines">
        {DISCIPLINES.map((d, index) => (
          <div
            key={d.num}
            className={`disc-row ${openDisc === index ? "open" : ""}`}
          >
            <div
              className="disc-header"
              onClick={() => toggleDisc(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleDisc(index);
                }
              }}
              role="button"
              tabIndex={0}
              aria-expanded={openDisc === index}
              aria-controls={`disc-expanded-${index}`}
              id={`disc-header-${index}`}
            >
              <span className="disc-num">{d.num}</span>
              <span className="disc-name">{d.name}</span>
              <span className="disc-tag">
                <span
                  className="disc-tag-dot"
                  style={{ background: d.color }}
                />
                {d.tag}
              </span>
              <span className="disc-arrow" aria-hidden>
                <ArrowIcon />
              </span>
            </div>
            <div
              id={`disc-expanded-${index}`}
              className="disc-expanded"
              role="region"
              aria-labelledby={`disc-header-${index}`}
            >
              <div className="disc-grid">
                <div>
                  <span className="cap-title">Capabilities</span>
                  <ul className="cap-list">
                    {d.capabilities.map((cap, i) => (
                      <li key={i} className="cap-item">
                        <span
                          className="cap-bullet"
                          style={{ background: d.color }}
                        />
                        <span className="cap-text">{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="cap-title">Process</span>
                  <ul className="proc-list">
                    {d.process.map((step, i) => (
                      <li key={i} className="process-step">
                        <span className="ps-num">{String(i + 1).padStart(2, "0")}</span>
                        <div className="ps-body">
                          <span className="ps-title">{step.title}</span>
                          <p className="ps-desc">{step.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="tools-col">
                  <span className="cap-title">Tools</span>
                  <div className="tools-grid">
                    {d.tools.map((t, i) => (
                      <span key={i} className="tool-chip">
                        <span className="tool-icon" aria-hidden />
                        <span className="tool-name">{t.name}</span>
                      </span>
                    ))}
                  </div>
                  <span className="ai-badge">
                    <SparkIcon />
                    {d.aiBadge}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="stack-banner">
        <div className="sb-inner">
          <div className="sb-left">
            <span className="sb-eyebrow">The Stack</span>
            <h2 className="sb-title">
              Our complete<br />
              <span className="chrome-text">tool ecosystem.</span>
            </h2>
            <p className="sb-desc">
              Every engagement draws on a curated stack of industry-standard software and emerging AI tools. We invest continuously in our tools so our clients benefit from efficiency, precision and quality at every stage.
            </p>
          </div>
          <div className="sb-tools">
            {STACK_TOOLS.map((name, i) => (
              <div key={i} className="sb-tool">
                <span className="sb-tool-icon" aria-hidden />
                <span className="sb-tool-name">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-cta">
        <div className="cta-left">
          <span className="cta-eyebrow">Commission</span>
          <h2 className="cta-title">
            Ready to begin<br />
            <span className="chrome-text">a commission?</span>
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
