"use client";

import { useState } from "react";
import { Plus, Upload, Download, Filter, Eye, Edit, Trash2 } from "lucide-react";
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
interface BiodiversityRecord {
  id: string;
  recordDate: string;
  facility: string;
  actionType: string;
  areaSize: number;
  unit: string;
  speciesAffected?: string;
  iucnStatus?: string;
  methodology: string;
  responsiblePerson: string;
  status: "Draft" | "Submitted" | "Verified" | "Rejected";
  createdAt: string;
}

// Mock Data
const INITIAL_RECORDS: BiodiversityRecord[] = [
  {
    id: "BIO-001",
    recordDate: "2026-04-15",
    facility: "Port Harcourt Refinery",
    actionType: "Conservation",
    areaSize: 250,
    unit: "hectares",
    speciesAffected: "Niger Delta Red Colobus",
    iucnStatus: "Endangered",
    methodology: "Protected Area Designation",
    responsiblePerson: "Dr. Amina Ibrahim",
    status: "Verified",
    createdAt: "2026-04-16",
  },
  {
    id: "BIO-002",
    recordDate: "2026-04-10",
    facility: "Warri Refinery",
    actionType: "Rehabilitation",
    areaSize: 120,
    unit: "hectares",
    speciesAffected: "Mangrove Forest",
    iucnStatus: "Vulnerable",
    methodology: "Restoration Planting",
    responsiblePerson: "Engr. Chidi Okafor",
    status: "Submitted",
    createdAt: "2026-04-11",
  },
];

const ACTION_TYPES = ["Conservation", "Protection", "Monitoring", "Rehabilitation", "Relocation"];
const IUCN_STATUS = ["Critically Endangered", "Endangered", "Vulnerable", "Near Threatened", "Least Concern"];
const METHODOLOGIES = ["Protected Area Designation", "Restoration Planting", "Species Relocation", "Habitat Monitoring", "Impact Assessment"];

export default function BiodiversityPage() {
  const [records, setRecords] = useState<BiodiversityRecord[]>(INITIAL_RECORDS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter records
  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.facility.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.speciesAffected?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate KPIs
  const totalProtectedArea = records.reduce((sum, r) =>
    r.actionType === "Protection" || r.actionType === "Conservation" ? sum + r.areaSize : sum, 0
  );
  const rehabilitatedArea = records.reduce((sum, r) =>
    r.actionType === "Rehabilitation" ? sum + r.areaSize : sum, 0
  );
  const endangeredSpeciesCount = records.filter(r =>
    r.iucnStatus === "Endangered" || r.iucnStatus === "Critically Endangered"
  ).length;

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

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Biodiversity</h1>
          <p className="text-sm text-gray-600 mt-1">
            Track conservation efforts and biodiversity impact
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
          <p className="text-sm text-gray-600">Total Protected Area</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {totalProtectedArea.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">hectares</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Rehabilitated Area</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {rehabilitatedArea.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">hectares</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Endangered Species</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {endangeredSpeciesCount}
          </p>
          <p className="text-xs text-gray-500 mt-1">monitored</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Conservation Rate</p>
          <p className="text-2xl font-bold text-green-600 mt-1">85%</p>
          <p className="text-xs text-green-600 mt-1">+5% from last quarter</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="Search by ID, facility, or species..."
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
              <TableHead>Action Type</TableHead>
              <TableHead>Area Size</TableHead>
              <TableHead>Species Affected</TableHead>
              <TableHead>IUCN Status</TableHead>
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
                <TableCell>{record.actionType}</TableCell>
                <TableCell>
                  {record.areaSize.toLocaleString()} {record.unit}
                </TableCell>
                <TableCell>{record.speciesAffected || "—"}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    record.iucnStatus === "Critically Endangered" || record.iucnStatus === "Endangered"
                      ? "bg-red-100 text-red-800"
                      : record.iucnStatus === "Vulnerable"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}>
                    {record.iucnStatus || "—"}
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
