"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Target,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Plus,
  Eye,
  Download,
  BarChart3,
  FileText,
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

type ViewType = "dashboard" | "assessments" | "conduct";

const CHART_COLORS = {
  primary: "#1B5E20",
  secondary: "#4CAF50",
  tertiary: "#81C784",
  accent: "#F5A623",
  danger: "#C62828",
};

export default function RapidAssessment() {
  const [view, setView] = useState<ViewType>("dashboard");

  const radarData = [
    { category: "Environmental", score: 85, fullMark: 100 },
    { category: "Social", score: 78, fullMark: 100 },
    { category: "Governance", score: 92, fullMark: 100 },
    { category: "Economic", score: 80, fullMark: 100 },
    { category: "Stakeholder", score: 88, fullMark: 100 },
  ];

  const gapAnalysisData = [
    { framework: "GRI", current: 75, target: 95, gap: 20 },
    { framework: "ISSB", current: 68, target: 90, gap: 22 },
    { framework: "CDP", current: 82, target: 95, gap: 13 },
    { framework: "FMEnv", current: 90, target: 98, gap: 8 },
  ];

  const assessments = [
    {
      id: "ASM-001",
      name: "Q4 2024 ESG Compliance Assessment",
      date: "2024-12-15",
      score: 85,
      status: "Completed",
      findings: 12,
    },
    {
      id: "ASM-002",
      name: "GRI Standards Gap Analysis",
      date: "2024-11-30",
      score: 78,
      status: "Completed",
      findings: 18,
    },
    {
      id: "ASM-003",
      name: "ISSB S1/S2 Readiness Assessment",
      date: "2025-01-10",
      score: 92,
      status: "In Progress",
      findings: 8,
    },
    {
      id: "ASM-004",
      name: "FMEnv Nigeria Compliance Check",
      date: "2024-12-20",
      score: 88,
      status: "Completed",
      findings: 5,
    },
  ];

  const assessmentQuestions = [
    {
      category: "Environmental",
      questions: [
        "Are GHG emissions tracked and reported according to GHG Protocol?",
        "Is there a documented energy efficiency improvement plan?",
        "Are water consumption metrics monitored across all facilities?",
        "Is waste segregation and disposal compliant with FMEnv regulations?",
      ],
    },
    {
      category: "Social",
      questions: [
        "Is workforce diversity data collected and analyzed regularly?",
        "Are HSE incident rates below industry benchmarks?",
        "Is there a community investment strategy in place?",
        "Are employee training hours tracked and reported?",
      ],
    },
    {
      category: "Governance",
      questions: [
        "Is there an anti-corruption policy and training program?",
        "Are ethics violations tracked and investigated?",
        "Is there a compliance monitoring framework?",
        "Are audit findings addressed within defined timelines?",
      ],
    },
  ];

  return (
    <div>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Rapid Assessment" },
        ]}
      />

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              ESG Rapid Assessment
            </h1>
            <p className="text-gray-600 mt-1">
              Quickly assess ESG performance and identify improvement areas
            </p>
          </div>
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
            Assessment Dashboard
          </Button>
          <Button
            onClick={() => setView("assessments")}
            variant={view === "assessments" ? "default" : "outline"}
            className={
              view === "assessments"
                ? "bg-green-600 hover:bg-green-700"
                : "hover:bg-gray-100"
            }
          >
            <FileText className="mr-2 h-4 w-4" />
            Assessment History
          </Button>
          <Button
            onClick={() => setView("conduct")}
            variant={view === "conduct" ? "default" : "outline"}
            className={
              view === "conduct"
                ? "bg-green-600 hover:bg-green-700"
                : "hover:bg-gray-100"
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            Conduct Assessment
          </Button>
        </div>

        {/* Dashboard View */}
        {view === "dashboard" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* KPIs */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Overall ESG Score
                </span>
                <div className="flex items-end gap-2 mt-2">
                  <span className="text-2xl font-black text-gray-900 tabular-nums">
                    85%
                  </span>
                  <span className="text-xs text-green-600 font-bold mb-1 uppercase">
                    +7% YTD
                  </span>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Completed Assessments
                </span>
                <div className="flex items-end gap-2 mt-2">
                  <span className="text-2xl font-black text-gray-900 tabular-nums">
                    24
                  </span>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Critical Gaps Identified
                </span>
                <div className="flex items-end gap-2 mt-2">
                  <span className="text-2xl font-black text-gray-900 tabular-nums">
                    8
                  </span>
                  <span className="text-xs text-red-600 font-bold mb-1 uppercase">
                    High Priority
                  </span>
                </div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Recommendations
                </span>
                <div className="flex items-end gap-2 mt-2">
                  <span className="text-2xl font-black text-gray-900 tabular-nums">
                    32
                  </span>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-6">
              {/* ESG Performance Radar */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-tight">
                  ESG Performance Profile
                </h3>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#E5E7EB" />
                      <PolarAngleAxis
                        dataKey="category"
                        tick={{ fill: "#6B7280", fontSize: 12, fontWeight: 600 }}
                      />
                      <PolarRadiusAxis
                        angle={90}
                        domain={[0, 100]}
                        tick={{ fill: "#9CA3AF", fontSize: 11 }}
                      />
                      <Radar
                        name="Score"
                        dataKey="score"
                        stroke={CHART_COLORS.primary}
                        fill={CHART_COLORS.secondary}
                        fillOpacity={0.6}
                        strokeWidth={2}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Gap Analysis */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-tight">
                  Framework Gap Analysis
                </h3>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={gapAnalysisData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#E5E7EB"
                        opacity={0.5}
                        vertical={false}
                      />
                      <XAxis
                        dataKey="framework"
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
                        domain={[0, 100]}
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
                      <Bar
                        dataKey="current"
                        fill={CHART_COLORS.primary}
                        radius={[4, 4, 0, 0]}
                        name="Current Score"
                      />
                      <Bar
                        dataKey="target"
                        fill={CHART_COLORS.accent}
                        radius={[4, 4, 0, 0]}
                        name="Target Score"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Key Findings & Recommendations */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-tight">
                  Critical Gaps
                </h3>
                <div className="space-y-3">
                  {[
                    "GHG Scope 3 emissions tracking incomplete",
                    "Water recycling targets not defined",
                    "Biodiversity impact assessment pending",
                    "Community feedback mechanism needs improvement",
                  ].map((gap, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <AlertCircle
                        size={18}
                        className="text-red-600 flex-shrink-0 mt-0.5"
                      />
                      <span className="text-sm font-semibold text-gray-900">
                        {gap}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-tight">
                  Top Recommendations
                </h3>
                <div className="space-y-3">
                  {[
                    "Implement Scope 3 data collection framework",
                    "Set water recycling targets aligned with industry best practices",
                    "Conduct biodiversity baseline study",
                    "Establish community grievance mechanism",
                  ].map((rec, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-green-600 flex-shrink-0 mt-0.5"
                      />
                      <span className="text-sm font-semibold text-gray-900">
                        {rec}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assessment History View */}
        {view === "assessments" && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900 uppercase tracking-tight">
                Assessment History
              </h3>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-green-600 text-white">
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">
                      Assessment Name
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">
                      Findings
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
                  {assessments.map((assessment, i) => (
                    <tr
                      key={assessment.id}
                      className={`hover:bg-green-50 transition-colors border-b border-gray-200 last:border-0 ${
                        i % 2 === 1 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="px-6 py-4 font-mono text-xs text-gray-500 font-bold">
                        {assessment.id}
                      </td>
                      <td className="px-6 py-4 font-bold text-gray-900 uppercase tracking-tight">
                        {assessment.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-semibold tabular-nums">
                        {assessment.date}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                assessment.score >= 80
                                  ? "bg-green-600"
                                  : assessment.score >= 60
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              }`}
                              style={{ width: `${assessment.score}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-gray-900 tabular-nums">
                            {assessment.score}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-bold tabular-nums">
                        {assessment.findings}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-black uppercase ${
                            assessment.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {assessment.status}
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

        {/* Conduct Assessment View */}
        {view === "conduct" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-tight">
                New ESG Assessment
              </h3>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    Assessment Name <span className="text-red-500">*</span>
                  </label>
                  <Input placeholder="e.g. Q1 2025 ESG Compliance Check" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    Framework <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-900 focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all">
                    <option>GRI Standards</option>
                    <option>ISSB (IFRS S1/S2)</option>
                    <option>CDP</option>
                    <option>FMEnv Nigeria</option>
                    <option>Custom Assessment</option>
                  </select>
                </div>
              </div>

              {/* Assessment Checklist */}
              {assessmentQuestions.map((section) => (
                <div key={section.category} className="mb-8">
                  <div className="flex items-center gap-3 mb-4 pb-2 border-b border-gray-200">
                    <Target className="text-green-600" size={20} />
                    <h4 className="text-md font-bold text-gray-900 uppercase tracking-tight">
                      {section.category}
                    </h4>
                  </div>
                  <div className="space-y-3 ml-8">
                    {section.questions.map((question, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <span className="text-sm font-semibold text-gray-900">
                            {question}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 rounded-lg bg-green-100 hover:bg-green-200 transition-colors">
                            <CheckCircle2
                              size={18}
                              className="text-green-600"
                            />
                          </button>
                          <button className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition-colors">
                            <XCircle size={18} className="text-red-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <Button variant="outline" onClick={() => setView("dashboard")}>
                  Cancel
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  <FileText className="mr-2 h-4 w-4" />
                  Complete Assessment
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
