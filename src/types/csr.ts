export interface CSRData {
  id: string;
  initiativeName: string;
  csrActivity: string;
  donationType?: string;
  project?: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  budgetAllocation: number;
  beneficiariesImpacted: string[];
  impactMetrics?: {
    numberOfJobs?: number;
    [key: string]: any;
  };
  status?: "Ongoing" | "Completed" | "Planned";
}

export interface CSRChartData {
  category: string;
  year2021: number;
  year2022: number;
  year2023: number;
}

export interface CSRFilter {
  geographicLocation?: string;
  initiativeType?: string;
  numberOfBeneficiaries?: string;
  dateFrom?: string;
  dateTo?: string;
  searchQuery?: string;
}
