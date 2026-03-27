// Key Metrics
export const keyMetrics = {
  esgScore: {
    current: 85,
    max: 100,
    status: "On Track" as const,
  },
  ghgEmissions: {
    value: 1500,
    unit: "tons CO₂e",
    change: -10,
    changeLabel: "10% decrease from last year",
  },
  carbonOffset: {
    value: 500,
    unit: "tons CO₂e",
    segments: [
      { name: "On Track", value: 65, color: "#4CAF50" },
      { name: "At Risk", value: 20, color: "#f44336" },
      { name: "Behind Schedule", value: 15, color: "#e0e0e0" },
    ],
  },
  compliance: {
    value: 98,
    unit: "% compliance rate",
    change: -10,
    changeLabel: "10% decrease from last year",
  },
};

// CO2 Emissions Scope Breakdown
export const co2Emissions = {
  total: 12500,
  unit: "kg CO₂e",
  scopes: [
    {
      id: 1,
      label: "Scope 1",
      value: 5000,
      unit: "kg",
      percentage: 70,
      color: "#4CAF50",
      changeLabel: "Compared to 1 year +7%",
    },
    {
      id: 2,
      label: "Scope 2",
      value: 4500,
      unit: "kg",
      percentage: 50,
      color: "#FF9800",
      changeLabel: "Compared to 1 year +7%",
    },
    {
      id: 3,
      label: "Scope 3",
      value: 3000,
      unit: "kg",
      percentage: 40,
      color: "#9E9E9E",
      changeLabel: "Compared to 1 year +7%",
    },
  ],
};

// Fuel Consumption vs Purchased Electricity (pie chart)
export const fuelConsumptionData = [
  { name: "Fuel Combustion", value: 41, color: "#66bb6a" },
  { name: "Purchased Electricity", value: 80, color: "#ffcc02" },
];

// Recent Carbon Emission Data (table rows)
export interface CarbonEmissionRecord {
  id: string;
  emissionSource: string;
  quantity: number;
  unitMetrics: string;
  location: string;
  note: string;
  date: string;
}

export const recentCarbonEmissions: CarbonEmissionRecord[] = [
  {
    id: "1",
    emissionSource: "On-site Natural gas heating",
    quantity: 120,
    unitMetrics: "Metric Tons CO₂e",
    location: "Alakiri",
    note: "Gas usage for office heating.",
    date: "20/03/2025",
  },
  {
    id: "2",
    emissionSource: "On-site Natural gas heating",
    quantity: 120,
    unitMetrics: "Metric Tons CO₂e",
    location: "Alakiri",
    note: "Gas usage for office heating.",
    date: "20/03/2025",
  },
  {
    id: "3",
    emissionSource: "On-site Natural gas heating",
    quantity: 120,
    unitMetrics: "Metric Tons CO₂e",
    location: "Alakiri",
    note: "Gas usage for office heating.",
    date: "20/03/2025",
  },
  {
    id: "4",
    emissionSource: "Diesel Generator",
    quantity: 85,
    unitMetrics: "Metric Tons CO₂e",
    location: "Lagos HQ",
    note: "Backup power generation.",
    date: "19/03/2025",
  },
  {
    id: "5",
    emissionSource: "Company Vehicle Fleet",
    quantity: 45,
    unitMetrics: "Metric Tons CO₂e",
    location: "Nationwide",
    note: "Monthly fleet emissions report.",
    date: "18/03/2025",
  },
  {
    id: "6",
    emissionSource: "Purchased Electricity",
    quantity: 200,
    unitMetrics: "Metric Tons CO₂e",
    location: "Alakiri",
    note: "Monthly electricity bill conversion.",
    date: "18/03/2025",
  },
  {
    id: "7",
    emissionSource: "Industrial Boiler",
    quantity: 95,
    unitMetrics: "Metric Tons CO₂e",
    location: "Warri Plant",
    note: "Steam generation for processing.",
    date: "17/03/2025",
  },
  {
    id: "8",
    emissionSource: "Air Travel",
    quantity: 12,
    unitMetrics: "Metric Tons CO₂e",
    location: "International",
    note: "Business travel emissions.",
    date: "15/03/2025",
  },
];

// Monthly stacked bar chart data
export const monthlyEmissionsAvoided = [
  { month: "Jan", scope1: 45, scope2: 50, scope3: 55 },
  { month: "Feb", scope1: 30, scope2: 35, scope3: 40 },
  { month: "Mar", scope1: 50, scope2: 45, scope3: 60 },
  { month: "Apr", scope1: 55, scope2: 40, scope3: 50 },
  { month: "May", scope1: 40, scope2: 50, scope3: 45 },
  { month: "Jun", scope1: 45, scope2: 45, scope3: 50 },
  { month: "Jul", scope1: 50, scope2: 50, scope3: 55 },
  { month: "Aug", scope1: 60, scope2: 55, scope3: 65 },
  { month: "Sep", scope1: 80, scope2: 70, scope3: 75 },
  { month: "Oct", scope1: 55, scope2: 60, scope3: 65 },
  { month: "Nov", scope1: 65, scope2: 70, scope3: 75 },
  { month: "Dec", scope1: 50, scope2: 45, scope3: 50 },
];

