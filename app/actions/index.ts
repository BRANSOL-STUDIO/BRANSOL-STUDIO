"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/server";

/**
 * Sign in with email/password. Runs on the server so session cookies are set on the response
 * and the next request (e.g. to /dashboard) includes them.
 */
export async function signIn(formData: FormData) {
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }
  if (!password || password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    const msg = error.message?.toLowerCase() ?? "";
    if (msg.includes("invalid login credentials") || msg.includes("invalid_credentials")) {
      return { error: "Incorrect email or password." };
    }
    if (msg.includes("fetch") || msg.includes("network") || msg.includes("failed to fetch")) {
      return { error: "Cannot reach Supabase. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local and restart." };
    }
    return { error: error.message };
  }
  return { success: true };
}

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
