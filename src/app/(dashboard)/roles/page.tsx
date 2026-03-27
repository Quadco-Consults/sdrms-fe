import DashboardHeader from "@/components/dashboard/DashboardHeader";
import EnhancedRoleManagement from "@/modules/userManagement/components/EnhancedRoleManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Role Management - SDRMS",
  description: "Manage roles and permissions for SDRMS users.",
};

export default function RolesPage() {
  return (
    <div>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard" },
          { label: "Role Management" },
        ]}
      />
      <EnhancedRoleManagement />
    </div>
  );
}
