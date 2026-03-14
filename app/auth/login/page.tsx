"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) {
      setError(err.message);
      return;
    }
    router.push(redirect);
    router.refresh();
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "var(--void)" }}
    >
      <div
        className="w-full max-w-md p-8 rounded-2xl border shadow-xl"
        style={{
          background: "rgba(8,8,16,.45)",
          backdropFilter: "blur(48px)",
          borderColor: "rgba(255,255,255,.18)",
        }}
      >
        <Link
          href="/"
          className="font-[family-name:var(--font-syne)] text-xl font-extrabold block mb-8"
          style={{ fontFamily: "var(--font-syne)" }}
        >
          <span className="chrome-text">BRANSOL</span>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight mb-2" style={{ fontFamily: "var(--font-syne)", color: "var(--text-pri)" }}>
          Client login
        </h1>
        <p className="text-sm mb-6" style={{ color: "var(--text-sec)" }}>
          Sign in with your BRANSOL account
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-[10px] tracking-wider uppercase mb-2" style={{ color: "var(--text-ter)" }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg text-sm outline-none"
              style={{
                background: "rgba(255,255,255,.05)",
                border: "1px solid var(--glass-border)",
                color: "var(--text-pri)",
              }}
              placeholder="you@organisation.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-[10px] tracking-wider uppercase mb-2" style={{ color: "var(--text-ter)" }}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg text-sm outline-none"
              style={{
                background: "rgba(255,255,255,.05)",
                border: "1px solid var(--glass-border)",
                color: "var(--text-pri)",
              }}
            />
          </div>
          {error && <p className="text-sm" style={{ color: "var(--r1)" }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 text-[10px] tracking-[0.2em] uppercase font-bold rounded-lg disabled:opacity-60"
            style={{
              background: "var(--chrome)",
              backgroundSize: "300% 300%",
              color: "#000",
              animation: "chromeCycle 4s ease infinite",
            }}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="text-xs text-center mt-4" style={{ color: "var(--text-ter)" }}>
          <Link href="/" className="hover:underline">Back to site</Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: "var(--void)" }}>
        <div className="text-sm" style={{ color: "var(--text-ter)" }}>Loading…</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
