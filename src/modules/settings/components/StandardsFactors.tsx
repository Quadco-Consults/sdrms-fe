"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";

interface EmissionFactor {
  id: number;
  fuelType: string;
  efValue: string;
  unit: string;
  source: string;
  standard: string;
}

export default function StandardsFactors() {
  const [emissionFactors] = useState<EmissionFactor[]>([
    {
      id: 1,
      fuelType: "Diesel",
      efValue: "0.00268",
      unit: "tCO2e/L",
      source: "IPCC 2021",
      standard: "AR6",
    },
    {
      id: 2,
      fuelType: "Natural Gas",
      efValue: "0.00202",
      unit: "tCO2e/m³",
      source: "IPCC 2021",
      standard: "AR6",
    },
    {
      id: 3,
      fuelType: "Nigerian Grid Electricity",
      efValue: "0.000431",
      unit: "tCO2e/kWh",
      source: "IEA 2024",
      standard: "AR6",
    },
  ]);

  return (
    <div className="space-y-8">
      {/* GWP Standards */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-extrabold text-gray-900 uppercase tracking-tight mb-4">
          GWP Standards Configuration
        </h3>
        <p className="text-xs text-gray-500 mb-6">
          Select your Global Warming Potential (GWP) calculation standard
        </p>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
              Active GWP Standard
            </label>
            <select className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all">
              <option>IPCC AR6 (2021)</option>
              <option>IPCC AR5 (2013)</option>
              <option>IPCC AR4 (2007)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
              Time Horizon
            </label>
            <select className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all">
              <option>100 years</option>
              <option>20 years</option>
              <option>500 years</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
              GHG Protocol Version
            </label>
            <select className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all">
              <option>Corporate Standard (Revised 2015)</option>
              <option>Product Standard</option>
              <option>Scope 3 Standard</option>
            </select>
          </div>
        </div>
      </div>

      {/* Emission Factors Library */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-extrabold text-gray-900 uppercase tracking-tight">
              Emission Factors Library
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Manage emission factors for accurate GHG calculations
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              <Upload size={16} className="mr-2" />
              Bulk Upload
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus size={16} className="mr-2" />
              Add Factor
            </Button>
          </div>
        </div>

        {/* Emission Factors Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="px-4 py-3 text-xs font-black uppercase tracking-widest">
                  Fuel Type
                </th>
                <th className="px-4 py-3 text-xs font-black uppercase tracking-widest">
                  EF Value
                </th>
                <th className="px-4 py-3 text-xs font-black uppercase tracking-widest">
                  Unit
                </th>
                <th className="px-4 py-3 text-xs font-black uppercase tracking-widest">
                  Source
                </th>
                <th className="px-4 py-3 text-xs font-black uppercase tracking-widest">
                  GWP Standard
                </th>
                <th className="px-4 py-3 text-xs font-black uppercase tracking-widest"></th>
              </tr>
            </thead>
            <tbody>
              {emissionFactors.map((ef, i) => (
                <tr
                  key={ef.id}
                  className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                    i % 2 === 1 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-3 text-sm font-extrabold text-gray-900">
                    {ef.fuelType}
                  </td>
                  <td className="px-4 py-3 text-sm font-extrabold text-green-700 tabular-nums">
                    {ef.efValue}
                  </td>
                  <td className="px-4 py-3 text-xs font-bold text-gray-600 font-mono">
                    {ef.unit}
                  </td>
                  <td className="px-4 py-3 text-xs font-bold text-gray-600">
                    {ef.source}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-700">
                      {ef.standard}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-gray-400 hover:text-green-600 transition-colors">
                      ✏️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reporting Frameworks */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-extrabold text-gray-900 uppercase tracking-tight mb-4">
          Reporting Frameworks
        </h3>
        <p className="text-xs text-gray-500 mb-6">
          Select frameworks for compliance reporting
        </p>

        <div className="grid grid-cols-2 gap-4">
          {[
            { name: "GRI Standards", status: "Active", fields: "142 data points" },
            { name: "ISSB (IFRS S1/S2)", status: "Active", fields: "89 data points" },
            { name: "CDP Climate Change", status: "Inactive", fields: "67 data points" },
            { name: "FMEnv Nigeria", status: "Active", fields: "54 data points" },
          ].map((framework) => (
            <div
              key={framework.name}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div>
                <div className="text-sm font-extrabold text-gray-900">
                  {framework.name}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {framework.fields}
                </div>
              </div>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  framework.status === "Active"
                    ? "bg-green-50 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {framework.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Save Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
        <Button variant="outline" className="text-gray-600">
          Cancel
        </Button>
        <Button className="bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20">
          Save Settings
        </Button>
      </div>
    </div>
  );
}
