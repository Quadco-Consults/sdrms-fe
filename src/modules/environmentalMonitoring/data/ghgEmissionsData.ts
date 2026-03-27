export interface GHGRecord {
  id: string;
  recordId: string;
  emissionSource: string;
  quantity: number;
  unitMetrics: string;
  location: string;
  note: string;
  emissionScope: string;
  emissionType: string;
  bu: string;
  date: string;
  status: "active" | "inactive" | "pending";
  totalEmissions?: number;
}

// Dropdown option constants
export const EMISSION_SCOPES = ["Scope 1", "Scope 2", "Scope 3"];

export const EMISSION_TYPES = [
  "Fuel combustion",
  "Purchased Electricity",
  "Fugitive emissions",
  "Process emissions",
  "Mobile combustion",
];

export const BUSINESS_UNITS = ["NNEL", "HSE", "CSS", "NNPC Retail", "NNPC Trading", "Midstream"];

export const LOCATIONS = ["Alakiri", "Lagos HQ", "Warri Plant", "Abuja Office", "Port Harcourt", "Nationwide"];

export const STATUS_OPTIONS = ["active", "inactive", "pending"] as const;

// Mock records
export const mockGHGRecords: GHGRecord[] = [
  { id: "1",  recordId: "100WE", emissionSource: "Natural gas heating",  quantity: 120, unitMetrics: "Metric Tons CO₂e", location: "Alakiri",        note: "Gas usage for office heating.", emissionScope: "Scope 1", emissionType: "Fuel combustion",      bu: "NNEL",       date: "20/03/2025", status: "active",  totalEmissions: 200 },
  { id: "2",  recordId: "100WE", emissionSource: "Natural gas heating",  quantity: 120, unitMetrics: "Metric Tons CO₂e", location: "Alakiri",        note: "Gas usage for office heating.", emissionScope: "Scope 1", emissionType: "Fuel combustion",      bu: "NNEL",       date: "20/03/2025", status: "active",  totalEmissions: 200 },
  { id: "3",  recordId: "100WE", emissionSource: "Methane",              quantity: 120, unitMetrics: "Metric Tons CO₂e", location: "Alakiri",        note: "Gas usage for office heating.", emissionScope: "Scope 1", emissionType: "Fuel combustion",      bu: "HSE",        date: "20/03/2025", status: "active",  totalEmissions: 180 },
  { id: "4",  recordId: "100WE", emissionSource: "Methane",              quantity: 120, unitMetrics: "Metric Tons CO₂e", location: "Alakiri",        note: "Gas usage for office heating.", emissionScope: "Scope 1", emissionType: "Fuel combustion",      bu: "HSE",        date: "20/03/2025", status: "active",  totalEmissions: 180 },
  { id: "5",  recordId: "100WE", emissionSource: "Nitrous Oxide",        quantity: 120, unitMetrics: "Metric Tons CO₂e", location: "Alakiri",        note: "Gas usage for office heating.", emissionScope: "Scope 1", emissionType: "Fuel combustion",      bu: "CSS",        date: "20/03/2025", status: "active",  totalEmissions: 150 },
  { id: "6",  recordId: "100WE", emissionSource: "Nitrous Oxide",        quantity: 120, unitMetrics: "Metric Tons CO₂e", location: "Alakiri",        note: "Gas usage for office heating.", emissionScope: "Scope 1", emissionType: "Fuel combustion",      bu: "CSS",        date: "20/03/2025", status: "active",  totalEmissions: 150 },
  { id: "7",  recordId: "101WE", emissionSource: "Diesel combustion",    quantity: 85,  unitMetrics: "Metric Tons CO₂e", location: "Lagos HQ",       note: "Backup power generation.",     emissionScope: "Scope 1", emissionType: "Mobile combustion",   bu: "NNEL",       date: "19/03/2025", status: "active",  totalEmissions: 120 },
  { id: "8",  recordId: "101WE", emissionSource: "Diesel combustion",    quantity: 85,  unitMetrics: "Metric Tons CO₂e", location: "Lagos HQ",       note: "Backup power generation.",     emissionScope: "Scope 2", emissionType: "Mobile combustion",   bu: "HSE",        date: "19/03/2025", status: "pending", totalEmissions: 120 },
  { id: "9",  recordId: "102WE", emissionSource: "Purchased Electricity",quantity: 200, unitMetrics: "Metric Tons CO₂e", location: "Alakiri",        note: "Monthly electricity conversion.",emissionScope: "Scope 2", emissionType: "Purchased Electricity", bu: "NNEL",       date: "18/03/2025", status: "active",  totalEmissions: 300 },
  { id: "10", recordId: "102WE", emissionSource: "Purchased Electricity",quantity: 200, unitMetrics: "Metric Tons CO₂e", location: "Alakiri",        note: "Monthly electricity conversion.",emissionScope: "Scope 2", emissionType: "Purchased Electricity", bu: "CSS",        date: "18/03/2025", status: "active",  totalEmissions: 300 },
  { id: "11", recordId: "103WE", emissionSource: "Industrial Boiler",    quantity: 95,  unitMetrics: "Metric Tons CO₂e", location: "Warri Plant",     note: "Steam generation.",            emissionScope: "Scope 1", emissionType: "Process emissions",   bu: "NNPC Retail",date: "17/03/2025", status: "active",  totalEmissions: 140 },
  { id: "12", recordId: "103WE", emissionSource: "Industrial Boiler",    quantity: 95,  unitMetrics: "Metric Tons CO₂e", location: "Warri Plant",     note: "Steam generation.",            emissionScope: "Scope 3", emissionType: "Process emissions",   bu: "NNPC Retail",date: "17/03/2025", status: "inactive",totalEmissions: 140 },
  { id: "13", recordId: "104WE", emissionSource: "Air Travel",           quantity: 12,  unitMetrics: "Metric Tons CO₂e", location: "Nationwide",      note: "Business travel.",             emissionScope: "Scope 3", emissionType: "Mobile combustion",   bu: "NNPC Trading",date:"15/03/2025", status: "active",  totalEmissions: 18  },
  { id: "14", recordId: "104WE", emissionSource: "Vehicle Fleet",        quantity: 45,  unitMetrics: "Metric Tons CO₂e", location: "Nationwide",      note: "Monthly fleet report.",        emissionScope: "Scope 1", emissionType: "Mobile combustion",   bu: "Midstream",  date: "15/03/2025", status: "active",  totalEmissions: 68  },
  { id: "15", recordId: "105WE", emissionSource: "Fugitive Leak",        quantity: 30,  unitMetrics: "Metric Tons CO₂e", location: "Port Harcourt",   note: "Pipeline fugitive emission.",  emissionScope: "Scope 1", emissionType: "Fugitive emissions", bu: "Midstream",  date: "14/03/2025", status: "pending", totalEmissions: 45  },
  { id: "16", recordId: "105WE", emissionSource: "Cooling Tower",        quantity: 60,  unitMetrics: "Metric Tons CO₂e", location: "Warri Plant",     note: "Refrigerant leak.",            emissionScope: "Scope 1", emissionType: "Fugitive emissions", bu: "HSE",        date: "14/03/2025", status: "active",  totalEmissions: 90  },
  { id: "17", recordId: "106WE", emissionSource: "Natural gas heating",  quantity: 110, unitMetrics: "Metric Tons CO₂e", location: "Abuja Office",    note: "Office heating Q1.",           emissionScope: "Scope 1", emissionType: "Fuel combustion",      bu: "CSS",        date: "12/03/2025", status: "active",  totalEmissions: 165 },
  { id: "18", recordId: "106WE", emissionSource: "Methane",              quantity: 75,  unitMetrics: "Metric Tons CO₂e", location: "Port Harcourt",   note: "Gas flaring incident.",        emissionScope: "Scope 1", emissionType: "Fugitive emissions", bu: "Midstream",  date: "12/03/2025", status: "active",  totalEmissions: 110 },
  { id: "19", recordId: "107WE", emissionSource: "Purchased Electricity",quantity: 180, unitMetrics: "Metric Tons CO₂e", location: "Lagos HQ",       note: "Q1 electricity usage.",        emissionScope: "Scope 2", emissionType: "Purchased Electricity", bu: "NNEL",       date: "10/03/2025", status: "active",  totalEmissions: 270 },
  { id: "20", recordId: "107WE", emissionSource: "Steam Purchase",       quantity: 50,  unitMetrics: "Metric Tons CO₂e", location: "Warri Plant",     note: "Industrial steam.",            emissionScope: "Scope 2", emissionType: "Process emissions",   bu: "NNPC Retail",date: "10/03/2025", status: "inactive",totalEmissions: 75  },
];
