import { createClient } from "@/lib/supabase/server";
import { fmtDate } from "@/lib/utils";

export default async function FilesPage() {
  const supabase = await createClient();
  const { data: files } = await supabase
    .from("files")
    .select("id, name, file_type, file_size, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <h1
        className="text-2xl font-bold tracking-tight"
        style={{ fontFamily: "var(--font-syne)", color: "var(--text-pri)" }}
      >
        Files
      </h1>
      <p className="text-sm" style={{ color: "var(--text-sec)" }}>
        Briefs and references you have uploaded.
      </p>
      <ul className="space-y-2">
        {(files ?? []).map((f) => (
          <li
            key={f.id}
            className="flex items-center justify-between p-4 rounded-xl border"
            style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}
          >
            <span style={{ color: "var(--text-pri)" }}>{f.name}</span>
            <span className="text-xs" style={{ color: "var(--text-ter)" }}>
              {f.file_type ?? "—"} · {fmtDate(f.created_at)}
            </span>
          </li>
        ))}
      </ul>
      {(!files || files.length === 0) && (
        <p className="p-8 rounded-xl border border-dashed" style={{ color: "var(--text-ter)", borderColor: "var(--border)" }}>
          No files yet
        </p>
      )}
    </div>
  );
}
