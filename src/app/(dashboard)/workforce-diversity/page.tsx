"use client";
import { useState, useMemo } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Download,
  Upload,
  Plus,
  Filter,
  Search,
  Users,
  UserCircle,
} from "lucide-react";
import DiversityStatsCard from "@/components/workforce/DiversityStatsCard";
import DiversityPieChart from "@/components/workforce/DiversityPieChart";
import Pagination from "@/components/workforce/Pagination";
import AddWorkforceDataModal from "@/components/workforce/AddWorkforceDataModal";
import FilterModal from "@/components/workforce/FilterModal";
import UploadWorkforceDataModal from "@/components/workforce/UploadWorkforceDataModal";
import {
  mockWorkforceData,
  mockWorkforceDiversityStats,
} from "@/data/workforceData";
import { WorkforceData, WorkforceFilter, PieChartData } from "@/types/workforce";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function WorkforceDiversityPage() {
  const [workforceData, setWorkforceData] = useState<WorkforceData[]>(mockWorkforceData);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<WorkforceFilter>({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [viewMode, setViewMode] = useState<"overview" | "table">("overview");

  // Filter and search data
  const filteredData = useMemo(() => {
    return workforceData.filter((item) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          item.name.toLowerCase().includes(query) ||
          item.age.toString().includes(query) ||
          item.date.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Gender filter
      if (filters.gender && item.gender !== filters.gender) {
        return false;
      }

      // Job Role filter (using level)
      if (filters.jobRole && item.level !== filters.jobRole) {
        return false;
      }

      // Date range filter
      if (filters.dateFrom || filters.dateTo) {
        // Parse date from DD/MM/YYYY format
        const [day, month, year] = item.date.split("/").map(Number);
        const itemDate = new Date(year, month - 1, day);

        if (filters.dateFrom) {
          const fromDate = new Date(filters.dateFrom);
          if (itemDate < fromDate) return false;
        }

        if (filters.dateTo) {
          const toDate = new Date(filters.dateTo);
          if (itemDate > toDate) return false;
        }
      }

      return true;
    });
  }, [workforceData, searchQuery, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Calculate pie chart data
  const pieChartData: PieChartData[] = useMemo(() => {
    const genderCount = workforceData.reduce((acc, item) => {
      acc[item.gender] = (acc[item.gender] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const ethnicityCount = workforceData.reduce((acc, item) => {
      acc[item.ethnicity] = (acc[item.ethnicity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const totalAge = workforceData.reduce((sum, item) => sum + item.age, 0);
    const accessibilityCount = workforceData.filter(
      (item) => item.accessibility && item.accessibility !== "NIL"
    ).length;

    return [
      { name: "Accessibility", value: 100, color: "#6366f1" },
      { name: "Gender", value: 62, color: "#22c55e" },
      { name: "Ethnicity", value: 50, color: "#f59e0b" },
      { name: "Age", value: 28, color: "#3b82f6" },
    ];
  }, [workforceData]);

  const handleAddWorkforce = (data: Omit<WorkforceData, "id">) => {
    const newData: WorkforceData = {
      ...data,
      id: (workforceData.length + 1).toString(),
    };
    setWorkforceData([newData, ...workforceData]);
  };

  const handleDownloadCSV = () => {
    const headers = [
      "Name",
      "Gender",
      "Age",
      "Ethnicity",
      "Accessibility",
      "Level",
      "Time",
      "Date",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredData.map((item) =>
        [
          item.name,
          item.gender,
          item.age,
          item.ethnicity,
          item.accessibility || "NIL",
          item.level,
          item.time,
          item.date,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "workforce-diversity-data.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleUpload = (files: File[]) => {
    // Handle file upload
    console.log("Upload files:", files);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Workforce Diversity" },
        ]}
      />

      <div className="p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Workforce Diversity & Inclusion Tracking
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Overview record for workforce diversity metrics
          </p>
        </div>

        {viewMode === "overview" && (
          <>
            {/* Stats Overview */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base text-gray-700">
                  Overview of Workforce Diversity (percentage Male / female,
                  percentage disability hires)
                </h2>
                <Select defaultValue="monthly">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Stats Cards */}
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-orange-100 rounded flex items-center justify-center">
                        <Users className="w-4 h-4 text-orange-600" />
                      </div>
                      <span className="text-sm text-gray-600">Total Users</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">
                      {mockWorkforceDiversityStats.totalUsers.toLocaleString()}
                    </p>
                  </div>

                  <DiversityStatsCard
                    title="Female"
                    count={mockWorkforceDiversityStats.female.count}
                    percentage={mockWorkforceDiversityStats.female.percentage}
                    comparison={mockWorkforceDiversityStats.female.comparison}
                    icon={
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-sm font-bold">1</span>
                      </div>
                    }
                    color="#22c55e"
                  />

                  <DiversityStatsCard
                    title="Male"
                    count={mockWorkforceDiversityStats.male.count}
                    percentage={mockWorkforceDiversityStats.male.percentage}
                    comparison={mockWorkforceDiversityStats.male.comparison}
                    icon={
                      <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 text-sm font-bold">2</span>
                      </div>
                    }
                    color="#f97316"
                  />

                  <DiversityStatsCard
                    title="Ethnicity"
                    count={mockWorkforceDiversityStats.ethnicity.count}
                    percentage={mockWorkforceDiversityStats.ethnicity.percentage}
                    comparison={mockWorkforceDiversityStats.ethnicity.comparison}
                    icon={
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-sm font-bold">3</span>
                      </div>
                    }
                    color="#22c55e"
                  />
                </div>

                {/* Pie Chart */}
                <div className="lg:col-span-2">
                  <DiversityPieChart data={pieChartData} />
                </div>
              </div>
            </div>

            {/* Recent Records Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Workforce Diversity & Inclusion
              </h2>
              <Button
                variant="link"
                onClick={() => setViewMode("table")}
                className="text-green-600"
              >
                View All Records &gt;
              </Button>
            </div>
          </>
        )}

        {/* Table Controls */}
        <div className="bg-white rounded-t-lg border border-gray-200 border-b-0 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search by Names, Age, Dates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilterModal(true)}
                className="gap-2"
              >
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handleDownloadCSV}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Download CSV
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowUploadModal(true)}
                className="gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload Workforce Data
              </Button>
              <Button
                onClick={() => setShowAddModal(true)}
                className="gap-2 bg-green-600 hover:bg-green-700"
              >
                <Plus className="w-4 h-4" />
                Add Workforce Data
              </Button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-b-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Initiative Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Gender
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Age
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Ethnicity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Accessibility
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.gender}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.age}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.ethnicity}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.accessibility || "NIL"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.level}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.time}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <button className="text-gray-400 hover:text-gray-600">
                        •••
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalRows={filteredData.length}
            rowsPerPage={rowsPerPage}
            onPageChange={setCurrentPage}
            onRowsPerPageChange={(newRowsPerPage) => {
              setRowsPerPage(newRowsPerPage);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Modals */}
      <AddWorkforceDataModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddWorkforce}
      />

      <FilterModal
        open={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={(newFilters) => {
          setFilters(newFilters);
          setCurrentPage(1);
        }}
        currentFilters={filters}
      />

      <UploadWorkforceDataModal
        open={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={handleUpload}
      />
    </div>
  );
}
