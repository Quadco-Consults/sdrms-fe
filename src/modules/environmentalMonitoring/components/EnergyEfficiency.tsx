"use client";
import { useState } from "react";
import { Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  ENERGY_SOURCES,
  RENEWABLE_OPTIONS,
  BUSINESS_UNITS,
} from "../data/energyConsumptionData";

// Mock data for energy metrics
const energyMetrics = [
  {
    label: "TOTAL CONSUMPTION",
    value: "450,000",
    unit: "kWh",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    borderColor: "border-green-200",
  },
  {
    label: "RENEWABLE ENERGY",
    value: "12",
    unit: "%",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    borderColor: "border-green-200",
  },
  {
    label: "GRID ELECTRICITY",
    value: "380,000",
    unit: "kWh",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
  },
  {
    label: "ENERGY INTENSITY",
    value: "12.5",
    unit: "kWh/unit",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-700",
    borderColor: "border-yellow-200",
  },
];

export default function EnergyEfficiency() {
  const [energyRecords, setEnergyRecords] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    energySource: "",
    quantity: "",
    unitMetrics: "kWh",
    renewableType: "",
    bu: "",
    date: "",
    description: "",
  });

  const handleSave = () => {
    if (!formData.quantity || parseFloat(formData.quantity) <= 0) {
      toast.error("Please enter a valid quantity greater than zero");
      return;
    }

    const newRecord = {
      id: String(Date.now()),
      entryDetails: `${formData.energySource} - ${formData.renewableType}`,
      quantityDisplay: `${formData.quantity} ${formData.unitMetrics}`,
      period: formData.date,
      status: "Draft",
      ...formData,
    };
    setEnergyRecords((prev) => [newRecord, ...prev]);
    setShowForm(false);
    setFormData({
      ...formData,
      energySource: "",
      quantity: "",
      date: "",
      description: "",
    });
    toast.success("Energy entry logged successfully.");
  };

  return (
    <div className="space-y-6">
      {/* Energy Metrics Cards */}
      <div className="grid grid-cols-4 gap-6">
        {energyMetrics.map((metric) => (
          <div
            key={metric.label}
            className={`${metric.bgColor} border ${metric.borderColor} rounded-xl p-6`}
          >
            <p className="text-xs font-semibold text-gray-500 mb-3">
              {metric.label}
            </p>
            <div className="flex items-baseline gap-2">
              <p className={`text-3xl font-bold ${metric.textColor}`}>
                {metric.value}
              </p>
              <p className="text-sm text-gray-600">{metric.unit}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Actions Bar */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-extrabold text-gray-900 uppercase tracking-tight">
          Energy Records
        </h3>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50"
          >
            <Upload size={16} className="mr-2" />
            Bulk Upload
          </Button>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {showForm ? (
              "✕ Close Form"
            ) : (
              <>
                <Plus size={16} className="mr-2" />
                Log Energy Entry
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl border-l-4 border-green-600 shadow-sm p-6 border border-gray-200">
          <h4 className="text-base font-extrabold text-gray-900 mb-6 uppercase tracking-wide">
            New Energy Entry
          </h4>
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Row 1: Energy Source | Renewable Type */}
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                Energy Source Type <span className="text-red-600">*</span>
              </label>
              <select
                value={formData.energySource}
                onChange={(e) =>
                  setFormData({ ...formData, energySource: e.target.value })
                }
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
              >
                <option value="">Select source</option>
                {ENERGY_SOURCES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                Renewable Type <span className="text-red-600">*</span>
              </label>
              <select
                value={formData.renewableType}
                onChange={(e) =>
                  setFormData({ ...formData, renewableType: e.target.value })
                }
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
              >
                <option value="">Select type</option>
                {RENEWABLE_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Row 2: Quantity | Unit Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                  Quantity <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) =>
                    setFormData({ ...formData, quantity: e.target.value })
                  }
                  className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
                  placeholder="Enter data"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                  Unit Metrics
                </label>
                <input
                  type="text"
                  value={formData.unitMetrics}
                  onChange={(e) =>
                    setFormData({ ...formData, unitMetrics: e.target.value })
                  }
                  className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
                  placeholder="Enter unit metrics"
                />
              </div>
            </div>

            {/* Row 3: Business Unit */}
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                Business Unit <span className="text-red-600">*</span>
              </label>
              <select
                value={formData.bu}
                onChange={(e) =>
                  setFormData({ ...formData, bu: e.target.value })
                }
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
              >
                <option value="">Select business unit</option>
                {BUSINESS_UNITS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Row 4: Date */}
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                Date <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
                placeholder="dd/mm/yyyy"
              />
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 min-h-[80px] resize-none focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
                placeholder="Enter description..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => setShowForm(false)}
              className="text-gray-600"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20"
            >
              Save as Draft
            </Button>
          </div>
        </div>
      )}

      {/* Records Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-teal-500 text-white">
              <th className="px-4 py-3 text-xs font-black uppercase tracking-widest">
                Entry Details
              </th>
              <th className="px-4 py-3 text-xs font-black uppercase tracking-widest">
                Quantity
              </th>
              <th className="px-4 py-3 text-xs font-black uppercase tracking-widest">
                Period
              </th>
              <th className="px-4 py-3 text-xs font-black uppercase tracking-widest">
                Status
              </th>
              <th className="px-4 py-3 text-xs font-black uppercase tracking-widest">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {energyRecords.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-20 text-center">
                  <div className="text-4xl mb-4">⚡</div>
                  <div className="text-gray-500 text-sm font-bold uppercase tracking-widest">
                    No energy logged yet. Click + Log Entry to begin.
                  </div>
                </td>
              </tr>
            ) : (
              energyRecords.map((record, i) => (
                <tr
                  key={record.id}
                  className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                    i % 2 === 1 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-3 text-sm font-extrabold text-gray-900">
                    {record.entryDetails}
                  </td>
                  <td className="px-4 py-3 text-sm font-extrabold text-gray-900 tabular-nums">
                    {record.quantityDisplay}
                  </td>
                  <td className="px-4 py-3 text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                    {record.period}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-700">
                      {record.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-gray-400 hover:text-green-600 transition-colors">
                      ✏️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
