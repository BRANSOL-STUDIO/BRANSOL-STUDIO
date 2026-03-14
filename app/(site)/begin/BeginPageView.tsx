"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { submitCommission } from "@/app/actions";
import {
  SECTOR_OPTIONS,
  DISCIPLINE_OPTIONS,
  TIMELINE_OPTIONS,
  SOURCE_OPTIONS,
  BUDGET_POINTS,
  TOTAL_STEPS,
  BRIEF_MIN_LENGTH,
  BRIEF_MAX_LENGTH,
  EXTRA_MAX_LENGTH,
} from "@/lib/begin-data";

const DS_MAX = BUDGET_POINTS.length - 1;

function CheckIcon() {
  return (
    <svg viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 4l2 2 4-4" />
    </svg>
  );
}
function BackArrowIcon() {
  return (
    <svg viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M10 5.5H1M5 1L.5 5.5 5 10" />
    </svg>
  );
}
function NextArrowIcon() {
  return (
    <svg viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 5.5h9M6 1l4.5 4.5L6 10" />
    </svg>
  );
}
function ConfirmCheckIcon() {
  return (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 14l7 7L24 7" />
    </svg>
  );
}
function CommitCheckIcon() {
  return (
    <svg viewBox="0 0 7 7" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 3.5l2 2 3-3" />
    </svg>
  );
}

