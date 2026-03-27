"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import KPICard from "@/components/shared/KPICard";
import { Plus, Upload } from "lucide-react";
import { CHART_COLORS } from "@/data/dashboard-mock";

interface WorkforceRecord {
  id: number;
  category: string;
  subCategory: string;
  value: string;
  period: string;
  businessUnit: string;
  facility: string;
  status: string;
}

export default function WorkforceDiversity() {
  const [showForm, setShowForm] = useState(false);
  const [records, setRecords] = useState<WorkforceRecord[]>([
    {
      id: 1,
      category: "Gender",
      subCategory: "Female",
      value: "32",
      period: "Jan 2026",
      businessUnit: "NNPC E&P",
      facility: "Main Facility",
      status: "Draft",
    },
  ]);

  const [formData, setFormData] = useState({
    category: "Workforce",
    subCategory: "",
    value: "",
    period: "Jan 2026",
    businessUnit: "NNPC E&P",
    facility: "Main Facility",
    notes: "",
  });

  const handleSave = () => {
    const newRecord: WorkforceRecord = {
      id: Date.now(),
      ...formData,
      status: "Draft",
    };
    setRecords([newRecord, ...records]);
    setShowForm(false);
    setFormData({
      ...formData,
      subCategory: "",
      value: "",
      notes: "",
    });
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <KPICard
          label="Total Employees"
          value="4,250"
          unit=""
          color={CHART_COLORS.primary}
        />
        <KPICard
          label="Female Representation"
          value="32"
          unit="%"
          color={CHART_COLORS.secondary}
          pct={32}
        />
        <KPICard
          label="Expatriate Ratio"
          value="4.5"
          unit="%"
          color={CHART_COLORS.blue}
        />
        <KPICard
          label="Local Content"
          value="88"
          unit="%"
          color={CHART_COLORS.primary}
          pct={88}
        />
      </div>

      {/* Actions Bar */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-extrabold text-gray-900 uppercase tracking-tight">
          Workforce & Diversity Records
        </h3>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50"
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
                Log Workforce Entry
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl border-l-4 border-green-600 shadow-sm p-6 border border-gray-200">
          <h4 className="text-base font-extrabold text-gray-900 mb-6 uppercase tracking-wide">
            New Workforce & Diversity Entry
          </h4>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                Category <span className="text-red-600">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
              >
                <option>Workforce</option>
                <option>Gender</option>
                <option>Age Group</option>
                <option>Nationality</option>
                <option>Local Content</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                Sub-Category <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.subCategory}
                onChange={(e) =>
                  setFormData({ ...formData, subCategory: e.target.value })
                }
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
                placeholder="e.g., Female, Expatriate, 18-30"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                Count/Value <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                value={formData.value}
                onChange={(e) =>
                  setFormData({ ...formData, value: e.target.value })
                }
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
                placeholder="0"
              />
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
                Metric Details
              </th>
              <th className="px-4 py-3 text-xs font-black uppercase tracking-widest">
                Value
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
                <td colSpan={5} className="py-20 text-center">
                  <div className="text-4xl mb-4">👥</div>
                  <div className="text-gray-500 text-sm font-bold uppercase tracking-widest">
                    No workforce data logged yet.
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
                  <td className="px-4 py-3">
                    <div className="text-sm font-extrabold text-gray-900">
                      {record.category}
                    </div>
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-tighter">
                      {record.subCategory}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-extrabold text-gray-900 tabular-nums">
                    {record.value}
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
    </div>
  );
}
