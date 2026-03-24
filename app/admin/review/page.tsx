import { createClient } from "@/lib/supabase/server";
import { ReviewBoardView, type ReviewBoardDeliverable } from "@/components/admin/ReviewBoardView";

export default async function AdminReviewBoardPage() {
  const supabase = await createClient();

  const { data: rows, error } = await supabase
    .from("deliverables")
    .select(
      `
      id,
      name,
      status,
      file_type,
      file_size,
      file_url,
      version,
      note,
      created_at,
      approved_date,
      uploaded_by,
      project_id,
      organisation_id,
      projects ( title ),
      organisations ( name )
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <p style={{ color: "var(--rose)", fontSize: 14 }}>
        Could not load deliverables: {error.message}
      </p>
    );
  }

  const list = rows ?? [];
  const ids = list.map((r) => r.id);

  const uploaderIds = Array.from(new Set(list.map((r) => r.uploaded_by).filter(Boolean))) as string[];

  const [{ data: profiles }, { data: commentRows }] = await Promise.all([
    uploaderIds.length
      ? supabase.from("profiles").select("id, name").in("id", uploaderIds)
      : Promise.resolve({ data: [] as { id: string; name: string | null }[] }),
    ids.length
      ? supabase
          .from("deliverable_comments")
          .select("id, deliverable_id, text, created_at, author_id")
          .in("deliverable_id", ids)
          .order("created_at", { ascending: true })
      : Promise.resolve({
          data: [] as {
            id: string;
            deliverable_id: string;
            text: string;
            created_at: string;
            author_id: string | null;
          }[],
        }),
  ]);

  const uploaderNames = new Map((profiles ?? []).map((p) => [p.id, p.name ?? null]));

  const authorIds = Array.from(
    new Set((commentRows ?? []).map((c) => c.author_id).filter(Boolean))
  ) as string[];
  const { data: commentAuthors } =
    authorIds.length > 0
      ? await supabase.from("profiles").select("id, name").in("id", authorIds)
      : { data: [] };
  const authorNames = new Map((commentAuthors ?? []).map((p) => [p.id, p.name ?? null]));

  const commentsByDeliv = new Map<string, ReviewBoardDeliverable["comments"]>();
  for (const c of commentRows ?? []) {
    const arr = commentsByDeliv.get(c.deliverable_id) ?? [];
    arr.push({
      id: c.id,
      text: c.text,
      createdAt: c.created_at,
      authorName: c.author_id ? authorNames.get(c.author_id) ?? null : null,
    });
    commentsByDeliv.set(c.deliverable_id, arr);
  }

  const deliverables: ReviewBoardDeliverable[] = list.map((r) => {
    const p = r as unknown as {
      id: string;
      name: string;
      status: string | null;
      file_type: string | null;
      file_size: string | null;
      file_url: string | null;
      version: string | null;
      note: string | null;
      created_at: string;
      uploaded_by: string | null;
      projects: { title: string } | null;
      organisations: { name: string } | null;
    };
    return {
      id: p.id,
      name: p.name,
      status: (p.status ?? "review").toLowerCase(),
      fileType: p.file_type,
      fileSize: p.file_size,
      fileUrl: p.file_url,
      version: p.version,
      note: p.note,
      createdAt: p.created_at,
      projectTitle: p.projects?.title ?? null,
      orgName: p.organisations?.name ?? null,
      uploaderName: p.uploaded_by ? uploaderNames.get(p.uploaded_by) ?? null : null,
      comments: commentsByDeliv.get(p.id) ?? [],
    };
  });

  return <ReviewBoardView deliverables={deliverables} />;
}
