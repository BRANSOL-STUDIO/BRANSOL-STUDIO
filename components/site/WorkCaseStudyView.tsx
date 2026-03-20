import Link from "next/link";
import type { CSSProperties } from "react";

import type { WorkCaseStudy } from "@/lib/work-case-studies";
import type { WorkProject } from "@/lib/work-projects";
import { ProjectCard } from "@/components/site/ProjectCard";
import WorkGlobtekBrandingView from "@/components/site/WorkGlobtekBrandingView";

function sectorColor(sector: string): string {
  switch (sector) {
    case "Government":
      return "var(--iris)";
    case "Financial Services":
      return "var(--aqua)";
    case "Infrastructure":
      return "var(--gold)";
    case "Healthcare":
      return "var(--violet)";
    case "Professional Services":
      return "var(--sky)";
    case "Energy":
      return "var(--teal)";
    case "Education":
      return "var(--rose)";
    default:
      return "var(--ter)";
  }
}

function sectorBorder(sector: string): string {
  switch (sector) {
    case "Government":
      return "rgba(124,131,229,.35)";
    case "Financial Services":
      return "rgba(6,214,160,.35)";
    case "Infrastructure":
      return "rgba(255,209,102,.35)";
    case "Healthcare":
      return "rgba(199,125,255,.35)";
    case "Professional Services":
      return "rgba(69,183,209,.35)";
    case "Energy":
      return "rgba(78,205,196,.35)";
    case "Education":
      return "rgba(255,107,157,.35)";
    default:
      return "var(--border)";
  }
}

