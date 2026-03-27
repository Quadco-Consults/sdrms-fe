"use client";

import { useState } from "react";
import { Filter, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const BUSINESS_UNITS = [
  "All Business Units",
  "NNPC E&P",
  "NPDC",
  "NGC",
  "PPMC",
  "NLNG",
  "Duke Oil",
  "NNPC Retail",
  "NNPC Trading",
  "NNPC HQ",
  "NNEL",
];

const REPORTING_PERIODS = [
  "All Periods",
  "Jan 2026",
  "Feb 2026",
  "Mar 2026",
  "Apr 2026",
  "May 2026",
  "Jun 2026",
  "Jul 2026",
  "Aug 2026",
  "Sep 2026",
  "Oct 2026",
  "Nov 2026",
  "Dec 2026",
  "Q1 2026",
  "Q2 2026",
  "Q3 2026",
  "Q4 2026",
  "Annual 2025",
  "Annual 2026",
];

const FACILITIES = [
  "All Facilities",
  "Main Facility",
  "Offshore Platform A",
  "Refinery Complex",
  "Gas Plant 1",
];

interface GlobalFiltersProps {
  onFilterChange?: (filters: {
    businessUnit: string;
    period: string;
    facility: string;
  }) => void;
  className?: string;
}

export default function GlobalFilters({
  onFilterChange,
  className,
}: GlobalFiltersProps) {
  const [businessUnit, setBusinessUnit] = useState("All Business Units");
  const [period, setPeriod] = useState("All Periods");
  const [facility, setFacility] = useState("All Facilities");

  const handleClearAll = () => {
    setBusinessUnit("All Business Units");
    setPeriod("All Periods");
    setFacility("All Facilities");
    onFilterChange?.({
      businessUnit: "All Business Units",
      period: "All Periods",
      facility: "All Facilities",
    });
  };

  const handleApplyFilters = () => {
    onFilterChange?.({ businessUnit, period, facility });
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-8",
        className
      )}
    >
      {/* Filter Icon & Label */}
      <div className="flex items-center gap-2">
        <Filter size={16} className="text-green-700" />
        <span className="text-[11px] font-black text-gray-500 uppercase tracking-widest">
          Global Filters:
        </span>
      </div>

      {/* Filter Dropdowns */}
      <div className="flex flex-wrap gap-3">
        {/* Business Unit */}
        <div className="relative">
          <select
            value={businessUnit}
            onChange={(e) => setBusinessUnit(e.target.value)}
            className="bg-gray-50 border border-gray-300 rounded-lg pl-3 pr-8 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 transition-all appearance-none cursor-pointer min-w-[180px]"
          >
            {BUSINESS_UNITS.map((bu) => (
              <option key={bu} value={bu}>
                {bu}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          />
        </div>

        {/* Reporting Period */}
        <div className="relative">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="bg-gray-50 border border-gray-300 rounded-lg pl-3 pr-8 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 transition-all appearance-none cursor-pointer min-w-[160px]"
          >
            {REPORTING_PERIODS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          />
        </div>

        {/* Facility */}
        <div className="relative">
          <select
            value={facility}
            onChange={(e) => setFacility(e.target.value)}
            className="bg-gray-50 border border-gray-300 rounded-lg pl-3 pr-8 py-2 text-xs font-bold text-gray-900 focus:outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100 transition-all appearance-none cursor-pointer min-w-[180px]"
          >
            {FACILITIES.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="ml-auto flex items-center gap-4">
        <button
          onClick={handleClearAll}
          className="text-[11px] font-black text-green-700 hover:underline uppercase tracking-widest transition-all"
        >
          Clear All
        </button>
        <button
          onClick={handleApplyFilters}
          className="bg-green-700 text-white px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest hover:bg-green-800 transition-all shadow-sm"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
