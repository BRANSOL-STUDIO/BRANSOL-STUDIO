import { Sidebar } from "@/components/platform/Sidebar";
import { Topbar } from "@/components/platform/Topbar";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[var(--void)]">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <Topbar />
        <div className="flex-1 overflow-auto p-6">{children}</div>
      </div>
    </div>
  );
}
