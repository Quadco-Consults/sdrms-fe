"use client";

import { useState } from "react";
import { Plus, Upload, Download, Filter, Eye, Edit, Trash2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

// Types
interface Asset {
  id: string;
  oml: string;
  assetName: string;
  assetGroup: string;
  workgroup: string;
  operatedStatus: "Operated" | "Non-Operated (JV)";
  equityStake: number;
  operationalStatus: "Active" | "Decommissioned" | "Under Construction" | "Suspended";
  location: string;
  basin: string;
  effectiveYear: number;
}

interface ExcludedAsset {
  id: string;
  oml: string;
  assetName: string;
  exclusionReason: string;
  effectiveYear: number;
  notes?: string;
}

// Mock Data
const INITIAL_ASSETS: Asset[] = [
  {
    id: "AST-001",
    oml: "OML 11",
    assetName: "Ebocha Field",
    assetGroup: "JV",
    workgroup: "Upstream",
    operatedStatus: "Operated",
    equityStake: 55,
    operationalStatus: "Active",
    location: "Rivers State",
    basin: "Niger Delta",
    effectiveYear: 1965,
  },
  {
    id: "AST-002",
    oml: "OML 13",
    assetName: "Obigbo North Field",
    assetGroup: "JV",
    workgroup: "Upstream",
    operatedStatus: "Operated",
    equityStake: 55,
    operationalStatus: "Active",
    location: "Rivers State",
    basin: "Niger Delta",
    effectiveYear: 1957,
  },
  {
    id: "AST-003",
    oml: "OML 118",
    assetName: "Bonga Field",
    assetGroup: "PSC",
    workgroup: "Upstream",
    operatedStatus: "Operated",
    equityStake: 100,
    operationalStatus: "Active",
    location: "Offshore",
    basin: "Deep Offshore",
    effectiveYear: 2005,
  },
  {
    id: "AST-004",
    oml: "OML 127",
    assetName: "Agbami Field",
    assetGroup: "PSC",
    workgroup: "Upstream",
    operatedStatus: "Non-Operated (JV)",
    equityStake: 20.9,
    operationalStatus: "Active",
    location: "Offshore",
    basin: "Deep Offshore",
    effectiveYear: 2008,
  },
];

const EXCLUDED_ASSETS: ExcludedAsset[] = [
  {
    id: "EXC-001",
    oml: "OML 45",
    assetName: "Old Field Site",
    exclusionReason: "Decommissioned - Asset sold",
    effectiveYear: 2020,
    notes: "Divested to independent operator",
  },
];

const ASSET_GROUPS = ["JV", "PSC", "Service Contract", "Sole Risk", "Marginal Field"];
const OPERATIONAL_STATUS = ["Active", "Decommissioned", "Under Construction", "Suspended"];
const WORKGROUPS = ["Upstream", "Gas, Power & New Energy", "Downstream"];

export default function AssetRegistryPage() {
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const [excludedAssets, setExcludedAssets] = useState<ExcludedAsset[]>(EXCLUDED_ASSETS);
  const [searchQuery, setSearchQuery] = useState("");
  const [groupFilter, setGroupFilter] = useState<string>("all");
  const [activeTab, setActiveTab] = useState("active-assets");

  // Global filters
  const [selectedBU, setSelectedBU] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [selectedFacility, setSelectedFacility] = useState("all");

  // Modal states
  const [showAddForm, setShowAddForm] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [showAddExcludedForm, setShowAddExcludedForm] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Form data
  const [formData, setFormData] = useState<Partial<Asset>>({
    oml: "",
    assetName: "",
    assetGroup: "JV",
    workgroup: "Upstream",
    operatedStatus: "Operated",
    equityStake: 0,
    operationalStatus: "Active",
    location: "",
    basin: "",
    effectiveYear: new Date().getFullYear(),
  });

  const [excludedFormData, setExcludedFormData] = useState<Partial<ExcludedAsset>>({
    oml: "",
    assetName: "",
    exclusionReason: "",
    effectiveYear: new Date().getFullYear(),
    notes: "",
  });

  // Filter assets
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.oml.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGroup = groupFilter === "all" || asset.assetGroup === groupFilter;
    return matchesSearch && matchesGroup;
  });

  // Calculate KPIs
  const totalAssets = assets.length;
  const operatedAssets = assets.filter((a) => a.operatedStatus === "Operated").length;
  const avgEquityStake =
    assets.reduce((sum, a) => sum + a.equityStake, 0) / assets.length;
  const activeAssets = assets.filter((a) => a.operationalStatus === "Active").length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Under Construction":
        return "bg-blue-100 text-blue-800";
      case "Suspended":
        return "bg-yellow-100 text-yellow-800";
      case "Decommissioned":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getOperatedColor = (status: string) => {
    return status === "Operated"
      ? "bg-green-100 text-green-800"
      : "bg-blue-100 text-blue-800";
  };

  // CRUD Handlers
  const handleAddAsset = () => {
    const newAsset: Asset = {
      id: `AST-${String(assets.length + 1).padStart(3, "0")}`,
      oml: formData.oml!,
      assetName: formData.assetName!,
      assetGroup: formData.assetGroup!,
      workgroup: formData.workgroup!,
      operatedStatus: formData.operatedStatus!,
      equityStake: formData.equityStake!,
      operationalStatus: formData.operationalStatus!,
      location: formData.location!,
      basin: formData.basin!,
      effectiveYear: formData.effectiveYear!,
    };
    setAssets([...assets, newAsset]);
    setShowAddForm(false);
    resetForm();
  };

  const handleEditAsset = () => {
    if (!selectedAsset) return;
    setAssets(
      assets.map((asset) =>
        asset.id === selectedAsset.id
          ? { ...asset, ...formData }
          : asset
      )
    );
    setShowEditForm(false);
    setSelectedAsset(null);
    resetForm();
  };

  const handleDeleteAsset = (id: string) => {
    if (confirm("Are you sure you want to delete this asset?")) {
      setAssets(assets.filter((asset) => asset.id !== id));
    }
  };

  const handleViewAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setShowViewModal(true);
  };

  const openEditForm = (asset: Asset) => {
    setSelectedAsset(asset);
    setFormData(asset);
    setShowEditForm(true);
  };

  const handleAddExcludedAsset = () => {
    const newExcludedAsset: ExcludedAsset = {
      id: `EXC-${String(excludedAssets.length + 1).padStart(3, "0")}`,
      oml: excludedFormData.oml!,
      assetName: excludedFormData.assetName!,
      exclusionReason: excludedFormData.exclusionReason!,
      effectiveYear: excludedFormData.effectiveYear!,
      notes: excludedFormData.notes,
    };
    setExcludedAssets([...excludedAssets, newExcludedAsset]);
    setShowAddExcludedForm(false);
    resetExcludedForm();
  };

  const resetForm = () => {
    setFormData({
      oml: "",
      assetName: "",
      assetGroup: "JV",
      workgroup: "Upstream",
      operatedStatus: "Operated",
      equityStake: 0,
      operationalStatus: "Active",
      location: "",
      basin: "",
      effectiveYear: new Date().getFullYear(),
    });
  };

  const resetExcludedForm = () => {
    setExcludedFormData({
      oml: "",
      assetName: "",
      exclusionReason: "",
      effectiveYear: new Date().getFullYear(),
      notes: "",
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleBulkUpload = () => {
    if (!uploadedFile) {
      alert("Please select a file to upload");
      return;
    }
    // Process bulk upload (placeholder for now)
    alert(`Processing file: ${uploadedFile.name}`);
    setShowBulkUpload(false);
    setUploadedFile(null);
  };

  const downloadTemplate = () => {
    // Create CSV template
    const headers = ["Asset Name", "Asset Group", "Workgroup", "Status", "Location"];
    const csvContent = headers.join(",");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "asset_registry_template.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Asset Registry" },
        ]}
      />
      <div className="space-y-6 p-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="h-6 w-6 text-[#4CAF50]" />
            Asset Registry
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage ventures, assets, and OML tracking
          </p>
        </div>

      {/* Global Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Filter Icon and Label */}
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-green-600" />
            <span className="text-sm font-bold text-green-600 uppercase tracking-wider">
              Global Filters:
            </span>
          </div>

          {/* Filter Dropdowns */}
          <Select value={selectedBU} onValueChange={setSelectedBU}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Business Units" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Business Units</SelectItem>
              <SelectItem value="upstream">Upstream</SelectItem>
              <SelectItem value="gas-power">Gas, Power & New Energy</SelectItem>
              <SelectItem value="downstream">Downstream</SelectItem>
              <SelectItem value="refining">Refining</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Periods" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Periods</SelectItem>
              <SelectItem value="2024-q4">Q4 2024</SelectItem>
              <SelectItem value="2024-q3">Q3 2024</SelectItem>
              <SelectItem value="2024-q2">Q2 2024</SelectItem>
              <SelectItem value="2024-q1">Q1 2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedFacility} onValueChange={setSelectedFacility}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Facilities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Facilities</SelectItem>
              <SelectItem value="ebocha">Ebocha Field</SelectItem>
              <SelectItem value="obigbo">Obigbo North Field</SelectItem>
              <SelectItem value="bonga">Bonga Field</SelectItem>
              <SelectItem value="agbami">Agbami Field</SelectItem>
            </SelectContent>
          </Select>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 ml-auto">
            <button
              onClick={() => {
                setSelectedBU("all");
                setSelectedPeriod("all");
                setSelectedFacility("all");
              }}
              className="text-sm font-bold text-green-600 hover:text-green-700 uppercase tracking-wider"
            >
              Clear All
            </button>
            <Button className="bg-green-600 hover:bg-green-700 text-white uppercase tracking-wider font-bold">
              Apply Filters
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Total Assets</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{totalAssets}</p>
          <p className="text-xs text-gray-500 mt-1">Registered OMLs</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Operated Assets</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {operatedAssets}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {((operatedAssets / totalAssets) * 100).toFixed(0)}% of total
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Avg. Equity Stake</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {avgEquityStake.toFixed(1)}%
          </p>
          <p className="text-xs text-gray-500 mt-1">Across all assets</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Active Assets</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {activeAssets}
          </p>
          <p className="text-xs text-green-600 mt-1">Operational</p>
        </div>
      </div>

      {/* Tabs with Action Buttons */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="active-assets">Venture & Asset Registry</TabsTrigger>
            <TabsTrigger value="excluded-assets">Excluded Assets</TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowBulkUpload(true)}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button
              size="sm"
              className="bg-[#4CAF50] hover:bg-[#45a049]"
              onClick={() => setShowAddForm(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Asset
            </Button>
          </div>
        </div>

        {/* Active Assets Tab */}
        <TabsContent value="active-assets" className="space-y-4">
          {/* Filters */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <Input
                  placeholder="Search by OML, asset name, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={groupFilter} onValueChange={setGroupFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Asset Group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Groups</SelectItem>
                  {ASSET_GROUPS.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-lg border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>OML</TableHead>
                  <TableHead>Asset Name</TableHead>
                  <TableHead>Asset Group</TableHead>
                  <TableHead>Workgroup</TableHead>
                  <TableHead>Operated Status</TableHead>
                  <TableHead>Equity Stake</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium font-mono">
                      {asset.oml}
                    </TableCell>
                    <TableCell>{asset.assetName}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {asset.assetGroup}
                      </span>
                    </TableCell>
                    <TableCell>{asset.workgroup}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getOperatedColor(
                          asset.operatedStatus
                        )}`}
                      >
                        {asset.operatedStatus}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">{asset.equityStake}%</span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{asset.location}</div>
                        <div className="text-xs text-gray-500">{asset.basin}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          asset.operationalStatus
                        )}`}
                      >
                        {asset.operationalStatus}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewAsset(asset)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditForm(asset)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteAsset(asset.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Excluded Assets Tab */}
        <TabsContent value="excluded-assets" className="space-y-4">
          {/* Add Excluded Asset Button */}
          <div className="flex justify-end">
            <Button
              size="sm"
              className="bg-[#4CAF50] hover:bg-[#45a049]"
              onClick={() => setShowAddExcludedForm(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Excluded Asset
            </Button>
          </div>

          <div className="bg-white rounded-lg border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>OML</TableHead>
                  <TableHead>Asset Name</TableHead>
                  <TableHead>Exclusion Reason</TableHead>
                  <TableHead>Effective Year</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {excludedAssets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium font-mono">
                      {asset.oml}
                    </TableCell>
                    <TableCell>{asset.assetName}</TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-700">
                        {asset.exclusionReason}
                      </span>
                    </TableCell>
                    <TableCell>{asset.effectiveYear}</TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {asset.notes || "—"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => alert(`Viewing excluded asset: ${asset.assetName}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => alert(`Editing excluded asset: ${asset.assetName}`)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Asset Modal */}
      {(showAddForm || showEditForm) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">
                {showAddForm ? "Add New Asset" : "Edit Asset"}
              </h2>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setShowEditForm(false);
                  setSelectedAsset(null);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Asset Name / OML <span className="text-red-600">*</span>
                  </label>
                  <Input
                    value={formData.oml}
                    onChange={(e) => setFormData({ ...formData, oml: e.target.value })}
                    placeholder="e.g. OML 20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Asset Group <span className="text-red-600">*</span>
                  </label>
                  <Select
                    value={formData.assetGroup}
                    onValueChange={(value) =>
                      setFormData({ ...formData, assetGroup: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ASSET_GROUPS.map((group) => (
                        <SelectItem key={group} value={group}>
                          {group}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Workgroup <span className="text-red-600">*</span>
                  </label>
                  <Select
                    value={formData.workgroup}
                    onValueChange={(value) =>
                      setFormData({ ...formData, workgroup: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {WORKGROUPS.map((wg) => (
                        <SelectItem key={wg} value={wg}>
                          {wg}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location / Basin <span className="text-red-600">*</span>
                  </label>
                  <Input
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="e.g. Niger Delta"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Operated Status <span className="text-red-600">*</span>
                  </label>
                  <Select
                    value={formData.operatedStatus}
                    onValueChange={(value: any) =>
                      setFormData({ ...formData, operatedStatus: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Operated">Operated</SelectItem>
                      <SelectItem value="Non-Operated (JV)">Non-Operated (JV)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Equity Stake (%) <span className="text-red-600">*</span>
                  </label>
                  <Input
                    type="number"
                    value={formData.equityStake}
                    onChange={(e) =>
                      setFormData({ ...formData, equityStake: parseFloat(e.target.value) })
                    }
                    placeholder="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Asset Name
                  </label>
                  <Input
                    value={formData.assetName}
                    onChange={(e) =>
                      setFormData({ ...formData, assetName: e.target.value })
                    }
                    placeholder="e.g. Ebocha Field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Basin
                  </label>
                  <Input
                    value={formData.basin}
                    onChange={(e) =>
                      setFormData({ ...formData, basin: e.target.value })
                    }
                    placeholder="e.g. Niger Delta"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Operational Status <span className="text-red-600">*</span>
                  </label>
                  <Select
                    value={formData.operationalStatus}
                    onValueChange={(value: any) =>
                      setFormData({ ...formData, operationalStatus: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {OPERATIONAL_STATUS.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Effective Year
                  </label>
                  <Input
                    type="number"
                    value={formData.effectiveYear}
                    onChange={(e) =>
                      setFormData({ ...formData, effectiveYear: parseInt(e.target.value) })
                    }
                    placeholder="2024"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false);
                    setShowEditForm(false);
                    setSelectedAsset(null);
                    resetForm();
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={showAddForm ? handleAddAsset : handleEditAsset}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {showAddForm ? "Register Asset" : "Update Asset"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Asset Modal */}
      {showViewModal && selectedAsset && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Asset Details</h2>
              <button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedAsset(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">OML</p>
                  <p className="text-base font-semibold text-gray-900 mt-1">
                    {selectedAsset.oml}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Asset Name</p>
                  <p className="text-base font-semibold text-gray-900 mt-1">
                    {selectedAsset.assetName}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Asset Group</p>
                  <p className="text-base font-semibold text-gray-900 mt-1">
                    {selectedAsset.assetGroup}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Workgroup</p>
                  <p className="text-base font-semibold text-gray-900 mt-1">
                    {selectedAsset.workgroup}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Operated Status</p>
                  <p className="text-base font-semibold text-gray-900 mt-1">
                    {selectedAsset.operatedStatus}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Equity Stake</p>
                  <p className="text-base font-semibold text-gray-900 mt-1">
                    {selectedAsset.equityStake}%
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <p className="text-base font-semibold text-gray-900 mt-1">
                    {selectedAsset.location}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Basin</p>
                  <p className="text-base font-semibold text-gray-900 mt-1">
                    {selectedAsset.basin}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Operational Status</p>
                  <p className="text-base font-semibold text-gray-900 mt-1">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        selectedAsset.operationalStatus
                      )}`}
                    >
                      {selectedAsset.operationalStatus}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Effective Year</p>
                  <p className="text-base font-semibold text-gray-900 mt-1">
                    {selectedAsset.effectiveYear}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowViewModal(false);
                    setSelectedAsset(null);
                  }}
                  className="flex-1"
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setShowViewModal(false);
                    openEditForm(selectedAsset);
                  }}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Edit Asset
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Upload Modal */}
      {showBulkUpload && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Bulk Upload: Asset Registry</h2>
              <p className="text-sm text-gray-600 mt-1">
                Upload CSV or Excel files to log multiple records at once.
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
                        <th className="px-3 py-2 text-left font-bold">Asset Name</th>
                        <th className="px-3 py-2 text-left font-bold">Asset Group</th>
                        <th className="px-3 py-2 text-left font-bold">Workgroup</th>
                        <th className="px-3 py-2 text-left font-bold">Status</th>
                        <th className="px-3 py-2 text-left font-bold">Location</th>
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
                    • Asset Name
                  </p>
                  <p className="text-xs text-gray-600 font-medium">
                    • Asset Group
                  </p>
                  <p className="text-xs text-gray-600 font-medium">
                    • Workgroup
                  </p>
                  <p className="text-xs text-gray-600 font-medium">
                    • Status
                  </p>
                  <p className="text-xs text-gray-600 font-medium">
                    • Location
                  </p>
                </div>

                <p className="text-xs text-gray-500 mt-3">
                  <strong>Note:</strong> File must be in .csv or .xlsx format. Column headers must match the preview above exactly.
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
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
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
                Download Template
              </button>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowBulkUpload(false);
                    setUploadedFile(null);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleBulkUpload}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Process Upload
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Excluded Asset Modal */}
      {showAddExcludedForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                New Excluded Assets Entry
              </h2>
              <button
                onClick={() => {
                  setShowAddExcludedForm(false);
                  resetExcludedForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Excluded Asset Name <span className="text-red-600">*</span>
                  </label>
                  <Input
                    value={excludedFormData.assetName}
                    onChange={(e) =>
                      setExcludedFormData({ ...excludedFormData, assetName: e.target.value })
                    }
                    placeholder="Enter asset name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Exclusion <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    value={excludedFormData.exclusionReason}
                    onChange={(e) =>
                      setExcludedFormData({ ...excludedFormData, exclusionReason: e.target.value })
                    }
                    placeholder="Provide reason for exclusion (e.g. Data gaps, immateriality...)"
                    className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Effective Year <span className="text-red-600">*</span>
                  </label>
                  <Input
                    type="number"
                    value={excludedFormData.effectiveYear}
                    onChange={(e) =>
                      setExcludedFormData({
                        ...excludedFormData,
                        effectiveYear: parseInt(e.target.value),
                      })
                    }
                    placeholder="2026"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddExcludedForm(false);
                    resetExcludedForm();
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddExcludedAsset}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  Register Asset
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
