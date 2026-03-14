import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  active: "bg-[rgba(6,214,160,.15)] border-[var(--r4)] text-[var(--r4)]",
  pending: "bg-[rgba(255,209,102,.12)] border-[var(--r3)] text-[var(--r3)]",
  review: "bg-[rgba(124,131,229,.15)] border-[var(--iris)] text-[var(--iris)]",
  approved: "bg-[rgba(6,214,160,.15)] border-[var(--r4)] text-[var(--r4)]",
  changes: "bg-[rgba(255,140,66,.12)] border-[var(--r2)] text-[var(--r2)]",
  complete: "bg-[rgba(6,214,160,.15)] border-[var(--r4)] text-[var(--r4)]",
  paid: "bg-[rgba(6,214,160,.15)] border-[var(--r4)] text-[var(--r4)]",
  open: "bg-[rgba(124,131,229,.15)] border-[var(--iris)] text-[var(--iris)]",
  accepted: "bg-[rgba(6,214,160,.15)] border-[var(--r4)] text-[var(--r4)]",
  expired: "bg-[rgba(255,255,255,.06)] border-[var(--border-hi)] text-[var(--text-ter)]",
  declined: "bg-[rgba(255,107,157,.12)] border-[var(--r1)] text-[var(--r1)]",
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const style = statusStyles[status] ?? "bg-[var(--glass-bg)] border-[var(--glass-border)] text-[var(--text-sec)]";
  return (
    <span
      className={cn(
        "inline-block px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider rounded border",
        style,
        className
      )}
    >
      {status}
    </span>
  );
}
