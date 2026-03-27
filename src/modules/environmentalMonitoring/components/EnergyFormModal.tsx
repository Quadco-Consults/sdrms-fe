"use client";
import { useState } from "react";
import { Paperclip } from "lucide-react";
import {
  EnergyRecord,
  ENERGY_SOURCES,
  RENEWABLE_OPTIONS,
  BUSINESS_UNITS,
} from "../data/energyConsumptionData";

interface EnergyFormData {
  energySource: string;
  quantity: string;
  unitMetrics: string;
  renewableType: string;
  bu: string;
  date: string;
  description: string;
}

interface EnergyFormModalProps {
  open: boolean;
  onClose: () => void;
  isEditing: boolean;
  record?: EnergyRecord | null;
  onSubmit: (data: EnergyFormData) => void;
}

const emptyForm: EnergyFormData = {
  energySource: "",
  quantity: "",
  unitMetrics: "",
  renewableType: "",
  bu: "",
  date: "",
  description: "",
};

export default function EnergyFormModal({ open, onClose, isEditing, record, onSubmit }: EnergyFormModalProps) {
  const [form, setForm] = useState<EnergyFormData>(() =>
    isEditing && record
      ? {
          energySource: record.energySource,
          quantity: String(record.quantity),
          unitMetrics: record.unitMetrics,
          renewableType: record.renewableType,
          bu: record.bu,
          date: record.date,
          description: record.note,
        }
      : emptyForm
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!open) return null;

  const update = (key: keyof EnergyFormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    const qty = parseFloat(form.quantity);
    if (isNaN(qty) || qty <= 0) {
      errs.quantity = "Invalid quantity: Value must be greater than zero.";
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
            {isEditing ? "Edit" : "Add"} Energy Consumption Data
          </h2>
          {isEditing && (
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
          )}
        </div>

        <div className="space-y-4">
          {/* Row 1: Energy Source Type | Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Energy Source Type</label>
              <select value={form.energySource} onChange={(e) => update("energySource", e.target.value)} className={selectClass}>
                <option value="">Select source</option>
                {ENERGY_SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
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
          </div>

          {/* Row 2: Unit of Measurement | Renewable/Non-Renewable */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Unit of Measurement</label>
              <input type="text" placeholder="Enter data" value={form.unitMetrics} onChange={(e) => update("unitMetrics", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Renewable/Non-Renewable</label>
              <select value={form.renewableType} onChange={(e) => update("renewableType", e.target.value)} className={selectClass}>
                <option value="">Select data</option>
                {RENEWABLE_OPTIONS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>

          {/* Row 3: Directorate / BU | Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Directorate / Business Unit</label>
              <select value={form.bu} onChange={(e) => update("bu", e.target.value)} className={selectClass}>
                <option value="">Select type</option>
                {BUSINESS_UNITS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
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
              {isEditing ? "Save Energy Consumption Data" : "Add Energy Consumption Data"}
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
