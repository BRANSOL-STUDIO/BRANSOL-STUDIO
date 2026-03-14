import Link from "next/link";
import { notFound } from "next/navigation";

// Placeholder: fetch case study by slug from Supabase
export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // const caseStudy = await getCaseStudyBySlug(slug);
  // if (!caseStudy) notFound();
  return (
    <section className="relative z-10 px-6 py-20 md:px-[72px] md:py-24 border-b border-[var(--border)]">
      <Link
        href="/work"
        className="text-[10px] tracking-[0.2em] uppercase mb-8 inline-block"
        style={{ color: "var(--text-ter)" }}
      >
        ← Work
      </Link>
      <h1
        className="text-[clamp(28px,3vw,42px)] font-bold tracking-[-0.02em] mb-6"
        style={{ fontFamily: "var(--font-syne)", color: "var(--text-pri)" }}
      >
        {slug.replace(/-/g, " ")}
      </h1>
      <p style={{ color: "var(--text-sec)", maxWidth: "60ch" }}>
        Case study content will be loaded from Supabase. Slug: {slug}.
      </p>
    </section>
  );
}
