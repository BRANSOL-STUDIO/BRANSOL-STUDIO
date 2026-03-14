"use client";

import Link from "next/link";
import type { WorkProject } from "@/lib/work-projects";

interface ProjectCardProps {
  project: WorkProject;
}

/** Editorial-style placeholder visual using project accent (gradient + simple shapes) */
function CardVisual({ project }: { project: WorkProject }) {
  const { accentHex, bgStop1, bgStop2 } = project;
  const w = 400;
  const h = project.size === "large" ? 300 : project.size === "medium" ? 267 : 225;
  return (
    <div
      className="work-pc-visual"
      style={{
        background: `linear-gradient(150deg, ${bgStop1} 0%, ${bgStop2} 100%)`,
      }}
    >
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="work-pc-visual-svg"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <rect x="40" y={h / 2 - 40} width={w - 80} height="3" fill={accentHex} opacity="0.4" />
        <rect x="40" y={h / 2 + 37} width={w - 80} height="3" fill={accentHex} opacity="0.4" />
        <rect x="40" y={h / 2 - 40} width="3" height="80" fill={accentHex} opacity="0.25" />
        <rect x={w - 43} y={h / 2 - 40} width="3" height="80" fill={accentHex} opacity="0.25" />
        <text
          x={w / 2}
          y={h / 2 + 8}
          fontFamily="serif"
          fontSize="42"
          fontWeight="900"
          fill={accentHex}
          opacity="0.2"
          textAnchor="middle"
        >
          {project.num}
        </text>
        <rect x="40" y={h / 2 - 40} width={w - 80} height="80" fill={accentHex} opacity="0.03" />
      </svg>
    </div>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  const sizeClass =
    project.size === "large"
      ? "work-pc-large"
      : project.size === "medium"
        ? "work-pc-medium"
        : "work-pc-small";

  return (
    <Link
      href={`/work/${project.id}`}
      className={`work-project-card ${sizeClass}`}
      style={{ borderColor: "rgba(255,255,255,0.09)" }}
    >
      <div className="work-pc-visual-wrap">
        <CardVisual project={project} />
        <div className="work-pc-overlay" aria-hidden>
          <span className="work-pc-overlay-hint">View project</span>
        </div>
      </div>
      <div className="work-pc-info">
        <div className="work-pc-top">
          <span
            className="work-pc-sector"
            style={{ color: project.accentColor, borderColor: project.accentColor }}
          >
            {project.sector}
          </span>
          <span className="work-pc-num">{project.num}</span>
        </div>
        <h2 className="work-pc-name">{project.name}</h2>
        <p className="work-pc-discipline">{project.disciplineLabel}</p>
        <p className="work-pc-excerpt">{project.excerpt}</p>
        <div className="work-pc-footer">
          <span className="work-pc-year">{project.year}</span>
          <span className="work-pc-arrow">
            View
            <svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
