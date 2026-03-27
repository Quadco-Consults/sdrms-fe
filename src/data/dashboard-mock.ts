// Mock data for dashboard charts and visualizations
// Aligned with NNPC SDRMS validated prototype

export const DASHBOARD_CHART_DATA = [
  { name: "Jan", emissions: 400, energy: 2400, water: 2400 },
  { name: "Feb", emissions: 300, energy: 1398, water: 2210 },
  { name: "Mar", emissions: 200, energy: 9800, water: 2290 },
  { name: "Apr", emissions: 278, energy: 3908, water: 2000 },
  { name: "May", emissions: 189, energy: 4800, water: 2181 },
  { name: "Jun", emissions: 239, energy: 3800, water: 2500 },
];

export const EMISSIONS_BY_BU = [
  { name: "NNPC E&P", value: 400 },
  { name: "NPDC", value: 300 },
  { name: "NGC", value: 200 },
  { name: "PPMC", value: 100 },
];

export const ENERGY_TREND = [
  { name: "Jan", value: 2400 },
  { name: "Feb", value: 1398 },
  { name: "Mar", value: 9800 },
  { name: "Apr", value: 3908 },
  { name: "May", value: 4800 },
  { name: "Jun", value: 3800 },
];

export const EMISSIONS_BY_SOURCE = [
  { name: "Flaring", value: 45, color: "#388E3C" },
  { name: "Fuel Combustion", value: 30, color: "#F5A623" },
  { name: "Fugitive Emissions", value: 15, color: "#A5D6A7" },
  { name: "Venting", value: 10, color: "#81C784" },
];

export const WORKFORCE_DIVERSITY_DATA = [
  { name: "Jan", male: 2800, female: 1200 },
  { name: "Feb", male: 2850, female: 1250 },
  { name: "Mar", male: 2900, female: 1300 },
  { name: "Apr", male: 2950, female: 1350 },
  { name: "May", male: 3000, female: 1400 },
  { name: "Jun", male: 3050, female: 1450 },
];

export const SAFETY_PERFORMANCE_DATA = [
  { name: "Jan", value: 0.18 },
  { name: "Feb", value: 0.15 },
  { name: "Mar", value: 0.12 },
  { name: "Apr", value: 0.14 },
  { name: "May", value: 0.11 },
  { name: "Jun", value: 0.12 },
];

export const ESG_KPI_STATUS = [
  { name: "Environmental", onTrack: 12, atRisk: 3, missed: 1 },
  { name: "Social", onTrack: 15, atRisk: 1, missed: 0 },
  { name: "Governance", onTrack: 10, atRisk: 0, missed: 2 },
];

// Color constants for charts
export const CHART_COLORS = {
  primary: "#1B5E20", // NNPC Green
  secondary: "#2E7D32",
  accent: "#F5A623",
  blue: "#1565C0",
  success: "#2E7D32",
  danger: "#C62828",
  warning: "#F5A623",
  scope1: "#388E3C",
  scope2: "#F5A623",
  scope3: "#A5D6A7",
  fuel: "#F5A623",
  electricity: "#81C784",
};
