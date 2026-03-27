"use client";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/shared/FormInput";
import { Trash2, Plus } from "lucide-react";
import { useUpdateWorkflow } from "../controllers/workflowController";
import { DATASET_TYPES, ACTION_TYPES, APPROVER_ROLES, ActionType, Workflow } from "../types/workflow";
import { Checkbox } from "@/components/ui/checkbox";

const editWorkflowSchema = z.object({
  workflowName: z.string().min(1, "Workflow name is required"),
  email: z.string().email("Valid email is required").optional().or(z.literal("")),
});

type WorkflowFormData = z.infer<typeof editWorkflowSchema>;

interface EditWorkflowModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workflow: Workflow;
  onSuccess?: () => void;
}

interface ApproverField {
  id?: string;
  fieldName: string;
  assignedTo: string;
  email?: string;
  order: number;
}

export default function EditWorkflowModal({
  open,
  onOpenChange,
  workflow,
  onSuccess,
}: EditWorkflowModalProps) {
  const [selectedDatasetTypes, setSelectedDatasetTypes] = useState<string[]>([]);
  const [selectedActions, setSelectedActions] = useState<ActionType[]>([]);
  const [approvers, setApprovers] = useState<ApproverField[]>([]);

  const form = useForm<WorkflowFormData>({
    resolver: zodResolver(editWorkflowSchema),
    defaultValues: {
      workflowName: workflow.workflowName,
      email: workflow.email || "",
    },
  });

  const { updateWorkflow, isLoading } = useUpdateWorkflow(workflow.id);

  // Initialize form with workflow data
  useEffect(() => {
    if (workflow && open) {
      form.reset({
        workflowName: workflow.workflowName,
        email: workflow.email || "",
      });
      setSelectedDatasetTypes(workflow.datasetTypes);
      setSelectedActions(workflow.actionsCovered);
      setApprovers(workflow.assignedApprovers);
    }
  }, [workflow, open, form]);

  const addApprover = () => {
    setApprovers([
      ...approvers,
      { fieldName: "", assignedTo: "", email: "", order: approvers.length + 1 },
    ]);
  };

  const updateApproverField = (index: number, field: string, value: string) => {
    const updated = [...approvers];
    updated[index] = { ...updated[index], [field]: value };
    setApprovers(updated);
  };

  const removeApprover = (index: number) => {
    if (approvers.length > 1) {
      setApprovers(approvers.filter((_, i) => i !== index));
    }
  };

  const handleActionToggle = (action: ActionType) => {
    setSelectedActions((prev) =>
      prev.includes(action) ? prev.filter((a) => a !== action) : [...prev, action]
    );
  };

  const onSubmit: SubmitHandler<WorkflowFormData> = async (data) => {
    try {
      await updateWorkflow({
        workflowName: data.workflowName,
        datasetTypes: selectedDatasetTypes,
        actionsCovered: selectedActions,
        assignedApprovers: approvers.map((a, i) => ({
          fieldName: a.fieldName,
          assignedTo: a.assignedTo,
          email: a.email,
          order: i + 1,
        })),
        email: data.email,
      });

      onSuccess?.();
    } catch (error) {
      console.error("Failed to update workflow:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Edit Workflow</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                name="workflowName"
                label="Workflow name"
                placeholder="Enter workflow name"
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Dataset type(s)</label>
                <select
                  value={selectedDatasetTypes[0] || ""}
                  onChange={(e) => setSelectedDatasetTypes([e.target.value])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select data</option>
                  {DATASET_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Actions Covered</label>
              <div className="space-y-2">
                {ACTION_TYPES.map((action) => (
                  <div key={action} className="flex items-center space-x-2">
                    <Checkbox
                      id={`edit-action-${action}`}
                      checked={selectedActions.includes(action)}
                      onCheckedChange={() => handleActionToggle(action)}
                    />
                    <label htmlFor={`edit-action-${action}`} className="text-sm cursor-pointer">
                      {action}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Approvers Section */}
            <div className="space-y-4">
              {approvers.map((approver, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">
                      {index === 0
                        ? "Assign approver"
                        : `Assign approver ${index + 1} (This is the ${
                            index === 1 ? "second" : index === 2 ? "third" : `${index + 1}th`
                          } approver)`}
                    </h3>
                    {approvers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeApprover(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Field Name</label>
                      <select
                        value={approver.fieldName}
                        onChange={(e) => updateApproverField(index, "fieldName", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Enter the assign approver</option>
                        {APPROVER_ROLES.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Approver roles</label>
                      <input
                        type="text"
                        value={approver.assignedTo}
                        onChange={(e) => updateApproverField(index, "assignedTo", e.target.value)}
                        placeholder="Enter the approver role"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addApprover}
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
              >
                <Plus className="h-4 w-4" />
                Do you want to assign another approver?
              </button>
            </div>

            <FormInput
              name="email"
              label="Email"
              type="email"
              placeholder="chinedu@gmail.com"
            />

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                {isLoading ? "Updating..." : "Update Workflow"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
              >
                Save draft
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1 border-green-600 text-green-600 hover:bg-green-50"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
