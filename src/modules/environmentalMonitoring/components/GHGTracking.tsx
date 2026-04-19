"use client";
import { useState } from "react";
import { FileText, Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  EMISSION_SCOPES,
  EMISSION_TYPES,
  BUSINESS_UNITS,
  LOCATIONS,
} from "../data/ghgEmissionsData";

// Mock data for scope metrics
const scopeMetrics = [
  {
    label: "TOTAL SCOPE 1",
    value: "1,200",
    unit: "tCO2e",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
  },
  {
    label: "TOTAL SCOPE 2",
    value: "320",
    unit: "tCO2e",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
  },
  {
    label: "TOTAL SCOPE 3",
    value: "80",
    unit: "tCO2e",
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
  },
  {
    label: "CARBON INTENSITY",
    value: "0.45",
    unit: "tCO2e/bbl",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
  },
];

export default function GHGTracking() {
  const [ghgRecords, setGhgRecords] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    emissionScope: "",
    emissionSource: "",
    bu: "",
    emissionType: "",
    quantity: "",
    unitMetrics: "Metric Tons CO₂e",
    location: "",
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
      entryDetails: `${formData.emissionSource} - ${formData.emissionScope}`,
      quantityDisplay: `${formData.quantity} ${formData.unitMetrics}`,
      period: formData.date,
      status: "Draft",
      ...formData,
    };
    setGhgRecords((prev) => [newRecord, ...prev]);
    setShowForm(false);
    setFormData({
      ...formData,
      emissionSource: "",
      quantity: "",
      location: "",
      date: "",
      description: "",
    });
    toast.success("GHG entry logged successfully.");
  };

  return (
    <div className="space-y-6">
      {/* Scope Metrics Cards */}
      <div className="grid grid-cols-4 gap-6">
        {scopeMetrics.map((metric) => (
          <div
            key={metric.label}
            className={`${metric.bgColor} border border-gray-200 rounded-xl p-6`}
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
          GHG Emissions Records
        </h3>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors">
            <FileText className="h-4 w-4" />
            TEMPLATE: UPSTREAM GHG TEMPLATE
          </button>
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
                Log GHG Entry
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl border-l-4 border-green-600 shadow-sm p-6 border border-gray-200">
          <h4 className="text-base font-extrabold text-gray-900 mb-6 uppercase tracking-wide">
            New Greenhouse Gas Entry
          </h4>
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Row 1: Emission scope | Emission source */}
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                Emission scope <span className="text-red-600">*</span>
              </label>
              <select
                value={formData.emissionScope}
                onChange={(e) =>
                  setFormData({ ...formData, emissionScope: e.target.value })
                }
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
              >
                <option value="">Select scope</option>
                {EMISSION_SCOPES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                Emission source (direct, indirect emissions) <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.emissionSource}
                onChange={(e) =>
                  setFormData({ ...formData, emissionSource: e.target.value })
                }
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
                placeholder="Enter data"
              />
            </div>

            {/* Row 2: Directorate / BU | Emission Type */}
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                Directorate / Business Unit <span className="text-red-600">*</span>
              </label>
              <select
                value={formData.bu}
                onChange={(e) =>
                  setFormData({ ...formData, bu: e.target.value })
                }
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
              >
                <option value="">Select data</option>
                {BUSINESS_UNITS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                Emission Type <span className="text-red-600">*</span>
              </label>
              <select
                value={formData.emissionType}
                onChange={(e) =>
                  setFormData({ ...formData, emissionType: e.target.value })
                }
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
              >
                <option value="">Select type</option>
                {EMISSION_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Row 3: Quantity | Unit Metrics */}
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

            {/* Row 4: Location */}
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                Location <span className="text-red-600">*</span>
              </label>
              <select
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
              >
                <option value="">Select location</option>
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Row 5: Date */}
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
            <tr className="bg-green-600 text-white">
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
            {ghgRecords.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-20 text-center">
                  <div className="text-4xl mb-4">🌍</div>
                  <div className="text-gray-500 text-sm font-bold uppercase tracking-widest">
                    No ghg emissions logged yet. Click + Log Entry to begin.
                  </div>
                </td>
              </tr>
            ) : (
              ghgRecords.map((record, i) => (
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
