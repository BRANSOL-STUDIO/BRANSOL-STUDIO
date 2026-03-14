"use server";

import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";

/**
 * Commission intake form submission.
 * Uses service role so unauthenticated visitors can submit. Inserts into organisations
 * (name, contact_name, email, status: 'pending'). Add a notes or intake_scope column
 * to organisations to persist scope.
 */
export async function submitCommission(formData: FormData) {
  const name = formData.get("organisation_name") as string;
  const contact_name = formData.get("contact_name") as string;
  const email = formData.get("email") as string;
  const scope = (formData.get("scope") as string)?.trim();
  if (!name?.trim() || !contact_name?.trim() || !email?.trim() || !scope) {
    throw new Error("Missing required fields");
  }
  // Scope is validated; persist when organisations has a notes/intake_scope column
  const supabase = createServiceClient();
  const row: Record<string, unknown> = {
    name: name.trim(),
    contact_name: contact_name.trim(),
    email: email.trim(),
    status: "pending",
  };
  const { error } = await supabase.from("organisations").insert(row);
  if (error) throw error;
  revalidatePath("/begin");
}