// ─── Energy Consumption ─────────────────────────────────────────────────────

export const energyKeyMetrics = {
  totalConsumption: { value: 129800, unit: "kWh", percentage: 85, status: "On Track" },
  renewableUsage:   { value: 121250, unit: "kWh", changeLabel: "10% decrease from last year" },
  nonRenewable:     { value: 1500,   unit: "kWh", changeLabel: "10% decrease from last year",
    segments: [
      { name: "On Track",        value: 70, color: "#4CAF50" },
      { name: "At Risk",         value: 20, color: "#f44336" },
      { name: "Behind Schedule", value: 10, color: "#e0e0e0" },
    ],
  },
  costAnalysis: { value: 98, unit: "$", changeLabel: "10% decrease from last year" },
};

// Stacked bar – Renewable vs Non-Renewable
export const energyBySource = [
  { month: "Jan", renewable: 55, nonRenewable: 60 },
  { month: "Feb", renewable: 45, nonRenewable: 25 },
  { month: "Mar", renewable: 50, nonRenewable: 25 },
  { month: "Apr", renewable: 55, nonRenewable: 55 },
  { month: "May", renewable: 25, nonRenewable: 30 },
  { month: "Jun", renewable: 20, nonRenewable: 15 },
  { month: "Jul", renewable: 55, nonRenewable: 60 },
  { month: "Aug", renewable: 40, nonRenewable: 45 },
  { month: "Sep", renewable: 75, nonRenewable: 85 },
  { month: "Oct", renewable: 65, nonRenewable: 90 },
  { month: "Nov", renewable: 70, nonRenewable: 85 },
  { month: "Dec", renewable: 40, nonRenewable: 15 },
];

// ─── Water Consumption ──────────────────────────────────────────────────────

export const waterKeyMetrics = {
  totalWithdrawal: { value: 129800, unit: "Volumn", percentage: 65, status: "On Track" },
  totalDischarged: { value: 121250, unit: "Vol",    changeLabel: "10% decrease from last year" },
  totalConsumed:   {
    value: 1500,
    unit: "Litre",
    changeLabel: "10% decrease from last year",
    segments: [
      { name: "On Track",        value: 70, color: "#4CAF50" },
      { name: "At Risk",         value: 20, color: "#f44336" },
      { name: "Behind Schedule", value: 10, color: "#e0e0e0" },
    ],
  },
};

// Combo chart – Water Usage (bar) + Time trend (line)
export const waterUsageData = [
  { month: "Jan", waterUsage: 68, time: 78 },
  { month: "Feb", waterUsage: 15, time: 60 },
  { month: "Mar", waterUsage: 32, time: 75 },
  { month: "Apr", waterUsage: 20, time: 68 },
  { month: "May", waterUsage: 40, time: 70 },
  { month: "Jun", waterUsage: 12, time: 72 },
  { month: "Jul", waterUsage: 55, time: 100 },
  { month: "Aug", waterUsage: 15, time: 75 },
  { month: "Sep", waterUsage: 55, time: 78 },
  { month: "Oct", waterUsage: 52, time: 77 },
  { month: "Nov", waterUsage: 90, time: 92 },
  { month: "Dec", waterUsage: 42, time: 63 },
];

// Area chart – Other fuels
export const otherFuelsData = [
  { month: "Jan", diesel: 45, lpg: 30, gasoline: 25, fuelOil: 50 },
  { month: "Feb", diesel: 35, lpg: 20, gasoline: 30, fuelOil: 40 },
  { month: "Mar", diesel: 40, lpg: 25, gasoline: 35, fuelOil: 45 },
  { month: "Apr", diesel: 50, lpg: 35, gasoline: 40, fuelOil: 55 },
  { month: "May", diesel: 60, lpg: 45, gasoline: 50, fuelOil: 70 },
  { month: "Jun", diesel: 75, lpg: 55, gasoline: 65, fuelOil: 85 },
  { month: "Jul", diesel: 80, lpg: 60, gasoline: 70, fuelOil: 95 },
  { month: "Aug", diesel: 70, lpg: 50, gasoline: 60, fuelOil: 80 },
  { month: "Sep", diesel: 55, lpg: 40, gasoline: 50, fuelOil: 65 },
  { month: "Oct", diesel: 65, lpg: 45, gasoline: 55, fuelOil: 75 },
  { month: "Nov", diesel: 60, lpg: 42, gasoline: 52, fuelOil: 72 },
  { month: "Dec", diesel: 50, lpg: 35, gasoline: 45, fuelOil: 60 },
];
