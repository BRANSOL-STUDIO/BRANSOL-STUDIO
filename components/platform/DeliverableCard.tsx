"use client";

import Link from "next/link";
import { fmtDate } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { approveDeliverable, requestChangesDeliverable } from "@/app/actions/deliverables";
import { DraftModal } from "@/components/platform/DraftModal";
import { useState } from "react";

interface DeliverableCardProps {
  id: string;
  name: string;
  fileType: string | null;
  version: string;
  status: string;
  approvedDate: string | null;
  createdAt: string;
}

export function DeliverableCard({
  id,
  name,
  fileType,
  version,
  status,
  approvedDate,
  createdAt,
}: DeliverableCardProps) {
  const [showModal, setShowModal] = useState(false);

  async function handleApprove() {
    await approveDeliverable(id);
  }

  async function handleRequestChanges(note: string) {
    await requestChangesDeliverable(id, note);
    setShowModal(false);
  }

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border"
      style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}
    >
      <div>
        <h3 className="font-semibold" style={{ color: "var(--text-pri)" }}>{name}</h3>
        <p className="text-xs mt-1" style={{ color: "var(--text-ter)" }}>
          {fileType ?? "—"} · {version} · {fmtDate(createdAt)}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <StatusBadge status={status} />
        {status === "review" && (
          <>
            <button
              onClick={handleApprove}
              className="px-4 py-2 text-[10px] tracking-[0.2em] uppercase rounded-sm font-medium"
              style={{
                background: "var(--chrome)",
                backgroundSize: "300% 300%",
                color: "#000",
                animation: "chromeCycle 4s ease infinite",
              }}
            >
              Approve
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 text-[10px] tracking-[0.2em] uppercase border rounded-sm"
              style={{ borderColor: "var(--glass-border)", color: "var(--text-sec)" }}
            >
              Request changes
            </button>
          </>
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
    </div>
  );
}
