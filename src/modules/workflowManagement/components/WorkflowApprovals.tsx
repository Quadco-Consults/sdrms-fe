"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pencil, Trash2, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

type TabType = "overview" | "tasks" | "manage";

interface Submission {
  id: string;
  name: string;
  date: string;
  category: string;
  businessUnit: string;
  workgroup: string;
  statusAge: string;
  statusColor: "yellow" | "blue" | "green";
  tier: string;
  assignedTo: string;
}

interface AssignedTask {
  id: string;
  priority: "HIGH PRIORITY" | "NORMAL PRIORITY";
  category: string;
  title: string;
  dueDate: string;
  status: "Pending";
}

interface WorkflowDefinition {
  id: string;
  name: string;
  description: string;
  stages: number;
  status: "ACTIVE" | "DRAFT";
}

const mockSubmissions: Submission[] = [
  {
    id: "1",
    name: "Upstream GHG Data",
    date: "Mar 2026",
    category: "Flaring",
    businessUnit: "NUIMS",
    workgroup: "Upstream",
    statusAge: "5 DAYS",
    statusColor: "yellow",
    tier: "Tier 1",
    assignedTo: "Zone Reviewer A",
  },
  {
    id: "2",
    name: "Scope 2 Electricity",
    date: "Mar 2026",
    category: "Purchased Electricity",
    businessUnit: "NNPC E&P Ltd",
    workgroup: "Upstream",
    statusAge: "3 DAYS",
    statusColor: "blue",
    tier: "Tier 2",
    assignedTo: "BU Approver B",
  },
  {
    id: "3",
    name: "Water Withdrawal",
    date: "Mar 2026",
    category: "Water",
    businessUnit: "NNPC E&P Ltd",
    workgroup: "Upstream",
    statusAge: "1 DAYS",
    statusColor: "green",
    tier: "Tier 3",
    assignedTo: "ESG Team",
  },
];

const mockTasks: AssignedTask[] = [
  {
    id: "1",
    priority: "HIGH PRIORITY",
    category: "Monthly GHG Emissions Approval",
    title: "Review GHG Emissions – Jan 2026",
    dueDate: "2026-04-10",
    status: "Pending",
  },
  {
    id: "2",
    priority: "NORMAL PRIORITY",
    category: "Quarterly Water Usage Audit",
    title: "Approve Water Consumption – Q1 2026",
    dueDate: "2026-04-15",
    status: "Pending",
  },
];

const mockWorkflows: WorkflowDefinition[] = [
  {
    id: "1",
    name: "Monthly GHG Emissions Approval",
    description: "Standard approval chain for Scope 1 & 2 emissions.",
    stages: 3,
    status: "ACTIVE",
  },
  {
    id: "2",
    name: "Quarterly Water Usage Audit",
    description: "Mandatory audit for all business units.",
    stages: 2,
    status: "ACTIVE",
  },
  {
    id: "3",
    name: "Annual Social Impact Review",
    description: "Year-end review of community investment data.",
    stages: 4,
    status: "DRAFT",
  },
];

