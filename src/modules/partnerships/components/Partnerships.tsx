"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Handshake,
  Plus,
  Filter,
  Download,
  Eye,
  FileText,
  X,
  Globe,
  BarChart3,
} from "lucide-react";
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
} from "recharts";

type ViewType = "dashboard" | "partnerships" | "add";

const CHART_COLORS = {
  primary: "#1B5E20",
  secondary: "#4CAF50",
  tertiary: "#81C784",
  accent: "#F5A623",
  blue: "#1565C0",
};

export default function Partnerships() {
  const [view, setView] = useState<ViewType>("dashboard");

  const partnerships = [
    {
      id: "PRT-001",
      org: "United Nations (UN)",
      type: "Strategic",
      category: "Multilateral Organisation",
      status: "Active",
      date: "2024 - 2028",
    },
    {
      id: "PRT-002",
      org: "Lagos State Government",
      type: "Technical",
      category: "Government Body",
      status: "Active",
      date: "2025 - 2027",
    },
    {
      id: "PRT-003",
      org: "Shell Foundation",
      type: "Financial",
      category: "International NGO",
      status: "Expired",
      date: "2022 - 2025",
    },
    {
      id: "PRT-004",
      org: "University of Ibadan",
      type: "Research",
      category: "Academic Institution",
      status: "Active",
      date: "2025 - 2030",
    },
    {
      id: "PRT-005",
      org: "Nigerian Conservation Foundation",
      type: "Technical",
      category: "Local NGO",
      status: "Active",
      date: "2024 - 2026",
    },
  ];

  const partnershipsByCategory = [
    { name: "Govt", value: 15, color: CHART_COLORS.primary },
    { name: "NGO", value: 18, color: CHART_COLORS.secondary },
    { name: "Academic", value: 6, color: CHART_COLORS.tertiary },
    { name: "Industry", value: 3, color: CHART_COLORS.accent },
  ];

  const partnershipsByType = [
    { type: "Strategic", count: 12 },
    { type: "Technical", count: 15 },
    { type: "Financial", count: 8 },
    { type: "Research", count: 7 },
  ];

  return (
    <div>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Stakeholder Partnerships" },
        ]}
      />

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Stakeholder Partnerships
            </h1>
            <p className="text-gray-600 mt-1">
              Manage strategic partnerships and stakeholder relationships
            </p>
          </div>
          <Button
            onClick={() => setView("add")}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Partnership
          </Button>
        </div>

        {/* View Tabs */}
        <div className="flex gap-2">
          <Button
            onClick={() => setView("dashboard")}
            variant={view === "dashboard" ? "default" : "outline"}
            className={
              view === "dashboard"
                ? "bg-green-600 hover:bg-green-700"
                : "hover:bg-gray-100"
            }
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Stakeholder Dashboard
          </Button>
          <Button
            onClick={() => setView("partnerships")}
            variant={view === "partnerships" ? "default" : "outline"}
            className={
              view === "partnerships"
                ? "bg-green-600 hover:bg-green-700"
                : "hover:bg-gray-100"
            }
          >
            <FileText className="mr-2 h-4 w-4" />
            Partnerships Table
          </Button>
        </div>

        {/* Dashboard View */}
        {view === "dashboard" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* KPIs */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Total Active Partnerships
                </span>
                <div className="flex items-end gap-2 mt-2">
                  <span className="text-2xl font-black text-gray-900 tabular-nums">
                    42
                  </span>
                  <span className="text-xs text-green-600 font-bold mb-1 uppercase">
                    +5 YTD
                  </span>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Government Partners
                </span>
                <div className="flex items-end gap-2 mt-2">
                  <span className="text-2xl font-black text-gray-900 tabular-nums">
                    15
                  </span>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  NGO Partners
                </span>
                <div className="flex items-end gap-2 mt-2">
                  <span className="text-2xl font-black text-gray-900 tabular-nums">
                    18
                  </span>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Reports Generated (YTD)
                </span>
                <div className="flex items-end gap-2 mt-2">
                  <span className="text-2xl font-black text-gray-900 tabular-nums">
                    24
                  </span>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-6">
              {/* Partnership Locations Map Placeholder */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-tight">
                  Partnership Locations
                </h3>
                <div className="h-[300px] bg-gray-50 rounded-lg flex items-center justify-center relative overflow-hidden border border-gray-200">
                  <Globe size={120} className="text-green-600/10" />
                  <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-green-600 rounded-full border-2 border-white shadow-lg"></div>
                  <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-green-600 rounded-full border-2 border-white shadow-lg"></div>
                  <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-green-600 rounded-full border-2 border-white shadow-lg"></div>
                  <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-green-600 rounded-full border-2 border-white shadow-lg"></div>
                  <span className="absolute bottom-4 right-4 text-xs font-black text-gray-500 uppercase tracking-wider">
                    Interactive Map View
                  </span>
                </div>
              </div>

              {/* Partnerships by Category */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-tight">
                  Partnerships by Category
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={partnershipsByCategory}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#E5E7EB"
                        opacity={0.5}
                        vertical={false}
                      />
                      <XAxis
                        dataKey="name"
                        stroke="#9CA3AF"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#9CA3AF"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #E5E7EB",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                        {partnershipsByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Partnerships by Type */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm col-span-2">
                <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-tight">
                  Partnerships by Type
                </h3>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={partnershipsByType} layout="horizontal">
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#E5E7EB"
                        opacity={0.5}
                        vertical={false}
                      />
                      <XAxis
                        type="number"
                        stroke="#9CA3AF"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        dataKey="type"
                        type="category"
                        stroke="#9CA3AF"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #E5E7EB",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar
                        dataKey="count"
                        fill={CHART_COLORS.primary}
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Partnerships Table View */}
        {view === "partnerships" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900 uppercase tracking-tight">
                Stakeholder Partnerships Table
              </h3>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Stakeholder Report
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-green-600 text-white">
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">
                      Organisation
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">
                      Period
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {partnerships.map((p, i) => (
                    <tr
                      key={p.id}
                      className={`hover:bg-green-50 transition-colors border-b border-gray-200 last:border-0 ${
                        i % 2 === 1 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="px-6 py-4 font-mono text-xs text-gray-500 font-bold">
                        {p.id}
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-900 uppercase tracking-tight">
                        {p.org}
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-semibold">
                        {p.type}
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-semibold">
                        {p.category}
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-semibold tabular-nums">
                        {p.date}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-black uppercase ${
                            p.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600 border border-gray-300"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-1.5 hover:bg-green-100 text-gray-500 hover:text-green-600 rounded-lg transition-all">
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

        {/* Add Partnership View */}
        {view === "add" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-8 max-w-3xl animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-gray-900 uppercase tracking-tight">
                Add Partnership Record
              </h3>
              <button
                onClick={() => setView("dashboard")}
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Organisation Name <span className="text-red-500">*</span>
                </label>
                <Input placeholder="e.g. United Nations" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Partnership Type <span className="text-red-500">*</span>
                </label>
                <select className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-900 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all">
                  <option>Strategic</option>
                  <option>Technical</option>
                  <option>Advisory</option>
                  <option>Financial</option>
                  <option>Research</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Partnership Category <span className="text-red-500">*</span>
                </label>
                <select className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-900 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all">
                  <option>Government Body</option>
                  <option>International NGO</option>
                  <option>Local NGO</option>
                  <option>Academic Institution</option>
                  <option>Multilateral Organisation</option>
                  <option>Industry Partner</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Active Status <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3 mt-2">
                  <div className="relative inline-block w-10 h-5 bg-green-600 rounded-full cursor-pointer">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                  </div>
                  <span className="text-sm text-gray-900 font-black uppercase tracking-wider">
                    Active
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <Input type="date" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  End Date
                </label>
                <Input type="date" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe the partnership objectives, deliverables, and expected outcomes..."
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-200">
              <Button variant="outline" onClick={() => setView("dashboard")}>
                Cancel
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Handshake className="mr-2 h-4 w-4" />
                Save Partnership
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
