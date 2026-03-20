"use client";

import { useMemo, useState } from "react";
import {
  PROJECTS,
  SECTORS,
  DISCIPLINES,
  disciplineToFilter,
  type WorkProject,
} from "@/lib/work-projects";
import { WORK_CASE_STUDIES } from "@/lib/work-case-studies";
import { ProjectCard } from "@/components/site/ProjectCard";

function projectMatchesSector(p: WorkProject, sector: string): boolean {
  if (sector === "All") return true;
  return p.sector === sector;
}

function projectMatchesDiscipline(p: WorkProject, discipline: string): boolean {
  if (discipline === "All") return true;
  return p.disciplines.some(
    (d) => disciplineToFilter[d] === discipline || d === discipline
  );
}

export function WorkPageClient() {
  const [sector, setSector] = useState<string>("All");
  const [discipline, setDiscipline] = useState<string>("All");

  const filtered = useMemo(() => {
    return PROJECTS.filter(
      (p) =>
        projectMatchesSector(p, sector) && projectMatchesDiscipline(p, discipline)
    );
  }, [sector, discipline]);

  const projectYears = PROJECTS.map((p) => Number(p.year)).filter((n) => Number.isFinite(n));
  const minYear = projectYears.length ? Math.min(...projectYears) : 2019;
  const maxYear = projectYears.length ? Math.max(...projectYears) : 2026;
  const sectorsCount = new Set(PROJECTS.map((p) => p.sector)).size;

  return (
    <>
      {/* Hero */}
      <section className="work-hero">
        <div className="work-hero-inner">
          <div>
            <span className="work-hero-eyebrow">Selected Work</span>
            <h1 className="work-hero-title">
              The
              <br />
              <span className="chrome-text">archive.</span>
            </h1>
          </div>
          <div>
            <p className="work-hero-desc">
              A selected record of BRANSOL commissions. We do not publish
              everything — only work we are prepared to stand behind completely.
              Each project is shown with the client&apos;s knowledge and
              permission.
            </p>
            <p className="work-hero-note">
              {PROJECTS.length} projects · {minYear}–{maxYear} · Across {sectorsCount} sectors
            </p>
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <div className="work-filter-section">
        <div className="work-filter-inner">
          <div className="work-filter-group">
            <span className="work-filter-group-label">Sector</span>
            <div className="work-filter-pills">
              {SECTORS.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`work-filter-btn ${sector === s ? "active" : ""}`}
                  onClick={() => setSector(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="work-filter-group">
            <span className="work-filter-group-label">Discipline</span>
            <div className="work-filter-pills">
              {DISCIPLINES.map((d) => (
                <button
                  key={d}
                  type="button"
                  className={`work-filter-btn ${discipline === d ? "active" : ""}`}
                  onClick={() => setDiscipline(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div className="work-filter-count">
            <span className="work-count-label">Showing </span>
            <span className="work-count-num">{filtered.length} projects</span>
          </div>
        </div>
      </div>

      {/* Archive grid */}
      <section className="work-archive">
        <div className="work-project-grid">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              cardImageSrc={
                WORK_CASE_STUDIES[project.id]?.images.cardHero?.src ??
                WORK_CASE_STUDIES[project.id]?.images.hero.src ??
                null
              }
            />
          ))}
        </div>
      </section>
    </>
  );
}
