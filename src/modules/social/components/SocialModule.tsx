"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import GlobalFilters from "@/components/shared/GlobalFilters";
import HSESafety from "./HSESafety";
import WorkforceDiversity from "./WorkforceDiversity";
import CommunityImpact from "./CommunityImpact";
import TrainingDevelopment from "./TrainingDevelopment";

type TabType = "hse" | "workforce" | "community" | "training";

export default function SocialModule() {
  const [activeTab, setActiveTab] = useState<TabType>("hse");

  const tabs = [
    { id: "hse" as TabType, label: "HSE & Safety" },
    { id: "workforce" as TabType, label: "Workforce & Diversity" },
    { id: "community" as TabType, label: "Community Impact" },
    { id: "training" as TabType, label: "Training & Dev" },
  ];

  return (
    <div>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Social Impact" },
        ]}
      />

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Social Impact Module
            </h1>
            <p className="text-gray-600 mt-1">
              Track and manage social performance metrics across all business units
            </p>
          </div>
        </div>

        {/* Global Filters */}
        <GlobalFilters />

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
        {activeTab === "hse" && <HSESafety />}
        {activeTab === "workforce" && <WorkforceDiversity />}
        {activeTab === "community" && <CommunityImpact />}
        {activeTab === "training" && <TrainingDevelopment />}
      </div>
    </div>
  );
}
