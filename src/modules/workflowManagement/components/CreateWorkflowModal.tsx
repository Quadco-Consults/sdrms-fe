"use client";
import { useState } from "react";
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
import { Plus, X } from "lucide-react";
import { useCreateWorkflow } from "../controllers/workflowController";
import { DATASET_TYPES, ACTION_TYPES, APPROVER_ROLES, ActionType } from "../types/workflow";
import { Checkbox } from "@/components/ui/checkbox";

const createWorkflowSchema = z.object({
  workflowName: z.string().min(1, "Workflow name is required"),
  email: z.string().email("Valid email is required").optional().or(z.literal("")),
});

type WorkflowFormData = z.infer<typeof createWorkflowSchema>;

interface CreateWorkflowModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface ApproverField {
  fieldName: string;
  assignedTo: string;
  email: string;
  order: number;
}

export default function CreateWorkflowModal({
  open,
  onOpenChange,
  onSuccess,
}: CreateWorkflowModalProps) {
  const [selectedDatasetTypes, setSelectedDatasetTypes] = useState<string[]>([]);
  const [selectedActions, setSelectedActions] = useState<ActionType[]>([]);
  const [approvers, setApprovers] = useState<ApproverField[]>([
    { fieldName: "", assignedTo: "", email: "", order: 1 },
  ]);

  const form = useForm<WorkflowFormData>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {
      workflowName: "",
      email: "",
    },
  });

  const { createWorkflow, isLoading } = useCreateWorkflow();

  const addApprover = () => {
    setApprovers([
      ...approvers,
      { fieldName: "", assignedTo: "", email: "", order: approvers.length + 1 },
    ]);
  };

  const removeApprover = (index: number) => {
    if (approvers.length > 1) {
      setApprovers(approvers.filter((_, i) => i !== index));
    }
  };

  const updateApprover = (index: number, field: keyof ApproverField, value: string) => {
    const updated = [...approvers];
    updated[index] = { ...updated[index], [field]: value };
    setApprovers(updated);
  };

  const handleDatasetTypeToggle = (type: string) => {
    setSelectedDatasetTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleActionToggle = (action: ActionType) => {
    setSelectedActions((prev) =>
      prev.includes(action) ? prev.filter((a) => a !== action) : [...prev, action]
    );
  };

  const onSubmit: SubmitHandler<WorkflowFormData> = async (data) => {
    try {
      if (selectedDatasetTypes.length === 0) {
        return alert("Please select at least one dataset type");
      }
      if (selectedActions.length === 0) {
        return alert("Please select at least one action");
      }
      if (approvers.some((a) => !a.fieldName || !a.assignedTo)) {
        return alert("Please complete all approver fields");
      }

      await createWorkflow({
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

      // Reset form
      form.reset();
      setSelectedDatasetTypes([]);
      setSelectedActions([]);
      setApprovers([{ fieldName: "", assignedTo: "", email: "", order: 1 }]);

      onSuccess?.();
    } catch (error) {
      console.error("Failed to create workflow:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create Workflow</DialogTitle>
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
                <div className="border border-gray-300 rounded-lg p-3 max-h-32 overflow-y-auto">
                  {DATASET_TYPES.map((type) => (
                    <div key={type} className="flex items-center space-x-2 py-1">
                      <Checkbox
                        id={`dataset-${type}`}
                        checked={selectedDatasetTypes.includes(type)}
                        onCheckedChange={() => handleDatasetTypeToggle(type)}
                      />
                      <label
                        htmlFor={`dataset-${type}`}
                        className="text-sm cursor-pointer"
                      >
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Actions Covered</label>
              <div className="border border-gray-300 rounded-lg p-3">
                {ACTION_TYPES.map((action) => (
                  <div key={action} className="flex items-center space-x-2 py-1">
                    <Checkbox
                      id={`action-${action}`}
                      checked={selectedActions.includes(action)}
                      onCheckedChange={() => handleActionToggle(action)}
                    />
                    <label htmlFor={`action-${action}`} className="text-sm cursor-pointer">
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
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Field Name</label>
                      <select
                        value={approver.fieldName}
                        onChange={(e) => updateApprover(index, "fieldName", e.target.value)}
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
                        onChange={(e) => updateApprover(index, "assignedTo", e.target.value)}
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

            <div className="flex justify-between pt-4 gap-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                {isLoading ? "Creating..." : "Create Workflow"}
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
