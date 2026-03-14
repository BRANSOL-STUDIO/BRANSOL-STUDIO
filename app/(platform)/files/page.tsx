import { createClient } from "@/lib/supabase/server";
import { fmtDate } from "@/lib/utils";

function formatSize(bytes: number | string | null): string {
  const n = bytes == null ? NaN : typeof bytes === "string" ? parseInt(bytes, 10) : bytes;
  if (Number.isNaN(n)) return "—";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

export default async function FilesPage() {
  const supabase = await createClient();
  const { data: files } = await supabase
    .from("files")
    .select("id, name, file_type, file_size, created_at")
    .order("created_at", { ascending: false });

  return (
    <>
      <header className="dashboard-page-header">
        <h2>Files</h2>
        <p>Upload briefs, references, and supporting materials</p>
      </header>
      <div id="upload" className="dashboard-upload-zone" role="button" tabIndex={0}>
        <div className="dashboard-upload-icon">⊞</div>
        <div style={{ fontFamily: "var(--font-dm-mono), monospace", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--text-ter)" }}>Click to Upload</div>
        <p>PDF, ZIP, DOCX, JPG — up to 100MB per file</p>
      </div>
      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <span className="dashboard-card-title">Your Uploads</span>
        </div>
        {(files ?? []).map((f) => (
          <div key={f.id} className="dashboard-file-row">
            <div className="dashboard-file-icon">
              {(f.file_type || "").toUpperCase().includes("PDF") ? "📄" : "📦"}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="dashboard-file-name">{f.name}</div>
              <div className="dashboard-file-meta">{f.file_type ?? "—"} · {formatSize(f.file_size)}</div>
            </div>
            <div className="dashboard-file-meta">{fmtDate(f.created_at)}</div>
          </div>
        ))}
        {(!files || files.length === 0) && (
          <p className="py-4 text-sm" style={{ color: "var(--text-ter)" }}>No files yet</p>
        )}
      </div>
    </>
  );
}
