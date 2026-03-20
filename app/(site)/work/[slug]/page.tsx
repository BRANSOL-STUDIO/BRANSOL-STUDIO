import { notFound } from "next/navigation";

import { PROJECTS } from "@/lib/work-projects";
import { WORK_CASE_STUDIES } from "@/lib/work-case-studies";
import WorkCaseStudyView from "@/components/site/WorkCaseStudyView";

// Placeholder: fetch case study by slug from Supabase
export default async function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const caseStudy = WORK_CASE_STUDIES[slug];
  if (!caseStudy) {
    return (
      <section className="relative z-10 px-6 py-20 md:px-[72px] md:py-24 border-b border-[var(--border)]">
        <a
          href="/work"
          className="text-[10px] tracking-[0.2em] uppercase mb-8 inline-block"
          style={{ color: "var(--text-ter)" }}
        >
          ← Work
        </a>
        <h1
          className="text-[clamp(28px,3vw,42px)] font-bold tracking-[-0.02em] mb-6"
          style={{ fontFamily: "var(--font-syne)", color: "var(--text-pri)" }}
        >
          {slug.replace(/-/g, " ")}
        </h1>
        <p style={{ color: "var(--text-sec)", maxWidth: "60ch" }}>
          Case study content isn&apos;t set up yet for this project. Try Globtek
          for the full template.
        </p>
      </section>
    );
  }

  const relatedProjects = PROJECTS.filter((p) => p.id !== slug).sort((a, b) => {
    const aMatches = a.sector === caseStudy.sector ? 1 : 0;
    const bMatches = b.sector === caseStudy.sector ? 1 : 0;
    return bMatches - aMatches;
  }).slice(0, 3);

  return <WorkCaseStudyView caseStudy={caseStudy} relatedProjects={relatedProjects} />;
}
