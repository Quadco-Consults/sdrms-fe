"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import KPICard from "@/components/shared/KPICard";
import { Plus, Upload, Filter, Download } from "lucide-react";
import { CHART_COLORS } from "@/data/dashboard-mock";

interface AirQualityRecord {
  id: number;
  pollutant: string;
  concentration: string;
  unit: string;
  source: string;
  limitValue: string;
  period: string;
  businessUnit: string;
  facility: string;
  status: string;
}

export default function AirQuality() {
  const [showForm, setShowForm] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [records, setRecords] = useState<AirQualityRecord[]>([
    {
      id: 1,
      pollutant: "NOx",
      concentration: "85",
      unit: "mg/Nm³",
      source: "Stack",
      limitValue: "200",
      period: "Jan 2026",
      businessUnit: "NNPC E&P",
      facility: "Main Facility",
      status: "Draft",
    },
  ]);

  const [formData, setFormData] = useState({
    pollutant: "NOx",
    concentration: "",
    unit: "mg/Nm³",
    source: "Stack",
    limitValue: "",
    period: "Jan 2026",
    businessUnit: "NNPC E&P",
    facility: "Main Facility",
    notes: "",
  });

  const handleSave = () => {
    const newRecord: AirQualityRecord = {
      ...formData,
      id: Date.now(),
      status: "Draft",
    };
    setRecords([newRecord, ...records]);
    setShowForm(false);
    setFormData({
      ...formData,
      concentration: "",
      limitValue: "",
      notes: "",
    });
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
      "Pollutant",
      "Concentration",
      "Unit",
      "Source",
      "Limit Value",
      "Period",
      "Business Unit",
      "Facility",
      "Notes",
    ];
    const csvContent =
      headers.join(",") +
      "\n" +
      "NOx,85,mg/Nm³,Stack,200,Jan 2026,NNPC E&P,Main Facility,Sample notes";

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "air_quality_template.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <KPICard
          label="NOx Average"
          value="85"
          unit="mg/Nm³"
          color={CHART_COLORS.warning}
        />
        <KPICard
          label="SOx Average"
          value="42"
          unit="mg/Nm³"
          color={CHART_COLORS.success}
        />
        <KPICard
          label="PM10 Average"
          value="28"
          unit="µg/m³"
          color={CHART_COLORS.blue}
        />
        <KPICard
          label="VOC Total"
          value="156"
          unit="ppm"
          color={CHART_COLORS.primary}
        />
      </div>

      {/* Actions Bar */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-extrabold text-gray-900 uppercase tracking-tight">
          Air Quality Records
        </h3>
        <div className="flex gap-3">
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
                Log Air Quality Data
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl border-l-4 border-green-600 shadow-sm p-6 border border-gray-200">
          <h4 className="text-base font-extrabold text-gray-900 mb-6 uppercase tracking-wide">
            New Air Quality Entry
          </h4>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                Pollutant <span className="text-red-600">*</span>
              </label>
              <select
                value={formData.pollutant}
                onChange={(e) =>
                  setFormData({ ...formData, pollutant: e.target.value })
                }
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
              >
                <option>NOx</option>
                <option>SOx</option>
                <option>PM10</option>
                <option>PM2.5</option>
                <option>VOCs</option>
                <option>CO</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                Source <span className="text-red-600">*</span>
              </label>
              <select
                value={formData.source}
                onChange={(e) =>
                  setFormData({ ...formData, source: e.target.value })
                }
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
              >
                <option>Stack</option>
                <option>Ambient</option>
                <option>Flare</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                  Concentration <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  value={formData.concentration}
                  onChange={(e) =>
                    setFormData({ ...formData, concentration: e.target.value })
                  }
                  className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                  Unit
                </label>
                <select
                  value={formData.unit}
                  onChange={(e) =>
                    setFormData({ ...formData, unit: e.target.value })
                  }
                  className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
                >
                  <option>mg/Nm³</option>
                  <option>µg/m³</option>
                  <option>ppm</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                Regulatory Limit Value
              </label>
              <input
                type="number"
                value={formData.limitValue}
                onChange={(e) =>
                  setFormData({ ...formData, limitValue: e.target.value })
                }
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
                placeholder="e.g., 200"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                  Facility <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.facility}
                  onChange={(e) =>
                    setFormData({ ...formData, facility: e.target.value })
                  }
                  className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                  Business Unit
                </label>
                <input
                  type="text"
                  value={formData.businessUnit}
                  readOnly
                  className="w-full h-10 px-3 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                Reporting Period <span className="text-red-600">*</span>
              </label>
              <select
                value={formData.period}
                onChange={(e) =>
                  setFormData({ ...formData, period: e.target.value })
                }
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
              >
                <option>Jan 2026</option>
                <option>Feb 2026</option>
                <option>Mar 2026</option>
                <option>Q1 2026</option>
                <option>Annual 2026</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 min-h-[80px] resize-none focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
                placeholder="Additional notes..."
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
                Pollutant
              </th>
              <th className="px-4 py-3 text-xs font-black uppercase tracking-widest">
                Concentration
              </th>
              <th className="px-4 py-3 text-xs font-black uppercase tracking-widest">
                Source
              </th>
              <th className="px-4 py-3 text-xs font-black uppercase tracking-widest">
                Limit
              </th>
              <th className="px-4 py-3 text-xs font-black uppercase tracking-widest">
                Period
              </th>
              <th className="px-4 py-3 text-xs font-black uppercase tracking-widest">
                Status
              </th>
              <th className="px-4 py-3 text-xs font-black uppercase tracking-widest"></th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-20 text-center">
                  <div className="text-4xl mb-4">🌫️</div>
                  <div className="text-gray-500 text-sm font-bold uppercase tracking-widest">
                    No air quality data logged yet.
                  </div>
                </td>
              </tr>
            ) : (
              records.map((record, i) => (
                <tr
                  key={record.id}
                  className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                    i % 2 === 1 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-3 text-sm font-extrabold text-gray-900">
                    {record.pollutant}
                  </td>
                  <td className="px-4 py-3 text-sm font-extrabold text-gray-900 tabular-nums">
                    {record.concentration} {record.unit}
                  </td>
                  <td className="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider">
                    {record.source}
                  </td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-600 tabular-nums">
                    {record.limitValue} {record.unit}
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
                Bulk Upload: Air Quality
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Upload CSV or Excel files to log multiple air quality records at once.
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
                    <div className="font-mono text-gray-600">Pollutant</div>
                    <div className="font-mono text-gray-600">Concentration</div>
                    <div className="font-mono text-gray-600">Unit</div>
                    <div className="font-mono text-gray-600">Source</div>
                    <div className="font-mono text-gray-600">Limit Value</div>
                    <div className="font-mono text-gray-600">Period</div>
                    <div className="font-mono text-gray-600">Business Unit</div>
                    <div className="font-mono text-gray-600">Facility</div>
                    <div className="font-mono text-gray-600">Notes</div>
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
                  id="bulk-upload-air-quality"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="bulk-upload-air-quality"
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
