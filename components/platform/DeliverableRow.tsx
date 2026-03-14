"use client";

import { fmtDate } from "@/lib/utils";
import { approveDeliverable, requestChangesDeliverable } from "@/app/actions/deliverables";
import { DraftModal } from "@/components/platform/DraftModal";
import { useState } from "react";

interface DeliverableRowProps {
  id: string;
  name: string;
  fileType: string | null;
  version: string;
  status: string;
  approvedDate: string | null;
  createdAt: string;
}

function typeIconClass(ft: string | null): "pdf" | "zip" | "doc" {
  const t = (ft || "").toUpperCase();
  if (t.includes("PDF")) return "pdf";
  if (t.includes("ZIP") || t.includes("ARCHIVE")) return "zip";
  return "doc";
}

const typeIcons = {
  pdf: (
    <svg width="20" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
  ),
  zip: (
    <svg width="20" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="7.5 4.21 12 6.81 16.5 4.21" /><polyline points="7.5 19.79 7.5 14.6 3 12" /><polyline points="21 12 16.5 14.6 16.5 19.79" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
  ),
  doc: (
    <svg width="20" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
  ),
};

export function DeliverableRow({
  id,
  name,
  fileType,
  version,
  status,
  approvedDate,
  createdAt,
}: DeliverableRowProps) {
  const [showModal, setShowModal] = useState(false);
  const isApproved = (status || "").toLowerCase() === "approved";
  const isReview = (status || "").toLowerCase() === "review";
  const isChanges = (status || "").toLowerCase() === "changes";
  const statusClass = isApproved ? "status-approved" : isChanges ? "status-changes" : "status-review";

  async function handleApprove() {
    await approveDeliverable(id);
  }

  async function handleRequestChanges(note: string) {
    await requestChangesDeliverable(id, note);
    setShowModal(false);
  }

  return (
    <>
      <div className={`deliv-card ${statusClass}`}>
        <div className="deliv-card-main">
          <div className={`deliv-type-icon ${typeIconClass(fileType)}`}>
            {typeIcons[typeIconClass(fileType)]}
            <span className="deliv-type-label">{fileType ?? "—"}</span>
          </div>
          <div className="deliv-info">
            <div className="deliv-name">{name}</div>
            <div className="deliv-meta-line">
              <span className="deliv-meta-tag">{fileType ?? "—"}</span>
              <span className="deliv-meta-sep" />
              <span className="deliv-meta-tag">{fmtDate(createdAt)}</span>
            </div>
            <span className="deliv-version">v{version}</span>
          </div>
          <div className="deliv-status-col">
            <span className="deliv-status-badge">
              {isApproved ? "Approved" : isReview ? "Awaiting Review" : "Changes requested"}
            </span>
            {isApproved && approvedDate && <span className="deliv-approved-date">{fmtDate(approvedDate)}</span>}
            <div className="deliv-actions">
              {isReview && (
                <>
                  <button type="button" onClick={handleApprove} className="dashboard-approve-btn">
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(true)}
                    className="deliv-dl-btn"
                  >
                    Request changes
                  </button>
                </>
              )}
              {isApproved && <span className="dashboard-approve-btn approved">✓ Approved</span>}
            </div>
          </div>
        </div>
        {isReview && (
          <div className="deliv-approval-strip">
            <span className="deliv-approval-msg">This deliverable is awaiting your approval.</span>
          </div>
        )}
      </div>
      {showModal && (
        <DraftModal
          title="Request changes"
          onClose={() => setShowModal(false)}
          onSubmit={handleRequestChanges}
          submitLabel="Send request"
          placeholder="Describe the changes needed..."
        />
      )}
    </>
  );
}