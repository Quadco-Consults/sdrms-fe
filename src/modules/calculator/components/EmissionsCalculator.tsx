"use client";

import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calculator,
  Plus,
  Trash2,
  Download,
  BarChart3,
  Zap,
  Droplets,
  Flame,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

type ViewType = "calculator" | "results";

const CHART_COLORS = {
  scope1: "#1B5E20",
  scope2: "#4CAF50",
  scope3: "#81C784",
  diesel: "#F5A623",
  electricity: "#1565C0",
  naturalGas: "#8B4513",
};

const EMISSION_FACTORS = {
  diesel: { factor: 2.68, unit: "kgCO2e/L", name: "Diesel" },
  petrol: { factor: 2.31, unit: "kgCO2e/L", name: "Petrol (Gasoline)" },
  naturalGas: { factor: 2.03, unit: "kgCO2e/m³", name: "Natural Gas" },
  electricity: { factor: 0.569, unit: "kgCO2e/kWh", name: "Grid Electricity (Nigeria)" },
  lpg: { factor: 1.51, unit: "kgCO2e/kg", name: "LPG" },
  coal: { factor: 2.42, unit: "kgCO2e/kg", name: "Coal" },
};

type CalculationRow = {
  id: string;
  source: keyof typeof EMISSION_FACTORS;
  quantity: string;
  scope: "1" | "2" | "3";
};

