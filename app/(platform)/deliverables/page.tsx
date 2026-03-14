import { createClient } from "@/lib/supabase/server";
import { DeliverableRow } from "@/components/platform/DeliverableRow";

export default async function DeliverablesPage() {
  const supabase = await createClient();
  const { data: deliverables } = await supabase
    .from("deliverables")
    .select("id, name, file_type, version, status, approved_date, created_at")
    .order("created_at", { ascending: false });

  const list = deliverables ?? [];
  const pendingCount = list.filter((d) => (d.status || "").toLowerCase() === "review").length;
  const approvedCount = list.filter((d) => (d.status || "").toLowerCase() === "approved").length;

  return (
    <div className="space-y-6">
      <header className="dashboard-page-header">
        <h2>Deliverables</h2>
        <p>Review and approve work from BRANSOL</p>
      </header>
      <div className="deliv-summary-row">
        <div className="deliv-sum-card c-all">
          <div className="deliv-sum-num">{list.length}</div>
          <div className="deliv-sum-label">Total</div>
        </div>
        <div className="deliv-sum-card c-pending">
          <div className="deliv-sum-num">{pendingCount}</div>
          <div className="deliv-sum-label">Awaiting review</div>
        </div>
        <div className="deliv-sum-card c-approved">
          <div className="deliv-sum-num">{approvedCount}</div>
          <div className="deliv-sum-label">Approved</div>
        </div>
      </div>
      <div className="deliv-filter-bar">
        <button type="button" className="deliv-filter-btn active">All</button>
        <button type="button" className="deliv-filter-btn">Awaiting review</button>
        <button type="button" className="deliv-filter-btn">Approved</button>
        <span className="deliv-filter-sep" />
      </div>
      <div className="deliv-group">
        <div className="deliv-group-header">
          <span className="deliv-group-title">All Deliverables</span>
          <span className="deliv-group-count">{list.length} items</span>
          <div className="deliv-group-bar" />
        </div>
        {list.map((d) => (
          <DeliverableRow
            key={d.id}
            id={d.id}
            name={d.name}
            fileType={d.file_type}
            version={d.version}
            status={d.status}
            approvedDate={d.approved_date}
            createdAt={d.created_at}
          />
        ))}
        {list.length === 0 && (
          <p className="py-8 text-sm" style={{ color: "var(--text-ter)" }}>No deliverables yet</p>
        )}
      </div>
    </div>
  );
}