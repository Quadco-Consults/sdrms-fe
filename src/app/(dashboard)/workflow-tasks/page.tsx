import DashboardHeader from "@/components/dashboard/DashboardHeader";
import WorkflowTaskManager from "@/modules/workflowTaskManager/components/WorkflowTaskManager";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workflow Task Manager - SDRMS",
  description: "View, sort, and manage your governance-related tasks in one place.",
};

export default function WorkflowTasksPage() {
  return (
    <div>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard" },
          { label: "Workflow Task Manager" },
        ]}
      />
      <WorkflowTaskManager />
    </div>
  );
}
