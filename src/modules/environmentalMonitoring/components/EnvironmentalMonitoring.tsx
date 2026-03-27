"use client";
import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ComposedChart,
  Line,
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
  keyMetrics,
  co2Emissions,
  monthlyEmissionsAvoided,
  energyKeyMetrics,
  energyBySource,
  otherFuelsData,
  waterKeyMetrics,
  waterUsageData,
} from "../data/mockData";
import AirQuality from "./AirQuality";
import Biodiversity from "./Biodiversity";
import Waste from "./Waste";

type TabType = "ghg" | "energy" | "water" | "waste" | "air" | "biodiversity";

// ─── Small donut used inside metric cards ─────────────────────────────────
function SmallDonut({
  percentage,
  color = "#4CAF50",
  size = 64,
}: {
  percentage: number;
  color?: string;
  size?: number;
}) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} className='-rotate-90'>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke='#e5e7eb'
        strokeWidth={strokeWidth}
        fill='none'
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill='none'
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap='round'
      />
    </svg>
  );
}

// ─── Multi-segment donut ────────────────────────────────────────────────────
function SegmentedDonut({
  segments,
}: {
  segments: { name: string; value: number; color: string }[];
}) {
  return (
    <ResponsiveContainer width='100%' height={100}>
      <PieChart>
        <Pie
          data={segments}
          dataKey='value'
          nameKey='name'
          cx='50%'
          cy='50%'
          innerRadius={28}
          outerRadius={42}
          paddingAngle={2}
        >
          {segments.map((entry, index) => (
            <Cell key={index} fill={entry.color} stroke='none' />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

// ─── Shared period selector ────────────────────────────────────────────────
function PeriodSelector() {
  return (
    <button className='flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50'>
      <Calendar className='h-4 w-4 text-gray-500' />
      Monthly
      <svg
        className='h-4 w-4 text-gray-400'
        viewBox='0 0 16 16'
        fill='currentColor'
      >
        <path
          d='M4 6l4 4 4-4'
          stroke='currentColor'
          strokeWidth='1.5'
          fill='none'
          strokeLinecap='round'
        />
      </svg>
    </button>
  );
}

// ─── Main component ────────────────────────────────────────────────────────
export default function EnvironmentalMonitoring() {
  const [activeTab, setActiveTab] = useState<TabType>("ghg");

  const tabs = [
    { id: "ghg" as TabType, label: "Greenhouse Gas Emissions" },
    { id: "energy" as TabType, label: "Energy Consumption" },
    { id: "water" as TabType, label: "Water Consumption" },
    { id: "waste" as TabType, label: "Waste Management" },
    { id: "air" as TabType, label: "Air Quality" },
    { id: "biodiversity" as TabType, label: "Biodiversity" },
  ];

  // per-tab header buttons
  const headerButtons =
    activeTab === "water" ? (
      <>
        <Button
          variant='outline'
          className='border-green-600 text-green-600 hover:bg-green-50'
        >
          Export Data
        </Button>
        <Button className='bg-green-600 hover:bg-green-700 text-white'>
          Log New Consumption
        </Button>
      </>
    ) : activeTab === "energy" ? (
      <>
        <Button
          variant='outline'
          className='border-green-600 text-green-600 hover:bg-green-50'
        >
          Export Data
        </Button>
        <Button
          variant='outline'
          className='border-green-600 text-green-600 hover:bg-green-50'
        >
          View Reports
        </Button>
        <Button className='bg-green-600 hover:bg-green-700 text-white'>
          Log New Energy Data
        </Button>
      </>
    ) : (
      <>
        <Button
          variant='outline'
          className='border-green-600 text-green-600 hover:bg-green-50'
        >
          Generate ESG Report
        </Button>
        <Button className='bg-green-600 hover:bg-green-700 text-white'>
          Log New Emission
        </Button>
      </>
    );

  return (
    <div className='p-6 space-y-6'>
      {/* ── Shared Header ─────────────────────────────────────────────────── */}
      <div className='flex items-start justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>
            Hello Chinedu Igwe!
          </h1>
          <p className='text-gray-600 mt-1'>
            Here&apos;s a quick overview of your sustainability progress.
          </p>
        </div>
        <div className='flex gap-3'>{headerButtons}</div>
      </div>

      {/* ── Shared Tabs ───────────────────────────────────────────────────── */}
      <div className='border-b border-gray-200'>
        <div className='flex space-x-8'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
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

      {/* ═══════════════════════════════════════════════════════════════════════
          GHG TAB
          ═══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "ghg" && (
        <>
          {/* Key Metrics */}
          <div className='grid grid-cols-4 gap-4'>
            <div className='bg-white border border-gray-200 rounded-xl p-4'>
              <p className='text-xs font-semibold text-gray-500 mb-3'>
                Key Metrics
              </p>
              <p className='text-xs text-gray-500 mb-1'>Overall ESG Score</p>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-3xl font-bold text-gray-900'>
                    {keyMetrics.esgScore.current}
                    <span className='text-lg font-normal text-gray-400'>
                      /{keyMetrics.esgScore.max}
                    </span>
                  </p>
                  <p className='text-xs text-green-600 mt-1'>
                    {keyMetrics.esgScore.status}
                  </p>
                </div>
                <SmallDonut
                  percentage={keyMetrics.esgScore.current}
                  color='#4CAF50'
                  size={56}
                />
              </div>
            </div>
            <div className='bg-green-50 border border-green-100 rounded-xl p-4'>
              <p className='text-xs font-semibold text-gray-500 mb-3'>
                Key Metrics
              </p>
              <p className='text-xs text-gray-500 mb-1'>
                Greenhouse Gas Emissions
              </p>
              <p className='text-3xl font-bold text-gray-900'>
                {keyMetrics.ghgEmissions.value.toLocaleString()}
              </p>
              <p className='text-xs text-gray-500'>
                {keyMetrics.ghgEmissions.unit}
              </p>
              <p className='text-xs text-green-600 mt-2'>
                {keyMetrics.ghgEmissions.changeLabel}
              </p>
            </div>
            <div className='bg-white border border-gray-200 rounded-xl p-4'>
              <p className='text-xs font-semibold text-gray-500 mb-1'>
                Key Metrics
              </p>
              <p className='text-xs text-gray-500 mb-1'>Carbon Offset</p>
              <p className='text-2xl font-bold text-gray-900'>
                {keyMetrics.carbonOffset.value}
                <span className='text-xs font-normal text-gray-500 ml-1'>
                  {keyMetrics.carbonOffset.unit}
                </span>
              </p>
              <SegmentedDonut segments={keyMetrics.carbonOffset.segments} />
              <div className='flex items-center gap-3 mt-1 flex-wrap'>
                {keyMetrics.carbonOffset.segments.map((seg) => (
                  <div key={seg.name} className='flex items-center gap-1'>
                    <span
                      className='inline-block w-2.5 h-2.5 rounded-full'
                      style={{ backgroundColor: seg.color }}
                    />
                    <span className='text-xs text-gray-600'>{seg.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className='bg-green-50 border border-green-100 rounded-xl p-4'>
              <p className='text-xs font-semibold text-gray-500 mb-3'>
                Key Metrics
              </p>
              <p className='text-xs text-gray-500 mb-1'>Compliance</p>
              <p className='text-3xl font-bold text-gray-900'>
                {keyMetrics.compliance.value}
                <span className='text-lg font-normal text-gray-400'>%</span>
              </p>
              <p className='text-xs text-gray-500'>
                {keyMetrics.compliance.unit.replace("% ", "")}
              </p>
              <p className='text-xs text-green-600 mt-2'>
                {keyMetrics.compliance.changeLabel}
              </p>
            </div>
          </div>

          {/* Total Emissions section */}
          <div className='bg-white border border-gray-200 rounded-xl p-6'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-lg font-semibold text-gray-900'>
                Total Emissions
              </h2>
              <PeriodSelector />
            </div>
            <div className='grid grid-cols-5 gap-6'>
              {/* CO2 card */}
              <div className='col-span-2 bg-gray-50 rounded-xl p-5 space-y-4'>
                <div className='flex items-center gap-2 mb-1'>
                  <span
                    className='inline-block w-4 h-4 rounded'
                    style={{ backgroundColor: "#FF9800" }}
                  />
                  <p className='text-sm font-medium text-gray-700'>
                    GHG Emissions
                  </p>
                </div>
                <p className='text-2xl font-bold text-gray-900'>
                  {co2Emissions.total.toLocaleString()}
                </p>
                <p className='text-xs text-gray-500 -mt-3'>
                  {co2Emissions.unit}
                </p>
                <div className='space-y-3 pt-2'>
                  {co2Emissions.scopes.map((scope) => (
                    <div
                      key={scope.id}
                      className='flex items-center gap-4 bg-white rounded-lg p-3 shadow-sm'
                    >
                      <div
                        className='flex items-center justify-center w-8 h-8 rounded-full text-white text-xs font-bold shrink-0'
                        style={{ backgroundColor: scope.color }}
                      >
                        {scope.id}
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='text-sm font-semibold text-gray-900'>
                          {scope.label}
                        </p>
                        <p className='text-xs text-gray-500'>
                          {scope.changeLabel}
                        </p>
                      </div>
                      <div className='flex items-center gap-2 shrink-0'>
                        <p className='text-sm font-bold text-gray-900'>
                          {scope.value.toLocaleString()} {scope.unit}
                        </p>
                        <div className='relative'>
                          <SmallDonut
                            percentage={scope.percentage}
                            color={scope.color}
                            size={40}
                          />
                          <span
                            className='absolute inset-0 flex items-center justify-center text-xs font-bold'
                            style={{ color: scope.color }}
                          >
                            {scope.percentage}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Stacked bar */}
              <div className='col-span-3'>
                <p className='text-sm font-semibold text-gray-700 mb-4'>
                  Total Emissions Avoided
                </p>
                <ResponsiveContainer width='100%' height={280}>
                  <BarChart
                    data={monthlyEmissionsAvoided}
                    margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray='3 3'
                      vertical={false}
                      stroke='#f0f0f0'
                    />
                    <XAxis
                      dataKey='month'
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#6b7280" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "#6b7280" }}
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
                      verticalAlign='bottom'
                      align='center'
                      iconType='square'
                      iconSize={12}
                      wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
                    />
                    <Bar
                      dataKey='scope1'
                      name='Scope 1'
                      stackId='a'
                      fill='#a5d6a7'
                    />
                    <Bar
                      dataKey='scope2'
                      name='Scope 2'
                      stackId='a'
                      fill='#FF9800'
                    />
                    <Bar
                      dataKey='scope3'
                      name='Scope 3'
                      stackId='a'
                      fill='#4CAF50'
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          ENERGY CONSUMPTION TAB
          ═══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "energy" && (
        <>
          {/* Key Metrics */}
          <div className='grid grid-cols-4 gap-4'>
            {/* 1. Total Energy Consumption */}
            <div className='bg-green-50 border border-green-100 rounded-xl p-4'>
              <p className='text-xs font-semibold text-gray-500 mb-2'>
                Key Metrics
              </p>
              <p className='text-xs text-gray-500 mb-1'>
                Total Energy Consumption
              </p>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-2xl font-bold text-gray-900'>
                    {energyKeyMetrics.totalConsumption.value.toLocaleString()}
                    <span className='text-sm font-normal text-gray-500 ml-1'>
                      {energyKeyMetrics.totalConsumption.unit}
                    </span>
                  </p>
                  <p className='text-xs text-green-600 mt-1'>
                    {energyKeyMetrics.totalConsumption.status}
                  </p>
                </div>
                <SmallDonut
                  percentage={energyKeyMetrics.totalConsumption.percentage}
                  color='#4CAF50'
                  size={52}
                />
              </div>
            </div>

            {/* 2. Renewable Energy Usage */}
            <div className='bg-yellow-50 border border-yellow-100 rounded-xl p-4'>
              <p className='text-xs font-semibold text-gray-500 mb-2'>
                Key Metrics
              </p>
              <p className='text-xs text-gray-500 mb-1'>
                Renewable Energy Usage
              </p>
              <p className='text-2xl font-bold text-gray-900'>
                {energyKeyMetrics.renewableUsage.value.toLocaleString()}
                <span className='text-sm font-normal text-gray-500 ml-1'>
                  {energyKeyMetrics.renewableUsage.unit}
                </span>
              </p>
              <p className='text-xs text-green-600 mt-2'>
                {energyKeyMetrics.renewableUsage.changeLabel}
              </p>
            </div>

            {/* 3. Non-Renewable Energy Usage */}
            <div className='bg-white border border-gray-200 rounded-xl p-4'>
              <p className='text-xs font-semibold text-gray-500 mb-1'>
                Key Metrics
              </p>
              <p className='text-xs text-gray-500 mb-1'>
                Non-Renewable Energy Usage
              </p>
              <p className='text-2xl font-bold text-gray-900'>
                {energyKeyMetrics.nonRenewable.value.toLocaleString()}
                <span className='text-sm font-normal text-gray-500 ml-1'>
                  {energyKeyMetrics.nonRenewable.unit}
                </span>
              </p>
              <SegmentedDonut
                segments={energyKeyMetrics.nonRenewable.segments}
              />
              <p className='text-xs text-green-600 mt-1'>
                {energyKeyMetrics.nonRenewable.changeLabel}
              </p>
            </div>

            {/* 4. Energy Cost Analysis */}
            <div className='bg-yellow-50 border border-yellow-100 rounded-xl p-4'>
              <p className='text-xs font-semibold text-gray-500 mb-2'>
                Key Metrics
              </p>
              <p className='text-xs text-gray-500 mb-1'>Energy Cost Analysis</p>
              <p className='text-3xl font-bold text-gray-900'>
                {energyKeyMetrics.costAnalysis.unit}
                {energyKeyMetrics.costAnalysis.value}
              </p>
              <p className='text-xs text-green-600 mt-2'>
                {energyKeyMetrics.costAnalysis.changeLabel}
              </p>
            </div>
          </div>

          {/* Total Energy Consumed section */}
          <div className='bg-white border border-gray-200 rounded-xl p-6'>
            <div className='flex items-center justify-between mb-6'>
              <h2 className='text-lg font-semibold text-gray-900'>
                Total Energy Consumed
              </h2>
              <PeriodSelector />
            </div>

            <div className='grid grid-cols-2 gap-6'>
              {/* Left – Stacked Bar: Renewable vs Non-Renewable */}
              <div className='bg-gray-50 rounded-xl p-4'>
                <p className='text-sm font-semibold text-gray-700 mb-3'>
                  Energy Consumption by Source (Renewable)
                </p>
                <ResponsiveContainer width='100%' height={300}>
                  <BarChart
                    data={energyBySource}
                    margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray='3 3'
                      vertical={false}
                      stroke='#e5e7eb'
                    />
                    <XAxis
                      dataKey='month'
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "#6b7280" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "#6b7280" }}
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
                      verticalAlign='bottom'
                      align='center'
                      iconType='circle'
                      iconSize={10}
                      wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
                    />
                    <Bar
                      dataKey='renewable'
                      name='Renewable'
                      stackId='a'
                      fill='#FF9800'
                    />
                    <Bar
                      dataKey='nonRenewable'
                      name='Non-Renewable'
                      stackId='a'
                      fill='#4CAF50'
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Right – Area Chart: Other Fuels */}
              <div className='bg-gray-50 rounded-xl p-4'>
                <p className='text-sm font-semibold text-gray-700 mb-3'>
                  Other Fuels and Energy Consumption
                </p>
                <ResponsiveContainer width='100%' height={300}>
                  <AreaChart
                    data={otherFuelsData}
                    margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                  >
                    <defs>
                      <linearGradient
                        id='colorDiesel'
                        x1='0'
                        y1='0'
                        x2='0'
                        y2='1'
                      >
                        <stop
                          offset='5%'
                          stopColor='#7c4dff'
                          stopOpacity={0.3}
                        />
                        <stop
                          offset='95%'
                          stopColor='#7c4dff'
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient id='colorLpg' x1='0' y1='0' x2='0' y2='1'>
                        <stop
                          offset='5%'
                          stopColor='#66bb6a'
                          stopOpacity={0.3}
                        />
                        <stop
                          offset='95%'
                          stopColor='#66bb6a'
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id='colorGasoline'
                        x1='0'
                        y1='0'
                        x2='0'
                        y2='1'
                      >
                        <stop
                          offset='5%'
                          stopColor='#ffa726'
                          stopOpacity={0.3}
                        />
                        <stop
                          offset='95%'
                          stopColor='#ffa726'
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id='colorFuelOil'
                        x1='0'
                        y1='0'
                        x2='0'
                        y2='1'
                      >
                        <stop
                          offset='5%'
                          stopColor='#26c6da'
                          stopOpacity={0.3}
                        />
                        <stop
                          offset='95%'
                          stopColor='#26c6da'
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray='3 3'
                      vertical={false}
                      stroke='#e5e7eb'
                    />
                    <XAxis
                      dataKey='month'
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
                      verticalAlign='bottom'
                      align='center'
                      iconType='circle'
                      iconSize={10}
                      wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
                    />
                    <Area
                      type='monotone'
                      dataKey='diesel'
                      name='Diesel'
                      stroke='#7c4dff'
                      strokeWidth={2}
                      fill='url(#colorDiesel)'
                      dot={{ r: 3, fill: "#7c4dff" }}
                    />
                    <Area
                      type='monotone'
                      dataKey='lpg'
                      name='LPG'
                      stroke='#66bb6a'
                      strokeWidth={2}
                      fill='url(#colorLpg)'
                      dot={{ r: 3, fill: "#66bb6a" }}
                    />
                    <Area
                      type='monotone'
                      dataKey='gasoline'
                      name='Gasoline'
                      stroke='#ffa726'
                      strokeWidth={2}
                      fill='url(#colorGasoline)'
                      dot={{ r: 3, fill: "#ffa726" }}
                    />
                    <Area
                      type='monotone'
                      dataKey='fuelOil'
                      name='Fuel Oil'
                      stroke='#26c6da'
                      strokeWidth={2}
                      fill='url(#colorFuelOil)'
                      dot={{ r: 3, fill: "#26c6da" }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          WATER CONSUMPTION TAB
          ═══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "water" && (
        <>
          {/* Key Metrics */}
          <div className='bg-white border border-gray-200 rounded-xl p-5'>
            <p className='text-sm font-semibold text-gray-700 mb-4'>Key Metrics</p>
            <div className='grid grid-cols-3 gap-4'>
              {/* 1. Total water withdrawal */}
              <div className='bg-green-50 border border-green-100 rounded-xl p-4'>
                <p className='text-xs text-gray-500 mb-1'>Total water withdrawal</p>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-2xl font-bold text-gray-900'>
                      {waterKeyMetrics.totalWithdrawal.value.toLocaleString()}
                      <span className='text-sm font-normal text-gray-500 ml-1'>
                        {waterKeyMetrics.totalWithdrawal.unit}
                      </span>
                    </p>
                    <p className='text-xs text-green-600 mt-1'>
                      {waterKeyMetrics.totalWithdrawal.status}
                    </p>
                  </div>
                  <div className='relative'>
                    <SmallDonut
                      percentage={waterKeyMetrics.totalWithdrawal.percentage}
                      color='#4CAF50'
                      size={56}
                    />
                    <span className='absolute inset-0 flex items-center justify-center text-xs font-bold text-green-600'>
                      {waterKeyMetrics.totalWithdrawal.percentage}%
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Total water discharged */}
              <div className='bg-orange-50 border border-orange-100 rounded-xl p-4'>
                <p className='text-xs text-gray-500 mb-1'>Total water discharged</p>
                <p className='text-2xl font-bold text-gray-900'>
                  {waterKeyMetrics.totalDischarged.value.toLocaleString()}
                  <span className='text-sm font-normal text-gray-500 ml-1'>
                    {waterKeyMetrics.totalDischarged.unit}
                  </span>
                </p>
                <p className='text-xs text-gray-500 mt-2'>
                  {waterKeyMetrics.totalDischarged.changeLabel}
                </p>
              </div>

              {/* 3. Total water consumed */}
              <div className='bg-white border border-gray-200 rounded-xl p-4'>
                <p className='text-xs text-gray-500 mb-1'>Total water consumed</p>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='text-2xl font-bold text-gray-900'>
                      {waterKeyMetrics.totalConsumed.value.toLocaleString()}
                      <span className='text-sm font-normal text-gray-500 ml-1'>
                        {waterKeyMetrics.totalConsumed.unit}
                      </span>
                    </p>
                    <p className='text-xs text-gray-500 mt-2'>
                      {waterKeyMetrics.totalConsumed.changeLabel}
                    </p>
                  </div>
                  <SegmentedDonut segments={waterKeyMetrics.totalConsumed.segments} />
                </div>
              </div>
            </div>
          </div>

          {/* Total Water Consumed – combo chart */}
          <div className='bg-white border border-gray-200 rounded-xl p-6'>
            <div className='flex items-center justify-between mb-2'>
              <h2 className='text-lg font-semibold text-gray-900'>
                Total Water Consumed
              </h2>
              <PeriodSelector />
            </div>
            <p className='text-sm text-gray-600 mb-6'>Water usage trend over time</p>

            <ResponsiveContainer width='100%' height={320}>
              <ComposedChart
                data={waterUsageData}
                margin={{ top: 5, right: 30, left: -10, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray='3 3'
                  vertical={false}
                  stroke='#f0f0f0'
                />
                <XAxis
                  dataKey='month'
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                />
                <YAxis
                  yAxisId='left'
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  domain={[0, 100]}
                  ticks={[0, 20, 40, 60, 80, 100]}
                />
                <YAxis
                  yAxisId='right'
                  orientation='right'
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  domain={[0, 100]}
                  ticks={[0, 20, 40, 60, 80, 100]}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend
                  verticalAlign='bottom'
                  align='center'
                  iconSize={12}
                  wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }}
                />
                <Bar
                  yAxisId='left'
                  dataKey='waterUsage'
                  name='Water Usage'
                  fill='#e8b96a'
                  radius={[2, 2, 0, 0]}
                />
                <Line
                  yAxisId='right'
                  type='monotone'
                  dataKey='time'
                  name='Time'
                  stroke='#4CAF50'
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#fff", stroke: "#4CAF50", strokeWidth: 2 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          WASTE TAB
          ═══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "waste" && <Waste />}

      {/* ═══════════════════════════════════════════════════════════════════════
          AIR QUALITY TAB
          ═══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "air" && <AirQuality />}

      {/* ═══════════════════════════════════════════════════════════════════════
          BIODIVERSITY TAB
          ═══════════════════════════════════════════════════════════════════════ */}
      {activeTab === "biodiversity" && <Biodiversity />}
    </div>
  );
}
