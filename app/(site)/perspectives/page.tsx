import Link from "next/link";

// Placeholder: fetch from Supabase or CMS
const posts = [
  { slug: "strategic-design-matters", title: "Strategic design matters", date: "2025-01-15" },
  { slug: "brand-and-consequence", title: "Brand and consequence", date: "2024-12-01" },
];

export default function PerspectivesPage() {
  return (
    <section className="relative z-10 px-6 py-20 md:px-[72px] md:py-24 border-b border-[var(--border)]">
      <p className="text-[9px] tracking-[0.35em] uppercase mb-2" style={{ color: "var(--text-ter)" }}>
        Blog
      </p>
      <h1
        className="text-[clamp(28px,3vw,42px)] font-bold tracking-[-0.02em] mb-12"
        style={{ fontFamily: "var(--font-syne)", color: "var(--text-pri)" }}
      >
        Perspectives
      </h1>
      <ul className="space-y-6">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/perspectives/${p.slug}`}
              className="block py-2 border-b border-[var(--border)] hover:border-[var(--border-hi)] transition-colors"
            >
              <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--text-ter)" }}>
                {new Date(p.date).toLocaleDateString("en-ZA", { month: "short", year: "numeric" })}
              </span>
              <span className="block mt-1 font-[family-name:var(--font-syne)] font-semibold" style={{ fontFamily: "var(--font-syne)", color: "var(--text-pri)" }}>
                {p.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
