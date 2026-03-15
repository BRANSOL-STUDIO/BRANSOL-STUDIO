"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/server";

/**
 * Update project team assignment. Caller must be super_admin.
 * Replaces all assigned members for the project with the given profile IDs.
 */
export async function updateProjectTeam(projectId: string, profileIds: string[]) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  const role = (profile?.role as string)?.toLowerCase();
  if (role !== "super_admin") throw new Error("Only super admins can manage project team");

  const service = createServiceClient();
  await service.from("project_team").delete().eq("project_id", projectId);
  if (profileIds.length > 0) {
    const rows = profileIds.map((profile_id) => ({ project_id: projectId, profile_id }));
    const { error } = await service.from("project_team").insert(rows);
    if (error) throw error;
  }
  revalidatePath("/admin/projects");
  revalidatePath(`/admin/projects/${projectId}`);
}
