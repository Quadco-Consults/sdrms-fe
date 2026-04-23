"use client";

import { useState } from "react";
import { FileText, Download, Calendar, Filter, Eye, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Types
interface Report {
  id: string;
  reportType: string;
  reportName: string;
  period: string;
  generatedDate: string;
  status: "Draft" | "In Progress" | "Completed" | "Failed";
  fileSize?: string;
}

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  ipAddress: string;
}

// Report Types
const REPORT_TYPES = [
  {
    id: "integrated-kpi",
    name: "Integrated KPI Report",
    description: "Comprehensive ESG performance metrics (6-10 topics)",
    topics: "6-10",
  },
  {
    id: "ogmp-2.0",
    name: "OGMP 2.0 Compliance Report",
    description: "Oil & Gas Methane Partnership reporting",
    topics: "Methane",
  },
  {
    id: "gri",
    name: "GRI Sustainability Statement",
    description: "Global Reporting Initiative disclosure",
    topics: "ESG",
  },
  {
    id: "tcfd",
    name: "TCFD Disclosure Report",
    description: "Task Force on Climate-related Financial Disclosures",
    topics: "Climate",
  },
  {
    id: "internal",
    name: "Internal Performance Summary",
    description: "Monthly/Quarterly internal dashboard",
    topics: "All",
  },
  {
    id: "ngx-esg",
    name: "NGX ESG Compliance Report",
    description: "Nigerian Exchange Group ESG disclosure",
    topics: "ESG",
  },
  {
    id: "brsr",
    name: "BRSR Reporting Template",
    description: "Business Responsibility and Sustainability Reporting",
    topics: "ESG",
  },
];

// Mock Data
const INITIAL_REPORTS: Report[] = [
  {
    id: "RPT-001",
    reportType: "GRI Sustainability Statement",
    reportName: "GRI Report - Q1 2026",
    period: "Q1 2026",
    generatedDate: "2026-04-15",
    status: "Completed",
    fileSize: "2.4 MB",
  },
  {
    id: "RPT-002",
    reportType: "OGMP 2.0 Compliance Report",
    reportName: "OGMP 2.0 - March 2026",
    period: "March 2026",
    generatedDate: "2026-04-10",
    status: "Completed",
    fileSize: "1.8 MB",
  },
  {
    id: "RPT-003",
    reportType: "TCFD Disclosure Report",
    reportName: "TCFD Annual Report - 2025",
    period: "FY 2025",
    generatedDate: "2026-04-05",
    status: "Completed",
    fileSize: "3.2 MB",
  },
];

const AUDIT_LOGS: AuditLog[] = [
  {
    id: "AUD-001",
    timestamp: "2026-04-23 10:15:32",
    user: "admin@nnpc.com",
    action: "Approved Record",
    details: "GHG-001 - Scope 1 emissions approved",
    ipAddress: "192.168.1.100",
  },
  {
    id: "AUD-002",
    timestamp: "2026-04-23 09:45:18",
    user: "submitter@nnpc.com",
    action: "Bulk Upload",
    details: "Uploaded 45 energy consumption records",
    ipAddress: "192.168.1.105",
  },
  {
    id: "AUD-003",
    timestamp: "2026-04-23 09:30:00",
    user: "system",
    action: "Automated Sync",
    details: "SCADA integration - 128 data points synced",
    ipAddress: "10.0.0.1",
  },
];

export default function ReportingPage() {
  const [selectedReportType, setSelectedReportType] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedWorkgroup, setSelectedWorkgroup] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      alert("Report generation started! You'll be notified when it's ready.");
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Draft":
        return "bg-gray-100 text-gray-800";
      case "Failed":
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
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="h-6 w-6 text-[#4CAF50]" />
            Reporting & Analytics
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Generate compliance reports and view audit trails
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="generate" className="space-y-6">
        <TabsList>
          <TabsTrigger value="generate">Generate Reports</TabsTrigger>
          <TabsTrigger value="library">Report Library</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>

        {/* Generate Reports Tab */}
        <TabsContent value="generate" className="space-y-6">
          {/* Report Type Selection */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Report Configuration
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Report Type <span className="text-red-500">*</span>
                </label>
                <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    {REPORT_TYPES.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reporting Period <span className="text-red-500">*</span>
                </label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="q1-2026">Q1 2026</SelectItem>
                    <SelectItem value="q2-2026">Q2 2026</SelectItem>
                    <SelectItem value="march-2026">March 2026</SelectItem>
                    <SelectItem value="april-2026">April 2026</SelectItem>
                    <SelectItem value="fy-2025">FY 2025</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Workgroup Filter
                </label>
                <Select value={selectedWorkgroup} onValueChange={setSelectedWorkgroup}>
                  <SelectTrigger>
                    <SelectValue placeholder="All workgroups" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Workgroups</SelectItem>
                    <SelectItem value="upstream">Upstream</SelectItem>
                    <SelectItem value="downstream">Downstream</SelectItem>
                    <SelectItem value="gas-power">Gas, Power & New Energy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleGenerateReport}
              disabled={!selectedReportType || !selectedPeriod || isGenerating}
              className="bg-[#4CAF50] hover:bg-[#45a049]"
            >
              {isGenerating ? (
                "Generating..."
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </>
              )}
            </Button>
          </div>

          {/* Available Report Types */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Available Report Types
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {REPORT_TYPES.map((type) => (
                <div
                  key={type.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-[#4CAF50] transition-colors cursor-pointer"
                  onClick={() => setSelectedReportType(type.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{type.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Topics: {type.topics}
                        </span>
                      </div>
                    </div>
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Report Library Tab */}
        <TabsContent value="library" className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Report Library</h2>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report ID</TableHead>
                  <TableHead>Report Type</TableHead>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Generated Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>File Size</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {INITIAL_REPORTS.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium font-mono">
                      {report.id}
                    </TableCell>
                    <TableCell>{report.reportType}</TableCell>
                    <TableCell>{report.reportName}</TableCell>
                    <TableCell>{report.period}</TableCell>
                    <TableCell>{report.generatedDate}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          report.status
                        )}`}
                      >
                        {report.status}
                      </span>
                    </TableCell>
                    <TableCell>{report.fileSize}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Audit Trail Tab */}
        <TabsContent value="audit" className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">System Audit Trail</h2>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {AUDIT_LOGS.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-sm">
                      {log.timestamp}
                    </TableCell>
                    <TableCell>{log.user}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {log.action}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {log.details}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {log.ipAddress}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
