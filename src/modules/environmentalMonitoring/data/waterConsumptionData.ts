export interface WaterRecord {
  id: string;
  recordId: string;
  waterSource: string;
  quantityWithdrawn: number;
  quantityDischarged: string;
  note: string;
  totalWaterConsumed: string;
  useArea: string;
  status: string;
  bu: string;
  date: string;
  reportingPeriod: string;
}

export const WATER_SOURCES = ["Borehole", "Surface Water", "Purchased Portable Water"];
export const USE_AREAS = ["Operations", "Admin Buildings", "Residential", "Others"];
export const REPORTING_PERIODS = ["Daily", "WeeklyMonth", "Quarter"];
export const WATER_STATUSES = ["Draft", "Submitted", "Approved"];
export const BUSINESS_UNITS = ["NNEL", "HSE", "CSS", "NNPC Retail", "NNPC Trading", "Midstream"];

export const mockWaterRecords: WaterRecord[] = [
  { id: "1",  recordId: "100WE", waterSource: "Borehole",                quantityWithdrawn: 120, quantityDischarged: "Litres",  note: "Gas usage for office heating.", totalWaterConsumed: "Scope 1", useArea: "Fuel combustion", status: "Active",  bu: "NNEL",        date: "20/03/2025", reportingPeriod: "Monthly" },
  { id: "2",  recordId: "100WE", waterSource: "Surface Water",          quantityWithdrawn: 120, quantityDischarged: "Litres",  note: "Gas usage for office heating.", totalWaterConsumed: "Scope 1", useArea: "Fuel combustion", status: "Active",  bu: "NNEL",        date: "20/03/2025", reportingPeriod: "Monthly" },
  { id: "3",  recordId: "100WE", waterSource: "Purchased Portable Water", quantityWithdrawn: 120, quantityDischarged: "Volumes", note: "Gas usage for office heating.", totalWaterConsumed: "Scope 1", useArea: "Fuel combustion", status: "Pending", bu: "HSE",         date: "19/03/2025", reportingPeriod: "Daily"   },
  { id: "4",  recordId: "100WE", waterSource: "Borehole",                quantityWithdrawn: 120, quantityDischarged: "Litres",  note: "Gas usage for office heating.", totalWaterConsumed: "Scope 1", useArea: "Fuel combustion", status: "Pending", bu: "HSE",         date: "18/03/2025", reportingPeriod: "Weekly"  },
  { id: "5",  recordId: "100WE", waterSource: "Borehole",                quantityWithdrawn: 120, quantityDischarged: "Volumes", note: "Gas usage for office heating.", totalWaterConsumed: "Scope 1", useArea: "Fuel combustion", status: "Pending", bu: "CSS",         date: "17/03/2025", reportingPeriod: "Monthly" },
  { id: "6",  recordId: "100WE", waterSource: "Borehole",                quantityWithdrawn: 120, quantityDischarged: "Volumes", note: "Gas usage for office heating.", totalWaterConsumed: "Scope 1", useArea: "Fuel combustion", status: "Active",  bu: "CSS",         date: "15/03/2025", reportingPeriod: "Quarter" },
  { id: "7",  recordId: "101WE", waterSource: "Surface Water",          quantityWithdrawn: 85,  quantityDischarged: "Litres",  note: "Water for industrial processes.",totalWaterConsumed: "Scope 2", useArea: "Operations",      status: "Active",  bu: "NNPC Retail", date: "14/03/2025", reportingPeriod: "Monthly" },
  { id: "8",  recordId: "102WE", waterSource: "Borehole",                quantityWithdrawn: 200, quantityDischarged: "Volumes", note: "Cooling water for plant.",       totalWaterConsumed: "Scope 1", useArea: "Operations",      status: "Active",  bu: "NNEL",        date: "13/03/2025", reportingPeriod: "Daily"   },
  { id: "9",  recordId: "103WE", waterSource: "Purchased Portable Water", quantityWithdrawn: 50,  quantityDischarged: "Litres",  note: "Emergency water supply.",       totalWaterConsumed: "Scope 3", useArea: "Residential",     status: "Pending", bu: "HSE",         date: "12/03/2025", reportingPeriod: "Weekly"  },
  { id: "10", recordId: "104WE", waterSource: "Surface Water",          quantityWithdrawn: 150, quantityDischarged: "Volumes", note: "Irrigation water.",             totalWaterConsumed: "Scope 2", useArea: "Admin Buildings", status: "Active",  bu: "CSS",         date: "11/03/2025", reportingPeriod: "Monthly" },
  { id: "11", recordId: "105WE", waterSource: "Borehole",                quantityWithdrawn: 90,  quantityDischarged: "Litres",  note: "Drinking water supply.",        totalWaterConsumed: "Scope 1", useArea: "Residential",     status: "Pending", bu: "NNPC Trading",date: "10/03/2025", reportingPeriod: "Daily"   },
  { id: "12", recordId: "106WE", waterSource: "Surface Water",          quantityWithdrawn: 175, quantityDischarged: "Volumes", note: "Process water.",                totalWaterConsumed: "Scope 2", useArea: "Operations",      status: "Active",  bu: "Midstream",   date: "09/03/2025", reportingPeriod: "Quarter" },
  { id: "13", recordId: "107WE", waterSource: "Purchased Portable Water", quantityWithdrawn: 60,  quantityDischarged: "Litres",  note: "Office water supply.",          totalWaterConsumed: "Scope 1", useArea: "Admin Buildings", status: "Active",  bu: "NNEL",        date: "08/03/2025", reportingPeriod: "Monthly" },
  { id: "14", recordId: "108WE", waterSource: "Borehole",                quantityWithdrawn: 110, quantityDischarged: "Volumes", note: "Production facility water.",    totalWaterConsumed: "Scope 1", useArea: "Operations",      status: "Pending", bu: "HSE",         date: "07/03/2025", reportingPeriod: "Weekly"  },
  { id: "15", recordId: "109WE", waterSource: "Surface Water",          quantityWithdrawn: 95,  quantityDischarged: "Litres",  note: "Landscape irrigation.",         totalWaterConsumed: "Scope 3", useArea: "Others",          status: "Active",  bu: "CSS",         date: "06/03/2025", reportingPeriod: "Monthly" },
  { id: "16", recordId: "110WE", waterSource: "Borehole",                quantityWithdrawn: 210, quantityDischarged: "Volumes", note: "Steam generation water.",       totalWaterConsumed: "Scope 2", useArea: "Operations",      status: "Active",  bu: "NNPC Retail", date: "05/03/2025", reportingPeriod: "Daily"   },
  { id: "17", recordId: "111WE", waterSource: "Purchased Portable Water", quantityWithdrawn: 45,  quantityDischarged: "Litres",  note: "Lab water.",                    totalWaterConsumed: "Scope 1", useArea: "Admin Buildings", status: "Pending", bu: "NNPC Trading",date: "04/03/2025", reportingPeriod: "Monthly" },
  { id: "18", recordId: "112WE", waterSource: "Surface Water",          quantityWithdrawn: 180, quantityDischarged: "Volumes", note: "Hydropower source.",            totalWaterConsumed: "Scope 2", useArea: "Others",          status: "Active",  bu: "Midstream",   date: "03/03/2025", reportingPeriod: "Quarter" },
  { id: "19", recordId: "113WE", waterSource: "Borehole",                quantityWithdrawn: 70,  quantityDischarged: "Litres",  note: "Security water supply.",        totalWaterConsumed: "Scope 1", useArea: "Residential",     status: "Pending", bu: "NNEL",        date: "02/03/2025", reportingPeriod: "Weekly"  },
  { id: "20", recordId: "114WE", waterSource: "Surface Water",          quantityWithdrawn: 130, quantityDischarged: "Volumes", note: "Fire safety system.",           totalWaterConsumed: "Scope 3", useArea: "Operations",      status: "Active",  bu: "HSE",         date: "01/03/2025", reportingPeriod: "Monthly" },
  { id: "21", recordId: "115WE", waterSource: "Borehole",                quantityWithdrawn: 155, quantityDischarged: "Litres",  note: "Water treatment plant.",        totalWaterConsumed: "Scope 1", useArea: "Operations",      status: "Active",  bu: "CSS",         date: "28/02/2025", reportingPeriod: "Daily"   },
  { id: "22", recordId: "116WE", waterSource: "Purchased Portable Water", quantityWithdrawn: 80,  quantityDischarged: "Volumes", note: "Guest facilities.",             totalWaterConsumed: "Scope 2", useArea: "Residential",     status: "Pending", bu: "NNPC Retail", date: "27/02/2025", reportingPeriod: "Monthly" },
  { id: "23", recordId: "117WE", waterSource: "Surface Water",          quantityWithdrawn: 145, quantityDischarged: "Litres",  note: "Agricultural water.",           totalWaterConsumed: "Scope 3", useArea: "Others",          status: "Active",  bu: "NNPC Trading",date: "26/02/2025", reportingPeriod: "Quarter" },
  { id: "24", recordId: "118WE", waterSource: "Borehole",                quantityWithdrawn: 100, quantityDischarged: "Volumes", note: "Desalination input.",            totalWaterConsumed: "Scope 1", useArea: "Operations",      status: "Active",  bu: "Midstream",   date: "25/02/2025", reportingPeriod: "Weekly"  },
  { id: "25", recordId: "119WE", waterSource: "Surface Water",          quantityWithdrawn: 165, quantityDischarged: "Litres",  note: "Power plant cooling.",          totalWaterConsumed: "Scope 2", useArea: "Operations",      status: "Pending", bu: "NNEL",        date: "24/02/2025", reportingPeriod: "Daily"   },
];
