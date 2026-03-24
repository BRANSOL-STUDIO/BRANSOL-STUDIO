"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { fmtDate } from "@/lib/utils";
import {
  approveDeliverable,
  postDeliverableComment,
  requestChangesDeliverable,
} from "@/app/actions/deliverables";

export type ReviewBoardDeliverable = {
  id: string;
  name: string;
  status: string;
  fileType: string | null;
  fileSize: string | null;
  fileUrl: string | null;
  version: string | null;
  note: string | null;
  createdAt: string;
  projectTitle: string | null;
  orgName: string | null;
  uploaderName: string | null;
  comments: {
    id: string;
    text: string;
    createdAt: string;
    authorName: string | null;
  }[];
};

function typeIconLabel(fileType: string | null): "pdf" | "file" {
  const t = (fileType ?? "").toLowerCase();
  if (t.includes("pdf")) return "pdf";
  return "file";
}

function PdfIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect x="3" y="1" width="10" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.2" opacity={0.5} />
      <path d="M6 6h6M6 9h6M6 12h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity={0.4} />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M3 3h7l4 4v9a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1z"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity={0.5}
      />
      <path d="M10 3v4h4" stroke="currentColor" strokeWidth="1.2" opacity={0.35} />
    </svg>
  );
}

function isLikelyImageUrl(url: string | null): boolean {
  if (!url) return false;
  const u = url.toLowerCase().split("?")[0] ?? "";
  return /\.(png|jpe?g|gif|webp|svg)$/i.test(u) || u.startsWith("data:image/");
}

function isLikelyPdf(url: string | null, fileType: string | null): boolean {
  if ((fileType ?? "").toLowerCase().includes("pdf")) return true;
  if (!url) return false;
  return url.toLowerCase().split("?")[0]?.endsWith(".pdf") ?? false;
}

function statusPill(status: string) {
  const s = status.toLowerCase();
  const cfg =
    s === "review"
      ? {
          label: "Awaiting Review",
          color: "var(--r3)",
          bg: "rgba(255,209,102,.08)",
          border: "rgba(255,209,102,.25)",
        }
      : s === "changes"
        ? {
            label: "Changes Requested",
            color: "var(--rose)",
            bg: "rgba(255,107,157,.08)",
            border: "rgba(255,107,157,.25)",
          }
        : s === "approved"
          ? {
              label: "Approved",
              color: "var(--r4)",
              bg: "rgba(6,214,160,.08)",
              border: "rgba(6,214,160,.25)",
            }
          : {
              label: status,
              color: "var(--text-ter)",
              bg: "transparent",
              border: "var(--glass-border)",
            };
  return (
    <span
      style={{
        fontFamily: "var(--font-dm-mono), monospace",
        fontSize: 10,
        letterSpacing: ".18em",
        textTransform: "uppercase",
        padding: "4px 10px",
        color: cfg.color,
        border: `1px solid ${cfg.border}`,
        background: cfg.bg,
      }}
    >
      {cfg.label}
    </span>
  );
}

