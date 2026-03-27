import { useState, useEffect, useCallback } from "react";
import { WorkflowTask, TaskActionPayload, TaskFilterParams, TaskStatus } from "../types/task";
import { mockTasks } from "../data/mockTasks";

const STORAGE_KEY = "workflow_tasks";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper function to get tasks from localStorage
const getStoredTasks = (): WorkflowTask[] => {
  if (typeof window === "undefined") return mockTasks;
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : mockTasks;
};

// Helper function to save tasks to localStorage
const saveStoredTasks = (tasks: WorkflowTask[]): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }
};

// Get all tasks
export const useGetTasks = () => {
  const [data, setData] = useState<WorkflowTask[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTasks = async (filters?: TaskFilterParams) => {
    setIsLoading(true);
    setError(null);
    try {
      await delay(300);
      let tasks = getStoredTasks();

      // Apply filters
      if (filters?.status) {
        tasks = tasks.filter((task) => task.status === filters.status);
      }
      if (filters?.actionType) {
        tasks = tasks.filter((task) => task.actionType === filters.actionType);
      }
      if (filters?.assignee) {
        tasks = tasks.filter((task) => task.assignees.includes(filters.assignee!));
      }
      if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        tasks = tasks.filter(
          (task) =>
            task.taskId.toLowerCase().includes(searchLower) ||
            task.datasetName.toLowerCase().includes(searchLower) ||
            task.requester.toLowerCase().includes(searchLower)
        );
      }

      setData(tasks);
    } catch (_err) {
      setError("Failed to fetch tasks");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return { data, isLoading, error, refetch: getTasks };
};

// Get single task by ID
export const useGetTask = (taskId: string) => {
  const [data, setData] = useState<WorkflowTask | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTask = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await delay(300);
      const tasks = getStoredTasks();
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        setData(task);
      } else {
        setError("Task not found");
      }
    } catch (_err) {
      setError("Failed to fetch task");
    } finally {
      setIsLoading(false);
    }
  }, [taskId]);

  useEffect(() => {
    if (taskId) {
      getTask();
    }
  }, [taskId, getTask]);

  return { data, isLoading, error, refetch: getTask };
};

// Get my pending tasks (where current user is an assignee)
export const useGetMyPendingTasks = (currentUserName: string = "Jeff") => {
  const [data, setData] = useState<WorkflowTask[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMyPendingTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await delay(300);
      const tasks = getStoredTasks();
      const myTasks = tasks.filter(
        (task) =>
          task.assignees.includes(currentUserName) &&
          (task.status === "pending" || task.status === "changes_requested")
      );
      setData(myTasks);
    } catch (_err) {
      setError("Failed to fetch pending tasks");
    } finally {
      setIsLoading(false);
    }
  }, [currentUserName]);

  useEffect(() => {
    getMyPendingTasks();
  }, [currentUserName, getMyPendingTasks]);

  return { data, isLoading, error, refetch: getMyPendingTasks };
};

// Get my submissions (where current user is the requester)
export const useGetMySubmissions = (currentUserName: string = "Richard Okon") => {
  const [data, setData] = useState<WorkflowTask[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMySubmissions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await delay(300);
      const tasks = getStoredTasks();
      const mySubmissions = tasks.filter((task) => task.requester === currentUserName);
      setData(mySubmissions);
    } catch (_err) {
      setError("Failed to fetch submissions");
    } finally {
      setIsLoading(false);
    }
  }, [currentUserName]);

  useEffect(() => {
    getMySubmissions();
  }, [currentUserName, getMySubmissions]);

  return { data, isLoading, error, refetch: getMySubmissions };
};

// Perform task action (approve, reject, request changes)
export const useTaskAction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const performAction = async (payload: TaskActionPayload) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await delay(500);
      const tasks = getStoredTasks();
      const taskIndex = tasks.findIndex((t) => t.id === payload.taskId);

      if (taskIndex === -1) {
        throw new Error("Task not found");
      }

      let newStatus: TaskStatus;
      switch (payload.action) {
        case "approve":
          newStatus = "approved";
          break;
        case "reject":
          newStatus = "rejected";
          break;
        case "request_changes":
          newStatus = "changes_requested";
          break;
        default:
          throw new Error("Invalid action");
      }

      tasks[taskIndex] = {
        ...tasks[taskIndex],
        status: newStatus,
        comments: payload.comments,
      };

      saveStoredTasks(tasks);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to perform action");
    } finally {
      setIsLoading(false);
    }
  };

  return { performAction, isLoading, error, success };
};

// Export CSV data
export const useExportTasks = () => {
  const exportToCSV = (tasks: WorkflowTask[]) => {
    const headers = [
      "Task ID",
      "Action Type",
      "Dataset/Metadata Name",
      "Status",
      "Assignee(s)/Approvers",
      "Date Submitted",
      "Date Due",
    ];

    const rows = tasks.map((task) => [
      task.taskId,
      task.actionType,
      task.datasetName,
      task.status,
      task.assignees.join(", "),
      task.dateSubmitted,
      task.dateDue,
    ]);

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `workflow_tasks_${new Date().getTime()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return { exportToCSV };
};
