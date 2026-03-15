/**
 * Merge class names (Tailwind-friendly)
 */
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}

/**
 * Format currency (ZAR)
 */
export function fmtCurrency(amount: number): string {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format date for display
 */
export function fmtDate(date: string | null | undefined): string {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en-ZA", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

/**
 * Format relative time (e.g. "2 days ago")
 */
export function fmtRelative(date: string): string {
  const d = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return fmtDate(date);
}

/**
 * Format date as "Mon YYYY" (month short + year)
 */
export function fmtDateShort(date: string | null | undefined): string {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-ZA", { month: "short", year: "numeric" });
}

/**
 * Format due date: "Overdue" if past, otherwise full date
 */
export function fmtDueDate(date: string | null | undefined): string {
  if (!date) return "—";
  const d = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);
  return d < today ? "Overdue" : fmtDate(date);
}

/**
 * Get initials from name (or email fallback), max 2 chars
 */
export function getInitials(name: string | null | undefined, email?: string | null): string {
  if (name?.trim()) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0]! + parts[1][0]!).toUpperCase();
    return parts[0]!.slice(0, 2).toUpperCase();
  }
  if (email) return email.slice(0, 2).toUpperCase();
  return "?";
}

const AVATAR_COLORS = [
  "var(--iris)",
  "var(--aqua)",
  "var(--violet)",
  "var(--gold)",
  "var(--sky)",
  "var(--ember)",
  "var(--rose)",
];

/**
 * Cycle through avatar colors by index (for lists)
 */
export function getAvatarColor(index: number): string {
  return AVATAR_COLORS[index % AVATAR_COLORS.length];
}
