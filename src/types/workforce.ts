export interface WorkforceData {
  id: string;
  name: string;
  gender: "Male" | "Female" | "Other";
  age: number;
  ethnicity: "Asian" | "African" | "Latino" | "Caucasian" | "Other";
  accessibility: string | null;
  level: "Leadership" | "Team" | "Department" | "Individual";
  time: string;
  date: string;
}

export interface WorkforceDiversityStats {
  totalUsers: number;
  female: {
    count: number;
    percentage: number;
    comparison: number;
  };
  male: {
    count: number;
    percentage: number;
    comparison: number;
  };
  ethnicity: {
    count: number;
    percentage: number;
    comparison: number;
  };
}

export interface WorkforceFilter {
  location?: string;
  jobRole?: string;
  gender?: string;
  dateFrom?: string;
  dateTo?: string;
  searchQuery?: string;
}

export interface PieChartData {
  name: string;
  value: number;
  color: string;
}
