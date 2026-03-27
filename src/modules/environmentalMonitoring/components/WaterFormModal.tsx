"use client";
import { useState } from "react";
import { Paperclip } from "lucide-react";
import {
  WaterRecord,
  WATER_SOURCES,
  USE_AREAS,
  BUSINESS_UNITS,
  REPORTING_PERIODS,
  WATER_STATUSES,
} from "../data/waterConsumptionData";

export interface WaterFormData {
  waterSource: string;
  quantityWithdrawn: string;
  quantityDischarged: string;
  totalWaterConsumed: string;
  useArea: string;
  bu: string;
  reportingPeriod: string;
  status: string;
  date: string;
  notes: string;
}

interface WaterFormModalProps {
  open: boolean;
  onClose: () => void;
  isEditing: boolean;
  record?: WaterRecord | null;
  onSubmit: (data: WaterFormData) => void;
}

const emptyForm: WaterFormData = {
  waterSource: "",
  quantityWithdrawn: "",
  quantityDischarged: "",
  totalWaterConsumed: "",
  useArea: "",
  bu: "",
  reportingPeriod: "",
  status: "",
  date: "",
  notes: "",
};

export default function WaterFormModal({ open, onClose, isEditing, record, onSubmit }: WaterFormModalProps) {
  const [form, setForm] = useState<WaterFormData>(() =>
    isEditing && record
      ? {
          waterSource: record.waterSource,
          quantityWithdrawn: String(record.quantityWithdrawn),
          quantityDischarged: record.quantityDischarged,
          totalWaterConsumed: record.totalWaterConsumed,
          useArea: record.useArea,
          bu: record.bu,
          reportingPeriod: record.reportingPeriod,
          status: record.status,
          date: record.date,
          notes: record.note,
        }
      : emptyForm
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!open) return null;

  const update = (key: keyof WaterFormData, value: string) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      // Auto-calculate Total Water Consumed when quantity fields change
      if (key === "quantityWithdrawn" || key === "quantityDischarged") {
        const withdrawn = parseFloat(next.quantityWithdrawn);
        const discharged = parseFloat(next.quantityDischarged);
        if (!isNaN(withdrawn) && !isNaN(discharged)) {
          next.totalWaterConsumed = String(withdrawn - discharged);
        } else if (!isNaN(withdrawn)) {
          next.totalWaterConsumed = next.quantityWithdrawn;
        } else {
          next.totalWaterConsumed = "";
        }
      }
      return next;
    });
    if (errors[key]) setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    const qty = parseFloat(form.quantityWithdrawn);
    if (isNaN(qty) || qty <= 0) {
      errs.quantityWithdrawn = "Invalid quantity: Value must be greater than zero.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (type?: "draft" | "submit") => {
    if (validate()) {
      const status = type === "draft" ? "Pending" : (form.status || "Active");
      onSubmit({ ...form, status });
    }
  };

  const selectClass = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none bg-white";
  const inputClass   = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto p-8">
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {isEditing ? "Edit" : "Add"} Water Consumption Data
          </h2>
          {isEditing && (
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
          )}
        </div>

        <div className="space-y-4">
          {/* Row 1: Water Source Type | Quantity Withdrawn */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Water Source Type</label>
              <select value={form.waterSource} onChange={(e) => update("waterSource", e.target.value)} className={selectClass}>
                <option value="">Select source</option>
                {WATER_SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Quantity Withdrawn (Numeric — ML)</label>
              <input
                type="text"
                placeholder="Enter data"
                value={form.quantityWithdrawn}
                onChange={(e) => update("quantityWithdrawn", e.target.value)}
                className={`${inputClass} ${errors.quantityWithdrawn ? "border-red-500 focus:ring-red-500" : ""}`}
              />
              {errors.quantityWithdrawn && (
                <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-100 text-red-600 text-xs">!</span>
                  {errors.quantityWithdrawn}
                </p>
              )}
            </div>
          </div>

          {/* Row 2: Quantity Discharged | Total Water Consumed (auto-calculated) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Quantity Discharged (Numeric — ML)</label>
              <input type="text" placeholder="Enter data" value={form.quantityDischarged} onChange={(e) => update("quantityDischarged", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Total Water Consumed (Auto-calculated — ML)</label>
              <input
                type="text"
                placeholder="Select data"
                value={form.totalWaterConsumed}
                readOnly
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-500 bg-gray-50 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Row 3: Use Area | Directorate / Business Unit */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Use Area</label>
              <select value={form.useArea} onChange={(e) => update("useArea", e.target.value)} className={selectClass}>
                <option value="">Select type</option>
                {USE_AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Directorate / Business Unit</label>
              <select value={form.bu} onChange={(e) => update("bu", e.target.value)} className={selectClass}>
                <option value="">Select type</option>
                {BUSINESS_UNITS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>

          {/* Row 4: Reporting Period | Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">Reporting Period (Daily/WeeklyMonth/Quarter)</label>
              <select value={form.reportingPeriod} onChange={(e) => update("reportingPeriod", e.target.value)} className={selectClass}>
                <option value="">Select type</option>
                {REPORTING_PERIODS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Status</label>
              <select value={form.status} onChange={(e) => update("status", e.target.value)} className={selectClass}>
                <option value="">Select status</option>
                {WATER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Date</label>
            <input type="text" placeholder="dd/mm/yyyy" value={form.date} onChange={(e) => update("date", e.target.value)} className={`${inputClass} max-w-xs`} />
          </div>

          {/* Attach document */}
          <label className="flex items-center gap-2 text-green-600 text-sm cursor-pointer hover:text-green-700">
            <Paperclip className="h-4 w-4" />
            Attach document
            <input type="file" className="sr-only" />
          </label>

          {/* Notes */}
          <div>
            <label className="block text-xs text-gray-600 mb-1">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              rows={4}
              placeholder="Write a brief description..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            {isEditing ? (
              <>
                <button
                  onClick={() => handleSubmit("submit")}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 border border-green-600 text-green-600 text-sm font-semibold rounded-lg hover:bg-green-50 transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleSubmit("draft")}
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Save Draft
                </button>
                <button
                  onClick={() => handleSubmit("submit")}
                  className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Submit
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 border border-gray-300 text-gray-600 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
