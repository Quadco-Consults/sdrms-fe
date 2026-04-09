"use client";
import { useState } from "react";
import { Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for energy metrics
const energyMetrics = [
  {
    label: "TOTAL CONSUMPTION",
    value: "450,000",
    unit: "kWh",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    borderColor: "border-green-200",
  },
  {
    label: "RENEWABLE ENERGY",
    value: "12",
    unit: "%",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    borderColor: "border-green-200",
  },
  {
    label: "GRID ELECTRICITY",
    value: "380,000",
    unit: "kWh",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
  },
  {
    label: "ENERGY INTENSITY",
    value: "12.5",
    unit: "kWh/unit",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-700",
    borderColor: "border-yellow-200",
  },
];

export default function EnergyEfficiency() {
  const [energyRecords] = useState<any[]>([]);

  return (
    <div className="space-y-6">
      {/* Energy Metrics Cards */}
      <div className="grid grid-cols-4 gap-6">
        {energyMetrics.map((metric) => (
          <div
            key={metric.label}
            className={`${metric.bgColor} border ${metric.borderColor} rounded-xl p-6`}
          >
            <p className="text-xs font-semibold text-gray-500 mb-3">
              {metric.label}
            </p>
            <div className="flex items-baseline gap-2">
              <p className={`text-3xl font-bold ${metric.textColor}`}>
                {metric.value}
              </p>
              <p className="text-sm text-gray-600">{metric.unit}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Energy Records Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-gray-900">
            ENERGY RECORDS
          </h2>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <Upload className="h-4 w-4" />
              Bulk Upload
            </button>
            <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2">
              <Plus className="h-4 w-4" />
              Log Energy Entry
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-teal-500 text-white">
                <th className="text-left px-6 py-3 text-sm font-semibold">
                  ENTRY DETAILS
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold">
                  QUANTITY
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold">
                  PERIOD
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold">
                  STATUS
                </th>
                <th className="text-left px-6 py-3 text-sm font-semibold">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {energyRecords.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="mb-4">
                        <svg
                          className="w-16 h-16 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M11.5 2L2 12h9l-1 10 9.5-10h-9l1-10z" />
                        </svg>
                      </div>
                      <p className="text-gray-500 text-sm">
                        No energy logged yet. Click + Log Entry to begin.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                energyRecords.map((record, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {record.entryDetails}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {record.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {record.period}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          record.status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : record.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button className="text-green-600 hover:text-green-700 font-medium">
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