export function BeginPageView() {
  const [currentStep, setCurrentStep] = useState(1);
  const [orgName, setOrgName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [sector, setSector] = useState("");
  const [disciplines, setDisciplines] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [budgetLo, setBudgetLo] = useState(3);
  const [budgetHi, setBudgetHi] = useState(5);
  const [source, setSource] = useState("");
  const [brief, setBrief] = useState("");
  const [extra, setExtra] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [confirmRef, setConfirmRef] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragThumb, setDragThumb] = useState<"lo" | "hi" | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const progressPct = ((currentStep - 1) / TOTAL_STEPS) * 100;

  const clearError = useCallback((key: string) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const validateStep1 = useCallback(() => {
    const next: Record<string, string> = {};
    if (!orgName.trim()) next.orgName = "Required";
    if (!contactName.trim()) next.contactName = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "A valid email is required";
    if (!role.trim()) next.role = "Required";
    if (!sector) next.sector = "Please select a sector";
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [orgName, contactName, email, role, sector]);

  const validateStep2 = useCallback(() => {
    if (disciplines.length > 0) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.disciplines;
        return next;
      });
      return true;
    }
    setErrors((prev) => ({ ...prev, disciplines: "Select at least one discipline" }));
    return false;
  }, [disciplines]);

  const validateStep3 = useCallback(() => {
    if (brief.trim().length >= BRIEF_MIN_LENGTH) {
      clearError("brief");
      return true;
    }
    setErrors((prev) => ({
      ...prev,
      brief: brief.trim().length > 0 ? `Too brief — ${BRIEF_MIN_LENGTH - brief.trim().length} more characters needed` : "Please describe the challenge",
    }));
    return false;
  }, [brief, clearError]);

  const goToStep = useCallback((step: number) => {
    const panel = document.querySelector(".begin-page .step-panel");
    const currentEl = panel?.querySelector(".step.active");
    const nextEl = panel?.querySelector(`.step[data-step="${step}"]`);
    if (!currentEl || !nextEl) {
      setCurrentStep(step);
      return;
    }
    currentEl.classList.add("exiting");
    const t = setTimeout(() => {
      currentEl.classList.remove("active", "exiting");
      (nextEl as HTMLElement).classList.add("active");
      setCurrentStep(step);
      document.querySelector(".begin-page .form-area")?.scrollTo({ top: 0, behavior: "smooth" });
    }, 260);
    return () => clearTimeout(t);
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    if (currentStep === 3 && !validateStep3()) return;
    if (currentStep < TOTAL_STEPS) goToStep(currentStep + 1);
  }, [currentStep, validateStep1, validateStep2, validateStep3, goToStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) goToStep(currentStep - 1);
  }, [currentStep, goToStep]);

  const toggleDiscipline = (value: string) => {
    setDisciplines((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
    clearError("disciplines");
  };

  const selectTimeline = (value: string) => setTimeline(value);

  const handleSubmit = async () => {
    setLoading(true);
    setErrors({});
    const scopeParts = [
      brief.trim(),
      disciplines.length ? `Disciplines: ${disciplines.join(", ")}` : "",
      timeline ? `Timeline: ${TIMELINE_OPTIONS.find((o) => o.value === timeline)?.label ?? timeline}` : "",
      `Budget: ${BUDGET_POINTS[budgetLo]} – ${BUDGET_POINTS[budgetHi]}`,
      source ? `Source: ${SOURCE_OPTIONS.find((o) => o.value === source)?.label ?? source}` : "",
      extra.trim() ? `Other: ${extra.trim()}` : "",
    ].filter(Boolean);
    const scope = scopeParts.join("\n\n");
    const formData = new FormData();
    formData.set("organisation_name", orgName.trim());
    formData.set("contact_name", contactName.trim());
    formData.set("email", email.trim());
    formData.set("scope", scope);
    try {
      await submitCommission(formData);
      setConfirmRef("BSL-" + Date.now().toString(36).toUpperCase().slice(-6));
      setSubmitted(true);
    } catch {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const pct = (v: number) => (v / DS_MAX) * 100;
  const fillLeft = pct(budgetLo);
  const fillWidth = pct(budgetHi) - fillLeft;

  const handleSliderPointer = useCallback(
    (clientX: number, which: "lo" | "hi") => {
      if (!sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const v = Math.round(ratio * DS_MAX);
      if (which === "lo") {
        setBudgetLo(Math.min(v, budgetHi - 1));
      } else {
        setBudgetHi(Math.max(v, budgetLo + 1));
      }
    },
    [budgetLo, budgetHi]
  );

  useEffect(() => {
    if (dragThumb === null) return;
    const onMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      handleSliderPointer(clientX, dragThumb);
    };
    const onUp = () => setDragThumb(null);
    document.addEventListener("mousemove", onMove);
    document.addEventListener("touchmove", onMove, { passive: false });
    document.addEventListener("mouseup", onUp);
    document.addEventListener("touchend", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("touchend", onUp);
    };
  }, [dragThumb, handleSliderPointer]);

  return (
    <div className="begin-page">
      <div className="page-wrap">
        <div className="form-area">
          {!submitted && (
            <>
              <header className="page-header">
                <span className="page-eyebrow">Begin a Commission</span>
                <h1 className="page-title">
                  Tell us about
                  <br />
                  <span className="chrome-text">your work.</span>
                </h1>
                <p className="page-sub">
                  We review every submission personally. If your commission is a good fit, we will respond within two working days to arrange a conversation.
                </p>
              </header>

              <div className="progress-wrap">
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${progressPct}%` }} />
                </div>
                <div className="progress-steps">
                  {Array.from({ length: TOTAL_STEPS }, (_, i) => (
                    <div
                      key={i}
                      className={`progress-dot ${i + 1 === currentStep ? "active" : i + 1 < currentStep ? "done" : ""}`}
                    />
                  ))}
                </div>
                <span className="progress-label">
                  Step {currentStep} of {TOTAL_STEPS}
                </span>
              </div>

              <div className="step-panel">
                {/* Step 1 */}
                <div
                  className={`step ${currentStep === 1 ? "active" : ""}`}
                  data-step="1"
                >
                  <span className="step-num">01 — Organisation</span>
                  <h2 className="step-title">Who are you?</h2>
                  <p className="step-desc">
                    Tell us about your organisation so we understand the context of your commission.
                  </p>
                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label">Organisation name<span>*</span></label>
                      <input
                        type="text"
                        className={`field-input ${errors.orgName ? "error" : ""}`}
                        placeholder="Your organisation"
                        autoComplete="organization"
                        value={orgName}
                        onChange={(e) => {
                          setOrgName(e.target.value);
                          clearError("orgName");
                        }}
                      />
                      <div className={`field-error ${errors.orgName ? "visible" : ""}`}>{errors.orgName}</div>
                    </div>
                    <div className="field-group">
                      <label className="field-label">Your name<span>*</span></label>
                      <input
                        type="text"
                        className={`field-input ${errors.contactName ? "error" : ""}`}
                        placeholder="First and last name"
                        autoComplete="name"
                        value={contactName}
                        onChange={(e) => {
                          setContactName(e.target.value);
                          clearError("contactName");
                        }}
                      />
                      <div className={`field-error ${errors.contactName ? "visible" : ""}`}>{errors.contactName}</div>
                    </div>
                  </div>
                  <div className="field-row">
                    <div className="field-group">
                      <label className="field-label">Email address<span>*</span></label>
                      <input
                        type="email"
                        className={`field-input ${errors.email ? "error" : ""}`}
                        placeholder="you@organisation.com"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          clearError("email");
                        }}
                      />
                      <div className={`field-error ${errors.email ? "visible" : ""}`}>{errors.email}</div>
                    </div>
                    <div className="field-group">
                      <label className="field-label">Your role<span>*</span></label>
                      <input
                        type="text"
                        className={`field-input ${errors.role ? "error" : ""}`}
                        placeholder="e.g. CMO, Head of Brand"
                        autoComplete="organization-title"
                        value={role}
                        onChange={(e) => {
                          setRole(e.target.value);
                          clearError("role");
                        }}
                      />
                      <div className={`field-error ${errors.role ? "visible" : ""}`}>{errors.role}</div>
                    </div>
                  </div>
                  <div className="field-group">
                    <label className="field-label">Sector<span>*</span></label>
                    <select
                      className={`field-select ${errors.sector ? "error" : ""}`}
                      value={sector}
                      onChange={(e) => {
                        setSector(e.target.value);
                        clearError("sector");
                      }}
                    >
                      <option value="" disabled>Select your sector</option>
                      {SECTOR_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                    <div className={`field-error ${errors.sector ? "visible" : ""}`}>{errors.sector}</div>
                  </div>
                  <div className="step-nav">
                    <div />
                    <button type="button" className="btn-next" onClick={nextStep}>
                      Continue
                      <NextArrowIcon />
                    </button>
                  </div>
                </div>

                {/* Step 2 */}
                <div
                  className={`step ${currentStep === 2 ? "active" : ""}`}
                  data-step="2"
                >
                  <span className="step-num">02 — Discipline</span>
                  <h2 className="step-title">What are you commissioning?</h2>
                  <p className="step-desc">Select all that apply. Most commissions span more than one discipline.</p>
                  <div className="options-grid">
                    {DISCIPLINE_OPTIONS.map((o) => (
                      <button
                        key={o.value}
                        type="button"
                        className={`option-btn ${disciplines.includes(o.value) ? "selected" : ""}`}
                        onClick={() => toggleDiscipline(o.value)}
                      >
                        <div className="option-check"><CheckIcon /></div>
                        <div className="option-label">
                          {o.label}
                          <span className="option-sub">{o.sub}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className={`field-error ${errors.disciplines ? "visible" : ""}`} style={{ marginBottom: 16 }}>
                    {errors.disciplines}
                  </div>
                  <div className="step-nav">
                    <button type="button" className="btn-back" onClick={prevStep}>
                      <BackArrowIcon />
                      Back
                    </button>
                    <button type="button" className="btn-next" onClick={nextStep}>
                      Continue
                      <NextArrowIcon />
                    </button>
                  </div>
                </div>

                {/* Step 3 */}
                <div
                  className={`step ${currentStep === 3 ? "active" : ""}`}
                  data-step="3"
                >
                  <span className="step-num">03 — The Brief</span>
                  <h2 className="step-title">What is the challenge?</h2>
                  <p className="step-desc">
                    Describe the strategic problem you are trying to solve. Not what you want designed — why you need it.
                  </p>
                  <div className="field-group">
                    <label className="field-label">The challenge<span>*</span></label>
                    <textarea
                      className={`field-textarea ${errors.brief ? "error" : ""}`}
                      placeholder="Describe the strategic problem, the context, and what success looks like for this commission…"
                      rows={6}
                      maxLength={BRIEF_MAX_LENGTH}
                      value={brief}
                      onChange={(e) => {
                        setBrief(e.target.value);
                        clearError("brief");
                      }}
                    />
                    <div className="field-footer">
                      <span className="char-count">{brief.length} / {BRIEF_MAX_LENGTH}</span>
                    </div>
                    <div className={`field-error ${errors.brief ? "visible" : ""}`}>{errors.brief}</div>
                  </div>
                  <div className="field-group">
                    <label className="field-label">Timeline</label>
                    <div className="options-grid options-grid-3">
                      {TIMELINE_OPTIONS.map((o) => (
                        <button
                          key={o.value}
                          type="button"
                          className={`option-btn ${timeline === o.value ? "selected" : ""}`}
                          onClick={() => selectTimeline(o.value)}
                        >
                          <div className="option-label">
                            {o.label}
                            <span className="option-sub">{o.sub}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="step-nav">
                    <button type="button" className="btn-back" onClick={prevStep}>
                      <BackArrowIcon />
                      Back
                    </button>
                    <button type="button" className="btn-next" onClick={nextStep}>
                      Continue
                      <NextArrowIcon />
                    </button>
                  </div>
                </div>

                {/* Step 4 */}
                <div
                  className={`step ${currentStep === 4 ? "active" : ""}`}
                  data-step="4"
                >
                  <span className="step-num">04 — Investment</span>
                  <h2 className="step-title">What is the budget range?</h2>
                  <p className="step-desc">
                    We do not publish pricing. This helps us scope the right engagement for your needs. All information is treated as confidential.
                  </p>
                  <div className="field-group">
                    <div className="budget-display">
                      <span>{BUDGET_POINTS[budgetLo]}</span>
                      <span className="budget-to">—</span>
                      <span className="budget-high">{BUDGET_POINTS[budgetHi]}</span>
                    </div>
                    <div
                      ref={sliderRef}
                      className="dual-slider"
                      onClick={(e) => {
                        if ((e.target as HTMLElement).closest(".ds-thumb")) return;
                        const rect = sliderRef.current?.getBoundingClientRect();
                        if (!rect) return;
                        const ratio = (e.clientX - rect.left) / rect.width;
                        const v = Math.round(Math.max(0, Math.min(1, ratio)) * DS_MAX);
                        if (Math.abs(v - budgetLo) <= Math.abs(v - budgetHi)) {
                          setBudgetLo(Math.min(v, budgetHi - 1));
                        } else {
                          setBudgetHi(Math.max(v, budgetLo + 1));
                        }
                      }}
                    >
                      <div className="ds-track" />
                      <div
                        className="ds-fill"
                        style={{ left: `${fillLeft}%`, width: `${fillWidth}%` }}
                      />
                      <div
                        className={`ds-thumb ${dragThumb === "lo" ? "dragging" : ""}`}
                        style={{ left: `${fillLeft}%` }}
                        role="slider"
                        aria-label="Minimum budget"
                        aria-valuenow={budgetLo}
                        tabIndex={0}
                        onMouseDown={(e) => { e.preventDefault(); setDragThumb("lo"); }}
                        onTouchStart={(e) => { e.preventDefault(); setDragThumb("lo"); }}
                        onKeyDown={(e) => {
                          if (e.key === "ArrowRight") setBudgetLo((l) => Math.min(l + 1, budgetHi - 1));
                          if (e.key === "ArrowLeft") setBudgetLo((l) => Math.max(l - 1, 0));
                        }}
                      >
                        <div className="ds-thumb-label">{BUDGET_POINTS[budgetLo]}</div>
                      </div>
                      <div
                        className={`ds-thumb ${dragThumb === "hi" ? "dragging" : ""}`}
                        style={{ left: `${pct(budgetHi)}%` }}
                        role="slider"
                        aria-label="Maximum budget"
                        aria-valuenow={budgetHi}
                        tabIndex={0}
                        onMouseDown={(e) => { e.preventDefault(); setDragThumb("hi"); }}
                        onTouchStart={(e) => { e.preventDefault(); setDragThumb("hi"); }}
                        onKeyDown={(e) => {
                          if (e.key === "ArrowRight") setBudgetHi((h) => Math.min(h + 1, DS_MAX));
                          if (e.key === "ArrowLeft") setBudgetHi((h) => Math.max(h - 1, budgetLo + 1));
                        }}
                      >
                        <div className="ds-thumb-label">{BUDGET_POINTS[budgetHi]}</div>
                      </div>
                    </div>
                    <div className="budget-labels">
                      <span>Under R 50k</span>
                      <span>R 5M+</span>
                    </div>
                  </div>
                  <div className="field-group">
                    <label className="field-label">How did you hear about BRANSOL?</label>
                    <select
                      className="field-select"
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                    >
                      {SOURCE_OPTIONS.map((o) => (
                        <option key={o.value || "blank"} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field-group">
                    <label className="field-label">Anything else we should know?</label>
                    <textarea
                      className="field-textarea"
                      placeholder="Constraints, existing assets, decision-making process, key stakeholders…"
                      rows={4}
                      maxLength={EXTRA_MAX_LENGTH}
                      value={extra}
                      onChange={(e) => setExtra(e.target.value)}
                    />
                    <div className="field-footer">
                      <span className="char-count">{extra.length} / {EXTRA_MAX_LENGTH}</span>
                    </div>
                  </div>
                  {errors.submit && (
                    <div className="field-error visible">{errors.submit}</div>
                  )}
                  <div className="step-nav">
                    <button type="button" className="btn-back" onClick={prevStep}>
                      <BackArrowIcon />
                      Back
                    </button>
                    <button
                      type="button"
                      className="btn-next"
                      disabled={loading}
                      onClick={handleSubmit}
                    >
                      {loading ? "Sending…" : "Submit commission"}
                      <NextArrowIcon />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {submitted && (
            <div className="confirm-screen visible">
              <div className="confirm-icon">
                <ConfirmCheckIcon />
              </div>
              <h2 className="confirm-title">
                Commission
                <br />
                <span className="chrome-text">received.</span>
              </h2>
              <p className="confirm-sub">
                Thank you. We have received your submission and will review it personally. If your commission is a good fit for BRANSOL, we will be in touch within two working days.
              </p>
              <div className="confirm-ref">
                Reference<span> {confirmRef}</span>
              </div>
              <div className="confirm-links">
                <Link href="/" className="confirm-link">Return home</Link>
                <Link href="/perspectives" className="confirm-link">Read Perspectives</Link>
                <Link href="/work" className="confirm-link">View our work</Link>
              </div>
            </div>
          )}
        </div>

        {!submitted && (
          <aside className="page-aside">
            <div className="aside-panel">
              <span className="aside-label">Your progress</span>
              <div className="aside-steps">
                {[
                  { step: 1, label: "Organisation" },
                  { step: 2, label: "Discipline" },
                  { step: 3, label: "The Brief" },
                  { step: 4, label: "Investment" },
                ].map(({ step, label }) => (
                  <div
                    key={step}
                    className={`aside-step-item ${step === currentStep ? "active" : step < currentStep ? "done" : ""}`}
                    data-step={step}
                  >
                    <div className="aside-step-num">{String(step).padStart(2, "0")}</div>
                    <span className="aside-step-text">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="aside-panel">
              <span className="aside-label">Studio</span>
              <div className="aside-stat">
                <span className="aside-stat-val chrome-text">94%</span>
                <span className="aside-stat-label">Client retention rate</span>
              </div>
              <div className="aside-stat">
                <span className="aside-stat-val chrome-text">6+</span>
                <span className="aside-stat-label">Years operating</span>
              </div>
              <div className="aside-stat">
                <span className="aside-stat-val chrome-text">1:3</span>
                <span className="aside-stat-label">Commission win rate</span>
              </div>
            </div>
            <div className="aside-panel">
              <span className="aside-label">Our commitments</span>
              <div className="aside-commits">
                {[
                  "Response within two working days",
                  "Your information is never shared",
                  "Honest assessment of fit — we decline commissions that are not right",
                  "No hard sell. No obligation.",
                ].map((text, i) => (
                  <div key={i} className="aside-commit">
                    <div className="aside-commit-dot"><CommitCheckIcon /></div>
                    <span className="aside-commit-text">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="aside-panel">
              <span className="aside-label">Prefer direct contact?</span>
              <div className="aside-copy">
                <p>If you would rather speak with us before submitting, you are welcome to write to us directly. We read everything.</p>
                <p style={{ marginTop: 8, fontFamily: "var(--font-dm-mono), monospace", fontSize: 10, letterSpacing: "0.15em", color: "var(--text-sec)" }}>
                  <a href="mailto:hello@bransol.com">hello@bransol.com</a>
                </p>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
