"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface DataSource {
  id: number;
  name: string;
  category: string;
  updateFrequency: string;
  method: string;
  status: string;
}

export default function CustomDataSources() {
  const [dataSources] = useState<DataSource[]>([
    {
      id: 1,
      name: "Water Quality Index",
      category: "Environmental",
      updateFrequency: "Monthly",
      method: "Manual Entry",
      status: "Active",
    },
    {
      id: 2,
      name: "Local Procurement %",
      category: "Social",
      updateFrequency: "Quarterly",
      method: "API Push",
      status: "Active",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-extrabold text-gray-900 uppercase tracking-tight">
              Custom ESG Data Sources
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Define non-standard ESG metrics unique to your organization
            </p>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {showForm ? (
              "✕ Close Form"
            ) : (
              <>
                <Plus size={16} className="mr-2" />
                Add Data Source
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Add New Data Source Form */}
      {showForm && (
        <div className="bg-white rounded-xl border-l-4 border-green-600 shadow-sm p-6 border border-gray-200">
          <h4 className="text-base font-extrabold text-gray-900 mb-6 uppercase tracking-wide">
            New Custom Data Source
          </h4>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                Data Source Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
                placeholder="e.g., Biodiversity Index"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                Category <span className="text-red-600">*</span>
              </label>
              <select className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all">
                <option>Environmental</option>
                <option>Social</option>
                <option>Governance</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                Update Frequency <span className="text-red-600">*</span>
              </label>
              <select className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Quarterly</option>
                <option>Annual</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                Collection Method <span className="text-red-600">*</span>
              </label>
              <select className="w-full h-10 px-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all">
                <option>Manual Entry</option>
                <option>API Push</option>
                <option>File Upload</option>
                <option>Integration</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 block">
                Description
              </label>
              <textarea
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 min-h-[80px] resize-none focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-all"
                placeholder="Describe the custom metric and its purpose..."
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
            <Button className="bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20">
              Save Data Source
            </Button>
          </div>
        </div>
      )}

      {/* Data Sources Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="px-4 py-3 text-xs font-black uppercase tracking-widest">
                Data Source Name
              </th>
              <th className="px-4 py-3 text-xs font-black uppercase tracking-widest">
                Category
              </th>
              <th className="px-4 py-3 text-xs font-black uppercase tracking-widest">
                Update Frequency
              </th>
              <th className="px-4 py-3 text-xs font-black uppercase tracking-widest">
                Method
              </th>
              <th className="px-4 py-3 text-xs font-black uppercase tracking-widest">
                Status
              </th>
              <th className="px-4 py-3 text-xs font-black uppercase tracking-widest"></th>
            </tr>
          </thead>
          <tbody>
            {dataSources.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-20 text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <div className="text-gray-500 text-sm font-bold uppercase tracking-widest">
                    No custom data sources configured yet.
                  </div>
                </td>
              </tr>
            ) : (
              dataSources.map((ds, i) => (
                <tr
                  key={ds.id}
                  className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                    i % 2 === 1 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-3 text-sm font-extrabold text-gray-900">
                    {ds.name}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700">
                      {ds.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider">
                    {ds.updateFrequency}
                  </td>
                  <td className="px-4 py-3 text-xs font-bold text-gray-600 uppercase tracking-wider">
                    {ds.method}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-700">
                      {ds.status}
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
