import { fmtDate } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";

interface BillingDocRowProps {
  id: string;
  type: "invoice" | "quote";
  status: string;
  date: string | null;
  dueDate?: string | null;
}

export function BillingDocRow({ id, type, status, date, dueDate }: BillingDocRowProps) {
  const href = type === "invoice" ? `/api/invoices/${id}/pdf` : `/api/quotes/${id}/pdf`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border transition-colors hover:border-[var(--border-hi)]"
      style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}
    >
      <span className="font-mono font-medium" style={{ color: "var(--text-pri)" }}>{id}</span>
      <div className="flex items-center gap-4">
        <StatusBadge status={status} />
        <span className="text-xs" style={{ color: "var(--text-sec)" }}>{fmtDate(date)}</span>
        {dueDate && (
          <span className="text-xs" style={{ color: "var(--text-ter)" }}>Due {fmtDate(dueDate)}</span>
        )}
      </div>
    </a>
  );
}
