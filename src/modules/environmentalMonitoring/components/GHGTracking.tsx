"use client";
import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Search, Filter, Download, Upload, Plus, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  co2Emissions,
  fuelConsumptionData,
  monthlyEmissionsAvoided,
  recentCarbonEmissions,
} from "../data/mockData";

// ─── Small donut (reused pattern) ──────────────────────────────────────────
function SmallDonut({
  percentage,
  color = "#4CAF50",
  size = 40,
}: {
  percentage: number;
  color?: string;
  size?: number;
}) {
  const strokeWidth = 7;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#e5e7eb"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Custom Pie label with leader line ─────────────────────────────────────
interface CustomLabelProps {
  cx?: number;
  cy?: number;
  midAngle?: number;
  outerRadius?: number;
  name?: string;
  value?: number;
}

function renderCustomLabel({ cx = 0, cy = 0, midAngle = 0, outerRadius = 0, name, value }: CustomLabelProps) {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius + 30;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 20) * cos;
  const my = cy + (outerRadius + 20) * sin;
  const ex = x + (cos > 0 ? 1 : -1) * 10;
  const ey = y;
  const textAnchor = cos > 0 ? "start" : "end";

  return (
    <g>
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} fill="none" stroke="#9ca3af" strokeWidth={1} />
      <circle cx={ex} cy={ey} r={2} fill="#9ca3af" />
      <text x={ex + (cos > 0 ? 6 : -6)} y={ey - 10} textAnchor={textAnchor} fill="#374151" fontSize={12} fontWeight={600}>
        {name}
      </text>
      <text x={ex + (cos > 0 ? 6 : -6)} y={ey + 6} textAnchor={textAnchor} fill="#4CAF50" fontSize={12} fontWeight={700}>
        {value}
      </text>
    </g>
  );
}

// ─── Main component ────────────────────────────────────────────────────────
export default function GHGTracking() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecords = recentCarbonEmissions.filter(
    (r) =>
      r.emissionSource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.date.includes(searchQuery)
  );

  return (
    <div className="p-6 space-y-6">
      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Greenhouse Gas Emissions Tracking</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of emissions metrics</p>
      </div>

      {/* ── Total GHG Emissions Section ──────────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-700">Total Greenhouse Gas Emissions</h2>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
            <Calendar className="h-4 w-4 text-gray-500" />
            Monthly
            <svg className="h-4 w-4 text-gray-400" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-5 gap-5">
          {/* Left: CO2 Emissions Card */}
          <div className="col-span-2 bg-gray-50 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 rounded" style={{ backgroundColor: "#FF9800" }} />
              <p className="text-sm font-medium text-gray-700">GHG Emissions</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {co2Emissions.total.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 -mt-2">{co2Emissions.unit}</p>

            <div className="space-y-2 pt-1">
              {co2Emissions.scopes.map((scope) => (
                <div key={scope.id} className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                  <div
                    className="flex items-center justify-center w-7 h-7 rounded-full text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: scope.color }}
                  >
                    {scope.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{scope.label}</p>
                    <p className="text-xs text-gray-500">{scope.changeLabel}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <p className="text-sm font-bold text-gray-900">
                      {scope.value.toLocaleString()} {scope.unit}
                    </p>
                    <div className="relative">
                      <SmallDonut percentage={scope.percentage} color={scope.color} size={38} />
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold" style={{ color: scope.color }}>
                        {scope.percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Fuel Consumption Pie Chart */}
          <div className="col-span-3 bg-white border border-gray-100 rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-700">Fuel Consumption vs. Purchased Electricity</h3>
              <button className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-lg text-xs text-gray-700 hover:bg-gray-50">
                <Calendar className="h-3.5 w-3.5 text-gray-500" />
                Monthly
                <svg className="h-3.5 w-3.5 text-gray-400" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={fuelConsumptionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  nameKey="name"
                  label={renderCustomLabel}
                  labelLine={false}
                >
                  {fuelConsumptionData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  iconType="circle"
                  iconSize={10}
                  wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── Stacked Bar Chart (BUs) ──────────────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={monthlyEmissionsAvoided} margin={{ top: 5, right: 10, left: -5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              label={{ value: "BUs", position: "insideLeft", offset: 10, style: { fontSize: 12, fill: "#6b7280" } }}
              domain={[0, 250]}
              ticks={[0, 50, 100, 150, 200, 250]}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="square"
              iconSize={12}
              wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
            />
            <Bar dataKey="scope1" name="Scope 1" stackId="a" fill="#a5d6a7" />
            <Bar dataKey="scope2" name="Scope 2" stackId="a" fill="#FF9800" />
            <Bar dataKey="scope3" name="Scope 3" stackId="a" fill="#4CAF50" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Recent Carbon Emission Data Table ────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-xl p-5">
        {/* Table header row */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-700">Recent Carbon Emission Data</h2>
          <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600">
            View All Records
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Search / Filter / Actions */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by company ID, Dates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm w-72"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
              <Filter className="h-4 w-4" />
              Filter
              <svg className="h-3.5 w-3.5 text-gray-400" viewBox="0 0 16 16" fill="currentColor">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
              <Download className="h-4 w-4" />
              Download CSV
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
              <Upload className="h-4 w-4" />
              Upload GHG Data
            </button>
            <Button className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-2">
              <Plus className="h-4 w-4" />
              Add GHG Data
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Emission Source
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Quantity
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Unit Metrics
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Location
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Note
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-900">{record.emissionSource}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{record.quantity}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{record.unitMetrics}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{record.location}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{record.note}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{record.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
