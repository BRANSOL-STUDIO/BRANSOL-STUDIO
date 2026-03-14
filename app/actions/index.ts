"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

/**
 * Commission intake form submission.
 * Option A: Insert into organisations (name, contact_name, email, status: 'pending') and store scope in notes or a JSON column.
 * Option B: Add a commission_requests table and insert there.
 * Here we insert into organisations as pending intake for simplicity.
 */
export async function submitCommission(formData: FormData) {
  const name = formData.get("organisation_name") as string;
  const contact_name = formData.get("contact_name") as string;
  const email = formData.get("email") as string;
  const scope = formData.get("scope") as string;
  if (!name?.trim() || !contact_name?.trim() || !email?.trim() || !scope?.trim()) {
    throw new Error("Missing required fields");
  }
  const supabase = await createClient();
  // If you add an intake_scope or notes column to organisations, include scope here.
  const { error } = await supabase.from("organisations").insert({
    name: name.trim(),
    contact_name: contact_name.trim(),
    email: email.trim(),
    status: "pending",
  });
  if (error) throw error;
  revalidatePath("/begin");
}
