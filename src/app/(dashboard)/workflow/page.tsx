import DashboardHeader from "@/components/dashboard/DashboardHeader";
import WorkflowApprovals from "@/modules/workflowManagement/components/WorkflowApprovals";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workflow & Approvals - SDRMS",
  description: "Orchestrate data governance and approval hierarchies.",
};

export default function WorkflowPage() {
  return (
    <div>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard" },
          { label: "Workflow" },
        ]}
      />
      <WorkflowApprovals />
    </div>
  );
}
