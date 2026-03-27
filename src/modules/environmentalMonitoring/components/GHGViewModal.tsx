"use client";
import { X } from "lucide-react";
import { GHGRecord } from "../data/ghgEmissionsData";

interface GHGViewModalProps {
  open: boolean;
  onClose: () => void;
  record: GHGRecord | null;
}

export default function GHGViewModal({ open, onClose, record }: GHGViewModalProps) {
  if (!open || !record) return null;

  const rows = [
    { label: "Emission Scope",              value: record.emissionScope },
    { label: "Emission Source",             value: record.emissionSource },
    { label: "Directorate / Business Unit", value: record.bu },
    { label: "Emission Type",               value: record.emissionType },
    { label: "Quantity",                    value: String(record.quantity) },
    { label: "Unit Metrics",                value: "CO₂ Emissions" },
    { label: "Location",                    value: record.location },
    { label: "Note",                        value: record.note },
    { label: "Date",                        value: record.date },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-8">
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">View Greenhouse Gas Emissions Data</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {rows.map((row) => (
            <div key={row.label} className="flex justify-between">
              <span className="text-sm font-semibold text-gray-700 w-48 shrink-0">{row.label}</span>
              <span className="text-sm text-gray-600">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
