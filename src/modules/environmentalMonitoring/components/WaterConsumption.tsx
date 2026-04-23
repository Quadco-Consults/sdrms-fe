"use client";
import { useState } from "react";
import { FileText, Upload, Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  WATER_SOURCES,
  USE_AREAS,
  BUSINESS_UNITS,
} from "../data/waterConsumptionData";

// Mock data for water metrics
const waterMetrics = [
  {
    label: "TOTAL WITHDRAWAL",
    value: "25,400",
    unit: "m³",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
  },
  {
    label: "WATER RECYCLED",
    value: "4,200",
    unit: "m³",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    borderColor: "border-green-200",
  },
  {
    label: "DISCHARGE",
    value: "18,100",
    unit: "m³",
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
    borderColor: "border-orange-200",
  },
  {
    label: "WATER STRESS INDEX",
    value: "Low",
    unit: "",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    borderColor: "border-green-200",
  },
];

export default function WaterConsumption() {
  const [waterRecords, setWaterRecords] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    waterSource: "",
    quantity: "",
    unitMetrics: "m³",
    useArea: "",
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
      entryDetails: `${formData.waterSource} - ${formData.useArea}`,
      quantityDisplay: `${formData.quantity} ${formData.unitMetrics}`,
      period: formData.date,
      status: "Draft",
      ...formData,
    };
    setWaterRecords((prev) => [newRecord, ...prev]);
    setShowForm(false);
    setFormData({
      ...formData,
      waterSource: "",
      quantity: "",
      date: "",
      description: "",
    });
    toast.success("Water entry logged successfully.");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      console.log("File uploaded:", file.name);
    }
  };

  const downloadTemplate = () => {
    const headers = [
      "Water Source",
      "Quantity",
      "Unit Metrics",
      "Use Area",
      "Business Unit",
      "Date",
      "Description",
    ];
    const csvContent =
      headers.join(",") +
      "\n" +
      "Surface Water,1000,m³,Production,Upstream,2024-01-01,Sample description";

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "water_consumption_template.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Water Metrics Cards */}
      <div className="grid grid-cols-4 gap-6">
        {waterMetrics.map((metric) => (
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
              {metric.unit && <p className="text-sm text-gray-600">{metric.unit}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Actions Bar */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-extrabold text-gray-900 uppercase tracking-tight">
          Water Records
        </h3>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors">
            <FileText className="h-4 w-4" />
            TEMPLATE: UPSTREAM WATER TEMPLATE
          </button>
          <Button
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50"
            onClick={() => setShowBulkUpload(true)}
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
                Log Water Entry
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl border-l-4 border-green-600 shadow-sm p-6 border border-gray-200">
          <h4 className="text-base font-extrabold text-gray-900 mb-6 uppercase tracking-wide">
            New Water Entry
          </h4>
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Row 1: Water Source | Use Area */}
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                Water Source <span className="text-red-600">*</span>
              </label>
              <select
                value={formData.waterSource}
                onChange={(e) =>
                  setFormData({ ...formData, waterSource: e.target.value })
                }
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
              >
                <option value="">Select source</option>
                {WATER_SOURCES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                Use Area <span className="text-red-600">*</span>
              </label>
              <select
                value={formData.useArea}
                onChange={(e) =>
                  setFormData({ ...formData, useArea: e.target.value })
                }
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
              >
                <option value="">Select area</option>
                {USE_AREAS.map((a) => (
                  <option key={a} value={a}>
                    {a}
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
            {waterRecords.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-20 text-center">
                  <div className="text-4xl mb-4">💧</div>
                  <div className="text-gray-500 text-sm font-bold uppercase tracking-widest">
                    No water logged yet. Click + Log Entry to begin.
                  </div>
                </td>
              </tr>
            ) : (
              waterRecords.map((record, i) => (
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

      {/* Bulk Upload Modal */}
      {showBulkUpload && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Bulk Upload: Water Consumption
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Upload CSV or Excel files to log multiple water consumption records at once.
              </p>
            </div>

            <div className="p-6">
              {/* File Structure */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Expected File Structure
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="font-mono text-gray-600">Water Source</div>
                    <div className="font-mono text-gray-600">Quantity</div>
                    <div className="font-mono text-gray-600">Unit Metrics</div>
                    <div className="font-mono text-gray-600">Use Area</div>
                    <div className="font-mono text-gray-600">Business Unit</div>
                    <div className="font-mono text-gray-600">Date</div>
                    <div className="font-mono text-gray-600">Description</div>
                  </div>
                </div>
                <button
                  onClick={downloadTemplate}
                  className="mt-3 text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download CSV Template
                </button>
              </div>

              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors">
                <input
                  type="file"
                  id="bulk-upload-water"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="bulk-upload-water"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className="h-12 w-12 text-gray-400 mb-3" />
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {uploadedFile
                      ? `Selected: ${uploadedFile.name}`
                      : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-xs text-gray-500">
                    CSV or Excel files only (max 10MB)
                  </p>
                </label>
              </div>

              {uploadedFile && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">
                    File ready for upload: {uploadedFile.name}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    Click "Upload" to process this file
                  </p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowBulkUpload(false);
                  setUploadedFile(null);
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                disabled={!uploadedFile}
                onClick={() => {
                  toast.success("Bulk upload completed successfully!");
                  setShowBulkUpload(false);
                  setUploadedFile(null);
                }}
              >
                Upload
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
