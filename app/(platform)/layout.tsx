import { redirect } from "next/navigation";
import "@/styles/dashboard.css";
import { Sidebar } from "@/components/platform/Sidebar";
import { Topbar } from "@/components/platform/Topbar";
import { createClient } from "@/lib/supabase/server";

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/auth/login?redirect=/dashboard");
  }
  return (
    <div className="dashboard-shell">
      <Sidebar />
      <div className="dashboard-main">
        <Topbar />
        <div className="dashboard-content">{children}</div>
      </div>
    </div>
  );
}
