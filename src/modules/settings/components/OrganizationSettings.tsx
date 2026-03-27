"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface BusinessUnit {
  id: number;
  name: string;
  code: string;
}

export default function OrganizationSettings() {
  const [businessUnits, setBusinessUnits] = useState<BusinessUnit[]>([
    { id: 1, name: "NNPC E&P", code: "NNPC-EP" },
    { id: 2, name: "NPDC", code: "NPDC" },
    { id: 3, name: "NGC", code: "NGC" },
    { id: 4, name: "PPMC", code: "PPMC" },
    { id: 5, name: "NLNG", code: "NLNG" },
  ]);

  const [newBU, setNewBU] = useState({ name: "", code: "" });

  const handleAddBU = () => {
    if (newBU.name && newBU.code) {
      setBusinessUnits([
        ...businessUnits,
        { id: Date.now(), name: newBU.name, code: newBU.code },
      ]);
      setNewBU({ name: "", code: "" });
    }
  };

  const handleDeleteBU = (id: number) => {
    setBusinessUnits(businessUnits.filter((bu) => bu.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Business Units */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-extrabold text-gray-900 uppercase tracking-tight">
              Business Units
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Manage your organization's business units for data segregation
            </p>
          </div>
        </div>

        {/* Add New BU Form */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                Business Unit Name
              </label>
              <input
                type="text"
                value={newBU.name}
                onChange={(e) => setNewBU({ ...newBU, name: e.target.value })}
                className="w-full h-10 px-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
                placeholder="e.g., NNPC Retail"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                Code
              </label>
              <input
                type="text"
                value={newBU.code}
                onChange={(e) => setNewBU({ ...newBU, code: e.target.value })}
                className="w-full h-10 px-3 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
                placeholder="e.g., NNPC-RT"
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleAddBU}
                className="bg-green-600 hover:bg-green-700 text-white w-full"
              >
                <Plus size={16} className="mr-2" />
                Add Business Unit
              </Button>
            </div>
          </div>
        </div>

        {/* Business Units List */}
        <div className="space-y-2">
          {businessUnits.map((bu) => (
            <div
              key={bu.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <div>
                <div className="text-sm font-extrabold text-gray-900">
                  {bu.name}
                </div>
                <div className="text-xs text-gray-500 font-mono mt-0.5">
                  {bu.code}
                </div>
              </div>
              <button
                onClick={() => handleDeleteBU(bu.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Reporting Periods */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-extrabold text-gray-900 uppercase tracking-tight mb-4">
          Reporting Periods
        </h3>
        <p className="text-xs text-gray-500 mb-6">
          Configure your reporting cycle preferences
        </p>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
              Fiscal Year Start
            </label>
            <select className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all">
              <option>January</option>
              <option>April</option>
              <option>July</option>
              <option>October</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
              Default Reporting Frequency
            </label>
            <select className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all">
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Annual</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
              Reporting Standard
            </label>
            <select className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all">
              <option>GRI Standards</option>
              <option>ISSB (IFRS S1/S2)</option>
              <option>CDP</option>
              <option>FMEnv Nigeria</option>
            </select>
          </div>
        </div>
      </div>

      {/* Facilities */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-extrabold text-gray-900 uppercase tracking-tight mb-4">
          Facilities & Locations
        </h3>
        <p className="text-xs text-gray-500 mb-6">
          Manage operational facilities across business units
        </p>

        <div className="grid grid-cols-2 gap-4">
          {[
            "Main Facility",
            "Offshore Platform A",
            "Refinery Complex",
            "Gas Plant 1",
          ].map((facility) => (
            <div
              key={facility}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
            >
              <span className="text-sm font-bold text-gray-900">{facility}</span>
              <span className="text-xs text-gray-500 bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-bold">
                Active
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50"
          >
            <Plus size={16} className="mr-2" />
            Add New Facility
          </Button>
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
