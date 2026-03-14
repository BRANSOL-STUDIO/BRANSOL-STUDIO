import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ProjectCard } from "@/components/platform/ProjectCard";
import { fmtDate } from "@/lib/utils";

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("id, title, scope, status, progress, milestone, due_date, color")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <h1
        className="text-2xl font-bold tracking-tight"
        style={{ fontFamily: "var(--font-syne)", color: "var(--text-pri)" }}
      >
        Projects
      </h1>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {(projects ?? []).map((p) => (
          <li key={p.id}>
            <Link href={`/projects/${p.id}`}>
              <ProjectCard
                title={p.title}
                status={p.status}
                progress={p.progress}
                dueDate={p.due_date}
                color={p.color}
              />
            </Link>
          </li>
        ))}
      </ul>
      {(!projects || projects.length === 0) && (
        <p className="p-8 rounded-xl border border-dashed" style={{ color: "var(--text-ter)", borderColor: "var(--border)" }}>
          No projects yet
        </p>
      )}
    </div>
  );
}
