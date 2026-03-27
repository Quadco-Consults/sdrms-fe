"use client";
import { useState } from "react";
import { Search, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useGetMyPendingTasks,
  useGetMySubmissions,
  useGetTasks,
  useExportTasks,
} from "../controllers/taskController";
import { WorkflowTask } from "../types/task";
import TaskDetailModal from "./TaskDetailModal";

type TabType = "pending" | "submissions" | "all";

export default function WorkflowTaskManager() {
  const [activeTab, setActiveTab] = useState<TabType>("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTask, setSelectedTask] = useState<WorkflowTask | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const { data: pendingTasks, isLoading: loadingPending, refetch: refetchPending } = useGetMyPendingTasks("Jeff");
  const { data: submissions, isLoading: loadingSubmissions, refetch: refetchSubmissions } = useGetMySubmissions("Richard Okon");
  const { data: allTasks, isLoading: loadingAll, refetch: refetchAll } = useGetTasks();
  const { exportToCSV } = useExportTasks();

  const getCurrentTasks = (): WorkflowTask[] => {
    let tasks: WorkflowTask[] = [];
    switch (activeTab) {
      case "pending":
        tasks = pendingTasks;
        break;
      case "submissions":
        tasks = submissions;
        break;
      case "all":
        tasks = allTasks;
        break;
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return tasks.filter(
        (task) =>
          task.taskId.toLowerCase().includes(query) ||
          task.datasetName.toLowerCase().includes(query) ||
          task.actionType.toLowerCase().includes(query)
      );
    }

    return tasks;
  };

  const isLoading = activeTab === "pending" ? loadingPending : activeTab === "submissions" ? loadingSubmissions : loadingAll;
  const currentTasks = getCurrentTasks();

  const handleTaskClick = (task: WorkflowTask) => {
    setSelectedTask(task);
    setIsDetailModalOpen(true);
  };

  const handleActionSuccess = () => {
    // Refetch all data after successful action
    refetchPending();
    refetchSubmissions();
    refetchAll();
    setIsDetailModalOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-orange-600";
      case "active":
        return "text-green-600";
      case "approved":
        return "text-green-600";
      case "rejected":
        return "text-red-600";
      case "changes_requested":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const formatStatus = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "active":
        return "Active";
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      case "changes_requested":
        return "Changes Requested";
      default:
        return status;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Workflow Task Manager</h1>
          <p className="text-gray-600 mt-1">
            View, sort, and manage your governance-related tasks in one place. Track approvals you need to complete and submissions you&apos;ve made.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab("pending")}
            className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "pending"
                ? "border-green-600 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            My Pending Tasks
          </button>
          <button
            onClick={() => setActiveTab("submissions")}
            className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "submissions"
                ? "border-green-600 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            My Submissions
          </button>
          <button
            onClick={() => setActiveTab("all")}
            className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "all"
                ? "border-green-600 text-green-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            All Tasks
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Source name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-80"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
        <Button
          onClick={() => exportToCSV(currentTasks)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download CSV
        </Button>
      </div>

      {/* Tasks Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Task ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dataset / Metadata Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignee(s) / Approvers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Due
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    Loading tasks...
                  </td>
                </tr>
              ) : currentTasks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No tasks found
                  </td>
                </tr>
              ) : (
                currentTasks.map((task) => (
                  <tr
                    key={task.id}
                    onClick={() => handleTaskClick(task)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {task.taskId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {task.actionType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {task.datasetName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`font-medium ${getStatusColor(task.status)}`}>
                        {formatStatus(task.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {task.assignees.join(", ")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {task.dateSubmitted}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {task.dateDue}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {!isLoading && currentTasks.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Rows per page</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">
              1-{Math.min(20, currentTasks.length)} of {currentTasks.length} rows
            </span>
            <div className="flex gap-1">
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                &lt;
              </button>
              <button className="px-3 py-1 bg-green-600 text-white rounded text-sm">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                2
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                ...
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                9
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                10
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                &gt;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Task Detail Modal */}
      {selectedTask && (
        <TaskDetailModal
          open={isDetailModalOpen}
          onOpenChange={setIsDetailModalOpen}
          task={selectedTask}
          onActionSuccess={handleActionSuccess}
        />
      )}
    </div>
  );
}
