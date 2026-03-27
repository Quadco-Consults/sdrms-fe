import Sidebar from "@/components/dashboard/Sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-[#F4F5F6]">
      <Sidebar />
      <main className="flex-1 min-w-0 overflow-auto">{children}</main>
    </div>
  );
}
