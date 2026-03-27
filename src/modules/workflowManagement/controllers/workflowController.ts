import { useState } from "react";
import { toast } from "sonner";
import {
  Workflow,
  WorkflowListResponse,
  WorkflowDetailResponse,
  CreateWorkflowRequest,
  UpdateWorkflowRequest,
} from "../types/workflow";
import { mockWorkflows } from "../data/mockWorkflows";

// Local storage key
const STORAGE_KEY = "sdrms_mock_workflows";

// Helper functions
const getStoredWorkflows = (): Workflow[] => {
  if (typeof window === "undefined") return mockWorkflows;
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : mockWorkflows;
};

const saveWorkflows = (workflows: Workflow[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workflows));
  }
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Hook for listing all workflows
export const useGetWorkflows = () => {
  const [data, setData] = useState<WorkflowListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getWorkflows = async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      await delay(400);
      const workflows = getStoredWorkflows();

      const response: WorkflowListResponse = {
        status: true,
        message: "Workflows retrieved successfully",
        data: workflows,
        total: workflows.length,
      };

      setData(response);
      setIsSuccess(true);
      return response;
    } catch (err) {
      setIsError(true);
      setError(err as Error);
      toast.error("Failed to fetch workflows");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getWorkflows,
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

// Hook for getting a specific workflow
export const useGetWorkflow = (workflowId: string) => {
  const [data, setData] = useState<Workflow | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getWorkflow = async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      await delay(300);
      const workflows = getStoredWorkflows();
      const workflow = workflows.find((w) => w.id === workflowId);

      if (!workflow) {
        throw new Error("Workflow not found");
      }

      setData(workflow);
      setIsSuccess(true);
      return workflow;
    } catch (err) {
      setIsError(true);
      setError(err as Error);
      toast.error("Failed to fetch workflow");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getWorkflow,
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

// Hook for creating a workflow
export const useCreateWorkflow = () => {
  const [data, setData] = useState<WorkflowDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createWorkflow = async (workflowData: CreateWorkflowRequest) => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      await delay(500);
      const workflows = getStoredWorkflows();

      const newWorkflow: Workflow = {
        id: String(Date.now()),
        workflowName: workflowData.workflowName,
        datasetTypes: workflowData.datasetTypes,
        actionsCovered: workflowData.actionsCovered,
        assignedApprovers: workflowData.assignedApprovers.map((approver, index) => ({
          ...approver,
          id: String(Date.now() + index),
        })),
        status: "active",
        date: new Date().toLocaleDateString("en-GB"),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        workflowSteps: workflowData.assignedApprovers.map((approver, index) => ({
          order: index + 1,
          description:
            index === 0
              ? `Submission by ${approver.fieldName}`
              : index === workflowData.assignedApprovers.length - 1
              ? `Final Approval by ${approver.fieldName}`
              : `Review by ${approver.fieldName}`,
          approverFieldName: approver.fieldName,
        })),
        email: workflowData.email,
      };

      // Add publish step
      if (workflowData.actionsCovered.includes("Publish")) {
        newWorkflow.workflowSteps?.push({
          order: workflowData.assignedApprovers.length + 1,
          description: "Publish to Catalog",
          approverFieldName:
            workflowData.assignedApprovers[workflowData.assignedApprovers.length - 1].fieldName,
        });
      }

      const updatedWorkflows = [...workflows, newWorkflow];
      saveWorkflows(updatedWorkflows);

      const response: WorkflowDetailResponse = {
        status: true,
        message: "Workflow created successfully",
        data: newWorkflow,
      };

      setData(response);
      setIsSuccess(true);
      toast.success("Workflow created successfully");
      return response;
    } catch (err) {
      setIsError(true);
      setError(err as Error);
      toast.error("Failed to create workflow");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createWorkflow,
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

// Hook for updating a workflow
export const useUpdateWorkflow = (workflowId: string) => {
  const [data, setData] = useState<WorkflowDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateWorkflow = async (workflowData: UpdateWorkflowRequest) => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      await delay(500);
      const workflows = getStoredWorkflows();
      const workflowIndex = workflows.findIndex((w) => w.id === workflowId);

      if (workflowIndex === -1) {
        throw new Error("Workflow not found");
      }

      const existingWorkflow = workflows[workflowIndex];
      const updatedWorkflow: Workflow = {
        ...existingWorkflow,
        workflowName: workflowData.workflowName || existingWorkflow.workflowName,
        datasetTypes: workflowData.datasetTypes || existingWorkflow.datasetTypes,
        actionsCovered: workflowData.actionsCovered || existingWorkflow.actionsCovered,
        assignedApprovers: workflowData.assignedApprovers
          ? workflowData.assignedApprovers.map((approver, index) => ({
              ...approver,
              id: existingWorkflow.assignedApprovers[index]?.id || String(Date.now() + index),
            }))
          : existingWorkflow.assignedApprovers,
        status: workflowData.status || existingWorkflow.status,
        updatedAt: new Date().toISOString(),
        email: workflowData.email || existingWorkflow.email,
      };

      // Regenerate workflow steps if approvers changed
      if (workflowData.assignedApprovers) {
        updatedWorkflow.workflowSteps = workflowData.assignedApprovers.map((approver, index) => ({
          order: index + 1,
          description:
            index === 0
              ? `Submission by ${approver.fieldName}`
              : index === workflowData.assignedApprovers!.length - 1
              ? `Final Approval by ${approver.fieldName}`
              : `Review by ${approver.fieldName}`,
          approverFieldName: approver.fieldName,
        }));

        // Add publish step if applicable
        const actions = workflowData.actionsCovered || existingWorkflow.actionsCovered;
        if (actions.includes("Publish")) {
          updatedWorkflow.workflowSteps.push({
            order: workflowData.assignedApprovers.length + 1,
            description: "Publish to Catalog",
            approverFieldName:
              workflowData.assignedApprovers[workflowData.assignedApprovers.length - 1].fieldName,
          });
        }
      }

      workflows[workflowIndex] = updatedWorkflow;
      saveWorkflows(workflows);

      const response: WorkflowDetailResponse = {
        status: true,
        message: "Workflow updated successfully",
        data: updatedWorkflow,
      };

      setData(response);
      setIsSuccess(true);
      toast.success("Workflow updated successfully");
      return response;
    } catch (err) {
      setIsError(true);
      setError(err as Error);
      toast.error("Failed to update workflow");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateWorkflow,
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

// Hook for deleting a workflow
export const useDeleteWorkflow = (workflowId: string) => {
  const [data, setData] = useState<{ status: boolean; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteWorkflow = async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      await delay(500);
      const workflows = getStoredWorkflows();
      const updatedWorkflows = workflows.filter((w) => w.id !== workflowId);
      saveWorkflows(updatedWorkflows);

      const response = {
        status: true,
        message: "Workflow deleted successfully",
      };

      setData(response);
      setIsSuccess(true);
      toast.success("Workflow deleted successfully");
      return response;
    } catch (err) {
      setIsError(true);
      setError(err as Error);
      toast.error("Failed to delete workflow");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteWorkflow,
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

// Hook for toggling workflow status
export const useToggleWorkflowStatus = (workflowId: string) => {
  const [data, setData] = useState<WorkflowDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const toggleStatus = async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      await delay(400);
      const workflows = getStoredWorkflows();
      const workflowIndex = workflows.findIndex((w) => w.id === workflowId);

      if (workflowIndex === -1) {
        throw new Error("Workflow not found");
      }

      const workflow = workflows[workflowIndex];
      const updatedWorkflow: Workflow = {
        ...workflow,
        status: workflow.status === "active" ? "inactive" : "active",
        updatedAt: new Date().toISOString(),
      };

      workflows[workflowIndex] = updatedWorkflow;
      saveWorkflows(workflows);

      const response: WorkflowDetailResponse = {
        status: true,
        message: "Workflow status updated successfully",
        data: updatedWorkflow,
      };

      setData(response);
      setIsSuccess(true);
      toast.success("Workflow status updated successfully");
      return response;
    } catch (err) {
      setIsError(true);
      setError(err as Error);
      toast.error("Failed to update workflow status");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    toggleStatus,
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};
