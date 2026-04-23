"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, Plus, MoreHorizontal, Eye, Pencil, Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const ROWS_PER_PAGE = 20;

// Mock data for KPI metrics
const kpiMetrics = [
  {
    label: "TOTAL CH4",
    value: "125.4",
    unit: "MT",
    bgColor: "bg-red-50",
    textColor: "text-red-700",
  },
  {
    label: "TOTAL GAS FLARED",
    value: "450",
    unit: "MMscf",
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
  },
  {
    label: "OPERATED PROD.",
    value: "1.2",
    unit: "MMbbl",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
  },
  {
    label: "COMPLIANCE SCORE",
    value: "Level 2",
    unit: "",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
  },
];

// Types
interface MethaneRecord {
  id: string;
  recordId: string;
  emissionSource: string;
  quantity: number;
  unit: string;
  location: string;
  note: string;
  category: string;
  methodology: string;
  bu: string;
  date: string;
  status: string;
}

// Mock Data
const INITIAL_RECORDS: MethaneRecord[] = [];

export default function Methane() {
  const [records, setRecords] = useState<MethaneRecord[]>(INITIAL_RECORDS);
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const actionRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [dataView, setDataView] = useState<"quantitative" | "qualitative">("quantitative");

  // Modal states
  const [showAddForm, setShowAddForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<MethaneRecord | null>(null);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Form data
  const [formData, setFormData] = useState<Partial<MethaneRecord>>({
    recordId: "",
    emissionSource: "",
    quantity: 0,
    unit: "MT",
    location: "",
    note: "",
    category: "Methane Performance",
    methodology: "Engineering Calculation (L1)",
    bu: "Upstream",
    date: "",
    status: "Draft",
  });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (actionRef.current && !actionRef.current.contains(e.target as Node)) {
        setOpenActionId(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const totalPages = Math.ceil(records.length / ROWS_PER_PAGE) || 1;
  const paginated = records.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const renderPages = () => {
    const btns: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) btns.push(i);
    } else {
      btns.push(1, 2, "...", totalPages - 1, totalPages);
    }
    return btns;
  };

  // CRUD Handlers
  const handleAddRecord = () => {
    const newRecord: MethaneRecord = {
      id: `CH4-${String(records.length + 1).padStart(3, "0")}`,
      recordId: formData.recordId || `REC-${Date.now()}`,
      emissionSource: formData.emissionSource!,
      quantity: formData.quantity!,
      unit: formData.unit!,
      location: formData.location!,
      note: formData.note!,
      category: formData.category!,
      methodology: formData.methodology!,
      bu: formData.bu!,
      date: formData.date!,
      status: formData.status!,
    };
    setRecords([...records, newRecord]);
    setShowAddForm(false);
    resetForm();
  };

  const handleEditRecord = () => {
    if (!selectedRecord) return;
    setRecords(
      records.map((record) =>
        record.id === selectedRecord.id
          ? { ...record, ...formData }
          : record
      )
    );
    setShowEditForm(false);
    setSelectedRecord(null);
    resetForm();
  };

  const handleDeleteRecord = (id: string) => {
    if (confirm("Are you sure you want to delete this record?")) {
      setRecords(records.filter((record) => record.id !== id));
    }
  };

  const handleViewRecord = (record: MethaneRecord) => {
    setSelectedRecord(record);
    setShowViewModal(true);
  };

  const openEditForm = (record: MethaneRecord) => {
    setSelectedRecord(record);
    setFormData(record);
    setShowEditForm(true);
  };

  const resetForm = () => {
    setFormData({
      recordId: "",
      emissionSource: "",
      quantity: 0,
      unit: "MT",
      location: "",
      note: "",
      category: "Methane Performance",
      methodology: "Engineering Calculation (L1)",
      bu: "Upstream",
      date: "",
      status: "Draft",
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Here you would typically upload the file to the server
      console.log("File uploaded:", file.name);
    }
  };

  const downloadTemplate = () => {
    // Create a simple CSV template
    const headers = ["Emission Source", "Quantity", "Unit", "Location", "Category", "Methodology", "BU", "Date", "Note"];
    const csvContent = headers.join(",") + "\n" + "Example Data,100,MT,OML 123,Methane Performance,Engineering Calculation (L1),Upstream,2024-01-01,Sample note";

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "methane_emissions_template.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
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

      {/* KPI Metrics Cards */}
      <div className="grid grid-cols-4 gap-6">
        {kpiMetrics.map((metric) => (
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
              {metric.unit && <p className="text-sm text-gray-600">{metric.unit}</p>}
            </div>
          </div>
        ))}
      </div>

      {dataView === "qualitative" ? (
        <MethaneQualitativeDisclosures />
      ) : (
        <>
          {/* Actions Bar */}
          <div className="flex justify-between items-center">
        <h3 className="text-lg font-extrabold text-gray-900 uppercase tracking-tight">
          Methane (CH4) Emissions Records
        </h3>
        <div className="flex gap-3">
          <button
            onClick={() => setShowBulkUpload(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors"
          >
            <Upload className="h-4 w-4" />
            Bulk Upload
          </button>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={() => setShowAddForm(true)}
          >
            <Plus size={16} className="mr-2" />
            Add Methane Data
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                {["Record ID", "Emission Source", "Quantity", "Unit", "Location", "Note", "Category", "Methodology", "BU", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-20 text-center">
                    <div className="text-4xl mb-4">🔬</div>
                    <div className="text-gray-500 text-sm font-medium">
                      No methane (CH4) emissions logged yet. Click + Add Methane Data to begin.
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((r) => (
                  <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm text-gray-900">{r.recordId}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{r.emissionSource}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{r.quantity}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{r.unit}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{r.location}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{r.note}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{r.category}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{r.methodology}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{r.bu}</td>
                    <td className="px-4 py-3 relative">
                      <button
                        onClick={() => setOpenActionId(openActionId === r.id ? null : r.id)}
                        className="text-gray-400 hover:text-gray-600 p-1 rounded hover:bg-gray-100"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                      {openActionId === r.id && (
                        <div ref={actionRef} className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
                          <div className="px-3 py-2 border-b border-gray-100">
                            <p className="text-xs font-semibold text-gray-500">Action</p>
                          </div>
                          <button
                            onClick={() => {
                              handleViewRecord(r);
                              setOpenActionId(null);
                            }}
                            className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Eye className="h-4 w-4 text-gray-500" /> View
                          </button>
                          <button
                            onClick={() => {
                              openEditForm(r);
                              setOpenActionId(null);
                            }}
                            className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Pencil className="h-4 w-4 text-gray-500" /> Edit
                          </button>
                          <button
                            onClick={() => {
                              handleDeleteRecord(r.id);
                              setOpenActionId(null);
                            }}
                            className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Rows per page</span>
          <select className="border border-gray-300 rounded px-2 py-1 text-sm">
            <option>20</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">
            {(page - 1) * ROWS_PER_PAGE + 1}-{Math.min(page * ROWS_PER_PAGE, records.length)} of {records.length} rows
          </span>
          <div className="flex gap-1">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm text-gray-600">&lt;</button>
            {renderPages().map((p, i) =>
              p === "..." ? (
                <span key={`e${i}`} className="px-2 py-1 text-sm text-gray-600">...</span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1 rounded text-sm ${page === p ? "bg-green-600 text-white" : "border border-gray-300 hover:bg-gray-50 text-gray-600"}`}
                >
                  {p}
                </button>
              )
            )}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm text-gray-600">&gt;</button>
          </div>
        </div>
      </div>

      {/* Add Methane Data Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-bold text-gray-900">Add Methane (CH4) Emission Data</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Record ID</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    value={formData.recordId}
                    onChange={(e) => setFormData({ ...formData, recordId: e.target.value })}
                    placeholder="Auto-generated if empty"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Emission Source <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  value={formData.emissionSource}
                  onChange={(e) => setFormData({ ...formData, emissionSource: e.target.value })}
                  placeholder="e.g., Venting, Flaring, Fugitive, etc."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseFloat(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit <span className="text-red-500">*</span></label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  >
                    <option value="MT">MT (Metric Tons)</option>
                    <option value="kg">kg</option>
                    <option value="tCO2e">tCO2e</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., OML-123, Facility Name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Methane Performance">Methane Performance</option>
                  <option value="Venting">Venting</option>
                  <option value="Flaring">Flaring</option>
                  <option value="Fugitive">Fugitive</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Methodology <span className="text-red-500">*</span></label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  value={formData.methodology}
                  onChange={(e) => setFormData({ ...formData, methodology: e.target.value })}
                >
                  <option value="Engineering Calculation (L1)">Engineering Calculation (L1)</option>
                  <option value="Direct Measurement (L2)">Direct Measurement (L2)</option>
                  <option value="Advanced Monitoring (L3)">Advanced Monitoring (L3)</option>
                  <option value="Satellite Detection">Satellite Detection</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Unit <span className="text-red-500">*</span></label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  value={formData.bu}
                  onChange={(e) => setFormData({ ...formData, bu: e.target.value })}
                >
                  <option value="Upstream">Upstream</option>
                  <option value="Downstream">Downstream</option>
                  <option value="Gas & Power">Gas & Power</option>
                  <option value="Refining">Refining</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="Draft">Draft</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Verified">Verified</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none"
                  rows={3}
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder="Additional notes or comments..."
                />
              </div>
            </div>
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowAddForm(false);
                  resetForm();
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRecord}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
              >
                Add Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Methane Data Modal */}
      {showEditForm && selectedRecord && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-bold text-gray-900">Edit Methane (CH4) Emission Data</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Record ID</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    value={formData.recordId}
                    onChange={(e) => setFormData({ ...formData, recordId: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date <span className="text-red-500">*</span></label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Emission Source <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  value={formData.emissionSource}
                  onChange={(e) => setFormData({ ...formData, emissionSource: e.target.value })}
                  placeholder="e.g., Venting, Flaring, Fugitive, etc."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseFloat(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit <span className="text-red-500">*</span></label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  >
                    <option value="MT">MT (Metric Tons)</option>
                    <option value="kg">kg</option>
                    <option value="tCO2e">tCO2e</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., OML-123, Facility Name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Methane Performance">Methane Performance</option>
                  <option value="Venting">Venting</option>
                  <option value="Flaring">Flaring</option>
                  <option value="Fugitive">Fugitive</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Methodology <span className="text-red-500">*</span></label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  value={formData.methodology}
                  onChange={(e) => setFormData({ ...formData, methodology: e.target.value })}
                >
                  <option value="Engineering Calculation (L1)">Engineering Calculation (L1)</option>
                  <option value="Direct Measurement (L2)">Direct Measurement (L2)</option>
                  <option value="Advanced Monitoring (L3)">Advanced Monitoring (L3)</option>
                  <option value="Satellite Detection">Satellite Detection</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Unit <span className="text-red-500">*</span></label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  value={formData.bu}
                  onChange={(e) => setFormData({ ...formData, bu: e.target.value })}
                >
                  <option value="Upstream">Upstream</option>
                  <option value="Downstream">Downstream</option>
                  <option value="Gas & Power">Gas & Power</option>
                  <option value="Refining">Refining</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="Draft">Draft</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Verified">Verified</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none"
                  rows={3}
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  placeholder="Additional notes or comments..."
                />
              </div>
            </div>
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowEditForm(false);
                  setSelectedRecord(null);
                  resetForm();
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleEditRecord}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Methane Data Modal */}
      {showViewModal && selectedRecord && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-bold text-gray-900">View Methane (CH4) Emission Record</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-500 mb-1">Record ID</label>
                  <p className="text-sm text-gray-900">{selectedRecord.recordId}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-500 mb-1">Date</label>
                  <p className="text-sm text-gray-900">{selectedRecord.date || "N/A"}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-1">Emission Source</label>
                <p className="text-sm text-gray-900">{selectedRecord.emissionSource}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-500 mb-1">Quantity</label>
                  <p className="text-sm text-gray-900">{selectedRecord.quantity}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-500 mb-1">Unit</label>
                  <p className="text-sm text-gray-900">{selectedRecord.unit}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-1">Location</label>
                <p className="text-sm text-gray-900">{selectedRecord.location}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-1">Category</label>
                <p className="text-sm text-gray-900">{selectedRecord.category}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-1">Methodology</label>
                <p className="text-sm text-gray-900">{selectedRecord.methodology}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-1">Business Unit</label>
                <p className="text-sm text-gray-900">{selectedRecord.bu}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-500 mb-1">Status</label>
                <p className="text-sm text-gray-900">{selectedRecord.status}</p>
              </div>

              {selectedRecord.note && (
                <div>
                  <label className="block text-sm font-semibold text-gray-500 mb-1">Note</label>
                  <p className="text-sm text-gray-900">{selectedRecord.note}</p>
                </div>
              )}
            </div>
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedRecord(null);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Upload Modal */}
      {showBulkUpload && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Bulk Upload: Methane (CH4) Emissions</h2>
              <p className="text-sm text-gray-600 mt-1">
                Upload CSV or Excel files to log multiple methane emission records at once.
              </p>
            </div>

            <div className="p-6">
              {/* Required File Structure */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-sm font-bold text-gray-900">Required File Structure</h3>
                  <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded">
                    Mandatory
                  </span>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-green-600 text-white">
                        <th className="px-3 py-2 text-left font-bold">Emission Source</th>
                        <th className="px-3 py-2 text-left font-bold">Quantity</th>
                        <th className="px-3 py-2 text-left font-bold">Unit</th>
                        <th className="px-3 py-2 text-left font-bold">Location</th>
                        <th className="px-3 py-2 text-left font-bold">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white">
                        <td className="px-3 py-2 text-gray-500 italic">[Data...]</td>
                        <td className="px-3 py-2 text-gray-500 italic">[Data...]</td>
                        <td className="px-3 py-2 text-gray-500 italic">[Data...]</td>
                        <td className="px-3 py-2 text-gray-500 italic">[Data...]</td>
                        <td className="px-3 py-2 text-gray-500 italic">[Data...]</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-3 space-y-1">
                  <p className="text-xs text-gray-600 font-medium">
                    • Emission Source (e.g., Venting, Flaring, Fugitive)
                  </p>
                  <p className="text-xs text-gray-600 font-medium">
                    • Quantity (numeric value)
                  </p>
                  <p className="text-xs text-gray-600 font-medium">
                    • Unit (MT, kg, tCO2e)
                  </p>
                  <p className="text-xs text-gray-600 font-medium">
                    • Location (e.g., OML-123)
                  </p>
                  <p className="text-xs text-gray-600 font-medium">
                    • Date (YYYY-MM-DD format)
                  </p>
                </div>

                <p className="text-xs text-gray-500 mt-3">
                  <strong>Note:</strong> File must be in .csv or .xlsx format. Column headers must match exactly.
                </p>
              </div>

              {/* File Upload Area */}
              <div className="mb-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors">
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="methane-file-upload"
                  />
                  <label
                    htmlFor="methane-file-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="h-12 w-12 text-gray-400 mb-3" />
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">Maximum file size: 10MB</p>
                    {uploadedFile && (
                      <p className="text-sm text-green-600 font-medium mt-2">
                        ✓ {uploadedFile.name}
                      </p>
                    )}
                  </label>
                </div>
              </div>

              {/* Download Template Button */}
              <button
                onClick={downloadTemplate}
                className="w-full mb-6 px-4 py-2 border border-green-600 text-green-600 rounded-lg text-sm font-bold hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download CSV Template
              </button>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowBulkUpload(false);
                  setUploadedFile(null);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle bulk upload submission
                  console.log("Bulk upload submitted");
                  setShowBulkUpload(false);
                  setUploadedFile(null);
                }}
                disabled={!uploadedFile}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Upload & Process
              </button>
            </div>
          </div>
        </div>
      )}
        </>
      )}
    </div>
  );
}

// Qualitative Disclosures Component
function MethaneQualitativeDisclosures() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
        <div>
          <h3 className="text-base font-extrabold text-gray-900 uppercase tracking-wide">
            Qualitative Methane (CH4) Disclosures
          </h3>
          <p className="text-xs text-gray-500 mt-1 font-medium">
            Narrative questionnaire responses for methane emissions management
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
        {/* Section A: Methane Management & OGMP 2.0 Compliance */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-l-4 border-green-600 pl-4 py-1">
            <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">
              Section A: Methane Management & OGMP 2.0 Compliance
            </h4>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <QualitativeQuestion
              number={1}
              question="Methane Mitigation Strategies & Low-Carbon Transition Plan"
              mapping="OGMP 2.0"
              color="green"
            />
            <QualitativeQuestion
              number={2}
              question="Leak Detection and Repair (LDAR) Implementation Details"
              mapping="OGMP 2.0"
              color="green"
            />
            <QualitativeQuestion
              number={3}
              question="Venting Reduction Initiatives & Progress"
              mapping="GRI 305"
              color="green"
            />
            <QualitativeQuestion
              number={4}
              question="Flaring Reduction Targets and Abatement Technology"
              mapping="Zero Routine Flaring"
              color="green"
            />
          </div>
        </div>

        {/* Section B: Measurement & Reporting */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-l-4 border-orange-500 pl-4 py-1">
            <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">
              Section B: Measurement & Reporting
            </h4>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <QualitativeQuestion
              number={5}
              question="Measurement Methodology and OGMP 2.0 Reporting Level Justification"
              mapping="OGMP 2.0"
              color="orange"
            />
            <QualitativeQuestion
              number={6}
              question="Data Quality Assurance & Third-Party Verification Protocols"
              mapping="Assurance"
              color="orange"
            />
            <QualitativeQuestion
              number={7}
              question="Methane Intensity Targets and Performance Tracking"
              mapping="OGMP 2.0"
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

// Reusable Question Component
function QualitativeQuestion({
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
