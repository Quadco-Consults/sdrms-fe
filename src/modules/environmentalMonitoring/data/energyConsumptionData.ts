// ─── Types ──────────────────────────────────────────────────────────────────

export interface EnergyRecord {
  id: string;
  recordId: string;
  energySource: string;
  quantity: number;
  unitMetrics: string;
  note: string;
  emissionScope: string;
  emissionType: string;
  bu: string;
  renewableType: "Renewable" | "Non-Renewable";
  date: string;
  status: "active" | "inactive" | "pending";
}

// ─── Dropdown constants ─────────────────────────────────────────────────────

export const ENERGY_SOURCES = [
  "Petrol",
  "Diesel",
  "Electricity",
  "Natural Gas",
  "Solar",
  "Hydropower",
  "Wind",
  "Coal",
  "LPG",
  "Fuel Oil",
];

export const RENEWABLE_OPTIONS: ("Renewable" | "Non-Renewable")[] = [
  "Renewable",
  "Non-Renewable",
];

export const EMISSION_SCOPES = ["Scope 1", "Scope 2", "Scope 3"];

export const EMISSION_TYPES = [
  "Fuel combustion",
  "Purchased Electricity",
  "Fugitive emissions",
  "Process emissions",
  "Mobile combustion",
];

export const BUSINESS_UNITS = [
  "NNEL",
  "HSE",
  "CSS",
  "NNPC Retail",
  "NNPC Trading",
  "Midstream",
];

// ─── Energy Efficiency Dashboard – summary ─────────────────────────────────

export const energyEfficiencySummary = {
  dateLogged: { date: "12 Mar 2024", percentage: 85, status: "On Track" as const },
  totalConsumption: { value: 15600, unit: "kWh", changeLabel: "10% decrease from last year" },
  totalUnitsProduced: { value: 5000, percentage: 65, changeLabel: "10% decrease from last year" },
  energyIntensity: { value: 3.12, unit: "kWh/unit", changeLabel: "10% decrease from last year" },
  costPerKwh: { value: 1.25, percentage: 78, changeLabel: "10% decrease from last year" },
  totalCost: { value: 18750, changeLabel: "10% decrease from last year" },
};

// ─── Energy Efficiency Dashboard – pie chart ───────────────────────────────

export const energyUsageVsProduction = [
  { name: "Production Output", value: 80, color: "#5c6bc0" },
  { name: "Energy Usage", value: 41, color: "#66bb6a" },
];

// ─── Energy Efficiency Dashboard – stacked bar ─────────────────────────────

export const energyIntensityOverTime = [
  { month: "Jan", naturalGas: 45, electricity: 60 },
  { month: "Feb", naturalGas: 25, electricity: 35 },
  { month: "Mar", naturalGas: 30, electricity: 40 },
  { month: "Apr", naturalGas: 35, electricity: 55 },
  { month: "May", naturalGas: 10, electricity: 25 },
  { month: "Jun", naturalGas: 15, electricity: 20 },
  { month: "Jul", naturalGas: 40, electricity: 60 },
  { month: "Aug", naturalGas: 30, electricity: 45 },
  { month: "Sep", naturalGas: 55, electricity: 80 },
  { month: "Oct", naturalGas: 45, electricity: 65 },
  { month: "Nov", naturalGas: 50, electricity: 70 },
  { month: "Dec", naturalGas: 35, electricity: 40 },
];

// ─── Mock energy-consumption table records ──────────────────────────────────

