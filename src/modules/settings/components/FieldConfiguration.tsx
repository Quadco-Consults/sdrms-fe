"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown } from "lucide-react";

interface Field {
  name: string;
  type: string;
  mandatory: boolean;
  visible: boolean;
  regulatoryMapping: string;
  state: string;
}

interface Category {
  name: string;
  fieldsConfigured: number;
  fieldsAvailable: number;
  enabled: boolean;
  fields: Field[];
}

interface HierarchyItem {
  name: string;
  percentage: string;
  children?: HierarchyItem[];
}

export default function FieldConfiguration() {
  const [selectedUnit, setSelectedUnit] = useState("NRL");
  const [buOverrideActive, setBuOverrideActive] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(["GHG Emissions"])
  );
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["Environment"])
  );
  const [expandedHierarchy, setExpandedHierarchy] = useState<Set<string>>(
    new Set(["Upstream", "Gas", "Downstream", "LNG", "Corporate"])
  );

  const hierarchy: HierarchyItem[] = [
    {
      name: "Upstream",
      percentage: "87%",
      children: [
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
      children: [
        { name: "NRL", percentage: "87%" },
        { name: "PPMC", percentage: "87%" },
      ],
    },
    {
      name: "LNG",
      percentage: "87%",
      children: [{ name: "NLNG", percentage: "87%" }],
    },
    {
      name: "Corporate",
      percentage: "87%",
      children: [
        { name: "NNPC HQ", percentage: "87%" },
        { name: "ESG Team", percentage: "87%" },
      ],
    },
  ];

  const environmentCategories: Category[] = [
    {
      name: "GHG Emissions",
      fieldsConfigured: 4,
      fieldsAvailable: 4,
      enabled: true,
      fields: [
        {
          name: "Scope 1 Emissions (tCO2e)",
          type: "Numeric",
          mandatory: true,
          visible: true,
          regulatoryMapping: "GRI 305-1",
          state: "",
        },
        {
          name: "Scope 2 Emissions (tCO2e)",
          type: "Numeric",
          mandatory: true,
          visible: true,
          regulatoryMapping: "GRI 305-2",
          state: "",
        },
        {
          name: "Fuel Consumption (Litres)",
          type: "Numeric",
          mandatory: true,
          visible: true,
          regulatoryMapping: "GRI 302-1",
          state: "",
        },
        {
          name: "Activity Type",
          type: "Dropdown",
          mandatory: true,
          visible: true,
          regulatoryMapping: "System",
          state: "",
        },
      ],
    },
    {
      name: "Energy",
      fieldsConfigured: 3,
      fieldsAvailable: 3,
      enabled: true,
      fields: [
        {
          name: "Grid Electricity (kWh)",
          type: "Numeric",
          mandatory: true,
          visible: true,
          regulatoryMapping: "GRI 302-1",
          state: "",
        },
        {
          name: "Renewable Energy (kWh)",
          type: "Numeric",
          mandatory: true,
          visible: true,
          regulatoryMapping: "GRI 302-1",
          state: "",
        },
        {
          name: "Energy Intensity",
          type: "Auto-Calculated",
          mandatory: false,
          visible: true,
          regulatoryMapping: "GRI 302-3",
          state: "",
        },
      ],
    },
    {
      name: "Water",
      fieldsConfigured: 3,
      fieldsAvailable: 3,
      enabled: true,
      fields: [
        {
          name: "Water Withdrawal (m³)",
          type: "Numeric",
          mandatory: true,
          visible: true,
          regulatoryMapping: "GRI 303-3",
          state: "",
        },
        {
          name: "Water Discharge (m³)",
          type: "Numeric",
          mandatory: true,
          visible: true,
          regulatoryMapping: "GRI 303-4",
          state: "",
        },
        {
          name: "Water Source",
          type: "Dropdown",
          mandatory: true,
          visible: true,
          regulatoryMapping: "GRI 303-3",
          state: "",
        },
      ],
    },
    {
      name: "Waste",
      fieldsConfigured: 3,
      fieldsAvailable: 3,
      enabled: true,
      fields: [
        {
          name: "Hazardous Waste (MT)",
          type: "Numeric",
          mandatory: true,
          visible: true,
          regulatoryMapping: "GRI 306-3",
          state: "",
        },
        {
          name: "Non-Hazardous Waste (MT)",
          type: "Numeric",
          mandatory: true,
          visible: true,
          regulatoryMapping: "GRI 306-3",
          state: "",
        },
        {
          name: "Recycling Rate (%)",
          type: "Numeric",
          mandatory: true,
          visible: true,
          regulatoryMapping: "GRI 306-4",
          state: "",
        },
      ],
    },
    {
      name: "Air Quality",
      fieldsConfigured: 0,
      fieldsAvailable: 0,
      enabled: false,
      fields: [],
    },
    {
      name: "Biodiversity",
      fieldsConfigured: 0,
      fieldsAvailable: 0,
      enabled: false,
      fields: [],
    },
  ];

  const socialCategories: Category[] = [
    {
      name: "HSE & Safety",
      fieldsConfigured: 4,
      fieldsAvailable: 4,
      enabled: true,
      fields: [
        {
          name: "Lost Time Injuries (LTI)",
          type: "Numeric",
          mandatory: true,
          visible: true,
          regulatoryMapping: "GRI 403-9",
          state: "",
        },
        {
          name: "Fatalities",
          type: "Numeric",
          mandatory: true,
          visible: true,
          regulatoryMapping: "GRI 403-9",
          state: "",
        },
        {
          name: "Man-Hours Worked",
          type: "Numeric",
          mandatory: true,
          visible: true,
          regulatoryMapping: "GRI 403-9",
          state: "",
        },
        {
          name: "LTIFR",
          type: "Auto-Calculated",
          mandatory: false,
          visible: true,
          regulatoryMapping: "GRI 403-9",
          state: "",
        },
      ],
    },
    {
      name: "Workforce & Diversity",
      fieldsConfigured: 3,
      fieldsAvailable: 3,
      enabled: true,
      fields: [
        {
          name: "Total Employees",
          type: "Numeric",
          mandatory: true,
          visible: true,
          regulatoryMapping: "GRI 2-7",
          state: "",
        },
        {
          name: "Female Representation (%)",
          type: "Numeric",
          mandatory: true,
          visible: true,
          regulatoryMapping: "GRI 405-1",
          state: "",
        },
        {
          name: "Employee Turnover (%)",
          type: "Numeric",
          mandatory: true,
          visible: true,
          regulatoryMapping: "GRI 401-1",
          state: "",
        },
      ],
    },
    {
      name: "Community Impact",
      fieldsConfigured: 0,
      fieldsAvailable: 0,
      enabled: false,
      fields: [],
    },
    {
      name: "Training & Dev",
      fieldsConfigured: 0,
      fieldsAvailable: 0,
      enabled: false,
      fields: [],
    },
  ];

  const governanceCategories: Category[] = [
    {
      name: "Sustainability KPIs",
      fieldsConfigured: 2,
      fieldsAvailable: 2,
      enabled: true,
      fields: [
        {
          name: "ESG Score",
          type: "Numeric",
          mandatory: true,
          visible: true,
          regulatoryMapping: "Internal",
          state: "",
        },
        {
          name: "Compliance Rate (%)",
          type: "Numeric",
          mandatory: true,
          visible: true,
          regulatoryMapping: "Internal",
          state: "",
        },
      ],
    },
    {
      name: "GRC Register",
      fieldsConfigured: 0,
      fieldsAvailable: 0,
      enabled: false,
      fields: [],
    },
    {
      name: "Stakeholder Reporting",
      fieldsConfigured: 0,
      fieldsAvailable: 0,
      enabled: false,
      fields: [],
    },
  ];

  const toggleCategory = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName);
    } else {
      newExpanded.add(categoryName);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleSection = (sectionName: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionName)) {
      newExpanded.delete(sectionName);
    } else {
      newExpanded.add(sectionName);
    }
    setExpandedSections(newExpanded);
  };

  const toggleHierarchy = (name: string) => {
    const newExpanded = new Set(expandedHierarchy);
    if (newExpanded.has(name)) {
      newExpanded.delete(name);
    } else {
      newExpanded.add(name);
    }
    setExpandedHierarchy(newExpanded);
  };

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
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-5 h-5 text-green-600"
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
              <h4 className="font-semibold text-gray-900">Hierarchy</h4>
            </div>

            <div className="space-y-2">
              {hierarchy.map((wg) => (
                <div key={wg.name}>
                  <div className="flex items-center gap-1">
                    {wg.children && (
                      <button
                        onClick={() => toggleHierarchy(wg.name)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        {expandedHierarchy.has(wg.name) ? (
                          <ChevronDown className="w-3 h-3 text-gray-500" />
                        ) : (
                          <ChevronRight className="w-3 h-3 text-gray-500" />
                        )}
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedUnit(wg.name)}
                      className={`flex-1 flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedUnit === wg.name
                          ? "bg-green-50 text-green-700"
                          : "text-gray-700 hover:bg-gray-50"
                      } ${!wg.children ? 'ml-5' : ''}`}
                    >
                      <span>{wg.name}</span>
                      <span className="text-xs px-2 py-0.5 bg-gray-200 rounded">
                        {wg.percentage}
                      </span>
                    </button>
                  </div>

                  {wg.children && expandedHierarchy.has(wg.name) && (
                    <div className="ml-8 mt-1 space-y-1">
                      {wg.children.map((child) => (
                        <button
                          key={child.name}
                          onClick={() => setSelectedUnit(child.name)}
                          className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-sm transition-colors ${
                            selectedUnit === child.name
                              ? "bg-green-50 text-green-700 font-medium"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <span>{child.name}</span>
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
          {/* Mid-Period Change Detection Warning */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3">
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
                The current reporting period (Q1 2026) is active. Any changes to field
                visibility will trigger a notification to affected submitters.
              </div>
              <Button
                variant="link"
                className="text-yellow-800 hover:text-yellow-900 p-0 h-auto mt-2 text-xs font-medium"
              >
                View Submission Snapshot
              </Button>
            </div>
          </div>

          {/* Configuration Card */}
          <div className="bg-white rounded-lg border border-gray-200">
            {/* Header with BU Override */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900 text-lg">
                    {selectedUnit} Configuration
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {buOverrideActive
                      ? "Overriding baseline inherited from Upstream."
                      : "Inheriting from Upstream"}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">BU Override</span>
                    <button
                      onClick={() => setBuOverrideActive(!buOverrideActive)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        buOverrideActive ? "bg-green-600" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          buOverrideActive ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                    <span
                      className={`text-sm font-medium ${
                        buOverrideActive ? "text-green-700" : "text-gray-500"
                      }`}
                    >
                      {buOverrideActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Button className="bg-green-700 hover:bg-green-800 text-white">
                  Save Configuration
                </Button>
              </div>
            </div>

            {/* Environment Section */}
            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleSection("Environment")}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <h5 className="font-semibold text-gray-900">Environment</h5>
                  <span className="text-xs text-gray-500">
                    Applied to all BUs in this workgroup unless overridden
                  </span>
                </div>
                {expandedSections.has("Environment") ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {expandedSections.has("Environment") && (
                <div className="px-6 pb-4 space-y-4">
                  {environmentCategories.map((category) => (
                    <div key={category.name} className="border-b border-gray-100 pb-4">
                      <button
                        onClick={() => toggleCategory(category.name)}
                        className="w-full flex items-center justify-between mb-3"
                      >
                        <div className="flex items-center gap-2">
                          {expandedCategories.has(category.name) ? (
                            <ChevronDown className="w-4 h-4 text-green-600" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-green-600" />
                          )}
                          <span className="font-semibold text-gray-900">
                            {category.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {category.fieldsConfigured} fields configured /{" "}
                            {category.fieldsAvailable} available
                          </span>
                        </div>
                      </button>

                      {expandedCategories.has(category.name) && (
                        <div className="overflow-hidden rounded-lg border border-gray-200 ml-6">
                          <table className="w-full">
                            <thead>
                              <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">
                                  Field Name
                                </th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">
                                  Type
                                </th>
                                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-700">
                                  Mandatory
                                </th>
                                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-700">
                                  Visible
                                </th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">
                                  Regulatory Mapping
                                </th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">
                                  State
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {category.fields.length > 0 ? (
                                category.fields.map((field, index) => (
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
                                    <td className="px-4 py-3 text-center">
                                      <input
                                        type="checkbox"
                                        defaultChecked={field.mandatory}
                                        className="w-4 h-4 text-green-600 rounded border-gray-300"
                                      />
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <input
                                        type="checkbox"
                                        defaultChecked={field.visible}
                                        className="w-4 h-4 text-green-600 rounded border-gray-300"
                                      />
                                    </td>
                                    <td className="px-4 py-3">
                                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                                        {field.regulatoryMapping}
                                      </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600">
                                      {field.state || "-"}
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-500">
                                    No fields configured
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Social Section */}
            <div className="border-b border-gray-200">
              <button
                onClick={() => toggleSection("Social")}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <h5 className="font-semibold text-gray-900">Social</h5>
                  <span className="text-xs text-gray-500">
                    Applied to all BUs in this workgroup unless overridden
                  </span>
                </div>
                {expandedSections.has("Social") ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {expandedSections.has("Social") && (
                <div className="px-6 pb-4 space-y-4">
                  {socialCategories.map((category) => (
                    <div key={category.name} className="border-b border-gray-100 pb-4">
                      <button
                        onClick={() => toggleCategory(category.name)}
                        className="w-full flex items-center justify-between mb-3"
                      >
                        <div className="flex items-center gap-2">
                          {expandedCategories.has(category.name) ? (
                            <ChevronDown className="w-4 h-4 text-green-600" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-green-600" />
                          )}
                          <span className="font-semibold text-gray-900">
                            {category.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {category.fieldsConfigured} fields configured /{" "}
                            {category.fieldsAvailable} available
                          </span>
                        </div>
                      </button>

                      {expandedCategories.has(category.name) && (
                        <div className="overflow-hidden rounded-lg border border-gray-200 ml-6">
                          <table className="w-full">
                            <thead>
                              <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">
                                  Field Name
                                </th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">
                                  Type
                                </th>
                                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-700">
                                  Mandatory
                                </th>
                                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-700">
                                  Visible
                                </th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">
                                  Regulatory Mapping
                                </th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">
                                  State
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {category.fields.length > 0 ? (
                                category.fields.map((field, index) => (
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
                                    <td className="px-4 py-3 text-center">
                                      <input
                                        type="checkbox"
                                        defaultChecked={field.mandatory}
                                        className="w-4 h-4 text-green-600 rounded border-gray-300"
                                      />
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <input
                                        type="checkbox"
                                        defaultChecked={field.visible}
                                        className="w-4 h-4 text-green-600 rounded border-gray-300"
                                      />
                                    </td>
                                    <td className="px-4 py-3">
                                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                                        {field.regulatoryMapping}
                                      </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600">
                                      {field.state || "-"}
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-500">
                                    No fields configured
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Governance Section */}
            <div>
              <button
                onClick={() => toggleSection("Governance")}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <h5 className="font-semibold text-gray-900">Governance</h5>
                  <span className="text-xs text-gray-500">
                    Applied to all BUs in this workgroup unless overridden
                  </span>
                </div>
                {expandedSections.has("Governance") ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </button>

              {expandedSections.has("Governance") && (
                <div className="px-6 pb-4 space-y-4">
                  {governanceCategories.map((category) => (
                    <div key={category.name} className="border-b border-gray-100 pb-4">
                      <button
                        onClick={() => toggleCategory(category.name)}
                        className="w-full flex items-center justify-between mb-3"
                      >
                        <div className="flex items-center gap-2">
                          {expandedCategories.has(category.name) ? (
                            <ChevronDown className="w-4 h-4 text-green-600" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-green-600" />
                          )}
                          <span className="font-semibold text-gray-900">
                            {category.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {category.fieldsConfigured} fields configured /{" "}
                            {category.fieldsAvailable} available
                          </span>
                        </div>
                      </button>

                      {expandedCategories.has(category.name) && (
                        <div className="overflow-hidden rounded-lg border border-gray-200 ml-6">
                          <table className="w-full">
                            <thead>
                              <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">
                                  Field Name
                                </th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">
                                  Type
                                </th>
                                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-700">
                                  Mandatory
                                </th>
                                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-700">
                                  Visible
                                </th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">
                                  Regulatory Mapping
                                </th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">
                                  State
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {category.fields.length > 0 ? (
                                category.fields.map((field, index) => (
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
                                    <td className="px-4 py-3 text-center">
                                      <input
                                        type="checkbox"
                                        defaultChecked={field.mandatory}
                                        className="w-4 h-4 text-green-600 rounded border-gray-300"
                                      />
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                      <input
                                        type="checkbox"
                                        defaultChecked={field.visible}
                                        className="w-4 h-4 text-green-600 rounded border-gray-300"
                                      />
                                    </td>
                                    <td className="px-4 py-3">
                                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                                        {field.regulatoryMapping}
                                      </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600">
                                      {field.state || "-"}
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-gray-500">
                                    No fields configured
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Actions */}
            {buOverrideActive && (
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      BU Override Mode
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Inheriting from Upstream
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                      View Configuration Diff
                    </Button>
                    <Button variant="outline" size="sm">
                      Reset to Workgroup Baseline
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
