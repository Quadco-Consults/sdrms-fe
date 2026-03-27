import { useState } from "react";
import { toast } from "sonner";
import {
  BackendStaff,
  StaffListResponse,
  StaffDetailResponse,
  CreateStaffRequest,
  UpdateStaffRequest,
  AssignRolesRequest,
} from "../types/user";
import { mockStaffs } from "../data/mockUsers";

// Local storage key for persisting mock data
const STORAGE_KEY = "sdrms_mock_staffs";

// Helper to get staffs from localStorage or use default mock data
const getStoredStaffs = (): BackendStaff[] => {
  if (typeof window === "undefined") return mockStaffs;

  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : mockStaffs;
};

// Helper to save staffs to localStorage
const saveStaffs = (staffs: BackendStaff[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(staffs));
  }
};

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Staff Management Hooks with Mock Data
export const useGetStaffs = () => {
  const [data, setData] = useState<StaffListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getStaffs = async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      await delay(500); // Simulate network delay
      const staffs = getStoredStaffs();

      const response: StaffListResponse = {
        status: true,
        message: "Staffs retrieved successfully",
        data: staffs,
      };

      setData(response);
      setIsSuccess(true);
      return response;
    } catch (err) {
      setIsError(true);
      setError(err as Error);
      toast.error("Failed to fetch staffs");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getStaffs,
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

export const useGetStaffById = (staffId: string) => {
  const [data, setData] = useState<StaffDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getStaff = async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      await delay(300);
      const staffs = getStoredStaffs();
      const staff = staffs.find((s) => s.id === staffId);

      if (!staff) {
        throw new Error("Staff not found");
      }

      const response: StaffDetailResponse = {
        status: true,
        message: "Staff retrieved successfully",
        data: staff,
      };

      setData(response);
      setIsSuccess(true);
      return response;
    } catch (err) {
      setIsError(true);
      setError(err as Error);
      toast.error("Failed to fetch staff");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getStaff,
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

export const useCreateStaff = () => {
  const [data, setData] = useState<StaffDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createStaff = async (staffData: CreateStaffRequest) => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      await delay(500);
      const staffs = getStoredStaffs();

      const newStaff: BackendStaff = {
        id: String(Date.now()),
        first_name: staffData.first_name,
        last_name: staffData.last_name,
        email: staffData.email,
        phone: staffData.phone,
        is_active: true,
        is_suspended: false,
        date_joined: new Date().toISOString(),
        roles: staffData.roles?.map((roleId) => ({
          id: roleId,
          name: `Role ${roleId}`,
        })) || [],
        user: {
          first_name: staffData.first_name,
          last_name: staffData.last_name,
          email: staffData.email,
          mobile_number: staffData.phone,
          date_joined: new Date().toISOString(),
        },
      };

      const updatedStaffs = [...staffs, newStaff];
      saveStaffs(updatedStaffs);

      const response: StaffDetailResponse = {
        status: true,
        message: "Staff created successfully",
        data: newStaff,
      };

      setData(response);
      setIsSuccess(true);
      toast.success("Staff created successfully");
      return response;
    } catch (err) {
      setIsError(true);
      setError(err as Error);
      toast.error("Failed to create staff");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createStaff,
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

export const useUpdateStaff = (staffId: string) => {
  const [data, setData] = useState<StaffDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateStaff = async (staffData: UpdateStaffRequest) => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      await delay(500);
      const staffs = getStoredStaffs();
      const staffIndex = staffs.findIndex((s) => s.id === staffId);

      if (staffIndex === -1) {
        throw new Error("Staff not found");
      }

      const updatedStaff = {
        ...staffs[staffIndex],
        first_name: staffData.first_name || staffs[staffIndex].first_name,
        last_name: staffData.last_name || staffs[staffIndex].last_name,
        email: staffData.email || staffs[staffIndex].email,
        phone: staffData.phone || staffs[staffIndex].phone,
      };

      staffs[staffIndex] = updatedStaff;
      saveStaffs(staffs);

      const response: StaffDetailResponse = {
        status: true,
        message: "Staff updated successfully",
        data: updatedStaff,
      };

      setData(response);
      setIsSuccess(true);
      toast.success("Staff updated successfully");
      return response;
    } catch (err) {
      setIsError(true);
      setError(err as Error);
      toast.error("Failed to update staff");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateStaff,
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

export const usePartialUpdateStaff = (staffId: string) => {
  const { updateStaff, data, isLoading, isSuccess, isError, error } = useUpdateStaff(staffId);

  const partialUpdateStaff = async (staffData: Partial<UpdateStaffRequest>) => {
    return await updateStaff(staffData as UpdateStaffRequest);
  };

  return {
    partialUpdateStaff,
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

export const useDeleteStaff = (staffId: string) => {
  const [data, setData] = useState<{ status: boolean; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteStaff = async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      await delay(500);
      const staffs = getStoredStaffs();
      const updatedStaffs = staffs.filter((s) => s.id !== staffId);
      saveStaffs(updatedStaffs);

      const response = {
        status: true,
        message: "Staff deleted successfully",
      };

      setData(response);
      setIsSuccess(true);
      toast.success("Staff deleted successfully");
      return response;
    } catch (err) {
      setIsError(true);
      setError(err as Error);
      toast.error("Failed to delete staff");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteStaff,
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

export const useAssignRoles = (staffId: string) => {
  const [data, setData] = useState<StaffDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const assignRoles = async (rolesData: AssignRolesRequest) => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      await delay(500);
      const staffs = getStoredStaffs();
      const staffIndex = staffs.findIndex((s) => s.id === staffId);

      if (staffIndex === -1) {
        throw new Error("Staff not found");
      }

      const updatedStaff = {
        ...staffs[staffIndex],
        roles: rolesData.role_ids.map((roleId) => ({
          id: roleId,
          name: `Role ${roleId}`,
        })),
      };

      staffs[staffIndex] = updatedStaff;
      saveStaffs(staffs);

      const response: StaffDetailResponse = {
        status: true,
        message: "Roles assigned successfully",
        data: updatedStaff,
      };

      setData(response);
      setIsSuccess(true);
      toast.success("Roles assigned successfully");
      return response;
    } catch (err) {
      setIsError(true);
      setError(err as Error);
      toast.error("Failed to assign roles");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    assignRoles,
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

export const useToggleStaffStatus = (staffId: string) => {
  const [data, setData] = useState<StaffDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const toggleStaffStatus = async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      await delay(500);
      const staffs = getStoredStaffs();
      const staffIndex = staffs.findIndex((s) => s.id === staffId);

      if (staffIndex === -1) {
        throw new Error("Staff not found");
      }

      const updatedStaff = {
        ...staffs[staffIndex],
        is_active: !staffs[staffIndex].is_active,
        is_suspended: !staffs[staffIndex].is_suspended,
      };

      staffs[staffIndex] = updatedStaff;
      saveStaffs(staffs);

      const response: StaffDetailResponse = {
        status: true,
        message: "Staff status updated successfully",
        data: updatedStaff,
      };

      setData(response);
      setIsSuccess(true);
      toast.success("Staff status updated successfully");
      return response;
    } catch (err) {
      setIsError(true);
      setError(err as Error);
      toast.error("Failed to update staff status");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    toggleStaffStatus,
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};
