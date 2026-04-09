"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import OrganizationSettings from "./OrganizationSettings";
import StandardsFactors from "./StandardsFactors";
import CustomDataSources from "./CustomDataSources";
import Integrations from "./Integrations";

type TabType = "organization" | "standards" | "datasources" | "users" | "integrations" | "workgroup" | "fields";

export default function SettingsModule() {
  const [activeTab, setActiveTab] = useState<TabType>("organization");

  const tabs = [
    { id: "organization" as TabType, label: "Organisation" },
    { id: "standards" as TabType, label: "Standards & Factors" },
    { id: "datasources" as TabType, label: "Custom Sources" },
    { id: "users" as TabType, label: "Users & Roles" },
    { id: "integrations" as TabType, label: "Integrations" },
    { id: "workgroup" as TabType, label: "Workgroup Configuration" },
    { id: "fields" as TabType, label: "Field Configuration" },
  ];

  return (
    <div>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings" },
        ]}
      />

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              System Settings
            </h1>
            <p className="text-gray-600 mt-1">
              Configure organization-wide settings and preferences
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-green-600 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "organization" && <OrganizationSettings />}
        {activeTab === "standards" && <StandardsFactors />}
        {activeTab === "datasources" && <CustomDataSources />}
        {activeTab === "users" && <div className="p-6 bg-white rounded-xl border">Users & Roles - Coming Soon</div>}
        {activeTab === "integrations" && <Integrations />}
        {activeTab === "workgroup" && <div className="p-6 bg-white rounded-xl border">Workgroup Configuration - Coming Soon</div>}
        {activeTab === "fields" && <div className="p-6 bg-white rounded-xl border">Field Configuration - Coming Soon</div>}
      </div>
    </div>
  );
}
