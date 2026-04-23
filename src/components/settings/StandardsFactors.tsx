"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Database } from "lucide-react";
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

interface EmissionFactor {
  id: string;
  factorName: string;
  category: string;
  value: number;
  unit: string;
  source: string;
  effectiveDate: string;
}

const GWP_STANDARDS = ["IPCC AR4", "IPCC AR5", "IPCC AR6"];

const INITIAL_FACTORS: EmissionFactor[] = [
  {
    id: "EF-001",
    factorName: "Diesel Combustion",
    category: "Stationary Combustion",
    value: 0.00268,
    unit: "tCO2e/L",
    source: "IPCC 2021 Guidelines",
    effectiveDate: "2021-01-01",
  },
  {
    id: "EF-002",
    factorName: "Natural Gas Combustion",
    category: "Stationary Combustion",
    value: 0.00202,
    unit: "tCO2e/m³",
    source: "IPCC 2021 Guidelines",
    effectiveDate: "2021-01-01",
  },
  {
    id: "EF-003",
    factorName: "Nigerian Grid Electricity",
    category: "Purchased Electricity",
    value: 0.000431,
    unit: "tCO2e/kWh",
    source: "Nigeria National Grid 2024",
    effectiveDate: "2024-01-01",
  },
  {
    id: "EF-004",
    factorName: "Petrol/Gasoline",
    category: "Mobile Combustion",
    value: 0.00236,
    unit: "tCO2e/L",
    source: "IPCC 2021 Guidelines",
    effectiveDate: "2021-01-01",
  },
];

export function StandardsFactors() {
  const [selectedGWP, setSelectedGWP] = useState("IPCC AR6");
  const [factors, setFactors] = useState<EmissionFactor[]>(INITIAL_FACTORS);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFactors = factors.filter(
    (factor) =>
      factor.factorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      factor.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* GWP Standard Selection */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          GWP Standard Configuration
        </h3>
        <div className="max-w-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Global Warming Potential (GWP) Standard
          </label>
          <Select value={selectedGWP} onValueChange={setSelectedGWP}>
            <SelectTrigger>
              <SelectValue placeholder="Select GWP standard" />
            </SelectTrigger>
            <SelectContent>
              {GWP_STANDARDS.map((standard) => (
                <SelectItem key={standard} value={standard}>
                  {standard}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500 mt-2">
            This setting determines the GWP values used for converting non-CO2
            greenhouse gases to CO2 equivalents.
          </p>
        </div>
      </div>

      {/* Emission Factors */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-[#4CAF50]" />
            <h3 className="text-lg font-semibold text-gray-900">
              Emission Factors Library
            </h3>
          </div>
          <Button size="sm" className="bg-[#4CAF50] hover:bg-[#45a049]">
            <Plus className="h-4 w-4 mr-2" />
            Add Factor
          </Button>
        </div>

        {/* Search */}
        <div className="mb-4">
          <Input
            placeholder="Search factors by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Factors Table */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Factor Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Effective Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFactors.map((factor) => (
                <TableRow key={factor.id}>
                  <TableCell className="font-medium">{factor.factorName}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {factor.category}
                    </span>
                  </TableCell>
                  <TableCell className="font-mono">{factor.value}</TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {factor.unit}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {factor.source}
                  </TableCell>
                  <TableCell>{factor.effectiveDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
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

      {/* Custom Sources */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Custom Emission Sources
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Define organization-specific emission sources and calculation methodologies.
        </p>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Custom Source
        </Button>
      </div>

      {/* Proxy Settings */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Proxy Data Settings
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Lookback Period (months)
              </label>
              <Input type="number" defaultValue="3" min="1" max="12" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Escalation Trigger (days)
              </label>
              <Input type="number" defaultValue="7" min="1" max="30" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Eligible Indicators
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {["Flaring", "Electricity", "Water", "Oil Spill", "Waste"].map(
                (indicator) => (
                  <span
                    key={indicator}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 cursor-pointer hover:bg-amber-200"
                  >
                    {indicator}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
