"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Pencil, Trash2, X } from "lucide-react";

interface EmissionFactor {
  id: number;
  fuelType: string;
  efValue: string;
  unit: string;
  source: string;
  standard: string;
}

export default function StandardsFactors() {
  const [gwpStandard, setGwpStandard] = useState("IPCC AR6 (2021)");
  const [timeHorizon, setTimeHorizon] = useState("100 years");
  const [ghgProtocol, setGhgProtocol] = useState("Corporate Standard (Revised 2015)");

  const [emissionFactors, setEmissionFactors] = useState<EmissionFactor[]>([
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

  const [showFactorModal, setShowFactorModal] = useState(false);
  const [editingFactor, setEditingFactor] = useState<EmissionFactor | null>(null);
  const [factorForm, setFactorForm] = useState({
    fuelType: "",
    efValue: "",
    unit: "",
    source: "",
    standard: "",
  });

  const handleAddFactor = () => {
    setFactorForm({ fuelType: "", efValue: "", unit: "", source: "", standard: "" });
    setEditingFactor(null);
    setShowFactorModal(true);
  };

  const handleEditFactor = (factor: EmissionFactor) => {
    setFactorForm({
      fuelType: factor.fuelType,
      efValue: factor.efValue,
      unit: factor.unit,
      source: factor.source,
      standard: factor.standard,
    });
    setEditingFactor(factor);
    setShowFactorModal(true);
  };

  const handleSaveFactor = () => {
    if (editingFactor) {
      setEmissionFactors(
        emissionFactors.map((ef) =>
          ef.id === editingFactor.id
            ? { ...editingFactor, ...factorForm }
            : ef
        )
      );
    } else {
      const newFactor: EmissionFactor = {
        id: Math.max(...emissionFactors.map((ef) => ef.id), 0) + 1,
        ...factorForm,
      };
      setEmissionFactors([...emissionFactors, newFactor]);
    }
    setShowFactorModal(false);
  };

  const handleDeleteFactor = (id: number) => {
    if (confirm("Are you sure you want to delete this emission factor?")) {
      setEmissionFactors(emissionFactors.filter((ef) => ef.id !== id));
    }
  };

  const handleSaveSettings = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-8">
      {/* GWP Standards */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          GWP Standards Configuration
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Select your Global Warming Potential (GWP) calculation standard
        </p>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Active GWP Standard
            </label>
            <select
              value={gwpStandard}
              onChange={(e) => setGwpStandard(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            >
              <option>IPCC AR6 (2021)</option>
              <option>IPCC AR5 (2013)</option>
              <option>IPCC AR4 (2007)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Horizon
            </label>
            <select
              value={timeHorizon}
              onChange={(e) => setTimeHorizon(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            >
              <option>100 years</option>
              <option>20 years</option>
              <option>500 years</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              GHG Protocol Version
            </label>
            <select
              value={ghgProtocol}
              onChange={(e) => setGhgProtocol(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            >
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
            <h3 className="text-lg font-semibold text-gray-900">
              Emission Factors Library
            </h3>
            <p className="text-sm text-gray-500 mt-1">
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
            <Button
              onClick={handleAddFactor}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Plus size={16} className="mr-2" />
              Add Factor
            </Button>
          </div>
        </div>

        {/* Emission Factors Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Fuel Type
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  EF Value
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Unit
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Source
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  GWP Standard
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {emissionFactors.map((ef) => (
                <tr
                  key={ef.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                    {ef.fuelType}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-green-700">
                    {ef.efValue}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {ef.unit}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {ef.source}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                      {ef.standard}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditFactor(ef)}
                        className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-green-600"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteFactor(ef.id)}
                        className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reporting Frameworks */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Reporting Frameworks
        </h3>
        <p className="text-sm text-gray-500 mb-6">
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
                <div className="text-sm font-semibold text-gray-900">
                  {framework.name}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {framework.fields}
                </div>
              </div>
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${
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
        <Button
          onClick={handleSaveSettings}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Save Settings
        </Button>
      </div>

      {/* Add/Edit Factor Modal */}
      {showFactorModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingFactor ? "Edit Emission Factor" : "Add Emission Factor"}
              </h3>
              <button
                onClick={() => setShowFactorModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fuel Type *
                  </label>
                  <input
                    type="text"
                    value={factorForm.fuelType}
                    onChange={(e) =>
                      setFactorForm({ ...factorForm, fuelType: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    placeholder="e.g., Diesel"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    EF Value *
                  </label>
                  <input
                    type="text"
                    value={factorForm.efValue}
                    onChange={(e) =>
                      setFactorForm({ ...factorForm, efValue: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    placeholder="e.g., 0.00268"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit *
                  </label>
                  <input
                    type="text"
                    value={factorForm.unit}
                    onChange={(e) =>
                      setFactorForm({ ...factorForm, unit: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    placeholder="e.g., tCO2e/L"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Source *
                  </label>
                  <input
                    type="text"
                    value={factorForm.source}
                    onChange={(e) =>
                      setFactorForm({ ...factorForm, source: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    placeholder="e.g., IPCC 2021"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GWP Standard *
                  </label>
                  <select
                    value={factorForm.standard}
                    onChange={(e) =>
                      setFactorForm({ ...factorForm, standard: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                  >
                    <option value="">Select standard...</option>
                    <option value="AR6">AR6</option>
                    <option value="AR5">AR5</option>
                    <option value="AR4">AR4</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setShowFactorModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveFactor}
                className="bg-green-600 hover:bg-green-700 text-white"
                disabled={
                  !factorForm.fuelType ||
                  !factorForm.efValue ||
                  !factorForm.unit ||
                  !factorForm.source ||
                  !factorForm.standard
                }
              >
                {editingFactor ? "Update Factor" : "Add Factor"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
