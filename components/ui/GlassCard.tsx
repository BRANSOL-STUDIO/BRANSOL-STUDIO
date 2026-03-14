import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  chrome?: boolean;
}

export function GlassCard({ children, className, chrome }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-6",
        chrome && "relative overflow-hidden",
        className
      )}
      style={{
        background: chrome ? "rgba(255,255,255,.03)" : "var(--glass-bg)",
        backdropFilter: "blur(24px)",
        borderColor: chrome ? "transparent" : "var(--glass-border)",
      }}
    >
      {children}
    </div>
  );
}
