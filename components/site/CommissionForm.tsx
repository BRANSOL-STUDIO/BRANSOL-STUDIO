"use client";

import { useState } from "react";
import { submitCommission } from "@/app/actions";

export function CommissionForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(formData: FormData) {
    setStatus("loading");
    try {
      await submitCommission(formData);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="p-6 rounded-xl max-w-md"
        style={{
          background: "var(--glass-bg)",
          border: "1px solid var(--glass-border)",
        }}
      >
        <p className="font-[family-name:var(--font-syne)] font-semibold" style={{ fontFamily: "var(--font-syne)", color: "var(--r4)" }}>
          Thank you. We will respond within two working days.
        </p>
      </div>
    );
  }

  return (
    <form
      action={handleSubmit}
      className="grid gap-4 max-w-xl"
    >
      <div>
        <label htmlFor="org" className="block text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: "var(--text-ter)" }}>
          Organisation name
        </label>
        <input
          id="org"
          name="organisation_name"
          required
          className="w-full px-5 py-3.5 text-sm outline-none transition-[border-color,box-shadow] rounded-sm"
          style={{
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            color: "var(--text-pri)",
          }}
          placeholder="Organisation name"
        />
      </div>
      <div>
        <label htmlFor="contact" className="block text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: "var(--text-ter)" }}>
          Contact name
        </label>
        <input
          id="contact"
          name="contact_name"
          required
          className="w-full px-5 py-3.5 text-sm outline-none rounded-sm"
          style={{
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            color: "var(--text-pri)",
          }}
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: "var(--text-ter)" }}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-5 py-3.5 text-sm outline-none rounded-sm"
          style={{
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            color: "var(--text-pri)",
          }}
          placeholder="email@organisation.com"
        />
      </div>
      <div>
        <label htmlFor="scope" className="block text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: "var(--text-ter)" }}>
          Commission scope
        </label>
        <textarea
          id="scope"
          name="scope"
          rows={4}
          required
          className="w-full px-5 py-3.5 text-sm outline-none rounded-sm resize-y"
          style={{
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            color: "var(--text-pri)",
          }}
          placeholder="Describe your commission..."
        />
      </div>
      {status === "error" && (
        <p style={{ color: "var(--r1)" }}>Something went wrong. Please try again.</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-block px-7 py-3.5 text-[10px] tracking-[0.2em] uppercase font-medium rounded-sm w-fit disabled:opacity-60"
        style={{
          background: "var(--chrome)",
          backgroundSize: "300% 300%",
          color: "#000",
          animation: "chromeCycle 4s ease infinite",
        }}
      >
        {status === "loading" ? "Sending…" : "Submit enquiry"}
      </button>
    </form>
  );
}
