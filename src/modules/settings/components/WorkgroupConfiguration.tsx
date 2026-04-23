"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Download, Upload, Pencil, Trash2, X } from "lucide-react";

interface Workgroup {
  id: string;
  name: string;
  description: string;
  templates: string[];
  completion: string;
}

interface Template {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
}

export default function WorkgroupConfiguration() {
  const [workgroups, setWorkgroups] = useState<Workgroup[]>([
    {
      id: "1",
      name: "Upstream",
      description: "Upstream business unit focusing on E&P, investment management, and engineering.",
      templates: ["GHG...", "Methane..."],
      completion: "87%",
    },
    {
      id: "2",
      name: "Gas, Power & New Energy",
      description: "Gas and renewable energy business unit.",
      templates: ["Gas..."],
      completion: "87%",
    },
    {
      id: "3",
      name: "Downstream",
      description: "Downstream activities including trading, retail, shipping, and refining.",
      templates: ["Downstream..."],
      completion: "87%",
    },
    {
      id: "4",
      name: "GCOO",
      description: "Group Chief Operating Officer division including HSE and specific production assets.",
      templates: ["HSE..."],
      completion: "87%",
    },
    {
      id: "5",
      name: "Finance",
      description: "Financial control, treasury, tax, and investment services.",
      templates: ["Financial..."],
      completion: "87%",
    },
    {
      id: "6",
      name: "Business Services",
      description: "Shared services including HR, IT, security, and supply chain.",
      templates: ["HSE..."],
      completion: "87%",
    },
    {
      id: "7",
      name: "CRM",
      description: "Corporate Relations Management.",
      templates: ["Corporate..."],
      completion: "87%",
    },
    {
      id: "8",
      name: "Audit",
      description: "Group Internal Audit.",
      templates: ["Corporate..."],
      completion: "87%",
    },
    {
      id: "9",
      name: "Legal",
      description: "Group Legal Services.",
      templates: ["Corporate..."],
      completion: "87%",
    },
    {
      id: "10",
      name: "GRC",
      description: "Governance, Risk & Compliance.",
      templates: ["Corporate..."],
      completion: "87%",
    },
    {
      id: "11",
      name: "CSS",
      description: "Corporate Strategy & Sustainability.",
      templates: ["Corporate..."],
      completion: "87%",
    },
  ]);

  const [templates] = useState<Template[]>([
    {
      id: "1",
      name: "GHG Standard Template",
      category: "Environment",
      subcategory: "GHG Emissions",
      description: "Standard GRI/OGMP GHG reporting template",
    },
    {
      id: "2",
      name: "Downstream Retail Template",
      category: "Environment",
      subcategory: "Energy",
      description: "Retail-specific environmental metrics",
    },
    {
      id: "3",
      name: "Financial ESG Disclosure",
      category: "Finance",
      subcategory: "Investments",
      description: "Template for financial and tax transparency",
    },
    {
      id: "4",
      name: "Gas & Power performance",
      category: "Environment",
      subcategory: "GHG Emissions",
      description: "Metrics for NGIC and other gas units",
    },
    {
      id: "5",
      name: "Corporate Compliance",
      category: "Governance",
      subcategory: "KPIs",
      description: "Narrative and GRC compliance questions",
    },
    {
      id: "6",
      name: "HSE Field Log",
      category: "Social",
      subcategory: "Safety",
      description: "Operational safety and health metrics",
    },
    {
      id: "7",
      name: "Methane Performance (OGMP)",
      category: "Environment",
      subcategory: "Methane (CH4) Emissions",
      description: "Levels 1-5 Methane reporting",
    },
  ]);

  const [showWorkgroupModal, setShowWorkgroupModal] = useState(false);
  const [editingWorkgroup, setEditingWorkgroup] = useState<Workgroup | null>(null);
  const [workgroupForm, setWorkgroupForm] = useState({
    name: "",
    description: "",
    templates: [] as string[],
  });

  const handleAddWorkgroup = () => {
    setWorkgroupForm({
      name: "",
      description: "",
      templates: [],
    });
    setEditingWorkgroup(null);
    setShowWorkgroupModal(true);
  };

  const handleEditWorkgroup = (workgroup: Workgroup) => {
    setWorkgroupForm({
      name: workgroup.name,
      description: workgroup.description,
      templates: workgroup.templates,
    });
    setEditingWorkgroup(workgroup);
    setShowWorkgroupModal(true);
  };

  const handleSaveWorkgroup = () => {
    if (editingWorkgroup) {
      setWorkgroups(
        workgroups.map((wg) =>
          wg.id === editingWorkgroup.id
            ? { ...editingWorkgroup, ...workgroupForm, completion: "0%" }
            : wg
        )
      );
    } else {
      const newWorkgroup: Workgroup = {
        id: String(Date.now()),
        ...workgroupForm,
        completion: "0%",
      };
      setWorkgroups([...workgroups, newWorkgroup]);
    }
    setShowWorkgroupModal(false);
  };

  const handleDeleteWorkgroup = (id: string) => {
    if (confirm("Are you sure you want to delete this workgroup?")) {
      setWorkgroups(workgroups.filter((wg) => wg.id !== id));
    }
  };

  const toggleTemplate = (templateName: string) => {
    if (workgroupForm.templates.includes(templateName)) {
      setWorkgroupForm({
        ...workgroupForm,
        templates: workgroupForm.templates.filter((t) => t !== templateName),
      });
    } else {
      setWorkgroupForm({
        ...workgroupForm,
        templates: [...workgroupForm.templates, templateName],
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Workgroup Management
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Define business units and map them to multiple data templates.
          </p>
        </div>
        <Button
          onClick={handleAddWorkgroup}
          className="bg-teal-500 hover:bg-teal-600 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Workgroup
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search workgroups or templates..."
          className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Workgroups List */}
        <div className="col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="bg-teal-500 text-white px-6 py-3 rounded-t-xl">
              <div className="grid grid-cols-3 gap-4 font-semibold text-sm">
                <div>WORKGROUP NAME</div>
                <div>ASSIGNED TEMPLATES</div>
                <div>ACTIONS</div>
              </div>
            </div>
            <div>
              {workgroups.map((wg) => (
                <div
                  key={wg.id}
                  className="px-6 py-4 border-b border-gray-100 hover:bg-gray-50"
                >
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <div>
                      <div className="font-semibold text-gray-900">{wg.name}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {wg.description}
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {wg.templates.map((template, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-teal-50 text-teal-700 rounded text-xs font-medium"
                        >
                          {template}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditWorkgroup(wg)}
                        className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-teal-600"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteWorkgroup(wg.id)}
                        className="p-1 hover:bg-gray-100 rounded text-gray-600 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Templates Sidebar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-900">Templates</h4>
            <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
              Manage All
            </button>
          </div>

          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-teal-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-gray-900">
                    {template.name}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-xs font-medium">
                      {template.category}
                    </span>
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                      {template.subcategory}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {template.description}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Download className="h-3 w-3 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Upload className="h-3 w-3 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Workgroup Modal */}
      {showWorkgroupModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingWorkgroup ? "Edit Workgroup" : "Add New Workgroup"}
              </h3>
              <button
                onClick={() => setShowWorkgroupModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Workgroup Name *
                </label>
                <select
                  value={workgroupForm.name}
                  onChange={(e) =>
                    setWorkgroupForm({ ...workgroupForm, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                >
                  <option value="">Select workgroup name...</option>
                  <option>Upstream</option>
                  <option>Gas, Power & New Energy</option>
                  <option>Downstream</option>
                  <option>GCOO</option>
                  <option>Finance</option>
                  <option>Business Services</option>
                  <option>CRM</option>
                  <option>Audit</option>
                  <option>Legal</option>
                  <option>GRC</option>
                  <option>CSS</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={workgroupForm.description}
                  onChange={(e) =>
                    setWorkgroupForm({
                      ...workgroupForm,
                      description: e.target.value,
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm min-h-[80px] resize-none focus:outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  placeholder="Enter a brief description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Template Assignments *
                </label>
                <div className="space-y-2 max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4">
                  {templates.map((template) => (
                    <label
                      key={template.id}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={workgroupForm.templates.includes(template.name)}
                        onChange={() => toggleTemplate(template.name)}
                        className="w-4 h-4 text-teal-600 rounded"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-900">
                          {template.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {template.category} - {template.subcategory}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Selected: {workgroupForm.templates.length} template(s)
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setShowWorkgroupModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveWorkgroup}
                className="bg-teal-500 hover:bg-teal-600 text-white"
                disabled={!workgroupForm.name || workgroupForm.templates.length === 0}
              >
                {editingWorkgroup ? "Update Workgroup" : "Add Workgroup"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
