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

export function DeliverableRow({
  id,
  name,
  fileType,
  version,
  status,
  createdAt,
}: DeliverableRowProps) {
  const [showModal, setShowModal] = useState(false);
  const isApproved = (status || "").toLowerCase() === "approved";
  const isReview = (status || "").toLowerCase() === "review";
  const statusClass = isApproved ? "s-complete" : "s-review";

  async function handleApprove() {
    await approveDeliverable(id);
  }

  async function handleRequestChanges(note: string) {
    await requestChangesDeliverable(id, note);
    setShowModal(false);
  }

  return (
    <>
      <div className={`dashboard-task-row ${statusClass}`} style={{ marginBottom: 7 }}>
        <div className="dashboard-task-bar" />
        <div className="dashboard-task-body">
          <div style={{ fontSize: 18, flexShrink: 0 }}>
            {(fileType || "").toUpperCase().includes("PDF") ? "📄" : "📦"}
          </div>
          <div className="dashboard-task-main">
            <div className="dashboard-task-title">{name}</div>
            <div className="dashboard-task-sub">{fileType ?? "—"} · {version} · {fmtDate(createdAt)}</div>
          </div>
          <div className="dashboard-task-status-label" style={{ marginRight: 12 }}>
            {isApproved ? "Approved" : "Awaiting Review"}
          </div>
          {isReview && (
            <>
              <button type="button" onClick={handleApprove} className="dashboard-approve-btn">
                Approve
              </button>
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="dashboard-approve-btn"
                style={{ borderColor: "var(--glass-border)", color: "var(--text-sec)", background: "transparent" }}
              >
                Request changes
              </button>
            </>
          )}
          {isApproved && (
            <span className="dashboard-approve-btn approved">✓ Approved</span>
          )}
        </div>
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
