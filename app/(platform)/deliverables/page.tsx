import { createClient } from "@/lib/supabase/server";
import { fmtDate } from "@/lib/utils";
import { DeliverableRow } from "@/components/platform/DeliverableRow";

export default async function DeliverablesPage() {
  const supabase = await createClient();
  const { data: deliverables } = await supabase
    .from("deliverables")
    .select("id, name, file_type, version, status, approved_date, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <header className="dashboard-page-header">
        <h2>Deliverables</h2>
        <p>Review and approve work from BRANSOL</p>
      </header>
      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <span className="dashboard-card-title">All Deliverables</span>
        </div>
        {(deliverables ?? []).map((d) => (
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
        {(!deliverables || deliverables.length === 0) && (
          <p className="py-4 text-sm" style={{ color: "var(--text-ter)" }}>No deliverables yet</p>
        )}
      </div>
    </div>
  );
}
