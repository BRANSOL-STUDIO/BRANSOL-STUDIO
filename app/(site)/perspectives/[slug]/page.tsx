import Link from "next/link";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <article className="relative z-10 px-6 py-20 md:px-[72px] md:py-24 border-b border-[var(--border)] max-w-[720px]">
      <Link
        href="/perspectives"
        className="text-[10px] tracking-[0.2em] uppercase mb-8 inline-block"
        style={{ color: "var(--text-ter)" }}
      >
        ← Perspectives
      </Link>
      <h1
        className="text-[clamp(28px,3vw,42px)] font-bold tracking-[-0.02em] mb-6"
        style={{ fontFamily: "var(--font-syne)", color: "var(--text-pri)" }}
      >
        {slug.replace(/-/g, " ")}
      </h1>
      <div className="prose prose-invert" style={{ color: "var(--text-sec)" }}>
        Article content from Supabase/CMS. Slug: {slug}.
      </div>
    </article>
  );
}
