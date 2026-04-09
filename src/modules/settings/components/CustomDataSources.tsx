"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, X } from "lucide-react";

interface DataSource {
  id: number;
  name: string;
  category: string;
  updateFrequency: string;
  method: string;
  description: string;
  status: string;
}

export default function CustomDataSources() {
  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      id: 1,
      name: "Water Quality Index",
      category: "Environmental",
      updateFrequency: "Monthly",
      method: "Manual Entry",
      description: "Track water quality metrics across facilities",
      status: "Active",
    },
    {
      id: 2,
      name: "Local Procurement %",
      category: "Social",
      updateFrequency: "Quarterly",
      method: "API Push",
      description: "Percentage of local suppliers in procurement",
      status: "Active",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingSource, setEditingSource] = useState<DataSource | null>(null);
  const [sourceForm, setSourceForm] = useState({
    name: "",
    category: "Environmental",
    updateFrequency: "Monthly",
    method: "Manual Entry",
    description: "",
  });

  const handleAddSource = () => {
    setSourceForm({
      name: "",
      category: "Environmental",
      updateFrequency: "Monthly",
      method: "Manual Entry",
      description: "",
    });
    setEditingSource(null);
    setShowForm(true);
  };

  const handleEditSource = (source: DataSource) => {
    setSourceForm({
      name: source.name,
      category: source.category,
      updateFrequency: source.updateFrequency,
      method: source.method,
      description: source.description,
    });
    setEditingSource(source);
    setShowForm(true);
  };

  const handleSaveSource = () => {
    if (editingSource) {
      setDataSources(
        dataSources.map((ds) =>
          ds.id === editingSource.id
            ? { ...editingSource, ...sourceForm, status: "Active" }
            : ds
        )
      );
    } else {
      const newSource: DataSource = {
        id: Math.max(...dataSources.map((ds) => ds.id), 0) + 1,
        ...sourceForm,
        status: "Active",
      };
      setDataSources([...dataSources, newSource]);
    }
    setShowForm(false);
  };

  const handleDeleteSource = (id: number) => {
    if (confirm("Are you sure you want to delete this data source?")) {
      setDataSources(dataSources.filter((ds) => ds.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Custom ESG Data Sources
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Define non-standard ESG metrics unique to your organization
            </p>
          </div>
          <Button
            onClick={handleAddSource}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Plus size={16} className="mr-2" />
            Add Data Source
          </Button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-lg font-semibold text-gray-900">
              {editingSource ? "Edit Data Source" : "New Custom Data Source"}
            </h4>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Source Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={sourceForm.name}
                onChange={(e) =>
                  setSourceForm({ ...sourceForm, name: e.target.value })
                }
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                placeholder="e.g., Biodiversity Index"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-600">*</span>
              </label>
              <select
                value={sourceForm.category}
                onChange={(e) =>
                  setSourceForm({ ...sourceForm, category: e.target.value })
                }
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              >
                <option>Environmental</option>
                <option>Social</option>
                <option>Governance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Update Frequency <span className="text-red-600">*</span>
              </label>
              <select
                value={sourceForm.updateFrequency}
                onChange={(e) =>
                  setSourceForm({ ...sourceForm, updateFrequency: e.target.value })
                }
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              >
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Quarterly</option>
                <option>Annual</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Collection Method <span className="text-red-600">*</span>
              </label>
              <select
                value={sourceForm.method}
                onChange={(e) =>
                  setSourceForm({ ...sourceForm, method: e.target.value })
                }
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              >
                <option>Manual Entry</option>
                <option>API Push</option>
                <option>File Upload</option>
                <option>Integration</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={sourceForm.description}
                onChange={(e) =>
                  setSourceForm({ ...sourceForm, description: e.target.value })
                }
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-sm min-h-[80px] resize-none focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                placeholder="Describe the custom metric and its purpose..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveSource}
              className="bg-green-600 hover:bg-green-700 text-white"
              disabled={!sourceForm.name}
            >
              {editingSource ? "Update Data Source" : "Save Data Source"}
            </Button>
          </div>
        </div>
      )}

      {/* Data Sources Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-green-600 text-white">
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Data Source Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Category
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Update Frequency
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Method
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {dataSources.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-20 text-center">
                  <div className="text-4xl mb-4">📊</div>
                  <div className="text-gray-500 text-sm font-semibold">
                    No custom data sources configured yet.
                  </div>
                  <p className="text-gray-400 text-sm mt-2">
                    Click "Add Data Source" to create your first custom metric.
                  </p>
                </td>
              </tr>
            ) : (
              dataSources.map((ds) => (
                <tr
                  key={ds.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                    {ds.name}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      {ds.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {ds.updateFrequency}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {ds.method}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                      {ds.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditSource(ds)}
                        className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-green-600"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteSource(ds.id)}
                        className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
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
