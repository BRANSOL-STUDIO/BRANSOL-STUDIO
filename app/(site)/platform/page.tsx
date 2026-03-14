export default function PlatformPage() {
  return (
    <section className="relative z-10 px-6 py-20 md:px-[72px] md:py-24 border-b border-[var(--border)]">
      <p className="text-[9px] tracking-[0.35em] uppercase mb-2" style={{ color: "var(--text-ter)" }}>
        Client workspace
      </p>
      <h1
        className="text-[clamp(28px,3vw,42px)] font-bold tracking-[-0.02em] mb-12"
        style={{ fontFamily: "var(--font-syne)", color: "var(--text-pri)" }}
      >
        The platform
      </h1>
      <p className="max-w-[60ch] leading-relaxed mb-8" style={{ color: "var(--text-sec)" }}>
        Every client receives a dedicated environment — briefs, assets, milestones, and approvals in one place.
      </p>
      <a
        href="/auth/login"
        className="inline-block px-6 py-3 text-[10px] tracking-[0.2em] uppercase border rounded-sm"
        style={{
          background: "var(--glass-bg)",
          borderColor: "var(--glass-border)",
          color: "var(--text-pri)",
        }}
      >
        Client login
      </a>
    </section>
  );
}
