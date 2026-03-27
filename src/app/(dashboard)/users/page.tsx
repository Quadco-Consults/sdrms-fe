import DashboardHeader from "@/components/dashboard/DashboardHeader";
import EnhancedUserManagement from "@/modules/userManagement/components/EnhancedUserManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Management - SDRMS",
  description:
    "Add and manage internal users. Only authorized users can access the SDRMS dashboard.",
};

export default function UsersPage() {
  return (
    <div>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard" },
          { label: "User Management" },
        ]}
      />
      <EnhancedUserManagement />
    </div>
  );
}