export default function WorkflowApprovals() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [workflows, setWorkflows] = useState<WorkflowDefinition[]>(mockWorkflows);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowDefinition | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    stages: 1,
    status: "DRAFT" as "ACTIVE" | "DRAFT",
  });

  const getStatusColor = (color: "yellow" | "blue" | "green") => {
    switch (color) {
      case "yellow":
        return "bg-yellow-100 text-yellow-800";
      case "blue":
        return "bg-blue-100 text-blue-800";
      case "green":
        return "bg-green-100 text-green-800";
    }
  };

  const handleApprove = () => {
    console.log("Approving submission:", selectedSubmission?.id);
    // TODO: Implement API call
    alert("Submission approved successfully!");
    setSelectedSubmission(null);
  };

  const handleRequestRevision = () => {
    console.log("Requesting revision for:", selectedSubmission?.id);
    // TODO: Implement API call
    alert("Revision requested successfully!");
  };

  const handleReject = () => {
    console.log("Rejecting submission:", selectedSubmission?.id);
    // TODO: Implement API call
    if (confirm("Are you sure you want to reject this submission?")) {
      alert("Submission rejected!");
      setSelectedSubmission(null);
    }
  };

  const handleStartTask = (taskId: string) => {
    console.log("Starting task:", taskId);
    // TODO: Implement API call or navigate to task detail page
    alert("Task started successfully! You can now begin working on this task.");
  };

  const handleCreateWorkflow = () => {
    const newWorkflow: WorkflowDefinition = {
      id: String(workflows.length + 1),
      name: formData.name,
      description: formData.description,
      stages: formData.stages,
      status: formData.status,
    };
    setWorkflows([...workflows, newWorkflow]);
    setIsCreateModalOpen(false);
    resetForm();
    alert("Workflow created successfully!");
  };

  const handleEditWorkflow = () => {
    if (!selectedWorkflow) return;
    const updatedWorkflows = workflows.map((w) =>
      w.id === selectedWorkflow.id
        ? { ...w, ...formData }
        : w
    );
    setWorkflows(updatedWorkflows);
    setIsEditModalOpen(false);
    setSelectedWorkflow(null);
    resetForm();
    alert("Workflow updated successfully!");
  };

  const handleDeleteWorkflow = (id: string) => {
    if (confirm("Are you sure you want to delete this workflow?")) {
      setWorkflows(workflows.filter((w) => w.id !== id));
      alert("Workflow deleted successfully!");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      stages: 1,
      status: "DRAFT",
    });
  };

  const openEditModal = (workflow: WorkflowDefinition) => {
    setSelectedWorkflow(workflow);
    setFormData({
      name: workflow.name,
      description: workflow.description,
      stages: workflow.stages,
      status: workflow.status,
    });
    setIsEditModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Workflow & Approvals</h1>
          <p className="text-gray-600 mt-1">
            Orchestrate data governance and approval hierarchies.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "overview"
                ? "border-green-600 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Submission Overview
          </button>
          <button
            onClick={() => setActiveTab("tasks")}
            className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "tasks"
                ? "border-green-600 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            My Tasks
          </button>
          <button
            onClick={() => setActiveTab("manage")}
            className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "manage"
                ? "border-green-600 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Manage Workflows
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <>
          {selectedSubmission ? (
            /* Submission Detail View */
            <div className="space-y-6">
              {/* Header with Back Button */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.5 15L7.5 10L12.5 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedSubmission.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {selectedSubmission.date} • {selectedSubmission.category}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Submitted Values Section */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">
                        SUBMITTED VALUES
                      </h3>
                      <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        BULK UPLOAD (TEMPLATE)
                      </button>
                    </div>

                    {/* File Upload Area */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                      <div className="flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-blue-600"
                          >
                            <path
                              d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M14 2V8H20"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Upstream_Data_Template_v2.xlsx
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Uploaded by Fatima Bello • 2.4 MB • 142 Records
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Download & Review File
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Additional Sections can go here */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Workflow Progress
                    </h3>
                    <div className="space-y-4">
                      {/* Progress steps */}
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            className="text-green-600"
                          >
                            <path
                              d="M13.3334 4L6.00002 11.3333L2.66669 8"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Submitted</p>
                          <p className="text-xs text-gray-500">Data submitted for review</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedSubmission.tier} Review
                          </p>
                          <p className="text-xs text-gray-500">
                            Assigned to {selectedSubmission.assignedTo}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Panel Sidebar */}
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Action Panel
                    </h3>
                    <div className="space-y-3">
                      <Button
                        onClick={handleApprove}
                        className="w-full bg-green-700 hover:bg-green-800 text-white"
                      >
                        Approve Submission
                      </Button>
                      <Button
                        onClick={handleRequestRevision}
                        variant="outline"
                        className="w-full border-gray-300 hover:bg-gray-50"
                      >
                        Request Revision
                      </Button>
                      <Button
                        onClick={handleReject}
                        variant="outline"
                        className="w-full border-gray-300 hover:bg-red-50 text-red-600 hover:text-red-700"
                      >
                        Reject Submission
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Submission List View */
            <div className="space-y-6">
              {/* Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Pending My Action */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    PENDING MY ACTION
                  </div>
                  <div className="text-3xl font-bold text-gray-900">12</div>
                </div>

                {/* Escalated Items */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    ESCALATED ITEMS
                  </div>
                  <div className="text-3xl font-bold text-gray-900">3</div>
                </div>

                {/* Avg. Turnaround */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    AVG. TURNAROUND
                  </div>
                  <div className="text-3xl font-bold text-blue-600">2.4d</div>
                </div>

                {/* Bypass Rate */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    BYPASS RATE
                  </div>
                  <div className="text-3xl font-bold text-gray-900">5%</div>
                </div>
              </div>

              {/* Submissions Table */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-green-700 text-white">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          SUBMISSION
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          BU / WORKGROUP
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          STATUS AGE
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          CURRENT STAGE
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          ACTIONS
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockSubmissions.map((submission) => (
                        <tr key={submission.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-900">
                                {submission.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {submission.date} • {submission.category}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-900">
                                {submission.businessUnit}
                              </span>
                              <span className="text-xs text-gray-500">
                                {submission.workgroup}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span
                                className={cn(
                                  "inline-flex items-center px-3 py-1 text-xs font-semibold rounded",
                                  getStatusColor(submission.statusColor)
                                )}
                              >
                                {submission.statusAge}
                              </span>
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                className="text-gray-400"
                              >
                                <path
                                  d="M8 4V8L11 11"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <circle
                                  cx="8"
                                  cy="8"
                                  r="6"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                />
                              </svg>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-900">
                                  {submission.tier}
                                </span>
                                <span className="text-xs text-gray-500">
                                  Assigned to: {submission.assignedTo}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Button
                              onClick={() => setSelectedSubmission(submission)}
                              variant="outline"
                              size="sm"
                              className="text-gray-700 border-gray-300 hover:bg-gray-50"
                            >
                              Review
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === "tasks" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Assigned Tasks */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Assigned Tasks</h2>

            {/* Task Cards */}
            <div className="space-y-4">
              {mockTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-lg border border-gray-200 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "text-xs font-semibold px-3 py-1 rounded",
                            task.priority === "HIGH PRIORITY"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          )}
                        >
                          {task.priority}
                        </span>
                        <span className="text-sm text-gray-600">{task.category}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {task.title}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 uppercase mb-1">DUE DATE</div>
                      <div className="text-sm font-semibold text-gray-900">
                        {task.dueDate}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{task.status}</span>
                    </div>
                    <Button
                      onClick={() => handleStartTask(task.id)}
                      className="bg-green-700 hover:bg-green-800 text-white"
                    >
                      Start Task
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar - Task Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Summary</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Tasks</span>
                  <span className="text-2xl font-bold text-gray-900">8</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Overdue</span>
                  <span className="text-2xl font-bold text-red-600">1</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Due Today</span>
                  <span className="text-2xl font-bold text-orange-600">2</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Completed (MTD)</span>
                  <span className="text-2xl font-bold text-gray-900">14</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "manage" && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Workflow Definitions</h2>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-green-700 hover:bg-green-800 text-white flex items-center gap-2"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 3.33334V12.6667M3.33334 8H12.6667"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Create Workflow
            </Button>
          </div>

          {/* Workflow Cards */}
          <div className="space-y-4">
            {workflows.map((workflow) => (
              <div
                key={workflow.id}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  {/* Left side - Icon and content */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-gray-600"
                      >
                        <path
                          d="M12 5V19M5 12L12 5L19 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {workflow.name}
                      </h3>
                      <p className="text-sm text-gray-600">{workflow.description}</p>
                    </div>
                  </div>

                  {/* Right side - Stats and actions */}
                  <div className="flex items-center gap-6 ml-4">
                    <div className="text-center">
                      <div className="text-xs text-gray-500 uppercase mb-1">TIERS</div>
                      <div className="text-sm font-semibold text-gray-900">
                        {workflow.stages} Stages
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-xs text-gray-500 uppercase mb-1">STATUS</div>
                      <span
                        className={cn(
                          "inline-flex px-3 py-1 text-xs font-semibold rounded",
                          workflow.status === "ACTIVE"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        )}
                      >
                        {workflow.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(workflow)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Pencil className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteWorkflow(workflow.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Workflow Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Workflow</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Workflow Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter workflow name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={3}
                placeholder="Enter workflow description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Stages
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.stages}
                  onChange={(e) =>
                    setFormData({ ...formData, stages: parseInt(e.target.value) || 1 })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as "ACTIVE" | "DRAFT" })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="ACTIVE">Active</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsCreateModalOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateWorkflow}
              className="bg-green-700 hover:bg-green-800 text-white"
              disabled={!formData.name || !formData.description}
            >
              Create Workflow
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Workflow Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Workflow</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Workflow Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter workflow name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={3}
                placeholder="Enter workflow description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Stages
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.stages}
                  onChange={(e) =>
                    setFormData({ ...formData, stages: parseInt(e.target.value) || 1 })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as "ACTIVE" | "DRAFT" })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="ACTIVE">Active</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedWorkflow(null);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditWorkflow}
              className="bg-green-700 hover:bg-green-800 text-white"
              disabled={!formData.name || !formData.description}
            >
              Update Workflow
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
