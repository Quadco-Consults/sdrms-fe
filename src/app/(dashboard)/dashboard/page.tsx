"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import GlobalFilters from "@/components/shared/GlobalFilters";
import KPICard from "@/components/shared/KPICard";
import {
  DASHBOARD_CHART_DATA,
  EMISSIONS_BY_SOURCE,
  WORKFORCE_DIVERSITY_DATA,
  SAFETY_PERFORMANCE_DATA,
  ESG_KPI_STATUS,
  CHART_COLORS,
} from "@/data/dashboard-mock";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Leaf, Users, ShieldCheck, Activity, PieChart as PieChartIcon, BarChart3 } from "lucide-react";

export default function DashboardPage() {
  return (
    <div>
      <DashboardHeader breadcrumbs={[{ label: "Dashboard" }]} />

      <div className="p-8 animate-in fade-in duration-500">
        {/* Page Header */}
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
              Sustainability Dashboard
            </h2>
            <p className="text-gray-600 text-sm mt-1 font-medium">
              Enterprise-wide ESG performance overview
            </p>
          </div>
        </div>

        {/* Global Filters */}
        <GlobalFilters />

        {/* ENVIRONMENTAL PERFORMANCE SECTION */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8 pb-2 border-b border-gray-200">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-700 shadow-inner">
              <Leaf size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                Environmental Performance
              </h3>
              <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">
                Emissions, Energy, Water & Waste
              </p>
            </div>
          </div>

          {/* Environmental KPIs */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <KPICard
              label="Total GHG Emissions"
              value="1,600"
              unit="tCO2e"
              color={CHART_COLORS.primary}
              pct={45}
              trend="-8%"
            />
            <KPICard
              label="Energy Intensity"
              value="12.5"
              unit="kWh/unit"
              color={CHART_COLORS.scope2}
              pct={60}
              trend="-5%"
            />
            <KPICard
              label="Water Withdrawal"
              value="25.4k"
              unit="m³"
              color={CHART_COLORS.blue}
              pct={30}
              trend="-2%"
            />
            <KPICard
              label="Waste Diverted"
              value="78"
              unit="%"
              color={CHART_COLORS.success}
              pct={78}
              trend="+6%"
            />
          </div>

          {/* Environmental Charts */}
          <div className="grid grid-cols-3 gap-6">
            {/* Emissions & Energy Trend */}
            <div className="col-span-2 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-8 flex items-center gap-2">
                <Activity size={14} /> Emissions & Energy Trend
              </h4>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={DASHBOARD_CHART_DATA}>
                    <defs>
                      <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#E5E7EB"
                      opacity={0.5}
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "#6B7280", fontWeight: 700 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "#6B7280", fontWeight: 700 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #E5E7EB",
                        borderRadius: "12px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                      itemStyle={{ fontSize: "12px", fontWeight: 800 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="emissions"
                      stroke={CHART_COLORS.primary}
                      fillOpacity={1}
                      fill="url(#colorEmissions)"
                      strokeWidth={4}
                    />
                    <Area
                      type="monotone"
                      dataKey="energy"
                      stroke={CHART_COLORS.scope2}
                      fill="transparent"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Emissions by Source */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-8 flex items-center gap-2">
                <PieChartIcon size={14} /> Emissions by Source
              </h4>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={EMISSIONS_BY_SOURCE}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={95}
                      paddingAngle={8}
                      stroke="none"
                    >
                      {EMISSIONS_BY_SOURCE.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #E5E7EB",
                        borderRadius: "12px",
                      }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      iconType="circle"
                      wrapperStyle={{
                        fontSize: "10px",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        paddingTop: "20px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL IMPACT SECTION */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8 pb-2 border-b border-gray-200">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-700 shadow-inner">
              <Users size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                Social Impact
              </h3>
              <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">
                Workforce, Safety & Community
              </p>
            </div>
          </div>

          {/* Social KPIs */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <KPICard
              label="Total Workforce"
              value="4,250"
              unit="HC"
              color={CHART_COLORS.blue}
              pct={100}
            />
            <KPICard
              label="Female Representation"
              value="32"
              unit="%"
              color={CHART_COLORS.secondary}
              pct={32}
              trend="+2%"
            />
            <KPICard
              label="LTI Frequency Rate"
              value="0.12"
              unit="rate"
              color={CHART_COLORS.danger}
              pct={12}
              trend="-0.06"
            />
            <KPICard
              label="Training Investment"
              value="₦85M"
              unit="NGN"
              color={CHART_COLORS.accent}
              pct={75}
              trend="+12%"
            />
          </div>

          {/* Social Charts */}
          <div className="grid grid-cols-2 gap-6">
            {/* Workforce Diversity Trend */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-8 flex items-center gap-2">
                <BarChart3 size={14} /> Workforce Diversity Trend
              </h4>
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={WORKFORCE_DIVERSITY_DATA}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#E5E7EB"
                      opacity={0.5}
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "#6B7280", fontWeight: 700 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "#6B7280", fontWeight: 700 }}
                    />
                    <Tooltip cursor={{ fill: "#1B5E20", fillOpacity: 0.05 }} />
                    <Legend
                      iconType="circle"
                      wrapperStyle={{
                        fontSize: "10px",
                        fontWeight: 800,
                        textTransform: "uppercase",
                      }}
                    />
                    <Bar
                      dataKey="male"
                      name="Male"
                      fill={CHART_COLORS.blue}
                      stackId="a"
                      radius={[0, 0, 0, 0]}
                    />
                    <Bar
                      dataKey="female"
                      name="Female"
                      fill={CHART_COLORS.secondary}
                      stackId="a"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Safety Performance */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-8 flex items-center gap-2">
                <Activity size={14} /> Safety Performance (LTIFR)
              </h4>
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={SAFETY_PERFORMANCE_DATA}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#E5E7EB"
                      opacity={0.5}
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "#6B7280", fontWeight: 700 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "#6B7280", fontWeight: 700 }}
                    />
                    <Tooltip />
                    <Line
                      type="stepAfter"
                      dataKey="value"
                      stroke={CHART_COLORS.danger}
                      strokeWidth={4}
                      dot={{
                        r: 6,
                        fill: CHART_COLORS.danger,
                        strokeWidth: 3,
                        stroke: "#fff",
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        {/* GOVERNANCE & COMPLIANCE SECTION */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8 pb-2 border-b border-gray-200">
            <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 shadow-inner">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                Governance & Compliance
              </h3>
              <p className="text-[11px] text-gray-500 font-bold uppercase tracking-widest">
                Risk, Audit & Stakeholders
              </p>
            </div>
          </div>

          {/* Governance KPIs */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <KPICard
              label="Compliance Score"
              value="98"
              unit="%"
              color={CHART_COLORS.success}
              pct={98}
              trend="+1%"
            />
            <KPICard
              label="Open Audit Findings"
              value="4"
              unit="items"
              color={CHART_COLORS.danger}
              pct={15}
              trend="-2"
            />
            <KPICard
              label="Risk Mitigation"
              value="82"
              unit="%"
              color={CHART_COLORS.warning}
              pct={82}
              trend="+5%"
            />
            <KPICard
              label="Stakeholder Engagement"
              value="92"
              unit="%"
              color={CHART_COLORS.primary}
              pct={92}
              trend="HIGH"
            />
          </div>

          {/* Governance Chart */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-8 flex items-center gap-2">
              <BarChart3 size={14} /> KPI Status by ESG Pillar
            </h4>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ESG_KPI_STATUS}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E5E7EB"
                    opacity={0.5}
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#6B7280", fontWeight: 700 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#6B7280", fontWeight: 700 }}
                  />
                  <Tooltip cursor={{ fill: "#1B5E20", fillOpacity: 0.05 }} />
                  <Legend
                    iconType="circle"
                    wrapperStyle={{
                      fontSize: "10px",
                      fontWeight: 800,
                      textTransform: "uppercase",
                    }}
                  />
                  <Bar
                    dataKey="onTrack"
                    name="On Track"
                    fill={CHART_COLORS.success}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="atRisk"
                    name="At Risk"
                    fill={CHART_COLORS.warning}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="missed"
                    name="Missed"
                    fill={CHART_COLORS.danger}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
