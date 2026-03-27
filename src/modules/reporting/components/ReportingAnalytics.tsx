"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import GlobalFilters from "@/components/shared/GlobalFilters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FileText,
  Download,
  Filter,
  Plus,
  X,
  Eye,
  BarChart3,
  PieChart,
  Calendar,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

type ViewType = "dashboard" | "reports" | "generate";

const CHART_COLORS = {
  primary: "#1B5E20",
  secondary: "#4CAF50",
  tertiary: "#81C784",
  accent: "#F5A623",
  blue: "#1565C0",
};

export default function ReportingAnalytics() {
  const [view, setView] = useState<ViewType>("dashboard");

  const reports = [
    {
      id: "RPT-001",
      name: "Q4 2024 ESG Performance Report",
      type: "Quarterly",
      framework: "GRI",
      status: "Published",
      date: "2024-12-31",
      size: "2.4 MB",
    },
    {
      id: "RPT-002",
      name: "Annual Sustainability Report 2024",
      type: "Annual",
      framework: "ISSB",
      status: "Draft",
      date: "2025-01-15",
      size: "5.8 MB",
    },
    {
      id: "RPT-003",
      name: "CDP Climate Change Response 2024",
      type: "CDP Submission",
      framework: "CDP",
      status: "Published",
      date: "2024-11-30",
      size: "1.9 MB",
    },
    {
      id: "RPT-004",
      name: "FMEnv Compliance Report Nov 2024",
      type: "Monthly",
      framework: "FMEnv",
      status: "Published",
      date: "2024-11-30",
      size: "890 KB",
    },
  ];

  const performanceData = [
    { month: "Jan", environmental: 85, social: 78, governance: 92 },
    { month: "Feb", environmental: 87, social: 80, governance: 90 },
    { month: "Mar", environmental: 82, social: 82, governance: 91 },
    { month: "Apr", environmental: 88, social: 84, governance: 93 },
    { month: "May", environmental: 90, social: 86, governance: 94 },
    { month: "Jun", environmental: 89, social: 88, governance: 92 },
  ];

  const reportsByFramework = [
    { name: "GRI", value: 12, color: CHART_COLORS.primary },
    { name: "ISSB", value: 8, color: CHART_COLORS.secondary },
    { name: "CDP", value: 6, color: CHART_COLORS.tertiary },
    { name: "FMEnv", value: 10, color: CHART_COLORS.accent },
  ];

  const reportsByCategory = [
    { name: "Environmental", value: 15 },
    { name: "Social", value: 12 },
    { name: "Governance", value: 9 },
  ];

  return (
    <div>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Reporting & Analytics" },
        ]}
      />

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Reporting & Analytics
            </h1>
            <p className="text-gray-600 mt-1">
              Generate ESG reports and analyze sustainability performance
            </p>
          </div>
        </div>

        {/* Filters */}
        <GlobalFilters />

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
            Analytics Dashboard
          </Button>
          <Button
            onClick={() => setView("reports")}
            variant={view === "reports" ? "default" : "outline"}
            className={
              view === "reports"
                ? "bg-green-600 hover:bg-green-700"
                : "hover:bg-gray-100"
            }
          >
            <FileText className="mr-2 h-4 w-4" />
            Reports Library
          </Button>
          <Button
            onClick={() => setView("generate")}
            variant={view === "generate" ? "default" : "outline"}
            className={
              view === "generate"
                ? "bg-green-600 hover:bg-green-700"
                : "hover:bg-gray-100"
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>

        {/* Dashboard View */}
        {view === "dashboard" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* KPIs */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Total Reports Generated
                </span>
                <div className="flex items-end gap-2 mt-2">
                  <span className="text-2xl font-black text-gray-900 tabular-nums">
                    36
                  </span>
                  <span className="text-xs text-green-600 font-bold mb-1 uppercase">
                    +8 YTD
                  </span>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Published Reports
                </span>
                <div className="flex items-end gap-2 mt-2">
                  <span className="text-2xl font-black text-gray-900 tabular-nums">
                    24
                  </span>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Draft Reports
                </span>
                <div className="flex items-end gap-2 mt-2">
                  <span className="text-2xl font-black text-gray-900 tabular-nums">
                    12
                  </span>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Avg. Compliance Score
                </span>
                <div className="flex items-end gap-2 mt-2">
                  <span className="text-2xl font-black text-gray-900 tabular-nums">
                    89%
                  </span>
                  <span className="text-xs text-green-600 font-bold mb-1 uppercase">
                    +3%
                  </span>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-6">
              {/* ESG Performance Trends */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-tight">
                  ESG Performance Trends
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#E5E7EB"
                        opacity={0.5}
                        vertical={false}
                      />
                      <XAxis
                        dataKey="month"
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
                      <Legend
                        wrapperStyle={{ fontSize: "12px", fontWeight: 600 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="environmental"
                        stroke={CHART_COLORS.primary}
                        strokeWidth={2}
                        dot={{ fill: CHART_COLORS.primary, r: 4 }}
                        name="Environmental"
                      />
                      <Line
                        type="monotone"
                        dataKey="social"
                        stroke={CHART_COLORS.blue}
                        strokeWidth={2}
                        dot={{ fill: CHART_COLORS.blue, r: 4 }}
                        name="Social"
                      />
                      <Line
                        type="monotone"
                        dataKey="governance"
                        stroke={CHART_COLORS.accent}
                        strokeWidth={2}
                        dot={{ fill: CHART_COLORS.accent, r: 4 }}
                        name="Governance"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Reports by Framework */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-tight">
                  Reports by Framework
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={reportsByFramework}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {reportsByFramework.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Reports by Category */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm col-span-2">
                <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-tight">
                  Reports by Category
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={reportsByCategory}>
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
                      <Bar
                        dataKey="value"
                        fill={CHART_COLORS.primary}
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reports Library View */}
        {view === "reports" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900 uppercase tracking-tight">
                Reports Library
              </h3>
              <div className="flex gap-3">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export All
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-green-600 text-white">
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">
                      Report ID
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">
                      Report Name
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">
                      Framework
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">
                      Size
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
                  {reports.map((report, i) => (
                    <tr
                      key={report.id}
                      className={`hover:bg-green-50 transition-colors border-b border-gray-200 last:border-0 ${
                        i % 2 === 1 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="px-6 py-4 font-mono text-xs text-gray-500 font-bold">
                        {report.id}
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-900 uppercase tracking-tight">
                        {report.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-semibold">
                        {report.type}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-bold uppercase">
                          {report.framework}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-semibold tabular-nums">
                        {report.date}
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-semibold tabular-nums">
                        {report.size}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-black uppercase ${
                            report.status === "Published"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="p-1.5 hover:bg-green-100 text-gray-500 hover:text-green-600 rounded-lg transition-all">
                            <Eye size={16} />
                          </button>
                          <button className="p-1.5 hover:bg-green-100 text-gray-500 hover:text-green-600 rounded-lg transition-all">
                            <Download size={16} />
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

        {/* Generate Report View */}
        {view === "generate" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-8 max-w-3xl animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-gray-900 uppercase tracking-tight">
                Generate New Report
              </h3>
              <button
                onClick={() => setView("dashboard")}
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    Report Name <span className="text-red-500">*</span>
                  </label>
                  <Input placeholder="e.g. Q1 2025 ESG Performance Report" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    Report Type <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-900 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all">
                    <option>Quarterly</option>
                    <option>Annual</option>
                    <option>Monthly</option>
                    <option>CDP Submission</option>
                    <option>Custom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    Reporting Framework <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-900 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all">
                    <option>GRI (Global Reporting Initiative)</option>
                    <option>ISSB (IFRS S1/S2)</option>
                    <option>CDP (Carbon Disclosure Project)</option>
                    <option>FMEnv Nigeria</option>
                    <option>NUPRC</option>
                    <option>GHG Protocol</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    ESG Category <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-900 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all">
                    <option>All Categories</option>
                    <option>Environmental</option>
                    <option>Social</option>
                    <option>Governance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    Reporting Period Start{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    Reporting Period End <span className="text-red-500">*</span>
                  </label>
                  <Input type="date" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Business Units (Select multiple)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["All BUs", "NNPC E&P", "NPDC", "NNPC Retail", "NLNG"].map(
                    (bu) => (
                      <label
                        key={bu}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <span className="text-sm font-semibold text-gray-700">
                          {bu}
                        </span>
                      </label>
                    ),
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Report Format <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      value="pdf"
                      defaultChecked
                      className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                    />
                    <span className="text-sm font-semibold text-gray-700">
                      PDF
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      value="excel"
                      className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                    />
                    <span className="text-sm font-semibold text-gray-700">
                      Excel
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="format"
                      value="both"
                      className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                    />
                    <span className="text-sm font-semibold text-gray-700">
                      Both
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6">
                <Button
                  variant="outline"
                  onClick={() => setView("dashboard")}
                >
                  Cancel
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
