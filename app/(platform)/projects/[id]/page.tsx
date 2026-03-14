import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { fmtDate } from "@/lib/utils";
import { ProjectDrawer } from "@/components/platform/ProjectDrawer";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase
    .from("projects")
    .select("*, project_phases(*)")
    .eq("id", id)
    .single();
  if (!project) notFound();

  return (
    <div className="space-y-8">
      <Link
        href="/projects"
        className="text-[10px] tracking-[0.2em] uppercase inline-block"
        style={{ color: "var(--text-ter)" }}
      >
        ← Projects
      </Link>
      <div className="flex flex-wrap justify-between items-start gap-4">
        <div>
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-syne)", color: "var(--text-pri)" }}
          >
            {project.title}
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-sec)" }}>
            {project.status} · {project.progress}% {project.due_date && `· Due ${fmtDate(project.due_date)}`}
          </p>
        </div>
      </div>
      {project.scope && (
        <div
          className="p-6 rounded-xl border"
          style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}
        >
          <h2 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-ter)" }}>
            Scope
          </h2>
          <p style={{ color: "var(--text-sec)" }}>{project.scope}</p>
        </div>
      )}
      <ProjectDrawer
        phases={(project as { project_phases?: { id: string; label: string; done: boolean; active: boolean }[] }).project_phases ?? []}
        projectId={project.id}
      />
    </div>
  );
}
