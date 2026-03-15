import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { fmtDate } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default async function AdminClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: org } = await supabase.from("organisations").select("*").eq("id", id).single();
  if (!org) notFound();

  const { data: projects } = await supabase.from("projects").select("id, title, status").eq("organisation_id", id);

  return (
    <div className="space-y-8">
      <Link href="/admin/clients" className="text-[10px] tracking-[0.2em] uppercase inline-block" style={{ color: "var(--text-ter)" }}>
        ← Clients
      </Link>
      <div>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-syne)", color: "var(--text-pri)" }}>
          {org.name}
        </h1>
        <StatusBadge status={org.status} className="mt-2" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-6 rounded-xl border" style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}>
          <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "var(--text-ter)" }}>Contact</p>
          <p style={{ color: "var(--text-pri)" }}>{org.contact_name ?? "—"}</p>
          <p style={{ color: "var(--text-sec)" }}>{org.email ?? "—"}</p>
        </div>
        <div className="p-6 rounded-xl border" style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}>
          <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "var(--text-ter)" }}>Dates</p>
          <p style={{ color: "var(--text-sec)" }}>Joined {fmtDate(org.joined_date)}</p>
          <p style={{ color: "var(--text-sec)" }}>Renewal {fmtDate(org.renewal_date)}</p>
        </div>
      </div>
      <section>
        <h2 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: "var(--text-ter)" }}>
          Projects
        </h2>
        <ul className="space-y-2">
          {(projects ?? []).map((p) => (
            <li key={p.id}>
              <Link
                href={`/admin/projects/${p.id}`}
                className="block p-3 rounded-lg border"
                style={{ background: "var(--lift)", borderColor: "var(--border)" }}
              >
                {p.title} · {p.status}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
