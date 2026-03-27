"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import GlobalFilters from "@/components/shared/GlobalFilters";
import KPICard from "@/components/shared/KPICard";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Download, FileText, Eye, X, Upload } from "lucide-react";
import { CHART_COLORS } from "@/data/dashboard-mock";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

type ViewType = "dashboard" | "records" | "log";

interface GRCRecord {
  id: string;
  type: string;
  category: string;
  bu: string;
  severity: string;
  status: string;
  date: string;
}

export default function GovernanceCompliance() {
  const [view, setView] = useState<ViewType>("dashboard");

  const grcRecords: GRCRecord[] = [
    {
      id: "GRC-101",
      type: "Compliance",
      category: "Regulatory Breach",
      bu: "NNPC E&P",
      severity: "High",
      status: "Open",
      date: "2026-02-15",
    },
    {
      id: "GRC-102",
      type: "Risk",
      category: "Physical Risk - Acute",
      bu: "NPDC",
      severity: "Critical",
      status: "In Progress",
      date: "2026-03-01",
    },
    {
      id: "GRC-103",
      type: "Compliance",
      category: "Audit Finding",
      bu: "NNPC HQ",
      severity: "Medium",
      status: "Closed",
      date: "2026-01-20",
    },
    {
      id: "GRC-104",
      type: "Risk",
      category: "Transition Risk - Policy",
      bu: "NGC",
      severity: "Low",
      status: "Open",
      date: "2026-03-10",
    },
  ];

  const ethicsData = [
    { name: "Fraud", value: 40, color: CHART_COLORS.primary },
    { name: "Harassment", value: 25, color: CHART_COLORS.accent },
    { name: "Conflict of Interest", value: 20, color: CHART_COLORS.blue },
    { name: "Other", value: 15, color: CHART_COLORS.secondary },
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
              Track compliance, manage risks, and monitor governance across the organization
            </p>
          </div>
        </div>

        {/* Global Filters */}
        <GlobalFilters />

        {/* View Tabs */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={() => setView("dashboard")}
              className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all uppercase tracking-tight ${
                view === "dashboard"
                  ? "bg-green-600 text-white shadow-lg shadow-green-600/20"
                  : "bg-white text-gray-600 border border-gray-200 hover:text-gray-900"
              }`}
            >
              GRC Dashboard
            </button>
            <button
              onClick={() => setView("records")}
              className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all uppercase tracking-tight ${
                view === "records"
                  ? "bg-green-600 text-white shadow-lg shadow-green-600/20"
                  : "bg-white text-gray-600 border border-gray-200 hover:text-gray-900"
              }`}
            >
              Records Register
            </button>
          </div>
          <button
            onClick={() => setView("log")}
            className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg text-xs font-extrabold uppercase tracking-tight hover:bg-green-700 transition-all shadow-lg shadow-green-600/20"
          >
            <Plus size={16} /> Log Incident / Risk
          </button>
        </div>

        {/* Dashboard View */}
        {view === "dashboard" && (
          <div className="space-y-6 animate-in fade-in duration-500">
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

        {/* Records View */}
        {view === "records" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-extrabold text-gray-900 uppercase tracking-tight">
                GRC Records Register
              </h3>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs font-extrabold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all uppercase tracking-tight">
                  <Filter size={16} /> Filter
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-xs font-extrabold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all uppercase tracking-tight">
                  <Download size={16} /> Export
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg text-xs font-black hover:bg-green-100 transition-all uppercase tracking-widest">
                  <FileText size={16} /> Generate GRC Report
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-green-600 text-white">
                    <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest">
                      Record ID
                    </th>
                    <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest">
                      Type
                    </th>
                    <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest">
                      Category
                    </th>
                    <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest">
                      BU
                    </th>
                    <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest">
                      Severity
                    </th>
                    <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest">
                      Status
                    </th>
                    <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest">
                      Date
                    </th>
                    <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest">
                      Actions
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
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                            record.type === "Compliance"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {record.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-extrabold text-gray-900 uppercase tracking-tight">
                        {record.category}
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-bold">
                        {record.bu}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                            record.severity === "Critical"
                              ? "bg-red-600 text-white"
                              : record.severity === "High"
                              ? "bg-red-50 text-red-700"
                              : record.severity === "Medium"
                              ? "bg-yellow-50 text-yellow-700"
                              : "bg-gray-100 text-gray-600 border border-gray-200"
                          }`}
                        >
                          {record.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 font-black uppercase text-[11px] tracking-wider text-gray-900">
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${
                              record.status === "Open"
                                ? "bg-blue-500"
                                : record.status === "In Progress"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                          ></div>
                          {record.status}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-bold tabular-nums">
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

        {/* Log Form View */}
        {view === "log" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-8 max-w-3xl animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-extrabold text-gray-900 uppercase tracking-tight">
                Log Compliance Incident / Risk
              </h3>
              <button
                onClick={() => setView("dashboard")}
                className="text-gray-400 hover:text-gray-900 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                  Record Type <span className="text-red-600">*</span>
                </label>
                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm font-bold text-gray-900 focus:outline-none focus:border-green-600 focus:ring-4 focus:ring-green-100 transition-all">
                  <option>Compliance Incident</option>
                  <option>Enterprise Risk</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                  Date of Incident / Review <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm font-bold text-gray-900 focus:outline-none focus:border-green-600 focus:ring-4 focus:ring-green-100 transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                  Category <span className="text-red-600">*</span>
                </label>
                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm font-bold text-gray-900 focus:outline-none focus:border-green-600 focus:ring-4 focus:ring-green-100 transition-all">
                  <option>Regulatory Breach</option>
                  <option>Audit Finding</option>
                  <option>Physical Risk - Acute</option>
                  <option>Transition Risk - Policy</option>
                  <option>Operational Risk</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                  Severity / Likelihood <span className="text-red-600">*</span>
                </label>
                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm font-bold text-gray-900 focus:outline-none focus:border-green-600 focus:ring-4 focus:ring-green-100 transition-all">
                  <option>Critical / Almost Certain</option>
                  <option>High / Likely</option>
                  <option>Medium / Possible</option>
                  <option>Low / Unlikely</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                  Description <span className="text-red-600">*</span>
                </label>
                <textarea
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm font-bold text-gray-900 focus:outline-none focus:border-green-600 focus:ring-4 focus:ring-green-100 transition-all min-h-[100px]"
                  placeholder="Provide detailed description..."
                ></textarea>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                  Responsible BU <span className="text-red-600">*</span>
                </label>
                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm font-bold text-gray-900 focus:outline-none focus:border-green-600 focus:ring-4 focus:ring-green-100 transition-all">
                  <option>NNPC E&P</option>
                  <option>NPDC</option>
                  <option>NGC</option>
                  <option>PPMC</option>
                  <option>NLNG</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                  Supporting Document
                </label>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-300 border-dashed rounded-lg text-xs font-bold text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-gray-900 transition-all">
                  <Upload size={14} /> Upload File
                </div>
              </div>
            </div>
            <div className="mt-8 flex gap-4 pt-6 border-t border-gray-200">
              <button className="px-8 py-3 bg-green-600 text-white rounded-lg text-sm font-black uppercase tracking-widest hover:bg-green-700 transition-all shadow-lg shadow-green-600/20">
                Submit Record
              </button>
              <button
                onClick={() => setView("dashboard")}
                className="px-8 py-3 bg-white border border-gray-300 text-gray-600 rounded-lg text-sm font-black uppercase tracking-widest hover:bg-gray-50 hover:text-gray-900 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
