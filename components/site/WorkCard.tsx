"use client";

import { motion } from "framer-motion";

const colorMap: Record<string, string> = {
  iris: "var(--r7)",
  aqua: "var(--r4)",
  gold: "var(--r3)",
  violet: "var(--r8)",
  sky: "var(--r6)",
  ember: "var(--r2)",
};

interface WorkCardProps {
  title: string;
  tag: string;
  color: string;
}

export function WorkCard({ title, tag, color }: WorkCardProps) {
  const accent = colorMap[color] ?? "var(--iris)";
  return (
    <motion.article
      className="p-6 md:p-8 rounded-2xl min-h-[200px] flex flex-col justify-between transition-transform"
      style={{
        background: "var(--glass-bg)",
        backdropFilter: "blur(24px)",
        border: "1px solid var(--glass-border)",
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div>
        <p
          className="text-[9px] tracking-[0.25em] uppercase mb-3"
          style={{ color: "var(--text-ter)" }}
        >
          {tag}
        </p>
        <h2
          className="text-xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-syne)", color: "var(--text-pri)" }}
        >
          {title}
        </h2>
      </div>
      <div
        className="h-1 rounded-full w-12 mt-4"
        style={{ background: accent }}
      />
    </motion.article>
  );
}
