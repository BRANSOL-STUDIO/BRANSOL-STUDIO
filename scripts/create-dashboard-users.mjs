/**
 * Create 2 dashboard users in Supabase Auth (Admin API).
 *
 * Usage:
 *   Set env vars (e.g. in .env.local or inline), then:
 *   node --env-file=.env.local scripts/create-dashboard-users.mjs
 *
 * Required env:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   DASHBOARD_USER_1_EMAIL, DASHBOARD_USER_1_PASSWORD
 *   DASHBOARD_USER_2_EMAIL, DASHBOARD_USER_2_PASSWORD
 */

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const u1Email = process.env.DASHBOARD_USER_1_EMAIL;
const u1Password = process.env.DASHBOARD_USER_1_PASSWORD;
const u2Email = process.env.DASHBOARD_USER_2_EMAIL;
const u2Password = process.env.DASHBOARD_USER_2_PASSWORD;

if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}
if (!u1Email || !u1Password || !u2Email || !u2Password) {
  console.error(
    "Missing dashboard user credentials. Set DASHBOARD_USER_1_EMAIL, DASHBOARD_USER_1_PASSWORD, DASHBOARD_USER_2_EMAIL, DASHBOARD_USER_2_PASSWORD"
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

async function createUser(email, password, label) {
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error) {
    console.error(`${label}: ${error.message}`);
    return;
  }
  console.log(`${label}: created ${data.user?.email ?? email}`);
}

async function main() {
  console.log("Creating 2 dashboard users...");
  await createUser(u1Email, u1Password, "User 1");
  await createUser(u2Email, u2Password, "User 2");
  console.log("Done.");
}

main();
