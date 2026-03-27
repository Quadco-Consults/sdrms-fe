import DashboardHeader from "@/components/dashboard/DashboardHeader";
import WorkflowManagement from "@/modules/workflowManagement/components/WorkflowManagement";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workflow Management - SDRMS",
  description: "Manage approval workflows for data governance and compliance.",
};

export default function WorkflowPage() {
  return (
    <div>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard" },
          { label: "Workflow Management" },
        ]}
      />
      <WorkflowManagement />
    </div>
  );
}
