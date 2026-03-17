import { createServiceClient } from "@/lib/supabase/server";
import { TEAM } from "@/lib/studio-data";
import type { TeamMember } from "@/lib/studio-data";
import { StudioPageView } from "./StudioPageView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio — BRANSOL",
  description:
    "BRANSOL is a Ballito-based strategic design studio on the KwaZulu-Natal North Coast. We work with a small number of organisations each year — selectively, deeply, and without compromise.",
};

function normalizeName(name: string): string {
  return (name || "").toLowerCase().trim().replace(/\s+/g, " ");
}

function mergeTeamWithAvatars(team: TeamMember[], profiles: { name: string | null; avatar: string | null }[]): TeamMember[] {
  return team.map((member) => {
    const nameNorm = normalizeName(member.name);
    const firstWord = nameNorm.split(" ")[0] ?? "";
    const profile = profiles.find((p) => {
      const pName = normalizeName(p.name ?? "");
      if (!pName) return false;
      return pName === nameNorm || pName.includes(nameNorm) || nameNorm.includes(pName) || (firstWord.length >= 2 && pName.includes(firstWord));
    });
    return { ...member, avatarUrl: profile?.avatar ?? null };
  });
}

export default async function StudioPage() {
  let teamWithAvatars: TeamMember[] = TEAM;
  try {
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createServiceClient();
      const { data: profiles } = await supabase
        .from("profiles")
        .select("name, avatar")
        .or("role.eq.admin,role.eq.super_admin");
      if (profiles?.length) {
        teamWithAvatars = mergeTeamWithAvatars(TEAM, profiles);
      }
    }
  } catch {
    // use static TEAM without avatars
  }
  return <StudioPageView team={teamWithAvatars} />;
}
