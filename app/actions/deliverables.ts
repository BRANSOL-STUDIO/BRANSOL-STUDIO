"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

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
  revalidatePath("/deliverables");
  revalidatePath("/dashboard");
}

export async function requestChangesDeliverable(id: string, note: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("deliverables")
    .update({ status: "changes", note })
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/deliverables");
  revalidatePath("/dashboard");
}
