export type WorkflowStatus = "active" | "inactive" | "draft";

export type ActionType = "Publish" | "Edit Metadata" | "Delete" | "Assign Steward" | "Export";

export interface Approver {
  id: string;
  fieldName: string;
  assignedTo: string; // User name or role
  email?: string;
  order: number; // Approval order/sequence
}

export interface WorkflowStep {
  order: number;
  description: string;
  approverFieldName: string;
}

export interface Workflow {
  id: string;
  workflowName: string;
  datasetTypes: string[]; // e.g., ["Finance", "HR"]
  actionsCovered: ActionType[];
  assignedApprovers: Approver[];
  status: WorkflowStatus;
  date: string; // Creation or last modified date
  createdAt: string;
  updatedAt: string;
  workflowSteps?: WorkflowStep[];
  createdBy?: string;
  email?: string;
}

export interface CreateWorkflowRequest {
  workflowName: string;
  datasetTypes: string[];
  actionsCovered: ActionType[];
  assignedApprovers: Omit<Approver, "id">[];
  email?: string;
}

export interface UpdateWorkflowRequest {
  workflowName?: string;
  datasetTypes?: string[];
  actionsCovered?: ActionType[];
  assignedApprovers?: Omit<Approver, "id">[];
  status?: WorkflowStatus;
  email?: string;
}

export interface WorkflowListResponse {
  status: boolean;
  message: string;
  data: Workflow[];
  total: number;
}

export interface WorkflowDetailResponse {
  status: boolean;
  message: string;
  data: Workflow;
}

// Dataset types available in the system
export const DATASET_TYPES = [
  "Finance",
  "HR",
  "Operations",
  "Sales",
  "Marketing",
  "Environmental",
  "Social Impact",
  "Governance",
] as const;

// Available action types
export const ACTION_TYPES: ActionType[] = [
  "Publish",
  "Edit Metadata",
  "Delete",
  "Assign Steward",
  "Export",
];

// Approver role options
export const APPROVER_ROLES = [
  "Data Owner",
  "Data Steward",
  "Compliance Officer",
  "Finance Manager",
  "HR Manager",
  "Department Head",
  "Admin",
] as const;