export default function WorkCaseStudyView({
  caseStudy,
  relatedProjects,
}: {
  caseStudy: WorkCaseStudy;
  relatedProjects: WorkProject[];
}) {
  if (caseStudy.variant === "globtek-branding") {
    return <WorkGlobtekBrandingView caseStudy={caseStudy} relatedProjects={relatedProjects} />;
  }

  const sc = sectorColor(caseStudy.sector);
  const sb = sectorBorder(caseStudy.sector);

  const disciplines = caseStudy.disciplines ?? [];
  const primaryDiscipline = disciplines[0] ?? "";
  const secondaryDiscipline = disciplines[1] ?? "";

  const cssVars = {
    "--accent": caseStudy.accentColor,
    "--accent-hex": caseStudy.accentHex,
  } as CSSProperties;

  return (
    <div style={cssVars}>
      <section className="cs-hero">
        <div className="breadcrumb">
          <Link href="/work">Work</Link>
          <span className="bc-sep">·</span>
          <span>{caseStudy.sector}</span>
          <span className="bc-sep">·</span>
          <span>{caseStudy.name}</span>
        </div>

        <div className="hero-split">
          <div className="hero-left">
            <div className="hero-sector" style={{ color: sc, borderColor: sb }}>
              {caseStudy.sector} · {caseStudy.year}
            </div>
            <h1 className="hero-title">{caseStudy.name}</h1>
            <span className="hero-discipline">{caseStudy.disciplineLabel}</span>
            <p className="hero-excerpt">{caseStudy.excerpt}</p>
          </div>

          <div className="hero-right">
            <div className="stat-pills">
              <div className="stat-pill">
                <span className="sp-label">Duration</span>
                <span className="sp-val">{caseStudy.stats.duration}</span>
              </div>
              <div className="stat-pill">
                <span className="sp-label">Scope</span>
                <span className="sp-val" style={{ fontSize: 14 }}>
                  {caseStudy.stats.scope}
                </span>
              </div>
              <div className="stat-pill">
                <span className="sp-label">Team</span>
                <span className="sp-val" style={{ fontSize: 14 }}>
                  {caseStudy.stats.team}
                </span>
              </div>
              <div className="stat-pill">
                <span className="sp-label">Year</span>
                <span className="sp-val">{caseStudy.year}</span>
              </div>
            </div>

            <div className="hero-tags">
              {caseStudy.tags.map((t) => (
                <span key={t} className="hero-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="cs-visual">
        <div className="visual-wrap">
          <img
            src={caseStudy.images.hero.src}
            alt=""
            className="visual-main-img"
          />
          <div className="visual-caption">
            <span>
              {caseStudy.num} · {caseStudy.name}
            </span>
            <span>
              {caseStudy.disciplineLabel} · {caseStudy.year}
            </span>
          </div>
        </div>
      </div>

      <div className="cs-body">
        <div className="cs-main">
          <section className="cs-section">
            <span className="section-eyebrow">Overview</span>
            <div className="cs-text">
              <p>{caseStudy.overview}</p>
            </div>
          </section>

          <div className="challenge-block">
            <span className="cb-label">The challenge</span>
            <p className="cb-text">{caseStudy.challenge}</p>
          </div>

          <section className="cs-section">
            <span className="section-eyebrow">How we worked</span>
            <h2 className="cs-section-title">Process</h2>
            <div className="process-steps">
              {caseStudy.process.map((s, i) => (
                <div className="process-step" key={s.title}>
                  <div className="ps-num">0{i + 1}</div>
                  <div className="ps-body">
                    <div className="ps-title">{s.title}</div>
                    <div className="ps-text">{s.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="cs-section">
            <span className="section-eyebrow">What we delivered</span>
            <h2 className="cs-section-title">Deliverables</h2>
            <div className="deliverable-grid">
              {caseStudy.deliverables.map((d) => (
                <div key={d} className="deliverable-item">
                  <span
                    className="di-dot"
                    style={{ background: caseStudy.accentHex }}
                  />
                  {d}
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="cs-sidebar">
          <div className="meta-block">
            <span className="mb-title">Project details</span>
            <div className="meta-row">
              <span className="mr-label">Client sector</span>
              <span className="mr-val">{caseStudy.sector}</span>
            </div>
            <div className="meta-row">
              <span className="mr-label">Primary discipline</span>
              <span className="mr-val">{primaryDiscipline}</span>
            </div>
            {secondaryDiscipline ? (
              <div className="meta-row">
                <span className="mr-label">Secondary discipline</span>
                <span className="mr-val">{secondaryDiscipline}</span>
              </div>
            ) : null}
            <div className="meta-row">
              <span className="mr-label">Duration</span>
              <span className="mr-val">{caseStudy.stats.duration}</span>
            </div>
            <div className="meta-row">
              <span className="mr-label">Studio team</span>
              <span className="mr-val">{caseStudy.stats.team}</span>
            </div>
            <div className="meta-row">
              <span className="mr-label">Completed</span>
              <span className="mr-val">{caseStudy.year}</span>
            </div>
          </div>

          {caseStudy.bigStat ? (
            <div className="big-stat">
              <div
                className="bs-val"
                style={{ color: caseStudy.accentHex }}
              >
                {caseStudy.bigStat.val}
              </div>
              <span className="bs-label">{caseStudy.bigStat.label}</span>
            </div>
          ) : null}

          <div className="sidebar-cta">
            <span className="sc-label">Commission similar work</span>
            <p className="sc-text">
              If your organisation has a similar brief, we would be glad to hear
              about it.
            </p>
            <Link href="/begin" className="sc-btn">
              Begin a commission
            </Link>
          </div>
        </aside>
      </div>

      {(caseStudy.images.panels?.length ?? 0) >= 2 ? (
        <div className="visual-strip">
          <div className="vs-panel">
            <img src={caseStudy.images.panels?.[0].src} alt="" />
          </div>
          <div className="vs-panel">
            <img
              src={caseStudy.images.panels?.[1].src}
              alt=""
            />
          </div>
          <div className="vs-panel">
            <img
              src={(caseStudy.images.panels?.[2] ?? caseStudy.images.panels?.[0])?.src}
              alt=""
            />
          </div>
        </div>
      ) : null}

      {relatedProjects.length ? (
        <section className="related">
          <div className="related-header">
            <div>
              <span className="related-eyebrow">More work</span>
              <h2 className="related-title">
                Related
                <br />
                <span className="chrome-text">projects.</span>
              </h2>
            </div>
            <Link href="/work" className="related-back">
              ← All work
            </Link>
          </div>

          <div className="related-grid">
            {relatedProjects.map((p) => (
              <div key={p.id} className="related-card">
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

