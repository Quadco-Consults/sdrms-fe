"use client";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Workflow } from "../types/workflow";
import { useGetWorkflows, useDeleteWorkflow } from "../controllers/workflowController";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import CreateWorkflowModal from "./CreateWorkflowModal";
import ViewWorkflowModal from "./ViewWorkflowModal";
import EditWorkflowModal from "./EditWorkflowModal";

// Custom hook for debounced search
function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

interface WorkflowManagementProps {
  className?: string;
}

export default function WorkflowManagement({ className }: WorkflowManagementProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);

  // API hooks
  const { getWorkflows, data: workflowsData, isLoading } = useGetWorkflows();
  const { deleteWorkflow } = useDeleteWorkflow(selectedWorkflow?.id || "");

  const debouncedSearchValue = useDebounce(searchValue, 500);

  // Load workflows on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        await getWorkflows();
      } catch (error) {
        console.error("Failed to load workflows:", error);
      }
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update workflows when API data changes
  useEffect(() => {
    if (workflowsData?.data) {
      setWorkflows(workflowsData.data);
    }
  }, [workflowsData]);

  // Filter workflows based on search
  const filteredWorkflows = useMemo(() => {
    let filtered = [...workflows];

    // Apply search filter
    if (debouncedSearchValue) {
      filtered = filtered.filter(
        (workflow) =>
          workflow.workflowName.toLowerCase().includes(debouncedSearchValue.toLowerCase()) ||
          workflow.datasetTypes.some((type) =>
            type.toLowerCase().includes(debouncedSearchValue.toLowerCase())
          )
      );
    }

    return filtered;
  }, [debouncedSearchValue, workflows]);

  // Handle delete
  const handleDelete = async () => {
    if (!selectedWorkflow?.id) return;

    try {
      await deleteWorkflow();
      await getWorkflows(); // Refresh data
      setDeleteModalOpen(false);
      setSelectedWorkflow(null);
    } catch (error) {
      console.error("Failed to delete workflow:", error);
    }
  };

  const handleWorkflowSuccess = async () => {
    await getWorkflows();
    setCreateModalOpen(false);
    setEditModalOpen(false);
    setSelectedWorkflow(null);
  };

  // Pagination
  const itemsPerPage = 20;
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, filteredWorkflows.length);
  const totalPages = Math.ceil(filteredWorkflows.length / itemsPerPage);
  const paginatedWorkflows = filteredWorkflows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={cn("p-6 space-y-6", className)}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Workflow</h1>
          <p className="text-sm text-gray-600 mt-1">
            Track the organization&apos;s adherence to ESG regulations, view compliance status, and get
            corrective actions
          </p>
        </div>
        <Button
          onClick={() => setCreateModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Create Workflow
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Source name"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 4.66667H14M4.66667 8H11.3333M6.66667 11.3333H9.33333"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Filter
        </Button>
        <Button variant="outline" className="bg-green-50 text-green-700 border-green-200">
          Download CSV
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Workflow Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dataset Type(s)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions Covered
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assigned Approvers
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  Loading workflows...
                </td>
              </tr>
            ) : paginatedWorkflows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  No workflows found
                </td>
              </tr>
            ) : (
              paginatedWorkflows.map((workflow) => (
                <tr key={workflow.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{workflow.workflowName}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {workflow.datasetTypes.join(" ,")}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {workflow.actionsCovered.join(", ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {workflow.assignedApprovers.map((a) => a.fieldName).join(", ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{workflow.date}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={cn(
                        "inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                        workflow.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      )}
                    >
                      {workflow.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedWorkflow(workflow);
                        setViewModalOpen(true);
                      }}
                      className="text-gray-400 hover:text-gray-600 mr-2"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <circle cx="10" cy="10" r="1.5" />
                        <circle cx="10" cy="5" r="1.5" />
                        <circle cx="10" cy="15" r="1.5" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>

        {/* Pagination */}
        {filteredWorkflows.length > 0 && (
          <div className="bg-white px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">Rows per page</span>
              <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                <option>20</option>
                <option>50</option>
                <option>100</option>
              </select>
              <span className="text-sm text-gray-700">
                {startItem}-{endItem} of {filteredWorkflows.length} rows
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
                </svg>
              </button>

              {[...Array(Math.min(totalPages, 10))].map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={cn(
                      "px-3 py-1 rounded text-sm",
                      currentPage === page
                        ? "bg-green-600 text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    )}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateWorkflowModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSuccess={handleWorkflowSuccess}
      />

      {selectedWorkflow && (
        <>
          <ViewWorkflowModal
            open={viewModalOpen}
            onOpenChange={setViewModalOpen}
            workflow={selectedWorkflow}
            onEdit={() => {
              setViewModalOpen(false);
              setEditModalOpen(true);
            }}
            onDelete={() => {
              setViewModalOpen(false);
              setDeleteModalOpen(true);
            }}
          />

          <EditWorkflowModal
            open={editModalOpen}
            onOpenChange={setEditModalOpen}
            workflow={selectedWorkflow}
            onSuccess={handleWorkflowSuccess}
          />
        </>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Workflow</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &quot;{selectedWorkflow?.workflowName}&quot;? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
