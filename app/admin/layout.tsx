import { redirect } from "next/navigation";
import "@/styles/dashboard.css";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { createClient } from "@/lib/supabase/server";

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
  // Role from profiles table, or from auth app_metadata (Supabase Auth → User → Edit)
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  const roleRaw =
    (profile?.role as string) ??
    (user as { app_metadata?: { role?: string } }).app_metadata?.role ??
    (user as { user_metadata?: { role?: string } }).user_metadata?.role;
  const role = (roleRaw ?? "client").toString().toLowerCase().trim();
  if (role !== "admin" && role !== "super_admin") {
    redirect("/dashboard");
  }
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--void)]">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
