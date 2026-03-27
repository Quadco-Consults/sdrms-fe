"use client";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  energyEfficiencySummary,
  energyUsageVsProduction,
  energyIntensityOverTime,
} from "../data/energyConsumptionData";
import { otherFuelsData } from "../data/mockData";

// ─── Small donut with configurable track color ─────────────────────────────
function SmallDonut({
  percentage,
  color = "#4CAF50",
  trackColor = "#e5e7eb",
  size = 52,
}: {
  percentage: number;
  color?: string;
  trackColor?: string;
  size?: number;
}) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={trackColor}
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

// ─── Shared period selector ────────────────────────────────────────────────
function PeriodSelector() {
  return (
    <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
      <Calendar className="h-4 w-4 text-gray-500" />
      Monthly
      <svg
        className="h-4 w-4 text-gray-400"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <path
          d="M4 6l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </button>
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

function renderCustomLabel({
  cx = 0,
  cy = 0,
  midAngle = 0,
  outerRadius = 0,
  name,
  value,
}: CustomLabelProps) {
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
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        fill="none"
        stroke="#9ca3af"
        strokeWidth={1}
      />
      <circle cx={ex} cy={ey} r={2} fill="#9ca3af" />
      <text
        x={ex + (cos > 0 ? 6 : -6)}
        y={ey - 10}
        textAnchor={textAnchor}
        fill="#374151"
        fontSize={12}
        fontWeight={600}
      >
        {name}
      </text>
      <text
        x={ex + (cos > 0 ? 6 : -6)}
        y={ey + 6}
        textAnchor={textAnchor}
        fill="#4CAF50"
        fontSize={12}
        fontWeight={700}
      >
        {value}
      </text>
    </g>
  );
}

// ─── Main component ────────────────────────────────────────────────────────
export default function EnergyEfficiency() {
  const s = energyEfficiencySummary;

  return (
    <div className="p-6 space-y-6">
      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Energy Efficiency
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            View and analyze your emissions data below
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50"
          >
            Generate ESG Report
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            New Calculation
          </Button>
        </div>
      </div>

      {/* ── Top Row: Summary + Pie Chart ─────────────────────────────────── */}
      <div className="grid grid-cols-5 gap-6">
        {/* Summary Section */}
        <div className="col-span-3 bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-4">Summary</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Date Logged */}
            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-2">Date Logged</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {s.dateLogged.date}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    {s.dateLogged.status}
                  </p>
                </div>
                <div className="relative">
                  <SmallDonut percentage={s.dateLogged.percentage} color="#4CAF50" size={52} />
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-green-700">
                    {s.dateLogged.percentage}%
                  </span>
                </div>
              </div>
            </div>

            {/* Total Consumption */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-2">Total Consumption</p>
              <p className="text-lg font-bold text-gray-900">
                {s.totalConsumption.value.toLocaleString()}
                <span className="text-sm font-normal text-gray-500 ml-1">
                  {s.totalConsumption.unit}
                </span>
              </p>
              <p className="text-xs text-green-600 mt-1">
                {s.totalConsumption.changeLabel}
              </p>
            </div>

            {/* Total Units Produced */}
            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-2">Total Units Produced</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {s.totalUnitsProduced.value.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    {s.totalUnitsProduced.changeLabel}
                  </p>
                </div>
                <div className="relative">
                  <SmallDonut
                    percentage={s.totalUnitsProduced.percentage}
                    color="#4CAF50"
                    trackColor="#ef4444"
                    size={52}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-green-700">
                    {s.totalUnitsProduced.percentage}%
                  </span>
                </div>
              </div>
            </div>

            {/* Energy Intensity */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-2">Energy Intensity</p>
              <p className="text-lg font-bold text-gray-900">
                {s.energyIntensity.value}
                <span className="text-sm font-normal text-gray-500 ml-1">
                  {s.energyIntensity.unit}
                </span>
              </p>
              <p className="text-xs text-green-600 mt-1">
                {s.energyIntensity.changeLabel}
              </p>
            </div>

            {/* Cost per kWh */}
            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-2">Cost per kWh</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    ${s.costPerKwh.value}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    {s.costPerKwh.changeLabel}
                  </p>
                </div>
                <div className="relative">
                  <SmallDonut
                    percentage={s.costPerKwh.percentage}
                    color="#4CAF50"
                    trackColor="#ef4444"
                    size={52}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-green-700">
                    {s.costPerKwh.percentage}%
                  </span>
                </div>
              </div>
            </div>

            {/* Total Cost */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-2">Total Cost</p>
              <p className="text-lg font-bold text-gray-900">
                ${s.totalCost.value.toLocaleString()}
              </p>
              <p className="text-xs text-green-600 mt-1">
                {s.totalCost.changeLabel}
              </p>
            </div>
          </div>
        </div>

        {/* Pie Chart Section */}
        <div className="col-span-2 bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-700">
              Energy Usage vs. Production Output
            </h2>
            <PeriodSelector />
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={energyUsageVsProduction}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                nameKey="name"
                label={renderCustomLabel}
                labelLine={false}
              >
                {energyUsageVsProduction.map((entry, index) => (
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

      {/* ── Bottom Row: Bar Chart + Area Chart ───────────────────────────── */}
      <div className="grid grid-cols-2 gap-6">
        {/* Energy Intensity Over Time */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-700">
              Energy Intensity Over Time
            </h2>
            <PeriodSelector />
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={energyIntensityOverTime}
              margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e5e7eb"
              />
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
                domain={[0, 200]}
                ticks={[0, 40, 80, 120, 160, 200]}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                }}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                iconSize={10}
                wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
              />
              <Bar
                dataKey="naturalGas"
                name="Natural Gas"
                stackId="a"
                fill="#ffa726"
              />
              <Bar
                dataKey="electricity"
                name="Electricity"
                stackId="a"
                fill="#4CAF50"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cost per kWh Changes */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-700">
              Cost per kWh Changes
            </h2>
            <PeriodSelector />
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart
              data={otherFuelsData}
              margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
            >
              <defs>
                <linearGradient id="eeDiesel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c4dff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7c4dff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="eeLpg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#66bb6a" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#66bb6a" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="eeGasoline" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ffa726" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ffa726" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="eeFuelOil" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#26c6da" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#26c6da" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e5e7eb"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#6b7280" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#6b7280" }}
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                }}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                iconSize={10}
                wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
              />
              <Area
                type="monotone"
                dataKey="diesel"
                name="Diesel"
                stroke="#7c4dff"
                strokeWidth={2}
                fill="url(#eeDiesel)"
                dot={{ r: 3, fill: "#7c4dff" }}
              />
              <Area
                type="monotone"
                dataKey="lpg"
                name="LPG"
                stroke="#66bb6a"
                strokeWidth={2}
                fill="url(#eeLpg)"
                dot={{ r: 3, fill: "#66bb6a" }}
              />
              <Area
                type="monotone"
                dataKey="gasoline"
                name="Gasoline"
                stroke="#ffa726"
                strokeWidth={2}
                fill="url(#eeGasoline)"
                dot={{ r: 3, fill: "#ffa726" }}
              />
              <Area
                type="monotone"
                dataKey="fuelOil"
                name="Fuel Oil"
                stroke="#26c6da"
                strokeWidth={2}
                fill="url(#eeFuelOil)"
                dot={{ r: 3, fill: "#26c6da" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
