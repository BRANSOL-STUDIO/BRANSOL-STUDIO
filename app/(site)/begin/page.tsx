import { CommissionForm } from "@/components/site/CommissionForm";

export default function BeginPage() {
  return (
    <section className="relative z-10 px-6 py-20 md:px-[72px] md:py-24 border-b border-[var(--border)]">
      <p className="text-[9px] tracking-[0.35em] uppercase mb-2" style={{ color: "var(--text-ter)" }}>
        Commission intake
      </p>
      <h1
        className="text-[clamp(28px,3vw,42px)] font-bold tracking-[-0.02em] mb-4"
        style={{ fontFamily: "var(--font-syne)", color: "var(--text-pri)" }}
      >
        Begin a commission
      </h1>
      <p className="max-w-[480px] mb-12" style={{ color: "var(--text-sec)" }}>
        We work with a limited number of organisations each year. Tell us about your commission and we will respond within two working days.
      </p>
      <CommissionForm />
    </section>
  );
}
