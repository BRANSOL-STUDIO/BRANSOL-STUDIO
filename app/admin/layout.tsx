import { redirect } from "next/navigation";
import "@/styles/dashboard.css";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { createClient, createServiceClient } from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/auth/login?redirect=/admin/overview");
  }

  let roleRaw = "";

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const hasServiceKey =
    !!serviceKey && serviceKey.length > 10 && !serviceKey.includes("placeholder");

  if (hasServiceKey) {
    try {
      const service = createServiceClient();
      const { data: profile } = await service
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();
      roleRaw = (profile?.role as string) ?? "";
    } catch {
      // fall back to session-based lookups
    }
  }

  if (!roleRaw) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();
    roleRaw = (profile?.role as string) ?? "";
  }

  if (!roleRaw) {
    roleRaw =
      (user as { app_metadata?: { role?: string } }).app_metadata?.role ??
      (user as { user_metadata?: { role?: string } }).user_metadata?.role ??
      "";
  }

  const role = roleRaw.toString().toLowerCase().trim().replace(/\s+/g, "_");
  if (role && role !== "admin" && role !== "super_admin") {
    redirect("/dashboard");
  }
  return (
    <div className="dashboard-shell">
      <AdminSidebar />
      <div className="dashboard-main">
        <div className="dashboard-content">{children}</div>
      </div>
    </div>
  );
}
