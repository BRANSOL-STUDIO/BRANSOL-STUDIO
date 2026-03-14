"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  const message = typeof error?.message === "string" ? error.message : "An unexpected error occurred.";

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#060608", color: "#e4e4e7", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 600 }}>Something went wrong</h1>
        <p style={{ fontSize: "0.875rem", color: "#a1a1aa", maxWidth: 400, textAlign: "center" }}>
          {message}
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: 16,
            padding: "8px 16px",
            fontSize: "0.75rem",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            border: "1px solid #3f3f46",
            borderRadius: 6,
            background: "transparent",
            color: "#e4e4e7",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
