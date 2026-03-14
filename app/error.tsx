"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <div
      className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6"
      style={{ color: "var(--text-pri)" }}
    >
      <h1 className="text-xl font-semibold" style={{ fontFamily: "var(--font-syne)" }}>
        Something went wrong
      </h1>
      <p className="text-sm max-w-md text-center" style={{ color: "var(--text-sec)" }}>
        {error.message || "An unexpected error occurred."}
      </p>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={reset}
          className="text-xs tracking-widest uppercase px-4 py-2 rounded border"
          style={{ borderColor: "var(--border)", color: "var(--text-pri)" }}
        >
          Try again
        </button>
        <Link
          href="/"
          className="text-xs tracking-widest uppercase px-4 py-2 rounded border"
          style={{ borderColor: "var(--border)", color: "var(--text-pri)", textDecoration: "none" }}
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
