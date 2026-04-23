"use client";

import { useState } from "react";
import { Plus, Upload, Download, Filter, Eye, Edit, Trash2, Trash } from "lucide-react";
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

// Types
interface WasteRecord {
  id: string;
  recordDate: string;
  facility: string;
  wasteType: string;
  quantity: number;
  unit: string;
  disposalMethod: string;
  wasteCode?: string;
  recycledAmount?: number;
  responsiblePerson: string;
  status: "Draft" | "Submitted" | "Verified" | "Rejected";
  createdAt: string;
}

// Mock Data
const INITIAL_RECORDS: WasteRecord[] = [
  {
    id: "WST-001",
    recordDate: "2026-04-20",
    facility: "Port Harcourt Refinery",
    wasteType: "Hazardous",
    quantity: 12.5,
    unit: "tonnes",
    disposalMethod: "Incineration",
    wasteCode: "D10-002",
    responsiblePerson: "Engr. Chidi Okafor",
    status: "Verified",
    createdAt: "2026-04-21",
  },
  {
    id: "WST-002",
    recordDate: "2026-04-19",
    facility: "Warri Refinery",
    wasteType: "Non-Hazardous",
    quantity: 45.8,
    unit: "tonnes",
    disposalMethod: "Recycling",
    recycledAmount: 45.8,
    responsiblePerson: "Mrs. Fatima Bello",
    status: "Verified",
    createdAt: "2026-04-20",
  },
  {
    id: "WST-003",
    recordDate: "2026-04-18",
    facility: "Kaduna Refinery",
    wasteType: "Hazardous",
    quantity: 8.3,
    unit: "tonnes",
    disposalMethod: "Landfill",
    wasteCode: "D10-005",
    responsiblePerson: "Dr. Amina Ibrahim",
    status: "Submitted",
    createdAt: "2026-04-19",
  },
  {
    id: "WST-004",
    recordDate: "2026-04-17",
    facility: "NNPC Towers",
    wasteType: "Non-Hazardous",
    quantity: 25.0,
    unit: "tonnes",
    disposalMethod: "Recycling",
    recycledAmount: 18.5,
    responsiblePerson: "Mr. Victor Anunobi",
    status: "Verified",
    createdAt: "2026-04-18",
  },
];

const WASTE_TYPES = ["Hazardous", "Non-Hazardous"];
const DISPOSAL_METHODS = ["Recycling", "Landfill", "Incineration", "Composting", "Treatment"];

export default function WasteManagementPage() {
  const [records, setRecords] = useState<WasteRecord[]>(INITIAL_RECORDS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter records
  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.facility.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.wasteType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate KPIs
  const totalWaste = records.reduce((sum, r) => sum + r.quantity, 0);
  const hazardousWaste = records
    .filter((r) => r.wasteType === "Hazardous")
    .reduce((sum, r) => sum + r.quantity, 0);
  const totalRecycled = records.reduce((sum, r) => sum + (r.recycledAmount || 0), 0);
  const recyclingRate = (totalRecycled / totalWaste) * 100;
  const landfillDiversion = ((totalWaste - records.filter(r => r.disposalMethod === "Landfill").reduce((sum, r) => sum + r.quantity, 0)) / totalWaste) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Verified":
        return "bg-green-100 text-green-800";
      case "Submitted":
        return "bg-blue-100 text-blue-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getWasteTypeColor = (type: string) => {
    return type === "Hazardous" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800";
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Trash className="h-6 w-6 text-gray-600" />
            Waste Management
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Track waste generation, disposal, and recycling activities
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button size="sm" className="bg-[#4CAF50] hover:bg-[#45a049]">
            <Plus className="h-4 w-4 mr-2" />
            Add Record
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Total Waste Generated</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {totalWaste.toFixed(1)}
          </p>
          <p className="text-xs text-gray-500 mt-1">tonnes</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Hazardous Waste</p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {hazardousWaste.toFixed(1)}
          </p>
          <p className="text-xs text-gray-500 mt-1">tonnes</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Recycling Rate</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {recyclingRate.toFixed(0)}%
          </p>
          <p className="text-xs text-green-600 mt-1">+8% from last month</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Landfill Diversion</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {landfillDiversion.toFixed(0)}%
          </p>
          <p className="text-xs text-green-600 mt-1">Diverted from landfill</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="Search by ID, facility, or waste type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Submitted">Submitted</SelectItem>
              <SelectItem value="Verified">Verified</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
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
              <TableHead>Record ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Facility</TableHead>
              <TableHead>Waste Type</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Disposal Method</TableHead>
              <TableHead>Recycled</TableHead>
              <TableHead>Waste Code</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.id}</TableCell>
                <TableCell>{record.recordDate}</TableCell>
                <TableCell>{record.facility}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getWasteTypeColor(record.wasteType)}`}>
                    {record.wasteType}
                  </span>
                </TableCell>
                <TableCell>
                  {record.quantity.toFixed(1)} {record.unit}
                </TableCell>
                <TableCell>{record.disposalMethod}</TableCell>
                <TableCell>
                  {record.recycledAmount
                    ? `${record.recycledAmount.toFixed(1)} ${record.unit}`
                    : "—"}
                </TableCell>
                <TableCell>
                  <span className="text-xs text-gray-600 font-mono">
                    {record.wasteCode || "—"}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                    {record.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
