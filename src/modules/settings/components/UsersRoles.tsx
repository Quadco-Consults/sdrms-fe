"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Shield, Pencil, Trash2, X, ArrowLeft } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  businessUnit: string;
  workgroup: string;
  status: "ACTIVE" | "INACTIVE";
  assignedOMLs?: string[];
}

interface Role {
  id: string;
  name: string;
  permissions: string[];
}

export default function UsersRoles() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "VA",
      name: "Victor Anunobi",
      email: "victor@nnpc.com",
      role: "System Administrator",
      businessUnit: "Corporate Strategy & Sustainability",
      workgroup: "GCEO",
      status: "ACTIVE",
    },
    {
      id: "CI",
      name: "Chinedu Igwe",
      email: "chinedu@nnpc.com",
      role: "Data Submitter",
      businessUnit: "NNPC E&P Ltd",
      workgroup: "Upstream",
      status: "ACTIVE",
    },
    {
      id: "FB",
      name: "Fatima Bello",
      email: "fatima@nnpc.com",
      role: "Data Approver",
      businessUnit: "NNPC E&P Ltd",
      workgroup: "Upstream",
      status: "ACTIVE",
    },
    {
      id: "NL",
      name: "NUIMS Data Lead",
      email: "nuims.lead@nnpc.com",
      role: "Data Submitter",
      businessUnit: "NNPC Upstream Investment Management Services",
      workgroup: "Upstream",
      status: "ACTIVE",
    },
    {
      id: "ZM",
      name: "Zainab Musa",
      email: "zainab@nnpc.com",
      role: "Data Submitter",
      businessUnit: "NNPC Gas Infrastructure Company",
      workgroup: "Gas, Power & New Energy",
      status: "INACTIVE",
    },
  ]);

  const [showUserModal, setShowUserModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    role: "Data Submitter",
    businessUnit: "Corporate Strategy & Sustainability",
    workgroup: "GCEO",
    status: "ACTIVE" as "ACTIVE" | "INACTIVE",
    assignedOMLs: [] as string[],
  });

  const [roles] = useState<Role[]>([
    { id: "1", name: "System Administrator", permissions: ["All Access"] },
    { id: "2", name: "Data Submitter", permissions: ["Submit Data", "View Reports"] },
    { id: "3", name: "Data Approver", permissions: ["Approve Data", "View Reports"] },
    { id: "4", name: "Viewer", permissions: ["View Reports"] },
  ]);

  const handleAddUser = () => {
    setUserForm({
      name: "",
      email: "",
      role: "Data Submitter",
      businessUnit: "Corporate Strategy & Sustainability",
      workgroup: "GCEO",
      status: "ACTIVE",
      assignedOMLs: [],
    });
    setEditingUser(null);
    setShowUserModal(true);
  };

  const handleEditUser = (user: User) => {
    setUserForm({
      name: user.name,
      email: user.email,
      role: user.role,
      businessUnit: user.businessUnit,
      workgroup: user.workgroup,
      status: user.status,
      assignedOMLs: user.assignedOMLs || [],
    });
    setEditingUser(user);
    setShowUserModal(true);
  };

  const handleSaveUser = () => {
    if (editingUser) {
      setUsers(
        users.map((u) =>
          u.id === editingUser.id ? { ...editingUser, ...userForm } : u
        )
      );
    } else {
      const initials = userForm.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
      const newUser: User = {
        id: initials,
        ...userForm,
      };
      setUsers([...users, newUser]);
    }
    setShowUserModal(false);
  };

  const handleDeleteUser = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const handleToggleStatus = (id: string) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" }
          : u
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setShowRoleModal(true)}
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-50"
          >
            <Shield className="h-4 w-4 mr-2" />
            Manage Roles
          </Button>
          <Button
            onClick={handleAddUser}
            className="bg-teal-500 hover:bg-teal-600 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New User
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-teal-500 text-white">
              <th className="text-left px-6 py-3 text-sm font-semibold">USER</th>
              <th className="text-left px-6 py-3 text-sm font-semibold">ROLE</th>
              <th className="text-left px-6 py-3 text-sm font-semibold">
                BUSINESS UNIT
              </th>
              <th className="text-left px-6 py-3 text-sm font-semibold">
                WORKGROUP
              </th>
              <th className="text-left px-6 py-3 text-sm font-semibold">STATUS</th>
              <th className="text-left px-6 py-3 text-sm font-semibold">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-semibold text-sm">
                      {user.id}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{user.role}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {user.businessUnit}
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-medium">
                    {user.workgroup}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleToggleStatus(user.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === "ACTIVE"
                        ? "bg-green-50 text-green-700 hover:bg-green-100"
                        : "bg-red-50 text-red-700 hover:bg-red-100"
                    }`}
                  >
                    {user.status}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-teal-600"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Role Permissions Matrix */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Role Permissions Matrix
        </h3>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Module / Action
                </th>
                <th className="text-center px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Submitter
                </th>
                <th className="text-center px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Approver
                </th>
                <th className="text-center px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Administrator
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Data Entry (Draft)
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-green-600 text-xl">✓</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-green-600 text-xl">✓</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-green-600 text-xl">✓</span>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Submit for Approval
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-green-600 text-xl">✓</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-green-600 text-xl">✓</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-green-600 text-xl">✓</span>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Approve / Reject Records
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-gray-300">-</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-green-600 text-xl">✓</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-green-600 text-xl">✓</span>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Manage Users
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-gray-300">-</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-gray-300">-</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-green-600 text-xl">✓</span>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Configure Emission Factors
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-gray-300">-</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-gray-300">-</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-green-600 text-xl">✓</span>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  System Integrations
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-gray-300">-</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-gray-300">-</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-green-600 text-xl">✓</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowUserModal(false)}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
                >
                  <ArrowLeft size={20} />
                </button>
                <h3 className="text-xl font-bold text-gray-900">
                  {editingUser ? "Edit User" : "Add New User"}
                </h3>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={userForm.name}
                    onChange={(e) =>
                      setUserForm({ ...userForm, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                    placeholder="e.g., John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={userForm.email}
                    onChange={(e) =>
                      setUserForm({ ...userForm, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                    placeholder="e.g., john@nnpc.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role *
                  </label>
                  <select
                    value={userForm.role}
                    onChange={(e) =>
                      setUserForm({ ...userForm, role: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  >
                    <option>System Administrator</option>
                    <option>Data Submitter</option>
                    <option>Data Approver</option>
                    <option>Viewer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Unit *
                  </label>
                  <select
                    value={userForm.businessUnit}
                    onChange={(e) =>
                      setUserForm({ ...userForm, businessUnit: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  >
                    <option>Corporate Strategy & Sustainability</option>
                    <option>NNPC E&P Ltd</option>
                    <option>NNPC Gas Infrastructure Company</option>
                    <option>NPDC</option>
                    <option>NGC</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Workgroup *
                  </label>
                  <select
                    value={userForm.workgroup}
                    onChange={(e) =>
                      setUserForm({ ...userForm, workgroup: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  >
                    <option>GCEO</option>
                    <option>Upstream</option>
                    <option>Gas, Power & New Energy</option>
                    <option>Downstream</option>
                    <option>Finance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    value={userForm.status}
                    onChange={(e) =>
                      setUserForm({
                        ...userForm,
                        status: e.target.value as "ACTIVE" | "INACTIVE",
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                </div>
              </div>

              {/* Asset Assignment Registry */}
              <div className="mt-6 p-5 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                      <Shield className="h-4 w-4 text-gray-600" />
                    </div>
                    <span className="font-semibold text-gray-900 uppercase text-sm">
                      Asset Assignment Registry
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 italic">
                    Sourced from Venture & Asset Registry
                  </span>
                </div>

                <div className="mb-3">
                  <label className="block text-sm font-bold text-green-700 mb-3">
                    JOINT VENTURE (JV)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {["OML 11", "OML 13", "OML 17", "OML 20", "OML 24", "OML 111", "OML 118", "OML 119"].map((oml) => (
                      <label key={oml} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={userForm.assignedOMLs.includes(oml)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setUserForm({
                                ...userForm,
                                assignedOMLs: [...userForm.assignedOMLs, oml],
                              });
                            } else {
                              setUserForm({
                                ...userForm,
                                assignedOMLs: userForm.assignedOMLs.filter((o) => o !== oml),
                              });
                            }
                          }}
                          className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                        />
                        <span className="text-sm text-gray-700">{oml}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowUserModal(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSaveUser}
                className="bg-teal-500 hover:bg-teal-600 text-white"
                disabled={!userForm.name || !userForm.email}
              >
                {editingUser ? "Update User" : "Add User"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Roles Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-xl p-6 w-full max-w-3xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Manage Roles & Permissions
              </h3>
              <button
                onClick={() => setShowRoleModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{role.name}</h4>
                      <div className="flex gap-2 mt-2">
                        {role.permissions.map((perm, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-teal-50 text-teal-700 rounded text-xs font-medium"
                          >
                            {perm}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-gray-600 hover:text-teal-600"
                    >
                      Edit Permissions
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
              <Button variant="outline" onClick={() => setShowRoleModal(false)}>
                Close
              </Button>
              <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add New Role
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