export default function EmissionsCalculator() {
  const [view, setView] = useState<ViewType>("calculator");
  const [rows, setRows] = useState<CalculationRow[]>([
    { id: "1", source: "diesel", quantity: "", scope: "1" },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: Date.now().toString(),
        source: "diesel",
        quantity: "",
        scope: "1",
      },
    ]);
  };

  const removeRow = (id: string) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const updateRow = (id: string, field: keyof CalculationRow, value: any) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
  };

  const calculateTotal = () => {
    return rows.reduce((total, row) => {
      const quantity = parseFloat(row.quantity) || 0;
      const factor = EMISSION_FACTORS[row.source].factor;
      return total + quantity * factor;
    }, 0);
  };

  const calculateByScope = () => {
    const byScope = { "1": 0, "2": 0, "3": 0 };
    rows.forEach((row) => {
      const quantity = parseFloat(row.quantity) || 0;
      const factor = EMISSION_FACTORS[row.source].factor;
      byScope[row.scope] += quantity * factor;
    });
    return [
      { name: "Scope 1", value: byScope["1"], color: CHART_COLORS.scope1 },
      { name: "Scope 2", value: byScope["2"], color: CHART_COLORS.scope2 },
      { name: "Scope 3", value: byScope["3"], color: CHART_COLORS.scope3 },
    ];
  };

  const calculateBySource = () => {
    const bySource: Record<string, number> = {};
    rows.forEach((row) => {
      const quantity = parseFloat(row.quantity) || 0;
      const factor = EMISSION_FACTORS[row.source].factor;
      const emission = quantity * factor;
      if (bySource[row.source]) {
        bySource[row.source] += emission;
      } else {
        bySource[row.source] = emission;
      }
    });
    return Object.entries(bySource).map(([source, value]) => ({
      name: EMISSION_FACTORS[source as keyof typeof EMISSION_FACTORS].name,
      value: parseFloat(value.toFixed(2)),
    }));
  };

  const totalEmissions = calculateTotal();
  const byScopeData = calculateByScope();
  const bySourceData = calculateBySource();

  return (
    <div>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Emissions Calculator" },
        ]}
      />

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              GHG Emissions Calculator
            </h1>
            <p className="text-gray-600 mt-1">
              Calculate greenhouse gas emissions across Scope 1, 2, and 3
            </p>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex gap-2">
          <Button
            onClick={() => setView("calculator")}
            variant={view === "calculator" ? "default" : "outline"}
            className={
              view === "calculator"
                ? "bg-green-600 hover:bg-green-700"
                : "hover:bg-gray-100"
            }
          >
            <Calculator className="mr-2 h-4 w-4" />
            Calculator
          </Button>
          <Button
            onClick={() => setView("results")}
            variant={view === "results" ? "default" : "outline"}
            className={
              view === "results"
                ? "bg-green-600 hover:bg-green-700"
                : "hover:bg-gray-100"
            }
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Results & Analysis
          </Button>
        </div>

        {/* Calculator View */}
        {view === "calculator" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="text-green-600" size={18} />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Scope 1 Emissions
                  </span>
                </div>
                <span className="text-2xl font-black text-gray-900 tabular-nums">
                  {byScopeData[0].value.toFixed(2)}
                </span>
                <span className="text-xs text-gray-500 ml-1">tCO2e</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="text-blue-600" size={18} />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Scope 2 Emissions
                  </span>
                </div>
                <span className="text-2xl font-black text-gray-900 tabular-nums">
                  {byScopeData[1].value.toFixed(2)}
                </span>
                <span className="text-xs text-gray-500 ml-1">tCO2e</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="text-teal-600" size={18} />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Scope 3 Emissions
                  </span>
                </div>
                <span className="text-2xl font-black text-gray-900 tabular-nums">
                  {byScopeData[2].value.toFixed(2)}
                </span>
                <span className="text-xs text-gray-500 ml-1">tCO2e</span>
              </div>
              <div className="bg-green-50 p-5 rounded-xl border border-green-200 shadow-sm">
                <span className="text-xs font-bold text-green-700 uppercase tracking-wider">
                  Total Emissions
                </span>
                <div className="mt-2">
                  <span className="text-2xl font-black text-green-900 tabular-nums">
                    {totalEmissions.toFixed(2)}
                  </span>
                  <span className="text-xs text-green-700 ml-1">tCO2e</span>
                </div>
              </div>
            </div>

            {/* Emission Factors Reference */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-md font-bold text-gray-900 mb-4 uppercase tracking-tight">
                Emission Factors Library (IPCC AR6)
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(EMISSION_FACTORS).map(([key, ef]) => (
                  <div
                    key={key}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="text-sm font-bold text-gray-900">
                      {ef.name}
                    </div>
                    <div className="text-xs text-gray-600 mt-1 font-semibold">
                      {ef.factor} {ef.unit}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calculator Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <h3 className="text-lg font-bold text-gray-900 uppercase tracking-tight">
                  Emission Calculations
                </h3>
                <div className="flex gap-3">
                  <Button onClick={addRow} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Row
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
                        Emission Source
                      </th>
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">
                        Unit
                      </th>
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">
                        Scope
                      </th>
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">
                        Emission Factor
                      </th>
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">
                        Total (tCO2e)
                      </th>
                      <th className="px-6 py-4 text-xs font-black uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {rows.map((row, i) => {
                      const ef = EMISSION_FACTORS[row.source];
                      const quantity = parseFloat(row.quantity) || 0;
                      const total = (quantity * ef.factor) / 1000; // Convert to tonnes

                      return (
                        <tr
                          key={row.id}
                          className={`hover:bg-green-50 transition-colors border-b border-gray-200 last:border-0 ${
                            i % 2 === 1 ? "bg-gray-50" : "bg-white"
                          }`}
                        >
                          <td className="px-6 py-4">
                            <select
                              value={row.source}
                              onChange={(e) =>
                                updateRow(
                                  row.id,
                                  "source",
                                  e.target.value as keyof typeof EMISSION_FACTORS,
                                )
                              }
                              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-900 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
                            >
                              {Object.entries(EMISSION_FACTORS).map(
                                ([key, ef]) => (
                                  <option key={key} value={key}>
                                    {ef.name}
                                  </option>
                                ),
                              )}
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <Input
                              type="number"
                              value={row.quantity}
                              onChange={(e) =>
                                updateRow(row.id, "quantity", e.target.value)
                              }
                              placeholder="0"
                              className="w-32"
                            />
                          </td>
                          <td className="px-6 py-4 text-gray-600 font-semibold">
                            {ef.unit.split("/")[1]}
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={row.scope}
                              onChange={(e) =>
                                updateRow(
                                  row.id,
                                  "scope",
                                  e.target.value as "1" | "2" | "3",
                                )
                              }
                              className="w-24 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-900 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/10"
                            >
                              <option value="1">Scope 1</option>
                              <option value="2">Scope 2</option>
                              <option value="3">Scope 3</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-gray-600 font-semibold tabular-nums">
                            {ef.factor} {ef.unit}
                          </td>
                          <td className="px-6 py-4 font-bold text-gray-900 tabular-nums">
                            {total.toFixed(3)}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => removeRow(row.id)}
                              className="p-1.5 hover:bg-red-100 text-gray-500 hover:text-red-600 rounded-lg transition-all"
                              disabled={rows.length === 1}
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-green-50 border-t-2 border-green-200">
                      <td
                        colSpan={5}
                        className="px-6 py-4 text-right font-black text-gray-900 uppercase tracking-wide"
                      >
                        Total GHG Emissions:
                      </td>
                      <td className="px-6 py-4 font-black text-green-900 text-lg tabular-nums">
                        {totalEmissions.toFixed(3)}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Results View */}
        {view === "results" && (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* Summary */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-tight">
                Emissions Summary
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-2 font-semibold">
                    Total Emissions Calculated
                  </p>
                  <p className="text-3xl font-black text-green-900 tabular-nums">
                    {totalEmissions.toFixed(2)} <span className="text-lg">tCO2e</span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2 font-semibold">
                    Emission Sources Tracked
                  </p>
                  <p className="text-3xl font-black text-gray-900 tabular-nums">
                    {rows.length}
                  </p>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-6">
              {/* Emissions by Scope */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-tight">
                  Emissions by Scope
                </h3>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={byScopeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) =>
                          value > 0
                            ? `${name}: ${value.toFixed(1)} tCO2e`
                            : ""
                        }
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {byScopeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Emissions by Source */}
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-tight">
                  Emissions by Source
                </h3>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={bySourceData}>
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
                        fill={CHART_COLORS.scope1}
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Breakdown Table */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-tight">
                Detailed Breakdown
              </h3>
              <div className="space-y-3">
                {byScopeData.map((scope) => (
                  <div
                    key={scope.name}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: scope.color }}
                      />
                      <span className="font-bold text-gray-900">
                        {scope.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-sm text-gray-600 font-semibold">
                        {scope.value.toFixed(2)} tCO2e
                      </span>
                      <span className="text-sm text-gray-600 font-semibold">
                        {totalEmissions > 0
                          ? ((scope.value / totalEmissions) * 100).toFixed(1)
                          : 0}
                        %
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
