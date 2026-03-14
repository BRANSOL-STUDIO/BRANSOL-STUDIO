"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  onDismiss: () => void;
  duration?: number;
}

export function Toast({ message, onDismiss, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onDismiss, duration);
    return () => clearTimeout(t);
  }, [onDismiss, duration]);

  return (
    <div
      className="fixed bottom-6 right-6 z-[100] px-4 py-3 rounded-lg shadow-lg"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--glass-border)",
        color: "var(--text-pri)",
      }}
    >
      {message}
    </div>
  );
}
