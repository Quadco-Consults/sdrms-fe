export type TaskStatus = "pending" | "active" | "approved" | "rejected" | "changes_requested";

export interface TaskApprover {
  id: string;
  name: string;
  role?: string;
}

export interface TaskWorkflowStep {
  order: number;
  description: string;
  status?: "pending" | "completed" | "current";
}

export interface WorkflowTask {
  id: string;
  taskId: string; // Display ID like "WF-1042"
  actionType: string;
  datasetName: string;
  datasetType: string;
  status: TaskStatus;
  assignees: string[]; // Approver names
  dateSubmitted: string;
  dateDue: string;
  requester: string;
  requesterRole?: string;
  assignedApprovers: TaskApprover[];
  workflowSteps: TaskWorkflowStep[];
  comments?: string;
}

export interface TaskActionPayload {
  taskId: string;
  action: "approve" | "reject" | "request_changes";
  comments?: string;
  userId: string;
}

export interface TaskFilterParams {
  status?: TaskStatus;
  actionType?: string;
  assignee?: string;
  search?: string;
}
