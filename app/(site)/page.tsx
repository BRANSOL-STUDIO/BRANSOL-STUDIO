import Link from "next/link";
import { HeroCanvas } from "@/components/site/HeroCanvas";

export default function HomePage() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-6 py-24 md:px-[72px] md:py-[100px]">
      <HeroCanvas />
      <div className="relative z-10">
        <p
          className="text-[10px] tracking-[0.4em] uppercase mb-8 animate-[floatUp_0.8s_ease_both]"
          style={{ color: "var(--text-ter)" }}
        >
          Strategic Design Studio
        </p>
        <h1
          className="font-[family-name:var(--font-syne)] text-[clamp(72px,12vw,160px)] font-extrabold tracking-[-0.04em] leading-[0.9] mb-10 animate-[floatUp_0.8s_ease_0.1s_both]"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          <span className="chrome-text">BRAN</span>
          <span style={{ color: "var(--text-pri)" }}>SOL</span>
        </h1>
        <p
          className="font-[family-name:var(--font-instrument)] text-[clamp(18px,2vw,26px)] italic max-w-[480px] leading-relaxed mb-14 animate-[floatUp_0.8s_ease_0.2s_both]"
          style={{ color: "var(--text-sec)", fontFamily: "var(--font-instrument)" }}
        >
          Bold. Architectural. Rainbowchrome.
        </p>
        <div className="flex gap-3 flex-wrap animate-[floatUp_0.8s_ease_0.3s_both]">
          <Link
            href="/begin"
            className="inline-block px-6 py-3 text-[10px] tracking-[0.2em] uppercase font-medium border border-[var(--glass-border)] rounded-sm transition-colors hover:border-[var(--border-hi)]"
            style={{
              background: "var(--chrome)",
              backgroundSize: "300% 300%",
              color: "#000",
              animation: "chromeCycle 4s ease infinite",
            }}
          >
            Begin enquiry
          </Link>
          <Link
            href="/work"
            className="inline-block px-6 py-3 text-[10px] tracking-[0.2em] uppercase border rounded-sm transition-colors"
            style={{
              background: "var(--glass-bg)",
              borderColor: "var(--glass-border)",
              color: "var(--text-pri)",
            }}
          >
            View our work
          </Link>
        </div>
      </div>
    </section>
  );
}
