"use client";

import { useEffect } from "react";

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ title, onClose, children }: ModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,.6)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="rounded-2xl border p-6 w-full max-w-md shadow-xl"
        style={{
          background: "var(--surface)",
          borderColor: "var(--glass-border)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          className="text-lg font-bold mb-4"
          style={{ fontFamily: "var(--font-syne)", color: "var(--text-pri)" }}
        >
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
