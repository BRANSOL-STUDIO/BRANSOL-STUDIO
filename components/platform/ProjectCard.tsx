"use client";

import { motion } from "framer-motion";
import { fmtDate } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  status: string;
  progress: number;
  dueDate: string | null;
  color: string;
}

export function ProjectCard({ title, status, progress, dueDate, color }: ProjectCardProps) {
  return (
    <motion.article
      className="p-6 rounded-xl border flex flex-col justify-between min-h-[160px]"
      style={{
        background: "var(--glass-bg)",
        borderColor: "var(--glass-border)",
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ background: color || "var(--iris)" }}
          />
          <span className="text-xs uppercase tracking-wider" style={{ color: "var(--text-ter)" }}>
            {status}
          </span>
        </div>
        <h2 className="font-semibold text-lg" style={{ fontFamily: "var(--font-syne)", color: "var(--text-pri)" }}>
          {title}
        </h2>
      </div>
      <div className="mt-4">
        <div className="h-1 rounded-full overflow-hidden mb-2" style={{ background: "var(--lift)" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: color || "var(--iris)" }}
          />
        </div>
        {dueDate && (
          <p className="text-xs" style={{ color: "var(--text-sec)" }}>Due {fmtDate(dueDate)}</p>
        )}
      </div>
    </motion.article>
  );
}
