"use client";
import { useState } from "react";
import { FileText, Upload, Plus, Download } from "lucide-react";
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
  const [dataView, setDataView] = useState<"quantitative" | "qualitative">("quantitative");
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      console.log("File uploaded:", file.name);
    }
  };

  const downloadTemplate = () => {
    const headers = [
      "Emission Scope",
      "Emission Source",
      "Business Unit",
      "Emission Type",
      "Quantity",
      "Unit Metrics",
      "Location",
      "Date",
      "Description",
    ];
    const csvContent =
      headers.join(",") +
      "\n" +
      "Scope 1,Combustion,Upstream,CO2,100,Metric Tons CO₂e,OML 123,2024-01-01,Sample description";

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ghg_emissions_template.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Toggle between Quantitative and Qualitative */}
      <div className="flex justify-end">
        <div className="flex gap-1 p-1 bg-gray-50 rounded-lg border border-gray-200">
          <button
            onClick={() => setDataView("quantitative")}
            className={`px-4 py-1.5 rounded text-xs font-bold transition-all ${
              dataView === "quantitative"
                ? "bg-green-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Quantitative
          </button>
          <button
            onClick={() => setDataView("qualitative")}
            className={`px-4 py-1.5 rounded text-xs font-bold transition-all ${
              dataView === "qualitative"
                ? "bg-green-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Qualitative
          </button>
        </div>
      </div>

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

      {dataView === "qualitative" ? (
        <GHGQualitativeDisclosures />
      ) : (
        <>
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
        </>
      )}

      {/* Bulk Upload Modal */}
      {showBulkUpload && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Bulk Upload: GHG Emissions
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Upload CSV or Excel files to log multiple GHG emission records at once.
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
                    <div className="font-mono text-gray-600">Emission Scope</div>
                    <div className="font-mono text-gray-600">Emission Source</div>
                    <div className="font-mono text-gray-600">Business Unit</div>
                    <div className="font-mono text-gray-600">Emission Type</div>
                    <div className="font-mono text-gray-600">Quantity</div>
                    <div className="font-mono text-gray-600">Unit Metrics</div>
                    <div className="font-mono text-gray-600">Location</div>
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
                  id="bulk-upload-ghg"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <label
                  htmlFor="bulk-upload-ghg"
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

// GHG Qualitative Disclosures Component
function GHGQualitativeDisclosures() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <div>
          <h3 className="text-base font-extrabold text-gray-900 uppercase tracking-wide">
            Qualitative GHG Disclosures
          </h3>
          <p className="text-xs text-gray-500 mt-1 font-medium">
            Narrative questionnaire responses for greenhouse gas emissions management
          </p>
        </div>
        <div className="flex gap-3">
          <button className="h-9 px-4 bg-white border border-gray-300 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all">
            Save Draft
          </button>
          <button className="h-9 px-5 bg-green-600 text-white rounded-lg text-xs font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 flex items-center gap-2">
            Submit Disclosures
          </button>
        </div>
      </div>

      <div className="p-8 space-y-12">
        {/* Section A: Climate Governance & Risk Disclosures */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-l-4 border-green-600 pl-4 py-1">
            <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">
              Section A: Climate Governance & Risk Disclosures
            </h4>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <GHGQualitativeQuestion
              number={1}
              question="Strategic Climate Responsibility (S/BU)"
              mapping="TCFD Governance"
              color="green"
            />
            <GHGQualitativeQuestion
              number={2}
              question="Board Oversight (Climate/GHG)"
              mapping="TCFD Governance"
              color="green"
            />
            <GHGQualitativeQuestion
              number={3}
              question="Climate-Linked Executive Incentives"
              mapping="TCFD Strategy"
              color="green"
            />
            <GHGQualitativeQuestion
              number={4}
              question="Scenario-Based Resilience Testing"
              mapping="TCFD Strategy"
              color="green"
            />
            <GHGQualitativeQuestion
              number={5}
              question="Climate Adaptation & Transition Policies"
              mapping="GRI 2-23"
              color="green"
            />
            <GHGQualitativeQuestion
              number={6}
              question="Methane Mitigation Strategies & Low-Carbon Transition Plan"
              mapping="OGMP 2.0"
              color="green"
            />
            <GHGQualitativeQuestion
              number={7}
              question="Leak Detection and Repair (LDAR) Implementation Details"
              mapping="OGMP 2.0"
              color="green"
            />
            <GHGQualitativeQuestion
              number={8}
              question="Venting Reduction Initiatives & Progress"
              mapping="GRI 305"
              color="green"
            />
            <GHGQualitativeQuestion
              number={9}
              question="Flaring Reduction Targets and Abatement Technology"
              mapping="Zero Routine Flaring"
              color="green"
            />
            <GHGQualitativeQuestion
              number={10}
              question="Data Quality Assurance & Internal Audit Protocols for GHG"
              mapping="Assurance"
              color="green"
            />
          </div>
        </div>

        {/* Section B: GHG Emissions Strategy & Performance Analysis */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-l-4 border-orange-500 pl-4 py-1">
            <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">
              Section B: GHG Emissions Strategy & Performance Analysis
            </h4>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <GHGQualitativeQuestion
              number={11}
              question="GHG Emission Reduction Goals"
              mapping="GRI 305"
              color="orange"
            />
            <GHGQualitativeQuestion
              number={12}
              question="GHG Target Performance Analysis"
              mapping="GRI 305"
              color="orange"
            />
            <GHGQualitativeQuestion
              number={13}
              question="Emissions Calculation Methodologies"
              mapping="GRI 305"
              color="orange"
            />
          </div>
        </div>
      </div>

      <div className="p-8 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-500">
          <span className="text-xs font-bold uppercase tracking-wider">
            Last autosaved at {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        <button className="px-10 py-3 bg-green-600 text-white rounded-xl text-sm font-black uppercase tracking-widest hover:bg-green-700 transition-all shadow-xl shadow-green-600/20">
          Save Disclosures
        </button>
      </div>
    </div>
  );
}

// Reusable Question Component for GHG
function GHGQualitativeQuestion({
  number,
  question,
  mapping,
  color
}: {
  number: number;
  question: string;
  mapping: string;
  color: "green" | "orange";
}) {
  const colorClasses = {
    green: {
      number: "text-green-600",
      border: "hover:border-green-600/30",
      focus: "focus:border-green-600 focus:ring-green-600/5",
    },
    orange: {
      number: "text-orange-500",
      border: "hover:border-orange-500/30",
      focus: "focus:border-orange-500 focus:ring-orange-500/5",
    },
  };

  return (
    <div className={`p-6 bg-gray-50/50 rounded-xl border border-gray-200 transition-all group ${colorClasses[color].border}`}>
      <div className="flex justify-between items-start mb-4">
        <label className="text-sm font-bold text-gray-900 flex-1 pr-8 leading-tight">
          <span className={`${colorClasses[color].number} mr-2 font-black tabular-nums`}>
            {number}.
          </span>
          {question}
        </label>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-black uppercase text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200 tracking-tight">
            {mapping}
          </span>
        </div>
      </div>
      <textarea
        className={`w-full h-24 p-4 rounded-lg bg-white border border-gray-300 text-sm transition-all resize-none shadow-sm font-medium text-gray-900 placeholder:text-gray-400 ${colorClasses[color].focus} focus:outline-none focus:ring-4`}
        placeholder="Provide detailed narrative response according to the framework requirements..."
      />
    </div>
  );
}
