import { createClient } from "@/lib/supabase/server";
import { MembersView, type MemberForList } from "@/components/admin/MembersView";

const COLORS = [
  "var(--iris)",
  "var(--aqua)",
  "var(--violet)",
  "var(--gold)",
  "var(--sky)",
  "var(--ember)",
  "var(--rose)",
];

function getColor(index: number) {
  return COLORS[index % COLORS.length];
}

function getInitials(name: string | null, email: string | null): string {
  if (name?.trim()) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0].slice(0, 2).toUpperCase();
  }
  if (email) return email.slice(0, 2).toUpperCase();
  return "??";
}

export default async function AdminTeamPage() {
  const supabase = await createClient();
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, name, email, role, organisation_id")
    .order("role", { ascending: false });

  const orgIds = [...new Set((profiles ?? []).map((p) => p.organisation_id).filter(Boolean))] as string[];
  const { data: orgs } = orgIds.length
    ? await supabase.from("organisations").select("id, name").in("id", orgIds)
    : { data: [] };
  const orgMap = new Map((orgs ?? []).map((o) => [o.id, o.name]));

  const studioRoles = ["admin", "super_admin"];
  const members: MemberForList[] = (profiles ?? []).map((p, i) => ({
    id: p.id,
    name: p.name ?? null,
    email: p.email ?? null,
    role: p.role as "client" | "admin" | "super_admin",
    type: studioRoles.includes(p.role) ? "studio" : "client",
    orgName: p.organisation_id ? orgMap.get(p.organisation_id) ?? null : null,
    avatar: getInitials(p.name, p.email),
    color: getColor(i),
  }));

  const studioCount = members.filter((m) => m.type === "studio").length;
  const clientCount = members.filter((m) => m.type === "client").length;

  return (
    <div className="space-y-0">
      <div className="flex items-center justify-end gap-4 mb-6">
        <button type="button" className="dashboard-tb-btn primary">
          + Invite Admin
        </button>
      </div>
      <MembersView
        members={members}
        studioCount={studioCount}
        clientCount={clientCount}
      />
    </div>
  );
}