export const mockEnergyRecords: EnergyRecord[] = [
  { id: "1",  recordId: "100WE", energySource: "Petrol",      quantity: 120, unitMetrics: "Litres", note: "Gas usage for office heating.",       emissionScope: "Scope 1", emissionType: "Fuel combustion",       bu: "NNEL",        renewableType: "Non-Renewable", date: "20/03/2025", status: "active"   },
  { id: "2",  recordId: "100WE", energySource: "Diesel",      quantity: 120, unitMetrics: "Litres", note: "Gas usage for office heating.",       emissionScope: "Scope 1", emissionType: "Fuel combustion",       bu: "NNEL",        renewableType: "Non-Renewable", date: "20/03/2025", status: "active"   },
  { id: "3",  recordId: "100WE", energySource: "Electricity", quantity: 120, unitMetrics: "kWh",    note: "Gas usage for office heating.",       emissionScope: "Scope 1", emissionType: "Fuel combustion",       bu: "HSE",         renewableType: "Non-Renewable", date: "20/03/2025", status: "active"   },
  { id: "4",  recordId: "100WE", energySource: "Natural Gas", quantity: 120, unitMetrics: "Litres", note: "Gas usage for office heating.",       emissionScope: "Scope 1", emissionType: "Fuel combustion",       bu: "HSE",         renewableType: "Non-Renewable", date: "20/03/2025", status: "active"   },
  { id: "5",  recordId: "100WE", energySource: "Solar",       quantity: 120, unitMetrics: "Joules", note: "Gas usage for office heating.",       emissionScope: "Scope 1", emissionType: "Fuel combustion",       bu: "CSS",         renewableType: "Renewable",     date: "20/03/2025", status: "active"   },
  { id: "6",  recordId: "100WE", energySource: "Hydropower",  quantity: 120, unitMetrics: "Joules", note: "Gas usage for office heating.",       emissionScope: "Scope 1", emissionType: "Fuel combustion",       bu: "CSS",         renewableType: "Renewable",     date: "20/03/2025", status: "active"   },
  { id: "7",  recordId: "101WE", energySource: "Diesel",      quantity: 85,  unitMetrics: "Litres", note: "Backup power generation.",            emissionScope: "Scope 2", emissionType: "Mobile combustion",     bu: "NNEL",        renewableType: "Non-Renewable", date: "19/03/2025", status: "active"   },
  { id: "8",  recordId: "101WE", energySource: "Petrol",      quantity: 95,  unitMetrics: "Litres", note: "Vehicle fleet usage.",                emissionScope: "Scope 1", emissionType: "Mobile combustion",     bu: "HSE",         renewableType: "Non-Renewable", date: "19/03/2025", status: "pending"  },
  { id: "9",  recordId: "102WE", energySource: "Electricity", quantity: 200, unitMetrics: "kWh",    note: "Monthly electricity conversion.",     emissionScope: "Scope 2", emissionType: "Purchased Electricity", bu: "NNEL",        renewableType: "Non-Renewable", date: "18/03/2025", status: "active"   },
  { id: "10", recordId: "102WE", energySource: "Natural Gas", quantity: 150, unitMetrics: "Litres", note: "Industrial heating usage.",           emissionScope: "Scope 1", emissionType: "Fuel combustion",       bu: "CSS",         renewableType: "Non-Renewable", date: "18/03/2025", status: "active"   },
  { id: "11", recordId: "103WE", energySource: "Solar",       quantity: 300, unitMetrics: "kWh",    note: "Rooftop solar generation.",           emissionScope: "Scope 1", emissionType: "Process emissions",     bu: "NNPC Retail", renewableType: "Renewable",     date: "17/03/2025", status: "active"   },
  { id: "12", recordId: "103WE", energySource: "Wind",        quantity: 180, unitMetrics: "kWh",    note: "Wind farm contribution.",             emissionScope: "Scope 3", emissionType: "Process emissions",     bu: "NNPC Retail", renewableType: "Renewable",     date: "17/03/2025", status: "inactive" },
  { id: "13", recordId: "104WE", energySource: "Coal",        quantity: 500, unitMetrics: "Tonnes", note: "Coal fired power plant.",             emissionScope: "Scope 1", emissionType: "Fuel combustion",       bu: "NNPC Trading",renewableType: "Non-Renewable", date: "16/03/2025", status: "active"   },
  { id: "14", recordId: "104WE", energySource: "LPG",         quantity: 45,  unitMetrics: "Litres", note: "Kitchen and heating usage.",          emissionScope: "Scope 1", emissionType: "Fuel combustion",       bu: "Midstream",   renewableType: "Non-Renewable", date: "16/03/2025", status: "active"   },
  { id: "15", recordId: "105WE", energySource: "Fuel Oil",    quantity: 200, unitMetrics: "Litres", note: "Generator backup fuel.",              emissionScope: "Scope 1", emissionType: "Fugitive emissions",    bu: "Midstream",   renewableType: "Non-Renewable", date: "15/03/2025", status: "pending"  },
  { id: "16", recordId: "105WE", energySource: "Hydropower",  quantity: 250, unitMetrics: "kWh",    note: "Hydro dam contribution.",             emissionScope: "Scope 2", emissionType: "Process emissions",     bu: "HSE",         renewableType: "Renewable",     date: "15/03/2025", status: "active"   },
  { id: "17", recordId: "106WE", energySource: "Natural Gas", quantity: 110, unitMetrics: "Litres", note: "Office heating Q1.",                  emissionScope: "Scope 1", emissionType: "Fuel combustion",       bu: "CSS",         renewableType: "Non-Renewable", date: "14/03/2025", status: "active"   },
  { id: "18", recordId: "106WE", energySource: "Solar",       quantity: 420, unitMetrics: "kWh",    note: "Community solar installation.",       emissionScope: "Scope 3", emissionType: "Fugitive emissions",    bu: "Midstream",   renewableType: "Renewable",     date: "14/03/2025", status: "active"   },
  { id: "19", recordId: "107WE", energySource: "Electricity", quantity: 180, unitMetrics: "kWh",    note: "Q1 electricity usage.",               emissionScope: "Scope 2", emissionType: "Purchased Electricity", bu: "NNEL",        renewableType: "Non-Renewable", date: "13/03/2025", status: "active"   },
  { id: "20", recordId: "107WE", energySource: "Diesel",      quantity: 75,  unitMetrics: "Litres", note: "Transport diesel allocation.",       emissionScope: "Scope 1", emissionType: "Mobile combustion",     bu: "NNPC Retail", renewableType: "Non-Renewable", date: "13/03/2025", status: "inactive" },
  { id: "21", recordId: "108WE", energySource: "Wind",        quantity: 350, unitMetrics: "kWh",    note: "Offshore wind contribution.",         emissionScope: "Scope 2", emissionType: "Process emissions",     bu: "NNPC Trading",renewableType: "Renewable",     date: "12/03/2025", status: "active"   },
  { id: "22", recordId: "108WE", energySource: "Coal",        quantity: 300, unitMetrics: "Tonnes", note: "Industrial coal consumption.",        emissionScope: "Scope 1", emissionType: "Fuel combustion",       bu: "HSE",         renewableType: "Non-Renewable", date: "12/03/2025", status: "active"   },
  { id: "23", recordId: "109WE", energySource: "LPG",         quantity: 60,  unitMetrics: "Litres", note: "Site LPG usage.",                     emissionScope: "Scope 1", emissionType: "Fuel combustion",       bu: "CSS",         renewableType: "Non-Renewable", date: "11/03/2025", status: "active"   },
  { id: "24", recordId: "109WE", energySource: "Petrol",      quantity: 40,  unitMetrics: "Litres", note: "Security vehicle fuel.",              emissionScope: "Scope 1", emissionType: "Mobile combustion",     bu: "NNEL",        renewableType: "Non-Renewable", date: "11/03/2025", status: "active"   },
  { id: "25", recordId: "110WE", energySource: "Hydropower",  quantity: 190, unitMetrics: "kWh",    note: "Hydro micro-generation.",             emissionScope: "Scope 3", emissionType: "Process emissions",     bu: "Midstream",   renewableType: "Renewable",     date: "10/03/2025", status: "active"   },
];
