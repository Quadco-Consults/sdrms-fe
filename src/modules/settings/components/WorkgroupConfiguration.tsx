"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Download, Upload } from "lucide-react";

interface Workgroup {
  name: string;
  description: string;
  templates: string[];
  completion: string;
}

interface Template {
  name: string;
  category: string;
  subcategory: string;
  description: string;
}

export default function WorkgroupConfiguration() {
  const [workgroups] = useState<Workgroup[]>([
    {
      name: "Upstream",
      description: "Core business unit focusing on exploration and production activities.",
      templates: ["UPSTREAM...", "UPSTREAM..."],
      completion: "87%",
    },
    {
      name: "Gas, Power & New Energy",
      description: "Core business unit focusing on gas infrastructure, marketing, and new energy solutions.",
      templates: ["GAS..."],
      completion: "87%",
    },
    {
      name: "Downstream",
      description: "Core business unit focusing on trading, retail, shipping, and refining.",
      templates: ["DOWNSTREAM..."],
      completion: "87%",
    },
    {
      name: "Finance",
      description: "Support function managing financial control, treasury, and tax management.",
      templates: ["FINANCE..."],
      completion: "87%",
    },
  ]);

  const [templates] = useState<Template[]>([
    {
      name: "Upstream GHG Template",
      category: "ENVIRONMENT",
      subcategory: "GHG Emissions",
      description: "Standard template for E&P GHG data",
    },
    {
      name: "Upstream Water Template",
      category: "ENVIRONMENT",
      subcategory: "Water",
      description: "Water withdrawal and discharge for E&P",
    },
    {
      name: "Downstream Operations Template",
      category: "ENVIRONMENT",
      subcategory: "Energy",
      description: "Template for retail and refining",
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Workgroup Management
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Define business units and map them to multiple data templates.
          </p>
        </div>
        <Button className="bg-teal-500 hover:bg-teal-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Workgroup
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search workgroups or templates..."
          className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Workgroups List */}
        <div className="col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="bg-teal-500 text-white px-6 py-3 rounded-t-xl">
              <div className="grid grid-cols-3 gap-4 font-semibold text-sm">
                <div>WORKGROUP NAME</div>
                <div>ASSIGNED TEMPLATES</div>
                <div>ACTIONS</div>
              </div>
            </div>
            <div>
              {workgroups.map((wg, index) => (
                <div
                  key={index}
                  className="px-6 py-4 border-b border-gray-100 hover:bg-gray-50"
                >
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <div>
                      <div className="font-semibold text-gray-900">{wg.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {wg.description}
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {wg.templates.map((template, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-teal-50 text-teal-700 rounded text-xs font-medium"
                        >
                          {template}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Templates Sidebar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-900">Templates</h4>
            <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
              Manage All
            </button>
          </div>

          {templates.map((template, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-teal-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-gray-900">
                    {template.name}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-xs font-medium">
                      {template.category}
                    </span>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                      {template.subcategory}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {template.description}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Download className="h-3 w-3 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Upload className="h-3 w-3 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
