"use client";
import { useState, useRef, useEffect } from "react";
import { Search, Filter, Download, Upload, Plus, MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { mockGHGRecords, GHGRecord } from "../data/ghgEmissionsData";
import GHGFilterModal, { GHGFilters } from "./GHGFilterModal";
import GHGViewModal from "./GHGViewModal";
import GHGDeleteModal from "./GHGDeleteModal";
import GHGUploadModal from "./GHGUploadModal";
import GHGFormModal from "./GHGFormModal";

const ROWS_PER_PAGE = 20;

export default function GHGEmissions() {
  // ── data state ──────────────────────────────────────────────────────────
  const [records, setRecords] = useState<GHGRecord[]>(mockGHGRecords);
  const [searchQuery, setSearchQuery] = useState("");

  // ── filter state ────────────────────────────────────────────────────────
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<GHGFilters>({
    scope: "", emissionType: "", bu: "", status: "", dateFrom: "", dateTo: "",
  });

  // ── modal state ─────────────────────────────────────────────────────────
  const [viewRecord, setViewRecord] = useState<GHGRecord | null>(null);
  const [editRecord, setEditRecord] = useState<GHGRecord | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<GHGRecord | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);

  // ── action dropdown ─────────────────────────────────────────────────────
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const actionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (actionRef.current && !actionRef.current.contains(e.target as Node)) {
        setOpenActionId(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── pagination ──────────────────────────────────────────────────────────
  const [page, setPage] = useState(1);

  // ── derived / filtered list ─────────────────────────────────────────────
  const filtered = records.filter((r) => {
    if (filters.scope && r.emissionScope !== filters.scope) return false;
    if (filters.emissionType && r.emissionType !== filters.emissionType) return false;
    if (filters.bu && r.bu !== filters.bu) return false;
    if (filters.status && r.status !== filters.status) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (
        !r.recordId.toLowerCase().includes(q) &&
        !r.emissionSource.toLowerCase().includes(q) &&
        !r.location.toLowerCase().includes(q) &&
        !r.date.includes(q)
      )
        return false;
    }
    return true;
  });

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE) || 1;
  const paginated = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  // ── CRUD handlers ───────────────────────────────────────────────────────
  const handleAdd = (data: { emissionScope: string; emissionSource: string; bu: string; emissionType: string; quantity: string; unitMetrics: string; totalEmissions: string; location: string; date: string; description: string }) => {
    const newRecord: GHGRecord = {
      id: String(Date.now()),
      recordId: `${100 + records.length}WE`,
      emissionSource: data.emissionSource,
      quantity: parseFloat(data.quantity),
      unitMetrics: data.unitMetrics || "Metric Tons CO₂e",
      location: data.location,
      note: data.description,
      emissionScope: data.emissionScope,
      emissionType: data.emissionType,
      bu: data.bu,
      date: data.date,
      status: "active",
      totalEmissions: data.totalEmissions ? parseFloat(data.totalEmissions) : undefined,
    };
    setRecords((prev) => [newRecord, ...prev]);
    setAddOpen(false);
    toast.success("GHG data added successfully.");
  };

  const handleEdit = (data: { emissionScope: string; emissionSource: string; bu: string; emissionType: string; quantity: string; unitMetrics: string; totalEmissions: string; location: string; date: string; description: string }) => {
    if (!editRecord) return;
    setRecords((prev) =>
      prev.map((r) =>
        r.id === editRecord.id
          ? {
              ...r,
              emissionSource: data.emissionSource,
              quantity: parseFloat(data.quantity),
              unitMetrics: data.unitMetrics || r.unitMetrics,
              location: data.location,
              note: data.description,
              emissionScope: data.emissionScope,
              emissionType: data.emissionType,
              bu: data.bu,
              date: data.date,
              totalEmissions: data.totalEmissions ? parseFloat(data.totalEmissions) : r.totalEmissions,
            }
          : r
      )
    );
    setEditRecord(null);
    toast.success("GHG data updated successfully.");
  };

  const handleDelete = (id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
    setDeleteRecord(null);
    toast.success("Successfully deleted", {
      description: "Emission record deleted successfully and archived for audit.",
    });
  };

  const handleUpload = () => {
    setUploadOpen(false);
    toast.success("File uploaded successfully.");
  };

  const handleDownloadCSV = () => {
    const headers = ["Record ID", "Emission Source", "Quantity", "Unit Metrics", "Location", "Note", "Emission Scope", "Emission Type", "BU", "Date"];
    const rows = filtered.map((r) => [r.recordId, r.emissionSource, r.quantity, r.unitMetrics, r.location, r.note, r.emissionScope, r.emissionType, r.bu, r.date]);
    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "ghg_emissions.csv";
    link.click();
  };

  // ── page number buttons ─────────────────────────────────────────────────
  const renderPages = () => {
    const btns: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) btns.push(i);
    } else {
      btns.push(1, 2, "...", totalPages - 1, totalPages);
    }
    return btns;
  };

  return (
    <div className="p-6 space-y-5">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Greenhouse Gas Emissions</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of emissions metrics</p>
      </div>

      {/* ── Toolbar ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by company ID, Dates..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm w-72"
            />
          </div>
          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
          >
            <Filter className="h-4 w-4" />
            Filter
            <svg className="h-3.5 w-3.5 text-gray-400" viewBox="0 0 16 16"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={handleDownloadCSV} className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
            <Download className="h-4 w-4" /> Download CSV
          </button>
          <button onClick={() => setUploadOpen(true)} className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
            <Upload className="h-4 w-4" /> Upload GHG Data
          </button>
          <Button onClick={() => setAddOpen(true)} className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-2">
            <Plus className="h-4 w-4" /> Add GHG Data
          </Button>
        </div>
      </div>

      {/* ── Table ───────────────────────────────────────────────────────── */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                {["Record ID", "Emission Source", "Quantity", "Unit Metrics", "Location", "Note", "Emission Scope", "Emission Type", "BU", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((r) => (
                <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-900">{r.recordId}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{r.emissionSource}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{r.quantity}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{r.unitMetrics}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{r.location}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{r.note}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{r.emissionScope}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{r.emissionType}</td>
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
                          onClick={() => { setViewRecord(r); setOpenActionId(null); }}
                          className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Eye className="h-4 w-4 text-gray-500" /> View
                        </button>
                        <button
                          onClick={() => { setEditRecord(r); setOpenActionId(null); }}
                          className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Pencil className="h-4 w-4 text-gray-500" /> Edit
                        </button>
                        <button
                          onClick={() => { setDeleteRecord(r); setOpenActionId(null); }}
                          className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" /> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Pagination ──────────────────────────────────────────────────── */}
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
            {(page - 1) * ROWS_PER_PAGE + 1}-{Math.min(page * ROWS_PER_PAGE, filtered.length)} of {filtered.length} rows
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

      {/* ── Modals ──────────────────────────────────────────────────────── */}
      <GHGFilterModal open={filterOpen} onClose={() => setFilterOpen(false)} filters={filters} onApply={setFilters} />
      <GHGViewModal open={!!viewRecord} onClose={() => setViewRecord(null)} record={viewRecord} />
      <GHGDeleteModal open={!!deleteRecord} onClose={() => setDeleteRecord(null)} record={deleteRecord} onConfirm={handleDelete} />
      <GHGUploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} onUpload={handleUpload} />
      <GHGFormModal open={addOpen} onClose={() => setAddOpen(false)} isEditing={false} onSubmit={handleAdd} />
      <GHGFormModal open={!!editRecord} onClose={() => setEditRecord(null)} isEditing={true} record={editRecord} onSubmit={handleEdit} />
    </div>
  );
}
