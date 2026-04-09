"use client";
import { useState } from "react";
import GHGTracking from "./GHGTracking";
import EnergyEfficiency from "./EnergyEfficiency";
import WaterConsumption from "./WaterConsumption";
import AirQuality from "./AirQuality";
import Biodiversity from "./Biodiversity";
import Waste from "./Waste";
import GlobalFilters from "@/components/shared/GlobalFilters";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Cloud, Droplets, Zap, Trash2 } from "lucide-react";

type TabType = "overview" | "ghg-tracking" | "air-quality" | "biodiversity" | "energy-efficiency" | "water-consumption" | "waste";

// Mock data for overview
const environmentalMetrics = [
  { name: "GHG Emissions", value: 12500, unit: "kg CO2e", color: "#10B981", change: "+7%", icon: Cloud },
  { name: "Energy", value: 45000, unit: "kWh", color: "#F59E0B", change: "-3%", icon: Zap },
  { name: "Water", value: 28000, unit: "m³", color: "#3B82F6", change: "-5%", icon: Droplets },
  { name: "Waste", value: 15000, unit: "kg", color: "#8B5CF6", change: "+2%", icon: Trash2 },
];

const emissionsByScope = [
  { name: "Scope 1", value: 5000, color: "#10B981" },
  { name: "Scope 2", value: 4500, color: "#F59E0B" },
  { name: "Scope 3", value: 3000, color: "#3B82F6" },
];

const monthlyTrend = [
  { month: "Jan", emissions: 150, energy: 380, water: 240 },
  { month: "Feb", emissions: 140, energy: 320, water: 210 },
  { month: "Mar", emissions: 160, energy: 410, water: 280 },
  { month: "Apr", emissions: 155, energy: 390, water: 260 },
  { month: "May", emissions: 145, energy: 350, water: 230 },
  { month: "Jun", emissions: 158, energy: 400, water: 270 },
];

export default function EnvironmentalMonitoring() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const tabs = [
    { id: "overview" as TabType, label: "Overview" },
    { id: "ghg-tracking" as TabType, label: "GHG Emissions" },
    { id: "air-quality" as TabType, label: "Air Quality" },
    { id: "biodiversity" as TabType, label: "Biodiversity" },
    { id: "energy-efficiency" as TabType, label: "Energy" },
    { id: "water-consumption" as TabType, label: "Water" },
    { id: "waste" as TabType, label: "Waste" },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Environmental Monitoring</h1>
        <p className="text-gray-600 mt-2">
          Track and manage environmental performance metrics
        </p>
      </div>

      {/* Global Filters */}
      <GlobalFilters />

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
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
      <div>
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-4 gap-6">
              {environmentalMetrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={metric.name}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-lg ${metric.color === "#10B981" ? "bg-green-100" : metric.color === "#F59E0B" ? "bg-yellow-100" : metric.color === "#3B82F6" ? "bg-blue-100" : "bg-purple-100"} flex items-center justify-center`}>
                        <Icon className="w-6 h-6" style={{ color: metric.color }} />
                      </div>
                      <span
                        className={`text-sm font-semibold ${
                          metric.change.startsWith("+")
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {metric.change}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">{metric.name}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {metric.value.toLocaleString()}
                      <span className="text-sm font-normal text-gray-500 ml-2">
                        {metric.unit}
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-3 gap-6">
              {/* Monthly Trend */}
              <div className="col-span-2 bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Monthly Environmental Metrics
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 12, fill: "#6B7280" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 12, fill: "#6B7280" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #E5E7EB",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="emissions" name="GHG Emissions" fill="#10B981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="energy" name="Energy" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="water" name="Water" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Emissions by Scope */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Emissions by Scope
                </h3>
                <div className="h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={emissionsByScope}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                      >
                        {emissionsByScope.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                        wrapperStyle={{ fontSize: "12px" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "ghg-tracking" && <GHGTracking />}
        {activeTab === "air-quality" && <AirQuality />}
        {activeTab === "biodiversity" && <Biodiversity />}
        {activeTab === "energy-efficiency" && <EnergyEfficiency />}
        {activeTab === "water-consumption" && <WaterConsumption />}
        {activeTab === "waste" && <Waste />}
      </div>
    </div>
  );
}
