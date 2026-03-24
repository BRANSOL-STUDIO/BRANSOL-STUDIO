"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function revalidateDeliverablePaths() {
  revalidatePath("/deliverables");
  revalidatePath("/dashboard");
  revalidatePath("/admin/review");
  revalidatePath("/admin/deliverables");
}

export async function approveDeliverable(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("deliverables")
    .update({
      status: "approved",
      approved_date: new Date().toISOString().slice(0, 10),
    })
    .eq("id", id);
  if (error) throw error;
  revalidateDeliverablePaths();
}

export async function requestChangesDeliverable(id: string, note: string) {
  const supabase = await createClient();
  const trimmed = note.trim();
  const { data: auth } = await supabase.auth.getUser();
  const authorId = auth?.user?.id;

  const { error } = await supabase
    .from("deliverables")
    .update({ status: "changes", note: trimmed })
    .eq("id", id);
  if (error) throw error;

  if (authorId && trimmed) {
    await supabase.from("deliverable_comments").insert({
      deliverable_id: id,
      author_id: authorId,
      text: trimmed,
    });
  }
  revalidateDeliverablePaths();
}

export async function postDeliverableComment(deliverableId: string, text: string) {
  const supabase = await createClient();
  const trimmed = text.trim();
  if (!trimmed) throw new Error("Comment is empty");

  const { data: auth } = await supabase.auth.getUser();
  const user = auth?.user;
  if (!user) throw new Error("Unauthorized");

  const { error } = await supabase.from("deliverable_comments").insert({
    deliverable_id: deliverableId,
    author_id: user.id,
    text: trimmed,
  });
  if (error) throw error;
  revalidateDeliverablePaths();
}
