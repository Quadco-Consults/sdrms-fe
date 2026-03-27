"use client";
import { useState } from "react";
import { X, Calendar } from "lucide-react";
import { WATER_SOURCES, BUSINESS_UNITS } from "../data/waterConsumptionData";

export interface WaterFilters {
  waterSource: string;
  bu: string;
  dateFrom: string;
  dateTo: string;
}

interface WaterFilterModalProps {
  open: boolean;
  onClose: () => void;
  filters: WaterFilters;
  onApply: (filters: WaterFilters) => void;
}

const emptyFilters: WaterFilters = {
  waterSource: "",
  bu: "",
  dateFrom: "",
  dateTo: "",
};

export default function WaterFilterModal({ open, onClose, filters, onApply }: WaterFilterModalProps) {
  const [local, setLocal] = useState<WaterFilters>(filters);

  if (!open) return null;

  const update = (key: keyof WaterFilters, value: string) =>
    setLocal((prev) => ({ ...prev, [key]: value }));

  const selectClass = "w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none bg-white";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6">
        <div className="space-y-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Filter</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => { setLocal(emptyFilters); onApply(emptyFilters); }}
              className="text-green-600 text-sm font-medium hover:text-green-700"
            >
              Reset all
            </button>
          </div>

          {/* Water Source Type */}
          <div className="space-y-1.5">
            <label className="text-sm text-gray-600">Water Source Type</label>
            <select value={local.waterSource} onChange={(e) => update("waterSource", e.target.value)} className={selectClass}>
              <option value="">choose any</option>
              {WATER_SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* BU */}
          <div className="space-y-1.5">
            <label className="text-sm text-gray-600">BU</label>
            <select value={local.bu} onChange={(e) => update("bu", e.target.value)} className={selectClass}>
              <option value="">choose any</option>
              {BUSINESS_UNITS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          {/* Date range */}
          <div className="space-y-1.5">
            <label className="text-sm text-gray-600">Date</label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="from"
                  value={local.dateFrom}
                  onChange={(e) => update("dateFrom", e.target.value)}
                  className="w-full pl-3 pr-8 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="to"
                  value={local.dateTo}
                  onChange={(e) => update("dateTo", e.target.value)}
                  className="w-full pl-3 pr-8 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Done */}
          <button
            onClick={() => { onApply(local); onClose(); }}
            className="w-full py-2.5 border border-green-600 rounded-lg text-green-600 text-sm font-semibold hover:bg-green-50 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
