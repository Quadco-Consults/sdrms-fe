"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Shield } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  businessUnit: string;
  workgroup: string;
  status: "ACTIVE" | "INACTIVE";
}

export default function UsersRoles() {
  const [users] = useState<User[]>([
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          User Management
        </h3>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-50"
          >
            <Shield className="h-4 w-4 mr-2" />
            Manage Roles
          </Button>
          <Button className="bg-teal-500 hover:bg-teal-600 text-white">
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
              <th className="text-left px-6 py-3 text-sm font-semibold">
                USER
              </th>
              <th className="text-left px-6 py-3 text-sm font-semibold">
                ROLE
              </th>
              <th className="text-left px-6 py-3 text-sm font-semibold">
                BUSINESS UNIT
              </th>
              <th className="text-left px-6 py-3 text-sm font-semibold">
                WORKGROUP
              </th>
              <th className="text-left px-6 py-3 text-sm font-semibold">
                STATUS
              </th>
              <th className="text-left px-6 py-3 text-sm font-semibold">
                ACTION
              </th>
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
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === "ACTIVE"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
