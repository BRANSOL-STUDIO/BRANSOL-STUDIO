"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";

interface DraftModalProps {
  title: string;
  onClose: () => void;
  onSubmit: (value: string) => void | Promise<void>;
  submitLabel: string;
  placeholder?: string;
}

export function DraftModal({ title, onClose, onSubmit, submitLabel, placeholder }: DraftModalProps) {
  const [value, setValue] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSubmit(value);
    onClose();
  }

  return (
    <Modal onClose={onClose} title={title}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="w-full px-4 py-3 text-sm rounded-lg outline-none resize-y"
          style={{
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            color: "var(--text-pri)",
          }}
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-[10px] tracking-[0.2em] uppercase border rounded-sm"
            style={{ borderColor: "var(--glass-border)", color: "var(--text-sec)" }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-medium rounded-sm"
            style={{
              background: "var(--chrome)",
              backgroundSize: "300% 300%",
              color: "#000",
              animation: "chromeCycle 4s ease infinite",
            }}
          >
            {submitLabel}
          </button>
        </div>
      </form>
    </Modal>
  );
}
