"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Lightbulb,
  Plus,
  Filter,
  Download,
  Eye,
  FileText,
  X,
  BarChart3,
  Award,
  TrendingUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type ViewType = "dashboard" | "projects" | "add";

const CHART_COLORS = {
  primary: "#1B5E20",
  secondary: "#4CAF50",
  tertiary: "#81C784",
  accent: "#F5A623",
  blue: "#1565C0",
  purple: "#7B1FA2",
};

export default function ResearchInnovation() {
  const [view, setView] = useState<ViewType>("dashboard");

  const projects = [
    {
      id: "RES-001",
      name: "Carbon Capture and Storage (CCS) Pilot",
      category: "Climate Technology",
      status: "Active",
      startDate: "2024-01-15",
      investment: "₦450M",
      team: "12 researchers",
      progress: 65,
    },
    {
      id: "RES-002",
      name: "Renewable Energy Integration Study",
      category: "Energy Transition",
      status: "Active",
      startDate: "2024-03-01",
      investment: "₦280M",
      team: "8 researchers",
      progress: 45,
    },
    {
      id: "RES-003",
      name: "Biodiversity Monitoring AI System",
      category: "Environmental Tech",
      status: "Active",
      startDate: "2024-06-10",
      investment: "₦125M",
      team: "6 researchers",
      progress: 30,
    },
    {
      id: "RES-004",
      name: "Methane Leak Detection Sensors",
      category: "Climate Technology",
      status: "Completed",
      startDate: "2023-08-20",
      investment: "₦320M",
      team: "10 researchers",
      progress: 100,
    },
  ];

  const investmentTrend = [
    { year: "2020", investment: 450 },
    { year: "2021", investment: 620 },
    { year: "2022", investment: 780 },
    { year: "2023", investment: 950 },
    { year: "2024", investment: 1175 },
  ];

  const projectsByCategory = [
    { name: "Climate Tech", value: 8, color: CHART_COLORS.primary },
    { name: "Energy Transition", value: 6, color: CHART_COLORS.secondary },
    { name: "Environmental Tech", value: 5, color: CHART_COLORS.tertiary },
    { name: "Social Innovation", value: 3, color: CHART_COLORS.accent },
  ];

  const innovationMetrics = [
    { metric: "Patents Filed", value: 12 },
    { metric: "Publications", value: 18 },
    { metric: "Pilot Projects", value: 7 },
    { metric: "Tech Partnerships", value: 15 },
  ];

  return (
    <div>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Research & Innovation" },
        ]}
      />

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Research & Innovation
            </h1>
            <p className="text-gray-600 mt-1">
              Track R&D projects and sustainability innovation initiatives
            </p>
          </div>
          <Button
            onClick={() => setView("add")}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Project
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
            Innovation Dashboard
          </Button>
          <Button
            onClick={() => setView("projects")}
            variant={view === "projects" ? "default" : "outline"}
            className={
              view === "projects"
                ? "bg-green-600 hover:bg-green-700"
                : "hover:bg-gray-100"
            }
          >
            <FileText className="mr-2 h-4 w-4" />
            Research Projects
          </Button>
        </div>

        {/* Dashboard View */}
        {view === "dashboard" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* KPIs */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="text-yellow-500" size={18} />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Active Projects
                  </span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-black text-gray-900 tabular-nums">
                    22
                  </span>
                  <span className="text-xs text-green-600 font-bold mb-1 uppercase">
                    +4 YTD
                  </span>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="text-green-600" size={18} />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Total R&D Investment
                  </span>
                </div>
                <span className="text-2xl font-black text-gray-900 tabular-nums">
                  ₦1.2B
                </span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="text-blue-600" size={18} />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Patents Filed (YTD)
                  </span>
                </div>
                <span className="text-2xl font-black text-gray-900 tabular-nums">
                  12
                </span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="text-purple-600" size={18} />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Publications (YTD)
                  </span>
                </div>
                <span className="text-2xl font-black text-gray-900 tabular-nums">
                  18
                </span>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-6">
              {/* R&D Investment Trend */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-tight">
                  R&D Investment Trend (₦M)
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={investmentTrend}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#E5E7EB"
                        opacity={0.5}
                        vertical={false}
                      />
                      <XAxis
                        dataKey="year"
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
                      <Line
                        type="monotone"
                        dataKey="investment"
                        stroke={CHART_COLORS.primary}
                        strokeWidth={3}
                        dot={{ fill: CHART_COLORS.primary, r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Projects by Category */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-tight">
                  Projects by Category
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={projectsByCategory}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {projectsByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Innovation Metrics */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm col-span-2">
                <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-tight">
                  Innovation Output Metrics
                </h3>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={innovationMetrics}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#E5E7EB"
                        opacity={0.5}
                        vertical={false}
                      />
                      <XAxis
                        dataKey="metric"
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
                        fill={CHART_COLORS.secondary}
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Research Projects View */}
        {view === "projects" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900 uppercase tracking-tight">
                Research & Innovation Projects
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
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-green-600 text-white">
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">
                      Project ID
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">
                      Project Name
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">
                      Investment
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">
                      Team Size
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">
                      Progress
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
                  {projects.map((project, i) => (
                    <tr
                      key={project.id}
                      className={`hover:bg-green-50 transition-colors border-b border-gray-200 last:border-0 ${
                        i % 2 === 1 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="px-6 py-4 font-mono text-xs text-gray-500 font-bold">
                        {project.id}
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-900 uppercase tracking-tight">
                        {project.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-semibold">
                        {project.category}
                      </td>
                      <td className="px-6 py-4 text-gray-900 font-bold tabular-nums">
                        {project.investment}
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-semibold">
                        {project.team}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-gray-600 tabular-nums">
                            {project.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-black uppercase ${
                            project.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : project.status === "Completed"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {project.status}
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

        {/* Add Project View */}
        {view === "add" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-8 max-w-3xl animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-gray-900 uppercase tracking-tight">
                Add Research Project
              </h3>
              <button
                onClick={() => setView("dashboard")}
                className="text-gray-500 hover:text-gray-900 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Project Name <span className="text-red-500">*</span>
                </label>
                <Input placeholder="e.g. Carbon Capture and Storage Pilot" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Category <span className="text-red-500">*</span>
                </label>
                <select className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-900 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all">
                  <option>Climate Technology</option>
                  <option>Energy Transition</option>
                  <option>Environmental Technology</option>
                  <option>Social Innovation</option>
                  <option>Governance Technology</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Status <span className="text-red-500">*</span>
                </label>
                <select className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-900 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all">
                  <option>Planning</option>
                  <option>Active</option>
                  <option>On Hold</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <Input type="date" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Expected End Date
                </label>
                <Input type="date" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Investment (₦) <span className="text-red-500">*</span>
                </label>
                <Input type="number" placeholder="0" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Team Size
                </label>
                <Input type="number" placeholder="Number of researchers" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Project Objectives
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe the research objectives, expected outcomes, and sustainability impact..."
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all resize-none"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                  Key Milestones
                </label>
                <textarea
                  rows={3}
                  placeholder="List key project milestones and deliverables..."
                  className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-200">
              <Button variant="outline" onClick={() => setView("dashboard")}>
                Cancel
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <Lightbulb className="mr-2 h-4 w-4" />
                Save Project
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
