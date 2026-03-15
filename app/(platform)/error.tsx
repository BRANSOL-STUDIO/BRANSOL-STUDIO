"use client";

import Link from "next/link";

export default function PlatformError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="dashboard-shell" style={{ alignItems: "center", justifyContent: "center", padding: 48 }}>
      <div style={{ maxWidth: 400, textAlign: "center" }}>
        <h2 style={{ fontFamily: "var(--font-syne)", fontSize: 20, marginBottom: 12, color: "var(--text-pri)" }}>
          Something went wrong
        </h2>
        <p style={{ fontSize: 14, color: "var(--text-sec)", marginBottom: 24 }}>
          The dashboard couldn’t load. This can happen right after login — try again.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={reset}
            className="dashboard-tb-btn primary"
          >
            Try again
          </button>
          <Link href="/dashboard" className="dashboard-tb-btn">
            Go to Dashboard
          </Link>
          <Link href="/auth/login" className="dashboard-tb-btn">
            Sign in again
          </Link>
        </div>
      </div>
    </div>
  );
}
