export default function StudioPage() {
  return (
    <section className="relative z-10 px-6 py-20 md:px-[72px] md:py-24 border-b border-[var(--border)]">
      <p className="text-[9px] tracking-[0.35em] uppercase mb-2" style={{ color: "var(--text-ter)" }}>
        Who we are
      </p>
      <h1
        className="text-[clamp(28px,3vw,42px)] font-bold tracking-[-0.02em] mb-12"
        style={{ fontFamily: "var(--font-syne)", color: "var(--text-pri)" }}
      >
        Studio
      </h1>
      <p className="max-w-[60ch] leading-relaxed" style={{ color: "var(--text-sec)" }}>
        BRANSOL operates at the intersection of strategic clarity and visual precision.
      </p>
    </section>
  );
}
