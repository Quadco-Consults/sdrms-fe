import { useState } from "react";
import { toast } from "sonner";
import { mockRoles, mockPermissions } from "../data/mockRoles";

export interface CreateRoleRequest {
  name: string;
  permissions: string[];
  description?: string;
}

export interface UpdateRoleRequest {
  name?: string;
  permissions?: string[];
  description?: string;
}

export interface RoleResponse {
  id: string;
  name: string;
  permissions_count: string[];
  description?: string;
  created_at: string;
  updated_at: string;
  permissions?: string[];
}

export interface PermissionResponse {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface RolesListResponse {
  status: boolean;
  message: string;
  results: RoleResponse[];
}

export interface PermissionsListResponse {
  status: boolean;
  message: string;
  data: PermissionResponse[];
}

export interface RoleDetailResponse {
  status: boolean;
  message: string;
  data: RoleResponse;
}

// Local storage keys
const ROLES_STORAGE_KEY = "sdrms_mock_roles";
const PERMISSIONS_STORAGE_KEY = "sdrms_mock_permissions";

// Helper functions
const getStoredRoles = (): RoleResponse[] => {
  if (typeof window === "undefined") return mockRoles;
  const stored = localStorage.getItem(ROLES_STORAGE_KEY);
  return stored ? JSON.parse(stored) : mockRoles;
};

const saveRoles = (roles: RoleResponse[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(ROLES_STORAGE_KEY, JSON.stringify(roles));
  }
};

const getStoredPermissions = (): PermissionResponse[] => {
  if (typeof window === "undefined") return mockPermissions;
  const stored = localStorage.getItem(PERMISSIONS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : mockPermissions;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Hook for listing all roles
export const useGetRoles = () => {
  const [data, setData] = useState<RolesListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getRoles = async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      await delay(400);
      const roles = getStoredRoles();

      const response: RolesListResponse = {
        status: true,
        message: "Roles retrieved successfully",
        results: roles,
      };

      setData(response);
      setIsSuccess(true);
      return response;
    } catch (err) {
      setIsError(true);
      setError(err as Error);
      toast.error("Failed to fetch roles");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getRoles,
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

// Hook for creating a role
export const useCreateRole = () => {
  const [data, setData] = useState<RoleDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createRole = async (roleData: CreateRoleRequest) => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      await delay(500);
      const roles = getStoredRoles();

      const newRole: RoleResponse = {
        id: String(Date.now()),
        name: roleData.name,
        permissions: roleData.permissions,
        permissions_count: roleData.permissions,
        description: roleData.description,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const updatedRoles = [...roles, newRole];
      saveRoles(updatedRoles);

      const response: RoleDetailResponse = {
        status: true,
        message: "Role created successfully",
        data: newRole,
      };

      setData(response);
      setIsSuccess(true);
      toast.success("Role created successfully");
      return response;
    } catch (err) {
      setIsError(true);
      setError(err as Error);
      toast.error("Failed to create role");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createRole,
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

// Hook for getting a specific role
export const useGetRole = (roleId: string) => {
  const [data, setData] = useState<RoleResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getRole = async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      await delay(300);
      const roles = getStoredRoles();
      const role = roles.find((r) => r.id === roleId);

      if (!role) {
        throw new Error("Role not found");
      }

      setData(role);
      setIsSuccess(true);
      return role;
    } catch (err) {
      setIsError(true);
      setError(err as Error);
      toast.error("Failed to fetch role");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getRole,
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

// Hook for updating a role
export const useUpdateRole = (roleId: string) => {
  const [data, setData] = useState<RoleDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateRole = async (roleData: UpdateRoleRequest) => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      await delay(500);
      const roles = getStoredRoles();
      const roleIndex = roles.findIndex((r) => r.id === roleId);

      if (roleIndex === -1) {
        throw new Error("Role not found");
      }

      const updatedRole = {
        ...roles[roleIndex],
        name: roleData.name || roles[roleIndex].name,
        permissions: roleData.permissions || roles[roleIndex].permissions,
        permissions_count: roleData.permissions || roles[roleIndex].permissions_count,
        description: roleData.description !== undefined ? roleData.description : roles[roleIndex].description,
        updated_at: new Date().toISOString(),
      };

      roles[roleIndex] = updatedRole;
      saveRoles(roles);

      const response: RoleDetailResponse = {
        status: true,
        message: "Role updated successfully",
        data: updatedRole,
      };

      setData(response);
      setIsSuccess(true);
      toast.success("Role updated successfully");
      return response;
    } catch (err) {
      setIsError(true);
      setError(err as Error);
      toast.error("Failed to update role");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateRole,
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

// Hook for partially updating a role
export const usePartialUpdateRole = (roleId: string) => {
  const { updateRole, data, isLoading, isSuccess, isError, error } = useUpdateRole(roleId);

  const partialUpdateRole = async (roleData: Partial<UpdateRoleRequest>) => {
    return await updateRole(roleData as UpdateRoleRequest);
  };

  return {
    partialUpdateRole,
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

// Hook for deleting a role
export const useDeleteRole = (roleId: string) => {
  const [data, setData] = useState<{ status: boolean; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteRole = async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      await delay(500);
      const roles = getStoredRoles();
      const updatedRoles = roles.filter((r) => r.id !== roleId);
      saveRoles(updatedRoles);

      const response = {
        status: true,
        message: "Role deleted successfully",
      };

      setData(response);
      setIsSuccess(true);
      toast.success("Role deleted successfully");
      return response;
    } catch (err) {
      setIsError(true);
      setError(err as Error);
      toast.error("Failed to delete role");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteRole,
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

// Hook for listing all permissions
export const useGetPermissions = () => {
  const [data, setData] = useState<PermissionResponse[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getPermissions = async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      await delay(300);
      const permissions = getStoredPermissions();

      setData(permissions);
      setIsSuccess(true);
      return permissions;
    } catch (err) {
      setIsError(true);
      setError(err as Error);
      toast.error("Failed to fetch permissions");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getPermissions,
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};

// Hook for getting a specific permission
export const useGetPermission = (permissionId: string) => {
  const [data, setData] = useState<{ status: boolean; message: string; data: PermissionResponse } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getPermission = async () => {
    setIsLoading(true);
    setIsError(false);
    setError(null);

    try {
      await delay(300);
      const permissions = getStoredPermissions();
      const permission = permissions.find((p) => p.id === permissionId);

      if (!permission) {
        throw new Error("Permission not found");
      }

      const response = {
        status: true,
        message: "Permission retrieved successfully",
        data: permission,
      };

      setData(response);
      setIsSuccess(true);
      return response;
    } catch (err) {
      setIsError(true);
      setError(err as Error);
      toast.error("Failed to fetch permission");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getPermission,
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  };
};
