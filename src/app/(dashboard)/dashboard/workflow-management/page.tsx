import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function WorkflowManagementPage() {
  return (
    <div>
      <DashboardHeader
        breadcrumbs={[{ label: "Dashboard" }, { label: "Workflow Management" }]}
      />

      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Workflow Management
        </h1>
        <p className="text-gray-600">
          This page is under construction. Workflow management features will be
          available here.
        </p>
      </div>
    </div>
  );
}
