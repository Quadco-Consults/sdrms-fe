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
interface AirQualityRecord {
  id: string;
  recordDate: string;
  facility: string;
  pollutantType: string;
  concentration: number;
  unit: string;
  sourceType: string;
  regulatoryLimit: number;
  complianceStatus: "Compliant" | "Non-Compliant" | "Warning";
  status: "Draft" | "Submitted" | "Verified" | "Rejected";
  createdAt: string;
}

// Mock Data
const INITIAL_RECORDS: AirQualityRecord[] = [
  {
    id: "AIR-001",
    recordDate: "2026-04-20",
    facility: "Kaduna Refinery",
    pollutantType: "NOx",
    concentration: 45.2,
    unit: "mg/Nm³",
    sourceType: "Stack Emission",
    regulatoryLimit: 200,
    complianceStatus: "Compliant",
    status: "Verified",
    createdAt: "2026-04-21",
  },
  {
    id: "AIR-002",
    recordDate: "2026-04-19",
    facility: "Port Harcourt Refinery",
    pollutantType: "SOx",
    concentration: 38.7,
    unit: "mg/Nm³",
    sourceType: "Flare Emission",
    regulatoryLimit: 100,
    complianceStatus: "Compliant",
    status: "Verified",
    createdAt: "2026-04-20",
  },
  {
    id: "AIR-003",
    recordDate: "2026-04-18",
    facility: "Warri Refinery",
    pollutantType: "PM10",
    concentration: 95.3,
    unit: "μg/m³",
    sourceType: "Ambient",
    regulatoryLimit: 100,
    complianceStatus: "Warning",
    status: "Submitted",
    createdAt: "2026-04-19",
  },
];

const POLLUTANT_TYPES = ["NOx", "SOx", "PM10", "PM2.5", "VOCs", "CO"];
const SOURCE_TYPES = ["Stack Emission", "Ambient", "Flare Emission", "Fugitive"];

export default function AirQualityPage() {
  const [records, setRecords] = useState<AirQualityRecord[]>(INITIAL_RECORDS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter records
  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.facility.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.pollutantType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate KPIs
  const avgNOx = records
    .filter((r) => r.pollutantType === "NOx")
    .reduce((sum, r) => sum + r.concentration, 0) / records.filter((r) => r.pollutantType === "NOx").length || 0;

  const avgSOx = records
    .filter((r) => r.pollutantType === "SOx")
    .reduce((sum, r) => sum + r.concentration, 0) / records.filter((r) => r.pollutantType === "SOx").length || 0;

  const avgPM10 = records
    .filter((r) => r.pollutantType === "PM10")
    .reduce((sum, r) => sum + r.concentration, 0) / records.filter((r) => r.pollutantType === "PM10").length || 0;

  const complianceRate = (records.filter((r) => r.complianceStatus === "Compliant").length / records.length) * 100;

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

  const getComplianceColor = (status: string) => {
    switch (status) {
      case "Compliant":
        return "bg-green-100 text-green-800";
      case "Warning":
        return "bg-yellow-100 text-yellow-800";
      case "Non-Compliant":
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
          <h1 className="text-2xl font-bold text-gray-900">Air Quality</h1>
          <p className="text-sm text-gray-600 mt-1">
            Monitor air pollutant emissions and compliance
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
          <p className="text-sm text-gray-600">Average NOx</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {avgNOx.toFixed(1)}
          </p>
          <p className="text-xs text-gray-500 mt-1">mg/Nm³</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Average SOx</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {avgSOx.toFixed(1)}
          </p>
          <p className="text-xs text-gray-500 mt-1">mg/Nm³</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Average PM10</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {avgPM10.toFixed(1)}
          </p>
          <p className="text-xs text-gray-500 mt-1">μg/m³</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-600">Compliance Rate</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {complianceRate.toFixed(0)}%
          </p>
          <p className="text-xs text-green-600 mt-1">Within limits</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="Search by ID, facility, or pollutant..."
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
              <TableHead>Pollutant</TableHead>
              <TableHead>Concentration</TableHead>
              <TableHead>Source Type</TableHead>
              <TableHead>Limit</TableHead>
              <TableHead>Compliance</TableHead>
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
                <TableCell>{record.pollutantType}</TableCell>
                <TableCell>
                  {record.concentration.toFixed(1)} {record.unit}
                </TableCell>
                <TableCell>{record.sourceType}</TableCell>
                <TableCell>
                  {record.regulatoryLimit} {record.unit}
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplianceColor(record.complianceStatus)}`}>
                    {record.complianceStatus}
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
