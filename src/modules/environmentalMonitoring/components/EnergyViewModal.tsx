"use client";
import { X } from "lucide-react";
import { EnergyRecord } from "../data/energyConsumptionData";

interface EnergyViewModalProps {
  open: boolean;
  onClose: () => void;
  record: EnergyRecord | null;
  onDelete: (id: string) => void;
}

export default function EnergyViewModal({ open, onClose, record, onDelete }: EnergyViewModalProps) {
  if (!open || !record) return null;

  const rows = [
    { label: "Energy Source",               value: record.energySource },
    { label: "Quantity",                    value: String(record.quantity) },
    { label: "Unit of Measurement",         value: record.unitMetrics },
    { label: "Renewable/Non-Renewable",     value: record.renewableType },
    { label: "Directorate / Business Unit", value: record.bu },
    { label: "Note",                        value: record.note },
    { label: "Date",                        value: record.date },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-8">
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">View Energy Consumption Data</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 mb-8">
          {rows.map((row) => (
            <div key={row.label} className="flex justify-between">
              <span className="text-sm font-semibold text-gray-700 w-48 shrink-0">{row.label}</span>
              <span className="text-sm text-gray-600">{row.value}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => onDelete(record.id)}
            className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Delete Energy Consumption
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
  );
}
