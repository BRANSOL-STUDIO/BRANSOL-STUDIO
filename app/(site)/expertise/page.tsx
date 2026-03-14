export default function ExpertisePage() {
  return (
    <section className="relative z-10 px-6 py-20 md:px-[72px] md:py-24 border-b border-[var(--border)]">
      <p className="text-[9px] tracking-[0.35em] uppercase mb-2" style={{ color: "var(--text-ter)" }}>
        What we do
      </p>
      <h1
        className="text-[clamp(28px,3vw,42px)] font-bold tracking-[-0.02em] mb-12"
        style={{ fontFamily: "var(--font-syne)", color: "var(--text-pri)" }}
      >
        Expertise
      </h1>
      <p className="max-w-[60ch] leading-relaxed" style={{ color: "var(--text-sec)" }}>
        Strategic clarity and visual precision. Content to be populated from CMS or static copy.
      </p>
    </section>
  );
}
