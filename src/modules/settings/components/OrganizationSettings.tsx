"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function OrganizationSettings() {
  const [orgName, setOrgName] = useState("NNPC Limited");
  const [businessUnit, setBusinessUnit] = useState("Corporate Strategy & Sustainability");
  const [reportingYear, setReportingYear] = useState("2026");
  const [currency, setCurrency] = useState("USD");
  const [regulatoryContext, setRegulatoryContext] = useState("Dual (Nigerian + International)");

  const handleSave = () => {
    // Handle save logic
    console.log("Settings saved");
  };

  return (
    <div className="space-y-6">
      {/* Organisation Settings Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Organisation Settings
        </h3>

        <div className="space-y-6">
          {/* Organisation Name */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ORGANISATION NAME
              </label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                BUSINESS UNIT
              </label>
              <select
                value={businessUnit}
                onChange={(e) => setBusinessUnit(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              >
                <option>Corporate Strategy & Sustainability</option>
                <option>NNPC E&P</option>
                <option>NPDC</option>
                <option>NGC</option>
                <option>PPMC</option>
              </select>
            </div>
          </div>

          {/* Primary Reporting Year & Currency */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PRIMARY REPORTING YEAR
              </label>
              <select
                value={reportingYear}
                onChange={(e) => setReportingYear(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              >
                <option>2024</option>
                <option>2025</option>
                <option>2026</option>
                <option>2027</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CURRENCY
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              >
                <option>USD</option>
                <option>NGN</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </div>
          </div>

          {/* Regulatory Context */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              REGULATORY CONTEXT
            </label>
            <select
              value={regulatoryContext}
              onChange={(e) => setRegulatoryContext(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            >
              <option>Dual (Nigerian + International)</option>
              <option>Nigerian Only</option>
              <option>International Only</option>
            </select>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <Button
              onClick={handleSave}
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2"
            >
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
