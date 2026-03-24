import { createClient, createServiceClient } from "@/lib/supabase/server";
import { MembersView, type MemberForList } from "@/components/admin/MembersView";
import { fmtDate, getInitials, getAvatarColor } from "@/lib/utils";
import type { UserRole } from "@/lib/types";

export default async function AdminTeamPage() {
  const supabase = await createClient();
  const service = createServiceClient();

  const { data: profiles } = await service
    .from("profiles")
    .select("id, name, email, role, organisation_id, avatar, created_at")
    .order("role", { ascending: false });

  const orgIds = Array.from(new Set((profiles ?? []).map((p) => p.organisation_id).filter(Boolean))) as string[];
  const { data: orgs } = orgIds.length
    ? await supabase.from("organisations").select("id, name").in("id", orgIds)
    : { data: [] };
  const orgMap = new Map((orgs ?? []).map((o) => [o.id, o.name]));

  const { data: teamRows } = await supabase.from("project_team").select("profile_id");
  const projectCountByProfile: Record<string, number> = {};
  (teamRows ?? []).forEach((r) => {
    if (r.profile_id) projectCountByProfile[r.profile_id] = (projectCountByProfile[r.profile_id] ?? 0) + 1;
  });

  const studioRoles = ["admin", "super_admin"] as const;
  function normalizeRole(role: string | null): UserRole {
    const normalized = (role ?? "client")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_");
    if (normalized === "admin" || normalized === "super_admin") return normalized;
    return "client";
  }
  const members: MemberForList[] = (profiles ?? []).map((p, i) => ({
    role: normalizeRole(p.role),
    id: p.id,
    name: p.name ?? null,
    email: p.email ?? null,
    type: studioRoles.includes(normalizeRole(p.role)) ? "studio" : "client",
    orgName: p.organisation_id ? orgMap.get(p.organisation_id) ?? null : null,
    avatar: getInitials(p.name, p.email),
    avatarUrl: p.avatar ?? null,
    color: getAvatarColor(i),
    projectCount: projectCountByProfile[p.id] ?? 0,
    joinedDate: p.created_at ? fmtDate(p.created_at) : null,
  }));

  const studioCount = members.filter((m) => m.type === "studio").length;
  const clientCount = members.filter((m) => m.type === "client").length;
  return (
    <MembersView
      members={members}
      studioCount={studioCount}
      clientCount={clientCount}
    />
  );
}
