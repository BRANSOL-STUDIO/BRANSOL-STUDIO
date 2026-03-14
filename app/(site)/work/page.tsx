import Link from "next/link";
import { WorkCard } from "@/components/site/WorkCard";

// Placeholder: replace with Supabase fetch in real implementation
const workItems = [
  { slug: "national-brand-identity", title: "National Brand Identity", tag: "Brand", color: "iris" },
  { slug: "financial-design-system", title: "Financial Design System", tag: "Design System", color: "aqua" },
  { slug: "government-comms", title: "Government Communications", tag: "Strategy", color: "gold" },
];

export default function WorkPage() {
  return (
    <section className="relative z-10 px-6 py-20 md:px-[72px] md:py-24 border-b border-[var(--border)]">
      <p className="text-[9px] tracking-[0.35em] uppercase mb-2" style={{ color: "var(--text-ter)" }}>
        Selected work
      </p>
      <h1
        className="text-[clamp(28px,3vw,42px)] font-bold tracking-[-0.02em] mb-12"
        style={{ fontFamily: "var(--font-syne)", color: "var(--text-pri)" }}
      >
        Work archive
      </h1>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {workItems.map((item) => (
          <li key={item.slug}>
            <Link href={`/work/${item.slug}`}>
              <WorkCard title={item.title} tag={item.tag} color={item.color} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
