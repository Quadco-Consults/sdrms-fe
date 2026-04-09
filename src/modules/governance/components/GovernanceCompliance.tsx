"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import GlobalFilters from "@/components/shared/GlobalFilters";
import KPICard from "@/components/shared/KPICard";
import { Button } from "@/components/ui/button";
import { Filter, Download, FileText, Eye, MapPin, TrendingUp, TrendingDown, Plus, Search, Settings } from "lucide-react";
import { CHART_COLORS } from "@/data/dashboard-mock";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";

type ViewType = "sustainability" | "grc" | "stakeholder";
type SustainabilitySubView = "dashboard" | "records";
type GRCSubView = "dashboard" | "records";
type StakeholderSubView = "dashboard" | "table";

interface Partnership {
  id: string;
  organisation: string;
  type: string;
  category: string;
  period: string;
  status: "ACTIVE" | "EXPIRED" | "PENDING";
}

interface KPIRecord {
  id: string;
  name: string;
  category: string;
  pillar: string;
  target: string;
  actual: string;
  status: "ON TRACK" | "AT RISK" | "MISSED";
}

export default function GovernanceCompliance() {
  const [view, setView] = useState<ViewType>("sustainability");
  const [sustainabilitySubView, setSustainabilitySubView] = useState<SustainabilitySubView>("dashboard");
  const [grcSubView, setGrcSubView] = useState<GRCSubView>("dashboard");
  const [stakeholderSubView, setStakeholderSubView] = useState<StakeholderSubView>("dashboard");

  // Sustainability KPIs Data
  const kpiRecords: KPIRecord[] = [
    {
      id: "KPI-001",
      name: "CARBON EMISSION REDUCTION",
      category: "Emissions",
      pillar: "ENVIRONMENTAL",
      target: "5000 tCO2e",
      actual: "4200 tCO2e",
      status: "ON TRACK",
    },
    {
      id: "KPI-002",
      name: "ENERGY EFFICIENCY %",
      category: "Energy",
      pillar: "ENVIRONMENTAL",
      target: "15 %",
      actual: "12 %",
      status: "AT RISK",
    },
    {
      id: "KPI-003",
      name: "FEMALE LEADERSHIP %",
      category: "Social",
      pillar: "SOCIAL",
      target: "30 %",
      actual: "32 %",
      status: "ON TRACK",
    },
    {
      id: "KPI-004",
      name: "LOCAL PROCUREMENT %",
      category: "Economic",
      pillar: "GOVERNANCE",
      target: "60 %",
      actual: "45 %",
      status: "MISSED",
    },
  ];

  const actualVsTargetData = [
    { month: "Jan", actual: 82, target: 85 },
    { month: "Feb", actual: 84, target: 85 },
    { month: "Mar", actual: 86, target: 87 },
    { month: "Apr", actual: 88, target: 88 },
    { month: "May", actual: 87, target: 89 },
    { month: "Jun", actual: 89, target: 90 },
  ];

  const kpiStatusData = [
    { pillar: "Environmental", value: 92, color: CHART_COLORS.success },
    { pillar: "Social", value: 87, color: CHART_COLORS.blue },
    { pillar: "Governance", value: 94, color: CHART_COLORS.accent },
  ];

  // GRC Register Data
  const ethicsData = [
    { name: "Fraud", value: 40, color: CHART_COLORS.primary },
    { name: "Harassment", value: 25, color: CHART_COLORS.accent },
    { name: "Conflict of Interest", value: 20, color: CHART_COLORS.blue },
    { name: "Other", value: 15, color: CHART_COLORS.secondary },
  ];

  // Stakeholder/Partnership Data
  const partnershipsByCategory = [
    { category: "Community Dev", value: 35, color: CHART_COLORS.primary },
    { category: "Education", value: 28, color: CHART_COLORS.blue },
    { category: "Healthcare", value: 22, color: CHART_COLORS.success },
    { category: "Infrastructure", value: 15, color: CHART_COLORS.accent },
  ];

  const partnerships: Partnership[] = [
    {
      id: "PRT-001",
      organisation: "UNITED NATIONS (UN)",
      type: "Strategic",
      category: "Multilateral Organisation",
      period: "2024 - 2028",
      status: "ACTIVE",
    },
    {
      id: "PRT-002",
      organisation: "LAGOS STATE GOVERNMENT",
      type: "Technical",
      category: "Government Body",
      period: "2025 - 2027",
      status: "ACTIVE",
    },
    {
      id: "PRT-003",
      organisation: "SHELL FOUNDATION",
      type: "Financial",
      category: "International NGO",
      period: "2022 - 2025",
      status: "EXPIRED",
    },
    {
      id: "PRT-004",
      organisation: "UNIVERSITY OF IBADAN",
      type: "Research",
      category: "Academic Institution",
      period: "2025 - 2030",
      status: "ACTIVE",
    },
    {
      id: "PRT-005",
      organisation: "AFRICAN DEVELOPMENT BANK",
      type: "Financial",
      category: "Multilateral Organisation",
      period: "2024 - 2029",
      status: "ACTIVE",
    },
  ];

  const grcRecords = [
    {
      id: "GRC-101",
      type: "COMPLIANCE",
      category: "REGULATORY BREACH",
      bu: "NNPC E&P Ltd",
      severity: "HIGH",
      status: "OPEN",
      date: "2026-02-15",
    },
    {
      id: "GRC-102",
      type: "RISK",
      category: "PHYSICAL RISK - ACUTE",
      bu: "NNPC E&P Ltd",
      severity: "CRITICAL",
      status: "IN PROGRESS",
      date: "2026-03-01",
    },
    {
      id: "GRC-103",
      type: "COMPLIANCE",
      category: "AUDIT FINDING",
      bu: "Corporate Strategy & Sustainability",
      severity: "MEDIUM",
      status: "CLOSED",
      date: "2026-01-20",
    },
    {
      id: "GRC-104",
      type: "RISK",
      category: "TRANSITION RISK - POLICY",
      bu: "NNPC Gas Infrastructure Company",
      severity: "LOW",
      status: "OPEN",
      date: "2026-03-10",
    },
  ];

  return (
    <div>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Governance & Compliance" },
        ]}
      />

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Governance, Risk & Compliance
            </h1>
            <p className="text-gray-600 mt-1">
              Track sustainability KPIs, manage risks, and monitor stakeholder engagement
            </p>
          </div>
        </div>

        {/* Global Filters */}
        <GlobalFilters />

        {/* View Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setView("sustainability")}
            className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all uppercase tracking-tight ${
              view === "sustainability"
                ? "bg-green-600 text-white shadow-lg shadow-green-600/20"
                : "bg-white text-gray-600 border border-gray-200 hover:text-gray-900"
            }`}
          >
            Sustainability KPIs
          </button>
          <button
            onClick={() => setView("grc")}
            className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all uppercase tracking-tight ${
              view === "grc"
                ? "bg-green-600 text-white shadow-lg shadow-green-600/20"
                : "bg-white text-gray-600 border border-gray-200 hover:text-gray-900"
            }`}
          >
            GRC Register
          </button>
          <button
            onClick={() => setView("stakeholder")}
            className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all uppercase tracking-tight ${
              view === "stakeholder"
                ? "bg-green-600 text-white shadow-lg shadow-green-600/20"
                : "bg-white text-gray-600 border border-gray-200 hover:text-gray-900"
            }`}
          >
            Stakeholder Reporting
          </button>
        </div>

        {/* Sustainability KPIs View */}
        {view === "sustainability" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* Sub-tabs for Sustainability KPIs */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={() => setSustainabilitySubView("dashboard")}
                  className={`px-5 py-2.5 rounded-lg text-xs font-extrabold transition-all uppercase tracking-tight ${
                    sustainabilitySubView === "dashboard"
                      ? "bg-green-600 text-white shadow-lg shadow-green-600/20"
                      : "bg-white text-gray-600 border border-gray-200 hover:text-gray-900"
                  }`}
                >
                  DASHBOARD
                </button>
                <button
                  onClick={() => setSustainabilitySubView("records")}
                  className={`px-5 py-2.5 rounded-lg text-xs font-extrabold transition-all uppercase tracking-tight ${
                    sustainabilitySubView === "records"
                      ? "bg-green-600 text-white shadow-lg shadow-green-600/20"
                      : "bg-white text-gray-600 border border-gray-200 hover:text-gray-900"
                  }`}
                >
                  RECORDS
                </button>
              </div>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg text-xs font-extrabold uppercase tracking-tight hover:bg-green-700 transition-all shadow-lg shadow-green-600/20">
                <Plus size={16} /> CREATE KPI
              </button>
            </div>

            {/* Dashboard Sub-view */}
            {sustainabilitySubView === "dashboard" && (
              <div className="space-y-6">
                {/* KPI Cards */}
                <div className="grid grid-cols-4 gap-4">
              <KPICard
                label="Carbon Emission Reduction"
                value="23.4"
                unit="%"
                color={CHART_COLORS.success}
                trend="+5.2%"
              />
              <KPICard
                label="Energy Efficiency"
                value="89"
                unit="%"
                color={CHART_COLORS.blue}
                trend="+2.1%"
              />
              <KPICard
                label="Female Leadership"
                value="34"
                unit="%"
                color={CHART_COLORS.accent}
                trend="+3.4%"
              />
              <KPICard
                label="Local Procurement"
                value="67"
                unit="%"
                color={CHART_COLORS.primary}
                trend="+1.8%"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-6">
              {/* Actual vs Target Trend */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-extrabold text-gray-900 mb-6 uppercase tracking-tight">
                  Actual vs Target Trend
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={actualVsTargetData}>
                      <defs>
                        <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={CHART_COLORS.success} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={CHART_COLORS.success} stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis
                        dataKey="month"
                        tick={{ fontSize: 11, fontWeight: 700 }}
                        stroke="#6B7280"
                      />
                      <YAxis
                        tick={{ fontSize: 11, fontWeight: 700 }}
                        stroke="#6B7280"
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #E5E7EB",
                          borderRadius: "8px",
                        }}
                        itemStyle={{ fontSize: "12px", fontWeight: 700 }}
                      />
                      <Legend
                        wrapperStyle={{
                          paddingTop: "20px",
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="actual"
                        stroke={CHART_COLORS.success}
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorActual)"
                        name="Actual"
                      />
                      <Area
                        type="monotone"
                        dataKey="target"
                        stroke={CHART_COLORS.primary}
                        strokeWidth={3}
                        strokeDasharray="5 5"
                        fillOpacity={1}
                        fill="url(#colorTarget)"
                        name="Target"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* KPI Status by ESG Pillar */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-extrabold text-gray-900 mb-6 uppercase tracking-tight">
                  KPI Status by ESG Pillar
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={kpiStatusData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis
                        type="number"
                        domain={[0, 100]}
                        tick={{ fontSize: 11, fontWeight: 700 }}
                        stroke="#6B7280"
                      />
                      <YAxis
                        type="category"
                        dataKey="pillar"
                        tick={{ fontSize: 11, fontWeight: 700 }}
                        stroke="#6B7280"
                        width={100}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #E5E7EB",
                          borderRadius: "8px",
                        }}
                        itemStyle={{ fontSize: "12px", fontWeight: 700 }}
                      />
                      <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                        {kpiStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Additional KPI Metrics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Water Use Efficiency
                  </h4>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <p className="text-3xl font-extrabold text-gray-900">91.2<span className="text-lg text-gray-500">%</span></p>
                <p className="text-xs text-green-600 font-bold mt-1">+4.3% vs last quarter</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Renewable Energy Mix
                  </h4>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <p className="text-3xl font-extrabold text-gray-900">18.7<span className="text-lg text-gray-500">%</span></p>
                <p className="text-xs text-green-600 font-bold mt-1">+2.1% vs last quarter</p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Safety Incident Rate
                  </h4>
                  <TrendingDown className="h-4 w-4 text-green-600" />
                </div>
                <p className="text-3xl font-extrabold text-gray-900">0.42<span className="text-lg text-gray-500">/200k hrs</span></p>
                <p className="text-xs text-green-600 font-bold mt-1">-12% vs last quarter</p>
              </div>
            </div>
              </div>
            )}

            {/* Records Sub-view */}
            {sustainabilitySubView === "records" && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                  <h3 className="text-lg font-extrabold text-gray-900 uppercase tracking-tight">
                    SUSTAINABILITY KPI RECORDS
                  </h3>
                  <div className="flex gap-3">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search KPIs..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                      />
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs font-extrabold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all uppercase tracking-tight">
                      <Filter size={16} /> FILTER
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs font-extrabold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all uppercase tracking-tight">
                      <Download size={16} /> EXPORT
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-green-600 text-white">
                        <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest">
                          KPI ID
                        </th>
                        <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest">
                          KPI NAME
                        </th>
                        <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest">
                          CATEGORY
                        </th>
                        <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest">
                          PILLAR
                        </th>
                        <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest">
                          TARGET
                        </th>
                        <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest">
                          ACTUAL
                        </th>
                        <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest">
                          STATUS
                        </th>
                        <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest">
                          ACTIONS
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-[13px]">
                      {kpiRecords.map((kpi, i) => (
                        <tr
                          key={kpi.id}
                          className={`hover:bg-green-50 transition-colors border-b border-gray-200 last:border-0 ${
                            i % 2 === 1 ? "bg-gray-50" : "bg-white"
                          }`}
                        >
                          <td className="px-6 py-4 font-mono text-[11px] text-gray-500 font-bold">
                            {kpi.id}
                          </td>
                          <td className="px-6 py-4 font-bold text-gray-900">
                            {kpi.name}
                          </td>
                          <td className="px-6 py-4 text-gray-600 font-semibold">
                            {kpi.category}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                              kpi.pillar === "ENVIRONMENTAL"
                                ? "bg-green-50 text-green-700"
                                : kpi.pillar === "SOCIAL"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-purple-50 text-purple-700"
                            }`}>
                              {kpi.pillar}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-900 font-bold">
                            {kpi.target}
                          </td>
                          <td className="px-6 py-4 text-gray-900 font-bold">
                            {kpi.actual}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5 font-black uppercase text-[11px] tracking-wider">
                              <div
                                className={`w-1.5 h-1.5 rounded-full ${
                                  kpi.status === "ON TRACK"
                                    ? "bg-green-500"
                                    : kpi.status === "AT RISK"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                              ></div>
                              <span className={
                                kpi.status === "ON TRACK"
                                  ? "text-green-700"
                                  : kpi.status === "AT RISK"
                                  ? "text-yellow-700"
                                  : "text-red-700"
                              }>
                                {kpi.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button className="p-1.5 hover:bg-green-50 text-gray-400 hover:text-green-600 rounded-lg transition-all">
                                <Eye size={16} />
                              </button>
                              <button className="p-1.5 hover:bg-green-50 text-gray-400 hover:text-green-600 rounded-lg transition-all">
                                <Settings size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* GRC Register View */}
        {view === "grc" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* Sub-tabs for GRC Register */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={() => setGrcSubView("dashboard")}
                  className={`px-5 py-2.5 rounded-lg text-xs font-extrabold transition-all uppercase tracking-tight ${
                    grcSubView === "dashboard"
                      ? "bg-green-600 text-white shadow-lg shadow-green-600/20"
                      : "bg-white text-gray-600 border border-gray-200 hover:text-gray-900"
                  }`}
                >
                  GRC DASHBOARD
                </button>
                <button
                  onClick={() => setGrcSubView("records")}
                  className={`px-5 py-2.5 rounded-lg text-xs font-extrabold transition-all uppercase tracking-tight ${
                    grcSubView === "records"
                      ? "bg-green-600 text-white shadow-lg shadow-green-600/20"
                      : "bg-white text-gray-600 border border-gray-200 hover:text-gray-900"
                  }`}
                >
                  RECORDS REGISTER
                </button>
              </div>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg text-xs font-extrabold uppercase tracking-tight hover:bg-green-700 transition-all shadow-lg shadow-green-600/20">
                <Plus size={16} /> LOG INCIDENT / RISK
              </button>
            </div>

            {/* Dashboard Sub-view */}
            {grcSubView === "dashboard" && (
              <div className="space-y-6">
                {/* KPI Cards */}
                <div className="grid grid-cols-4 gap-4">
              <KPICard
                label="Compliance Score"
                value="92"
                unit="%"
                color={CHART_COLORS.success}
                trend="+2.4%"
              />
              <KPICard
                label="Open Incidents"
                value="12"
                unit=""
                color={CHART_COLORS.danger}
                trend="+3"
              />
              <KPICard
                label="Critical Risks"
                value="4"
                unit=""
                color={CHART_COLORS.danger}
                trend="Unchanged"
              />
              <KPICard
                label="Anti-Corruption Training"
                value="88"
                unit="%"
                color={CHART_COLORS.success}
                trend="+5%"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-3 gap-6">
              {/* Risk Heatmap */}
              <div className="col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-extrabold text-gray-900 mb-6 uppercase tracking-tight">
                  Risk Heatmap (Likelihood vs Impact)
                </h3>
                <div className="grid grid-cols-5 gap-2 h-[300px]">
                  {Array.from({ length: 25 }).map((_, i) => {
                    const row = 5 - Math.floor(i / 5);
                    const col = (i % 5) + 1;
                    const score = row * col;
                    let bgColor = "bg-green-50";
                    if (score > 15) bgColor = "bg-red-50";
                    else if (score > 8) bgColor = "bg-yellow-50";

                    return (
                      <div
                        key={i}
                        className={`${bgColor} rounded border border-gray-100 flex items-center justify-center relative transition-all hover:border-gray-300`}
                      >
                        {score === 20 && (
                          <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                        )}
                        {score === 12 && (
                          <div className="w-4 h-4 bg-yellow-600 rounded-full border-2 border-white shadow-lg"></div>
                        )}
                        {score === 4 && (
                          <div className="w-4 h-4 bg-green-600 rounded-full border-2 border-white shadow-lg"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-between mt-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  <span>Low Impact</span>
                  <span>High Impact</span>
                </div>
              </div>

              {/* Ethics Hotline Cases */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-extrabold text-gray-900 mb-6 uppercase tracking-tight">
                  Ethics Hotline Cases
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={ethicsData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {ethicsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #E5E7EB",
                          borderRadius: "8px",
                        }}
                        itemStyle={{ fontSize: "12px", fontWeight: 700 }}
                      />
                      <Legend
                        iconType="circle"
                        wrapperStyle={{
                          paddingTop: "20px",
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
              </div>
            )}

            {/* Records Register Sub-view */}
            {grcSubView === "records" && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                  <h3 className="text-lg font-extrabold text-gray-900 uppercase tracking-tight">
                    GRC RECORDS REGISTER
                  </h3>
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs font-extrabold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all uppercase tracking-tight">
                      <Filter size={16} /> FILTER
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs font-extrabold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all uppercase tracking-tight">
                      <Download size={16} /> EXPORT
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg text-xs font-black hover:bg-green-100 transition-all uppercase tracking-widest">
                      <FileText size={16} /> GENERATE GRC REPORT
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-green-600 text-white">
                        <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest">
                          RECORD ID
                        </th>
                        <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest">
                          TYPE
                        </th>
                        <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest">
                          CATEGORY
                        </th>
                        <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest">
                          BU
                        </th>
                        <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest">
                          SEVERITY
                        </th>
                        <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest">
                          STATUS
                        </th>
                        <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest">
                          DATE
                        </th>
                        <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest">
                          ACTIONS
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-[13px]">
                      {grcRecords.map((record, i) => (
                        <tr
                          key={record.id}
                          className={`hover:bg-green-50 transition-colors border-b border-gray-200 last:border-0 ${
                            i % 2 === 1 ? "bg-gray-50" : "bg-white"
                          }`}
                        >
                          <td className="px-6 py-4 font-mono text-[11px] text-gray-500 font-bold">
                            {record.id}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                              record.type === "COMPLIANCE"
                                ? "bg-blue-50 text-blue-700"
                                : "bg-amber-50 text-amber-700"
                            }`}>
                              {record.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-bold text-gray-900">
                            {record.category}
                          </td>
                          <td className="px-6 py-4 text-gray-600 font-semibold">
                            {record.bu}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded text-[10px] font-black uppercase tracking-wider ${
                              record.severity === "CRITICAL"
                                ? "bg-red-600 text-white"
                                : record.severity === "HIGH"
                                ? "bg-red-50 text-red-700"
                                : record.severity === "MEDIUM"
                                ? "bg-yellow-50 text-yellow-700"
                                : "bg-gray-100 text-gray-600"
                            }`}>
                              {record.severity}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5 font-black uppercase text-[11px] tracking-wider">
                              <div
                                className={`w-1.5 h-1.5 rounded-full ${
                                  record.status === "OPEN"
                                    ? "bg-blue-500"
                                    : record.status === "IN PROGRESS"
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                                }`}
                              ></div>
                              <span className="text-gray-900">
                                {record.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600 font-semibold tabular-nums">
                            {record.date}
                          </td>
                          <td className="px-6 py-4">
                            <button className="p-1.5 hover:bg-green-50 text-gray-400 hover:text-green-600 rounded-lg transition-all">
                              <Eye size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Stakeholder Reporting View */}
        {view === "stakeholder" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* Sub-tabs for Stakeholder Reporting */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={() => setStakeholderSubView("dashboard")}
                  className={`px-5 py-2.5 rounded-lg text-xs font-extrabold transition-all uppercase tracking-tight ${
                    stakeholderSubView === "dashboard"
                      ? "bg-green-600 text-white shadow-lg shadow-green-600/20"
                      : "bg-white text-gray-600 border border-gray-200 hover:text-gray-900"
                  }`}
                >
                  STAKEHOLDER DASHBOARD
                </button>
                <button
                  onClick={() => setStakeholderSubView("table")}
                  className={`px-5 py-2.5 rounded-lg text-xs font-extrabold transition-all uppercase tracking-tight ${
                    stakeholderSubView === "table"
                      ? "bg-green-600 text-white shadow-lg shadow-green-600/20"
                      : "bg-white text-gray-600 border border-gray-200 hover:text-gray-900"
                  }`}
                >
                  PARTNERSHIPS TABLE
                </button>
              </div>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg text-xs font-extrabold uppercase tracking-tight hover:bg-green-700 transition-all shadow-lg shadow-green-600/20">
                <Plus size={16} /> ADD PARTNERSHIP
              </button>
            </div>

            {/* Dashboard Sub-view */}
            {stakeholderSubView === "dashboard" && (
              <div className="space-y-6">
                {/* KPI Cards */}
                <div className="grid grid-cols-4 gap-4">
              <KPICard
                label="Active Partnerships"
                value="127"
                unit=""
                color={CHART_COLORS.primary}
                trend="+12"
              />
              <KPICard
                label="Communities Impacted"
                value="342"
                unit=""
                color={CHART_COLORS.blue}
                trend="+28"
              />
              <KPICard
                label="Total Investment"
                value="8.4"
                unit="B"
                color={CHART_COLORS.success}
                trend="+15%"
              />
              <KPICard
                label="Avg Impact Score"
                value="87"
                unit="%"
                color={CHART_COLORS.accent}
                trend="+3.2%"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-6">
              {/* Partnership Locations Map Placeholder */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-extrabold text-gray-900 mb-6 uppercase tracking-tight">
                  Partnership Locations
                </h3>
                <div className="h-[300px] bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center border border-gray-200">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-green-600 mx-auto mb-3" />
                    <p className="text-sm font-bold text-gray-600 uppercase tracking-wider">
                      Nigeria Map View
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      127 partnerships across 36 states
                    </p>
                  </div>
                </div>
              </div>

              {/* Partnerships by Category */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-extrabold text-gray-900 mb-6 uppercase tracking-tight">
                  Partnerships by Category
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={partnershipsByCategory}
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {partnershipsByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #E5E7EB",
                          borderRadius: "8px",
                        }}
                        itemStyle={{ fontSize: "12px", fontWeight: 700 }}
                      />
                      <Legend
                        iconType="circle"
                        wrapperStyle={{
                          paddingTop: "20px",
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
              </div>
            )}

            {/* Partnerships Table Sub-view */}
            {stakeholderSubView === "table" && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                  <h3 className="text-lg font-extrabold text-gray-900 uppercase tracking-tight">
                    STAKEHOLDER PARTNERSHIPS TABLE
                  </h3>
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs font-extrabold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all uppercase tracking-tight">
                      <Filter size={16} /> FILTER
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs font-extrabold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all uppercase tracking-tight">
                      <Download size={16} /> EXPORT
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg text-xs font-black hover:bg-green-100 transition-all uppercase tracking-widest">
                      <FileText size={16} /> GENERATE STAKEHOLDER REPORT
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-green-600 text-white">
                        <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest">
                          ID
                        </th>
                        <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest">
                          ORGANISATION
                        </th>
                        <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest">
                          TYPE
                        </th>
                        <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest">
                          CATEGORY
                        </th>
                        <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest">
                          PERIOD
                        </th>
                        <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest">
                          STATUS
                        </th>
                        <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest">
                          ACTIONS
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-[13px]">
                      {partnerships.map((partnership, i) => (
                        <tr
                          key={partnership.id}
                          className={`hover:bg-green-50 transition-colors border-b border-gray-200 last:border-0 ${
                            i % 2 === 1 ? "bg-gray-50" : "bg-white"
                          }`}
                        >
                          <td className="px-6 py-4 font-mono text-[11px] text-gray-500 font-bold">
                            {partnership.id}
                          </td>
                          <td className="px-6 py-4 font-bold text-gray-900">
                            {partnership.organisation}
                          </td>
                          <td className="px-6 py-4 text-gray-600 font-semibold">
                            {partnership.type}
                          </td>
                          <td className="px-6 py-4 text-gray-600 font-semibold">
                            {partnership.category}
                          </td>
                          <td className="px-6 py-4 text-gray-600 font-semibold">
                            {partnership.period}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                              partnership.status === "ACTIVE"
                                ? "bg-green-50 text-green-700"
                                : partnership.status === "EXPIRED"
                                ? "bg-gray-100 text-gray-600"
                                : "bg-yellow-50 text-yellow-700"
                            }`}>
                              {partnership.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button className="p-1.5 hover:bg-green-50 text-gray-400 hover:text-green-600 rounded-lg transition-all">
                              <Eye size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
