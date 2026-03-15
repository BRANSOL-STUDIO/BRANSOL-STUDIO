import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { fmtDateShort } from "@/lib/utils";

function tierColor(tier: string | null): string {
  if (!tier) return "var(--text-ter)";
  const t = tier.toLowerCase();
  if (t.includes("enterprise")) return "var(--iris)";
  if (t.includes("professional")) return "var(--r4)";
  if (t.includes("essential")) return "var(--r3)";
  return "var(--text-sec)";
}

function statusClass(status: string | null): string {
  const s = (status || "pending").toLowerCase();
  if (s === "active") return "s-active";
  if (s === "overdue") return "s-overdue";
  return "s-pending";
}

export default async function AdminClientsPage() {
  const supabase = await createClient();
  const { data: orgs } = await supabase
    .from("organisations")
    .select("id, name, contact_name, email, sector, status, tier, mrr, renewal_date, joined_date")
    .order("name");
  const { data: projects } = await supabase.from("projects").select("id, organisation_id");

  const projectCountByOrg: Record<string, number> = {};
  (projects ?? []).forEach((p) => {
    const id = p.organisation_id;
    projectCountByOrg[id] = (projectCountByOrg[id] ?? 0) + 1;
  });

  const list = orgs ?? [];
  const activeCount = list.filter((o) => (o.status || "").toLowerCase() === "active").length;

  return (
    <>
      <header className="dashboard-page-header">
        <h2>Clients</h2>
        <p>{list.length} total · {activeCount} active</p>
      </header>
      <div style={{ marginBottom: 8 }}>
        {list.map((o) => (
          <Link
            key={o.id}
            href={`/admin/clients/${o.id}`}
            className={`dashboard-client-row ${statusClass(o.status)}`}
            style={{ textDecoration: "none", color: "inherit", display: "block" }}
          >
            <div className="dashboard-client-bar" />
            <div className="dashboard-client-body" style={{ gap: 20 }}>
              <div style={{ flex: 2, minWidth: 0 }}>
                <div className="dashboard-client-name">{o.name}</div>
                <div className="dashboard-client-meta">
                  {o.contact_name ?? "—"} · {o.sector ?? "—"}
                </div>
              </div>
              <div style={{ flexShrink: 0, fontFamily: "var(--font-dm-mono), monospace", fontSize: 9, letterSpacing: "0.14em", color: tierColor(o.tier) }}>
                {o.tier ?? "—"}
              </div>
              <div style={{ flexShrink: 0, fontWeight: 600, color: "var(--text-pri)", fontSize: 13 }}>
                {o.mrr != null ? `R${o.mrr.toLocaleString()}` : "—"}
                <span style={{ fontSize: 10, color: "var(--text-ter)", fontWeight: 400 }}>/mo</span>
              </div>
              <div style={{ flexShrink: 0, fontSize: 12, color: "var(--text-sec)" }}>
                {projectCountByOrg[o.id] ?? 0} projects
              </div>
              <div
                style={{
                  flexShrink: 0,
                  fontFamily: "var(--font-dm-mono), monospace",
                  fontSize: 9,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color:
                    (o.status || "").toLowerCase() === "active"
                      ? "var(--r4)"
                      : (o.status || "").toLowerCase() === "overdue"
                        ? "var(--r1)"
                        : "var(--r3)",
                }}
              >
                {o.status ?? "pending"}
              </div>
              <div style={{ flexShrink: 0, fontFamily: "var(--font-dm-mono), monospace", fontSize: 9, color: "var(--text-ter)" }}>
                {fmtDateShort(o.renewal_date)}
              </div>
              <span className="dashboard-tbl-action">Manage →</span>
            </div>
          </Link>
        ))}
      </div>
      {list.length === 0 && (
        <p style={{ padding: 32, color: "var(--text-ter)", fontSize: 14, border: "1px dashed var(--glass-border)", textAlign: "center" }}>
          No clients yet
        </p>
      )}
    </>
  );
}
