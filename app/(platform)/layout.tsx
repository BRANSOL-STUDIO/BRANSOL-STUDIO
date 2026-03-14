import "@/styles/dashboard.css";
import { Sidebar } from "@/components/platform/Sidebar";
import { Topbar } from "@/components/platform/Topbar";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
