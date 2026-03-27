"use client";
import { useState } from "react";
import { Paperclip } from "lucide-react";
import {
  GHGRecord,
  EMISSION_SCOPES,
  EMISSION_TYPES,
  BUSINESS_UNITS,
} from "../data/ghgEmissionsData";

interface GHGFormData {
  emissionScope: string;
  emissionSource: string;
  bu: string;
  emissionType: string;
  quantity: string;
  unitMetrics: string;
  totalEmissions: string;
  location: string;
  date: string;
  description: string;
}

interface GHGFormModalProps {
  open: boolean;
  onClose: () => void;
  isEditing: boolean;
  record?: GHGRecord | null;
  onSubmit: (data: GHGFormData) => void;
}

const emptyForm: GHGFormData = {
  emissionScope: "",
  emissionSource: "",
  bu: "",
  emissionType: "",
  quantity: "",
  unitMetrics: "",
  totalEmissions: "",
  location: "",
  date: "",
  description: "",
};

export default function GHGFormModal({ open, onClose, isEditing, record, onSubmit }: GHGFormModalProps) {
  const [form, setForm] = useState<GHGFormData>(() =>
    isEditing && record
      ? {
          emissionScope: record.emissionScope,
          emissionSource: record.emissionSource,
          bu: record.bu,
          emissionType: record.emissionType,
          quantity: String(record.quantity),
          unitMetrics: record.unitMetrics,
          totalEmissions: record.totalEmissions ? String(record.totalEmissions) : "",
          location: record.location,
          date: record.date,
          description: record.note,
        }
      : emptyForm
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!open) return null;

  const update = (key: keyof GHGFormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // clear error on change
    if (errors[key]) setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    const qty = parseFloat(form.quantity);
    if (isNaN(qty) || qty <= 0) {
      errs.quantity = "Invalid quantity: Emissions value must be greater than zero.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onSubmit(form);
  };

  const selectClass = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none bg-white";
  const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto p-8">
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {isEditing ? "Edit" : "Add"} Greenhouse Gas Emissions Data
          </h2>
          {isEditing && (
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">×</button>
          )}
        </div>

        <div className="space-y-4">
          {/* Row 1: Emission scope | Emission source */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Emission scope</label>
              <select value={form.emissionScope} onChange={(e) => update("emissionScope", e.target.value)} className={selectClass}>
                <option value="">Select scope</option>
                {EMISSION_SCOPES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Emission source (direct, indirect emissions)</label>
              <input type="text" placeholder="Enter data" value={form.emissionSource} onChange={(e) => update("emissionSource", e.target.value)} className={inputClass} />
            </div>
          </div>

          {/* Row 2: Directorate / BU | Emission Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Directorate / Business Unit</label>
              <select value={form.bu} onChange={(e) => update("bu", e.target.value)} className={selectClass}>
                <option value="">Select data</option>
                {BUSINESS_UNITS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Emission Type</label>
              <select value={form.emissionType} onChange={(e) => update("emissionType", e.target.value)} className={selectClass}>
                <option value="">Select type</option>
                {EMISSION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Row 3: Quantity | Unit Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Quantity</label>
              <input
                type="text"
                placeholder="Enter data"
                value={form.quantity}
                onChange={(e) => update("quantity", e.target.value)}
                className={`${inputClass} ${errors.quantity ? "border-red-500 focus:ring-red-500" : ""}`}
              />
              {errors.quantity && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-100 text-red-600 text-xs">!</span>
                  {errors.quantity}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Unit Metrics</label>
              <input type="text" placeholder="Enter unit metrics" value={form.unitMetrics} onChange={(e) => update("unitMetrics", e.target.value)} className={inputClass} />
            </div>
          </div>

          {/* Row 4: Total Emissions (disabled) | Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Total Emissions (tCO₂e)</label>
              <input type="text" placeholder="Total unit metrics" value={form.totalEmissions} readOnly className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-400 bg-gray-50" />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Location</label>
              <input type="text" placeholder="Enter Location" value={form.location} onChange={(e) => update("location", e.target.value)} className={inputClass} />
            </div>
          </div>

          {/* Row 5: Date (half width) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Date</label>
              <input type="text" placeholder="dd/mm/yyyy" value={form.date} onChange={(e) => update("date", e.target.value)} className={inputClass} />
            </div>
          </div>

          {/* Attach document */}
          <label className="flex items-center gap-2 text-green-600 text-sm cursor-pointer hover:text-green-700">
            <Paperclip className="h-4 w-4" />
            Attach document
            <input type="file" className="sr-only" />
          </label>

          {/* Description */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              rows={4}
              placeholder="Enter description..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-2">
            <button
              onClick={handleSubmit}
              className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              {isEditing ? "Save GHG Data" : "Add GHG Data"}
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2.5 border border-green-600 text-green-600 text-sm font-semibold rounded-lg hover:bg-green-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
