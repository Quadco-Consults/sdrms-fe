"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Workflow } from "../types/workflow";

interface ViewWorkflowModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workflow: Workflow;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ViewWorkflowModal({
  open,
  onOpenChange,
  workflow,
  onEdit,
  onDelete,
}: ViewWorkflowModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">View</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Workflow Name */}
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Workflow Name</span>
            <span className="font-medium text-gray-900">{workflow.workflowName}</span>
          </div>

          {/* Dataset Types */}
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">dataset Type(s)</span>
            <span className="font-medium text-gray-900">
              {workflow.datasetTypes.join(" ,")}
            </span>
          </div>

          {/* Actions Covered */}
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Actions Covered</span>
            <span className="font-medium text-gray-900">
              {workflow.actionsCovered.join(", ")}
            </span>
          </div>

          {/* Status */}
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Status:</span>
            <span
              className={`font-medium ${
                workflow.status === "active" ? "text-green-600" : "text-gray-600"
              }`}
            >
              {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
            </span>
          </div>

          {/* Assigned Approvers */}
          <div className="py-2">
            <span className="text-gray-600 block mb-2">Assigned Approvers</span>
            <ul className="list-disc list-inside space-y-1">
              {workflow.assignedApprovers.map((approver) => (
                <li key={approver.id} className="text-gray-900">
                  {approver.fieldName} → {approver.assignedTo}
                </li>
              ))}
            </ul>
          </div>

          {/* Workflow Steps */}
          {workflow.workflowSteps && workflow.workflowSteps.length > 0 && (
            <div className="py-2">
              <span className="text-gray-600 block mb-2">Workflow Steps</span>
              <ol className="list-decimal list-inside space-y-1">
                {workflow.workflowSteps.map((step) => (
                  <li key={step.order} className="text-gray-900">
                    {step.description}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full border-green-600 text-green-600 hover:bg-green-50"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
