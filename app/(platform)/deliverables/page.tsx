import { createClient } from "@/lib/supabase/server";
import { DeliverableCard } from "@/components/platform/DeliverableCard";
import { fmtDate } from "@/lib/utils";

export default async function DeliverablesPage() {
  const supabase = await createClient();
  const { data: deliverables } = await supabase
    .from("deliverables")
    .select("id, name, file_type, version, status, approved_date, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <h1
        className="text-2xl font-bold tracking-tight"
        style={{ fontFamily: "var(--font-syne)", color: "var(--text-pri)" }}
      >
        Deliverables
      </h1>
      <ul className="space-y-4">
        {(deliverables ?? []).map((d) => (
          <li key={d.id}>
            <DeliverableCard
              id={d.id}
              name={d.name}
              fileType={d.file_type}
              version={d.version}
              status={d.status}
              approvedDate={d.approved_date}
              createdAt={d.created_at}
            />
          </li>
        ))}
      </ul>
      {(!deliverables || deliverables.length === 0) && (
        <p className="p-8 rounded-xl border border-dashed" style={{ color: "var(--text-ter)", borderColor: "var(--border)" }}>
          No deliverables yet
        </p>
      )}
    </div>
  );
}
