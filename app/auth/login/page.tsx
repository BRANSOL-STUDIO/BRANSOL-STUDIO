"use client";

import "@/styles/login.css";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const SECTORS = [
  "Government",
  "Financial Services",
  "Infrastructure",
  "Professional Services",
  "Healthcare",
  "Development Finance",
];

function LoginFormInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/dashboard";
  const [tab, setTab] = useState<"client" | "studio">("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [view, setView] = useState<"form" | "forgot">("form");
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  function clearErrors() {
    setEmailError("");
    setPasswordError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    clearErrors();
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    if (!password || password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email: trimmedEmail, password });
    setLoading(false);
    if (error) {
      setPasswordError("Incorrect email or password.");
      return;
    }
    setSuccess(true);
    const destination = tab === "studio" ? "/admin/overview" : redirectTo;
    setTimeout(() => {
      router.push(destination);
      router.refresh();
    }, 1400);
  }

  async function handleForgot(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = forgotEmail.trim();
    if (!trimmed) return;
    setForgotLoading(true);
    const supabase = createClient();
    await supabase.auth.resetPasswordForEmail(trimmed, { redirectTo: `${window.location.origin}/auth/callback` });
    setForgotLoading(false);
    setForgotSent(true);
  }

  return (
    <div className="login-root">
      <div className="login-bg">
        <div className="login-orb login-orb-1" />
        <div className="login-orb login-orb-2" />
        <div className="login-orb login-orb-3" />
        <div className="login-orb login-orb-4" />
        <div className="login-orb login-orb-5" />
        <div className="login-bg-vignette" />
        <div className="login-bg-grid" />
        <div className="login-scanline" />
      </div>

      <div className="login-shell">
        <div className="login-left">
          <div className="login-left-logo">
            <span className="chrome-text">BRAN</span>
            <span style={{ color: "var(--text-pri)" }}>SOL</span>
          </div>
          <div>
            <div className="login-left-eyebrow">Client Platform</div>
            <h1 className="login-left-headline">
              <span>Your work,</span>
              <br />
              <span>your studio,</span>
              <br />
              <span className="accent">in one place.</span>
            </h1>
            <p className="login-left-sub">
              Track commissions, review deliverables, approve work, and communicate directly with the BRANSOL studio — all from a single considered interface.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div className="login-left-stats">
              <div className="login-stat-item">
                <div className="login-stat-num">94%</div>
                <div className="login-stat-label">Client Retention</div>
              </div>
              <div className="login-stat-item">
                <div className="login-stat-num">6+</div>
                <div className="login-stat-label">Years Active</div>
              </div>
              <div className="login-stat-item">
                <div className="login-stat-num">48h</div>
                <div className="login-stat-label">Response Time</div>
              </div>
            </div>
            <div>
              <div className="login-client-label">Sectors We Serve</div>
              <div className="login-client-pills">
                {SECTORS.map((s) => (
                  <span key={s} className="login-client-pill">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="login-right">
          <div className="login-card">
            <div className="login-card-chrome" />
            <div className="login-card-body">
              {/* Form state */}
              <div className={`login-form-state ${view === "form" && !success ? "show" : ""}`}>
                <div className="login-card-heading">Welcome back.</div>
                <p className="login-card-sub">
                  {tab === "client"
                    ? "Sign in to your BRANSOL client workspace."
                    : "Studio and admin access only."}
                </p>
                <div className="login-tab-row">
                  <button
                    type="button"
                    className={`login-tab-btn ${tab === "client" ? "active" : ""}`}
                    onClick={() => { setTab("client"); clearErrors(); setEmail(""); setPassword(""); }}
                  >
                    Client
                  </button>
                  <button
                    type="button"
                    className={`login-tab-btn ${tab === "studio" ? "active" : ""}`}
                    onClick={() => { setTab("studio"); clearErrors(); setEmail(""); setPassword(""); }}
                  >
                    Studio
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="login-field">
                    <label className="login-field-label" htmlFor="login-email">
                      Email Address
                    </label>
                    <div className="login-field-wrap">
                      <input
                        id="login-email"
                        className={`login-field-input ${emailError ? "error" : ""}`}
                        type="email"
                        placeholder={tab === "client" ? "your@organisation.com" : "name@bransol.co.za"}
                        autoComplete="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                      />
                    </div>
                    {emailError && <div className="login-field-error show">{emailError}</div>}
                  </div>
                  <div className="login-field">
                    <label className="login-field-label" htmlFor="login-pw">
                      Password
                    </label>
                    <div className="login-field-wrap">
                      <input
                        id="login-pw"
                        className={`login-field-input ${passwordError ? "error" : ""}`}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••••••"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setPasswordError(""); }}
                      />
                      <button
                        type="button"
                        className="login-pw-toggle"
                        onClick={() => setShowPassword((s) => !s)}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                    {passwordError && <div className="login-field-error show">{passwordError}</div>}
                  </div>
                  <button
                    type="button"
                    className="login-forgot"
                    onClick={() => { setView("forgot"); clearErrors(); }}
                  >
                    Forgot password?
                  </button>
                  <button
                    type="submit"
                    className="login-submit-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <span>· · ·</span>
                    ) : (
                      "Sign In →"
                    )}
                  </button>
                </form>
                <div className="login-access-note">
                  Access is by invitation only.<br />
                  Contact <a href="mailto:hello@bransol.co.za">hello@bransol.co.za</a> to request access.
                </div>
                <div className="login-security-row">
                  <div className="login-security-dot" />
                  <span>Secured by Supabase · TLS 1.3</span>
                </div>
              </div>

              {/* Success state */}
              <div className={`login-success-state ${success ? "show" : ""}`}>
                <div className="login-success-icon">✓</div>
                <div className="login-success-title">Signed in.</div>
                <p className="login-success-sub">
                  Redirecting you to your workspace…
                </p>
              </div>

              {/* Forgot state */}
              <div className={`login-forgot-state ${view === "forgot" ? "show" : ""}`}>
                <div className="login-card-heading">Reset password.</div>
                <p className="login-card-sub" style={{ marginBottom: 28 }}>
                  Enter your email and we&apos;ll send a reset link.
                </p>
                {!forgotSent ? (
                  <form onSubmit={handleForgot}>
                    <div className="login-field">
                      <label className="login-field-label">Email Address</label>
                      <input
                        className="login-field-input"
                        type="email"
                        placeholder="your@organisation.com"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="login-submit-btn"
                      disabled={forgotLoading}
                    >
                      {forgotLoading ? "Sending…" : "Send Reset Link →"}
                    </button>
                  </form>
                ) : (
                  <p className="login-card-sub">Check your email for the reset link.</p>
                )}
                <button
                  type="button"
                  className="login-back-btn"
                  onClick={() => { setView("form"); setForgotSent(false); setForgotEmail(""); }}
                >
                  ← Back to Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="login-root" style={{ alignItems: "center", justifyContent: "center", display: "flex" }}>
          <div className="login-card-body" style={{ padding: 48 }}>
            <div style={{ color: "var(--text-ter)", fontFamily: "var(--font-dm-mono)", fontSize: 12 }}>Loading…</div>
          </div>
        </div>
      }
    >
      <LoginFormInner />
    </Suspense>
  );
}
