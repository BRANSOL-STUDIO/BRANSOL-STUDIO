import { createClient } from "@/lib/supabase/server";
import { AdminProjectsView, type AdminProjectCard, type ProjectPhase } from "@/components/admin/AdminProjectsView";
import { fmtDueDate, getInitials } from "@/lib/utils";

export default async function AdminProjectsPage() {
  const supabase = await createClient();

  const [
    { data: projects },
    { data: deliverables },
    { data: phases },
    { data: teamRows },
    { data: orgs },
  ] = await Promise.all([
    supabase
      .from("projects")
      .select("id, title, organisation_id, status, due_date, scope, progress, milestone, color, organisations(name)")
      .order("created_at", { ascending: false }),
    supabase.from("deliverables").select("project_id, status"),
    supabase.from("project_phases").select("project_id, label, phase_date, done, active, sort_order").order("sort_order"),
    supabase.from("project_team").select("project_id, profile_id"),
    supabase.from("organisations").select("id, status"),
  ]);

  const { data: profiles } = await supabase.from("profiles").select("id, name");

  const profileNames: Record<string, string> = {};
  (profiles ?? []).forEach((pr) => {
    if (pr.id) profileNames[pr.id] = pr.name ?? "";
  });

  const delivByProject: Record<string, { total: number; approved: number }> = {};
  (deliverables ?? []).forEach((d) => {
    const id = d.project_id;
    if (!id) return;
    if (!delivByProject[id]) delivByProject[id] = { total: 0, approved: 0 };
    delivByProject[id].total += 1;
    if ((d.status || "").toLowerCase() === "approved") delivByProject[id].approved += 1;
  });

  const phasesByProject: Record<string, { label: string; phase_date: string | null; done: boolean; active: boolean }[]> = {};
  (phases ?? []).forEach((ph) => {
    const id = ph.project_id;
    if (!id) return;
    if (!phasesByProject[id]) phasesByProject[id] = [];
    phasesByProject[id].push({
      label: ph.label ?? "",
      phase_date: ph.phase_date ?? null,
      done: !!ph.done,
      active: !!ph.active,
    });
  });

  const teamByProject: Record<string, string[]> = {};
  (teamRows ?? []).forEach((t) => {
    const id = t.project_id;
    if (!id) return;
    if (!teamByProject[id]) teamByProject[id] = [];
    const name = profileNames[t.profile_id];
    teamByProject[id].push(getInitials(name));
  });

  const activeClientCount = (orgs ?? []).filter((o) => (o.status || "").toLowerCase() === "active").length;

  const cards: AdminProjectCard[] = (projects ?? []).map((p) => {
    const org = (p as unknown as { organisations?: { name: string } }).organisations;
    const clientName = org?.name ?? "—";
    const normStatus = (p.status || "active").toLowerCase();
    return {
      id: p.id,
      title: p.title ?? "",
      client: clientName,
      status: normStatus,
      dueLabel: fmtDueDate(p.due_date),
      scope: p.scope ?? null,
      progress: p.progress ?? 0,
      milestone: p.milestone ?? null,
      color: p.color ?? "var(--iris)",
      deliverables: delivByProject[p.id]?.total ?? 0,
      approved: delivByProject[p.id]?.approved ?? 0,
      phases: (phasesByProject[p.id] ?? []).map(
        (ph): ProjectPhase => ({
          label: ph.label,
          phase_date: ph.phase_date,
          done: ph.done,
          active: ph.active,
        })
      ),
      team: teamByProject[p.id] ?? [],
    };
  });

  return (
    <>
      <AdminProjectsView projects={cards} activeClientsCount={activeClientCount} />
    </>
  );
}
