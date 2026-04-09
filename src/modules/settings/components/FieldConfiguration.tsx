"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Eye, Check } from "lucide-react";

interface Field {
  name: string;
  type: string;
  mandatory: boolean;
  visible: boolean;
  regulatoryMapping: string;
}

export default function FieldConfiguration() {
  const [selectedWorkgroup, setSelectedWorkgroup] = useState("Upstream");
  const [selectedModule, setSelectedModule] = useState("GHG Emissions");

  const [fields] = useState<Field[]>([
    {
      name: "Scope 1 Emissions (tCO2e)",
      type: "Numeric",
      mandatory: true,
      visible: true,
      regulatoryMapping: "GRI 305-1",
    },
    {
      name: "Scope 2 Emissions (tCO2e)",
      type: "Numeric",
      mandatory: true,
      visible: true,
      regulatoryMapping: "GRI 305-2",
    },
    {
      name: "Fuel Consumption",
      type: "Numeric",
      mandatory: true,
      visible: true,
      regulatoryMapping: "GRI 302-1",
    },
  ]);

  const workgroups = [
    {
      name: "Upstream",
      percentage: "87%",
      children: [
        { name: "NRL", percentage: "87%" },
        { name: "NPDC", percentage: "87%" },
      ],
    },
    {
      name: "Gas",
      percentage: "87%",
      children: [{ name: "NGC", percentage: "87%" }],
    },
    {
      name: "Downstream",
      percentage: "87%",
      children: [{ name: "PPMC", percentage: "87%" }],
    },
    {
      name: "LNG",
      percentage: "87%",
      children: [{ name: "NLNG", percentage: "87%" }],
    },
    {
      name: "Corporate",
      percentage: "87%",
      children: [{ name: "NNPC HQ", percentage: "87%" }],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Field Configuration
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Configure field visibility and data collection requirements for each workgroup.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Hierarchy Sidebar */}
        <div className="col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-4">
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
                  d="M3 7h18M3 12h18M3 17h18"
                />
              </svg>
              <h4 className="font-semibold text-gray-900">HIERARCHY</h4>
            </div>

            <div className="space-y-2">
              {workgroups.map((wg) => (
                <div key={wg.name}>
                  <button
                    onClick={() => setSelectedWorkgroup(wg.name)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedWorkgroup === wg.name
                        ? "bg-teal-50 text-teal-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <span>{wg.name}</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 bg-gray-200 rounded">
                      {wg.percentage}
                    </span>
                  </button>

                  {wg.children && (
                    <div className="ml-6 mt-1 space-y-1">
                      {wg.children.map((child) => (
                        <button
                          key={child.name}
                          className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-50"
                        >
                          <span>• {child.name}</span>
                          <span className="px-1.5 py-0.5 bg-gray-200 rounded text-xs">
                            {child.percentage}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Configuration Panel */}
        <div className="col-span-3 space-y-4">
          {/* Info Box */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-3">
            <div className="flex-shrink-0">
              <svg
                className="w-5 h-5 text-yellow-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-sm text-yellow-900">
                Mid-Period Change Detection
              </div>
              <div className="text-xs text-yellow-700 mt-1">
                The current reporting period (Q1 2026) is active. Any changes to field visibility will trigger a notification to affected submitters.
              </div>
            </div>
          </div>

          {/* View Submission Snapshot Button */}
          <div className="flex justify-end">
            <Button
              variant="outline"
              className="border-teal-600 text-teal-600 hover:bg-teal-50"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Submission Snapshot
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          {/* Configuration Card */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="bg-teal-50 px-6 py-4 border-b border-teal-100 rounded-t-xl">
              <h4 className="font-semibold text-gray-900">
                {selectedWorkgroup} Configuration
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Setting baseline configuration for all business units in this workgroup.
              </p>
            </div>

            <div className="p-6">
              {/* Module Selection */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
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
                      d="M3 7h18M3 12h18M3 17h18"
                    />
                  </svg>
                  <h5 className="font-semibold text-gray-900">Environment</h5>
                  <button className="ml-auto text-teal-600 hover:text-teal-700">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <button className="text-teal-600">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      <span className="font-medium text-gray-900">
                        {selectedModule}
                      </span>
                      <span className="text-xs text-gray-500">
                        4 fields configured / 4 available
                      </span>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-teal-600 rounded"
                      />
                      <span className="text-sm text-gray-700">Enable module</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Fields Table */}
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">
                        FIELD NAME
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">
                        TYPE
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">
                        MANDATORY
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">
                        VISIBLE
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">
                        REGULATORY MAPPING
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields.map((field, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {field.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {field.type}
                        </td>
                        <td className="px-4 py-3">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              defaultChecked={field.mandatory}
                              className="w-4 h-4 text-teal-600 rounded border-gray-300"
                            />
                            {field.mandatory && (
                              <Check className="h-3 w-3 text-teal-600" />
                            )}
                          </label>
                        </td>
                        <td className="px-4 py-3">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              defaultChecked={field.visible}
                              className="w-4 h-4 text-teal-600 rounded border-gray-300"
                            />
                            {field.visible && <Eye className="h-3 w-3 text-teal-600" />}
                          </label>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                            {field.regulatoryMapping}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Save Button */}
              <div className="mt-6 flex justify-end">
                <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                  Save Configuration
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
