import { cn } from "@/lib/utils";

interface ChromeTextProps {
  children: React.ReactNode;
  className?: string;
}

export function ChromeText({ children, className }: ChromeTextProps) {
  return <span className={cn("chrome-text", className)}>{children}</span>;
}
