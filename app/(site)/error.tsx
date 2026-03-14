"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Site segment error:", error);
  }, [error]);

  return (
    <div
      className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6"
      style={{
        background: "#060608",
        color: "#f0eff5",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h1 className="text-xl font-semibold">Something went wrong</h1>
      <p className="text-sm max-w-md text-center" style={{ color: "rgba(240,239,245,0.7)" }}>
        {error.message || "An unexpected error occurred."}
      </p>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={reset}
          className="text-xs tracking-widest uppercase px-4 py-2 rounded border hover:opacity-90"
          style={{ borderColor: "rgba(255,255,255,0.2)", color: "#f0eff5", background: "transparent" }}
        >
          Try again
        </button>
        <Link
          href="/perspectives"
          className="text-xs tracking-widest uppercase px-4 py-2 rounded border no-underline hover:opacity-90"
          style={{ borderColor: "rgba(255,255,255,0.2)", color: "#f0eff5" }}
        >
          Back to Perspectives
        </Link>
        <Link
          href="/"
          className="text-xs tracking-widest uppercase px-4 py-2 rounded border no-underline hover:opacity-90"
          style={{ borderColor: "rgba(255,255,255,0.2)", color: "#f0eff5" }}
        >
          Home
        </Link>
      </div>
    </div>
  );
}
