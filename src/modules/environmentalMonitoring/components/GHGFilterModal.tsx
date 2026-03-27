"use client";
import { useState } from "react";
import { X, Calendar } from "lucide-react";
import { EMISSION_SCOPES, EMISSION_TYPES, BUSINESS_UNITS } from "../data/ghgEmissionsData";

export interface GHGFilters {
  scope: string;
  emissionType: string;
  bu: string;
  status: string;
  dateFrom: string;
  dateTo: string;
}

interface GHGFilterModalProps {
  open: boolean;
  onClose: () => void;
  filters: GHGFilters;
  onApply: (filters: GHGFilters) => void;
}

const emptyFilters: GHGFilters = { scope: "", emissionType: "", bu: "", status: "", dateFrom: "", dateTo: "" };

export default function GHGFilterModal({ open, onClose, filters, onApply }: GHGFilterModalProps) {
  const [local, setLocal] = useState<GHGFilters>(filters);

  if (!open) return null;

  const update = (key: keyof GHGFilters, value: string) =>
    setLocal((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* panel */}
      <div className="relative w-96 bg-white shadow-xl overflow-y-auto">
        <div className="p-6 space-y-5">
          {/* header */}
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

          {/* Scope */}
          <div className="space-y-1.5">
            <label className="text-sm text-gray-600">Scope</label>
            <select
              value={local.scope}
              onChange={(e) => update("scope", e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none bg-white"
            >
              <option value="">choose any</option>
              {EMISSION_SCOPES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Emission Type */}
          <div className="space-y-1.5">
            <label className="text-sm text-gray-600">Emission Type</label>
            <select
              value={local.emissionType}
              onChange={(e) => update("emissionType", e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none bg-white"
            >
              <option value="">choose any</option>
              {EMISSION_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          {/* BU */}
          <div className="space-y-1.5">
            <label className="text-sm text-gray-600">BU</label>
            <select
              value={local.bu}
              onChange={(e) => update("bu", e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none bg-white"
            >
              <option value="">choose any</option>
              {BUSINESS_UNITS.map((b) => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <label className="text-sm text-gray-600">Status</label>
            <select
              value={local.status}
              onChange={(e) => update("status", e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none bg-white"
            >
              <option value="">choose any</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
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