export function ReviewBoardView({ deliverables }: { deliverables: ReviewBoardDeliverable[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedId, setSelectedId] = useState<string | null>(() => {
    const pending = deliverables.filter((d) => {
      const s = d.status.toLowerCase();
      return s === "review" || s === "changes";
    });
    return pending[0]?.id ?? deliverables[0]?.id ?? null;
  });
  const [zoom, setZoom] = useState(1);
  const [feedback, setFeedback] = useState("");

  const pending = useMemo(
    () =>
      deliverables.filter((d) => {
        const s = d.status.toLowerCase();
        return s === "review" || s === "changes";
      }),
    [deliverables]
  );

  const approved = useMemo(
    () => deliverables.filter((d) => d.status.toLowerCase() === "approved"),
    [deliverables]
  );

  const active = deliverables.find((d) => d.id === selectedId) ?? null;

  function refresh() {
    startTransition(() => router.refresh());
  }

  async function handleApprove() {
    if (!active || active.status.toLowerCase() === "approved") return;
    await approveDeliverable(active.id);
    refresh();
  }

  async function handleRequestChanges() {
    if (!active) return;
    const note = feedback.trim();
    if (!note) return;
    await requestChangesDeliverable(active.id, note);
    setFeedback("");
    refresh();
  }

  async function handlePostComment() {
    if (!active) return;
    const text = feedback.trim();
    if (!text) return;
    await postDeliverableComment(active.id, text);
    setFeedback("");
    refresh();
  }

  const showRequestChanges = active && active.status.toLowerCase() !== "changes" && active.status.toLowerCase() !== "approved";

  return (
    <>
      <div className="review-board-sticky-head">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div>
            <h2 className="review-board-title">Review Board</h2>
            <div className="review-board-sub">
              <span style={{ color: "var(--r3)" }}>{pending.length} awaiting review</span>
              {" · "}
              {approved.length} approved
            </div>
          </div>
          <div className="review-board-hint">Select a file to preview and comment</div>
        </div>
      </div>

      <div className="review-board-grid">
        <div className="review-board-list-wrap">
          {pending.length > 0 && (
            <>
              <div className="review-board-list-section-label">Needs Review</div>
              {pending.map((d) => {
                const sel = d.id === selectedId;
                const ch = d.status.toLowerCase() === "changes";
                return (
                  <button
                    key={d.id}
                    type="button"
                    className="review-board-list-item"
                    data-active={sel}
                    style={{
                      borderLeftColor: ch ? "var(--rose)" : "var(--r3)",
                      background: sel ? "var(--lift)" : "var(--surface)",
                    }}
                    onClick={() => {
                      setSelectedId(d.id);
                      setZoom(1);
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <div style={{ color: "var(--text-ter)", flexShrink: 0 }}>
                        {typeIconLabel(d.fileType) === "pdf" ? <PdfIcon /> : <FileIcon />}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "var(--text-pri)",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          fontWeight: 500,
                          textAlign: "left",
                        }}
                      >
                        {d.name}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingLeft: 26,
                      }}
                    >
                      <div className="review-board-list-meta">
                        {d.version ?? "v1.0"} · {d.comments.length} comment{d.comments.length !== 1 ? "s" : ""}
                      </div>
                      {ch ? (
                        <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 9, color: "var(--rose)" }}>
                          Changes
                        </span>
                      ) : (
                        <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 9, color: "var(--r3)" }}>
                          Review
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </>
          )}

          {approved.length > 0 && (
            <>
              <div
                className="review-board-list-section-label"
                style={{ marginTop: pending.length ? 3 : 0 }}
              >
                Approved
              </div>
              {approved.map((d) => {
                const sel = d.id === selectedId;
                return (
                  <button
                    key={d.id}
                    type="button"
                    className="review-board-list-item review-board-list-item-approved"
                    data-active={sel}
                    style={{
                      background: sel ? "var(--lift)" : "var(--surface)",
                    }}
                    onClick={() => {
                      setSelectedId(d.id);
                      setZoom(1);
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <div style={{ color: "var(--r4)", flexShrink: 0 }}>
                        {typeIconLabel(d.fileType) === "pdf" ? <PdfIcon /> : <FileIcon />}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "var(--text-sec)",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          textAlign: "left",
                        }}
                      >
                        {d.name}
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", paddingLeft: 26 }}>
                      <div className="review-board-list-meta">{d.version ?? "v1.0"}</div>
                      <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 9, color: "var(--r4)" }}>
                        ✓ Approved
                      </span>
                    </div>
                  </button>
                );
              })}
            </>
          )}

          <div className="review-board-list-footer-rule" />
        </div>

        <div className="review-board-detail">
          {!active ? (
            <div className="review-board-empty">No deliverables to review</div>
          ) : (
            <>
              <div className="review-board-preview-wrap">
                <div className="review-board-preview-toolbar">
                  <button type="button" className="review-board-tool-btn review-board-tool-active" disabled>
                    Pan
                  </button>
                  <div className="review-board-tool-sep" />
                  <button type="button" className="review-board-tool-btn" onClick={() => setZoom((z) => Math.min(3, z * 1.25))}>
                    +
                  </button>
                  <span className="review-board-zoom-label">{Math.round(zoom * 100)}%</span>
                  <button type="button" className="review-board-tool-btn" onClick={() => setZoom((z) => Math.max(0.25, z * 0.8))}>
                    −
                  </button>
                  <button type="button" className="review-board-tool-btn" onClick={() => setZoom(1)}>
                    Reset
                  </button>
                </div>

                <div className="review-board-preview-stage">
                  <div
                    style={{
                      transform: `scale(${zoom})`,
                      transformOrigin: "top left",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    {isLikelyImageUrl(active.fileUrl) ? (
                      // eslint-disable-next-line @next/next/no-img-element -- external or storage URL
                      <img src={active.fileUrl!} alt="" className="review-board-preview-img" draggable={false} />
                    ) : isLikelyPdf(active.fileUrl, active.fileType) && active.fileUrl ? (
                      <iframe title="PDF preview" src={active.fileUrl} className="review-board-preview-iframe" />
                    ) : (
                      <div className="review-board-preview-fallback">
                        <div className="review-board-list-meta">
                          {active.fileUrl ? (
                            <a href={active.fileUrl} target="_blank" rel="noopener noreferrer" className="dashboard-card-action">
                              Open file ↗
                            </a>
                          ) : (
                            "No preview available"
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="review-board-preview-badge">
                  {(active.fileType ?? "File") + (active.fileSize ? ` · ${active.fileSize}` : "")}
                </div>
                {active.fileUrl ? (
                  <a
                    href={active.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="review-board-download"
                  >
                    ↓ Download
                  </a>
                ) : null}
              </div>

              <div className="review-board-meta-bar">
                <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                  <div style={{ color: "var(--text-ter)", flexShrink: 0 }}>
                    {typeIconLabel(active.fileType) === "pdf" ? <PdfIcon /> : <FileIcon />}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div className="review-board-meta-title">{active.name}</div>
                    <div className="review-board-meta-sub">
                      {active.projectTitle ?? "—"}
                      {" · "}
                      {active.version ?? "v1.0"}
                      {" · "}
                      Uploaded {fmtDate(active.createdAt)}
                      {active.uploaderName ? ` by ${active.uploaderName}` : ""}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                  {statusPill(active.status)}
                  {active.status.toLowerCase() !== "approved" && (
                    <button
                      type="button"
                      className="dashboard-approve-btn"
                      disabled={isPending}
                      onClick={() => startTransition(() => void handleApprove())}
                    >
                      Approve
                    </button>
                  )}
                </div>
              </div>

              {active.note ? (
                <div className="review-board-designer-note">
                  <div className="review-board-section-cap">Designer&apos;s Note</div>
                  <div style={{ fontSize: 13, color: "var(--text-sec)", lineHeight: 1.75 }}>{active.note}</div>
                </div>
              ) : null}

              <div className="review-board-comments-card">
                <div className="review-board-comments-head">
                  <span className="review-board-section-cap">Comments</span>
                  <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 11, color: "var(--iris)" }}>
                    {active.comments.length}
                  </span>
                </div>
                <div>
                  {active.comments.length === 0 ? (
                    <div className="review-board-no-comments">
                      No comments yet — be the first to leave feedback.
                    </div>
                  ) : (
                    active.comments.map((cmt) => {
                      const initials = (cmt.authorName ?? "?")
                        .split(/\s+/)
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase();
                      return (
                        <div key={cmt.id} className="review-board-comment-row">
                          <div className="review-board-comment-avatar">{initials}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
                              <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 11, color: "var(--text-sec)" }}>
                                {cmt.authorName ?? "User"}
                              </span>
                              <span style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 10, color: "var(--text-ter)" }}>
                                {fmtDate(cmt.createdAt)}
                              </span>
                            </div>
                            <div style={{ fontSize: 13, color: "var(--text-sec)", lineHeight: 1.7 }}>{cmt.text}</div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="review-board-reply">
                  <div className="review-board-section-cap">
                    {active.status.toLowerCase() === "changes" ? "Add to Thread" : "Leave Feedback"}
                  </div>
                  <textarea
                    className="review-board-textarea"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Write your feedback — be specific about what's working and what needs changing..."
                    disabled={isPending}
                  />
                  <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", flexWrap: "wrap" }}>
                    {showRequestChanges ? (
                      <button
                        type="button"
                        className="review-board-btn changes"
                        disabled={isPending}
                        onClick={() => startTransition(() => void handleRequestChanges())}
                      >
                        Request Changes
                      </button>
                    ) : null}
                    <button
                      type="button"
                      className="review-board-btn post"
                      disabled={isPending}
                      onClick={() => startTransition(() => void handlePostComment())}
                    >
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
