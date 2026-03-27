"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WorkflowTask } from "../types/task";
import { useTaskAction } from "../controllers/taskController";

interface TaskDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: WorkflowTask;
  onActionSuccess: () => void;
}

export default function TaskDetailModal({
  open,
  onOpenChange,
  task,
  onActionSuccess,
}: TaskDetailModalProps) {
  const [comments, setComments] = useState("");
  const { performAction, isLoading } = useTaskAction();

  const handleAction = async (action: "approve" | "reject" | "request_changes") => {
    await performAction({
      taskId: task.id,
      action,
      comments: comments || undefined,
      userId: "current-user-id",
    });
    onActionSuccess();
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

  const showActionButtons = task.status === "pending" || task.status === "changes_requested";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Task {task.taskId} — Approval Request
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Action Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Action Type</p>
              <p className="font-medium text-gray-900">{task.actionType}</p>
            </div>
          </div>

          {/* Dataset */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">dataset</p>
              <p className="font-medium text-gray-900">{task.datasetName}</p>
            </div>
          </div>

          {/* Requester */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Requester</p>
              <p className="font-medium text-gray-900">
                {task.requester} {task.requesterRole && `(${task.requesterRole})`}
              </p>
            </div>
          </div>

          {/* Submitted On */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Submitted On</p>
              <p className="font-medium text-gray-900">{task.dateSubmitted}</p>
            </div>
          </div>

          {/* Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Status:</p>
              <p className={`font-medium ${getStatusColor(task.status)}`}>
                {formatStatus(task.status)}
              </p>
            </div>
          </div>

          {/* Assigned Approvers */}
          <div>
            <p className="text-sm text-gray-600 mb-2">Assigned Approvers</p>
            <ul className="list-disc list-inside space-y-1">
              {task.assignedApprovers.map((approver) => (
                <li key={approver.id} className="text-gray-900">
                  {approver.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Workflow Steps */}
          <div>
            <p className="text-sm text-gray-600 mb-2">Workflow Steps</p>
            <ol className="list-decimal list-inside space-y-1">
              {task.workflowSteps.map((step) => (
                <li
                  key={step.order}
                  className={`${
                    step.status === "completed"
                      ? "text-green-600"
                      : step.status === "current"
                      ? "text-blue-600 font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {step.description}
                </li>
              ))}
            </ol>
          </div>

          {/* Comments (if any) */}
          {task.comments && (
            <div>
              <p className="text-sm text-gray-600 mb-1">Comments</p>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{task.comments}</p>
            </div>
          )}

          {/* Add Comments (for new actions) */}
          {showActionButtons && (
            <div>
              <label htmlFor="comments" className="text-sm text-gray-600 mb-1 block">
                Add Comments (Optional)
              </label>
              <textarea
                id="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Enter your comments here..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                rows={3}
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          {showActionButtons ? (
            <>
              <Button
                onClick={() => handleAction("approve")}
                disabled={isLoading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                {isLoading ? "Processing..." : "Approve"}
              </Button>
              <Button
                onClick={() => handleAction("request_changes")}
                disabled={isLoading}
                variant="outline"
                className="flex-1 border-gray-300 text-gray-700"
              >
                Request Changes
              </Button>
              <Button
                onClick={() => handleAction("reject")}
                disabled={isLoading}
                variant="outline"
                className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
              >
                Reject
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full border-green-600 text-green-600 hover:bg-green-50"
            >
              Close
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
