import { CSRData, CSRChartData } from "@/types/csr";

export const mockCSRData: CSRData[] = [
  {
    id: "1",
    initiativeName: "Save Rose",
    csrActivity: "Philanthropy",
    donationType: "Voluntary",
    project: "60,000 bbl",
    description: "The data entry was successful",
    startDate: "12:42pm",
    endDate: "2:42pm",
    location: "Kebbi",
    budgetAllocation: 12000,
    beneficiariesImpacted: ["Students", "Health care patients"],
    impactMetrics: {
      numberOfJobs: 20,
    },
    status: "Ongoing",
  },
  {
    id: "2",
    initiativeName: "Save Rose",
    csrActivity: "Philanthropy",
    donationType: "Mandatory",
    project: "60,000 bbl",
    description: "The data entry was successful",
    startDate: "12:42pm",
    endDate: "2:42pm",
    location: "Kebbi",
    budgetAllocation: 12000,
    beneficiariesImpacted: ["Students"],
    impactMetrics: {
      numberOfJobs: 15,
    },
    status: "Ongoing",
  },
  {
    id: "3",
    initiativeName: "Save Rose",
    csrActivity: "Philanthropy",
    donationType: "Voluntary",
    project: "60,000 bbl",
    description: "The data entry was successful",
    startDate: "12:42pm",
    endDate: "2:42pm",
    location: "Kebbi",
    budgetAllocation: 12000,
    beneficiariesImpacted: ["Health care patients"],
    impactMetrics: {
      numberOfJobs: 25,
    },
    status: "Completed",
  },
];

// Generate more CSR data to reach 129 records
const csrActivities = [
  "Philanthropy",
  "Education Support",
  "Healthcare Initiative",
  "Environmental Conservation",
  "Community Development",
];
const donationTypes = ["Voluntary", "Mandatory", "Mixed"];
const locations = ["Kebbi", "Lagos", "Abuja", "Kano", "Port Harcourt", "Kaduna"];
const beneficiaryOptions = [
  "Students",
  "Health care patients",
  "Elderly",
  "Youth",
  "Women",
  "Children",
  "Farmers",
  "Small business owners",
];
const statuses: Array<"Ongoing" | "Completed" | "Planned"> = [
  "Ongoing",
  "Completed",
  "Planned",
];

for (let i = 4; i <= 129; i++) {
  const numBeneficiaries = Math.floor(Math.random() * 3) + 1;
  const selectedBeneficiaries: string[] = [];

  for (let j = 0; j < numBeneficiaries; j++) {
    const randomBeneficiary =
      beneficiaryOptions[Math.floor(Math.random() * beneficiaryOptions.length)];
    if (!selectedBeneficiaries.includes(randomBeneficiary)) {
      selectedBeneficiaries.push(randomBeneficiary);
    }
  }

  mockCSRData.push({
    id: i.toString(),
    initiativeName: `Initiative ${i}`,
    csrActivity:
      csrActivities[Math.floor(Math.random() * csrActivities.length)],
    donationType: donationTypes[Math.floor(Math.random() * donationTypes.length)],
    project: `${Math.floor(Math.random() * 100 + 20)},000 bbl`,
    description: `CSR initiative focused on community development and social impact. Project ${i} aims to improve quality of life.`,
    startDate: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, "0")}${Math.random() > 0.5 ? "am" : "pm"}`,
    endDate: `${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, "0")}${Math.random() > 0.5 ? "am" : "pm"}`,
    location: locations[Math.floor(Math.random() * locations.length)],
    budgetAllocation: Math.floor(Math.random() * 50000) + 5000,
    beneficiariesImpacted: selectedBeneficiaries,
    impactMetrics: {
      numberOfJobs: Math.floor(Math.random() * 50) + 10,
    },
    status: statuses[Math.floor(Math.random() * statuses.length)],
  });
}

export const mockCSRChartData: CSRChartData[] = [
  { category: "Initiative", year2021: 69, year2022: 42, year2023: 39 },
  { category: "Budget", year2021: 17, year2022: 50, year2023: 21 },
  { category: "Project", year2021: 32, year2022: 35, year2023: 37 },
  { category: "Initiative", year2021: 20, year2022: 42, year2023: 41 },
  { category: "Project", year2021: 15, year2022: 70, year2023: 15 },
  { category: "Budget", year2021: 11, year2022: 15, year2023: 0 },
  { category: "Initiative", year2021: 57, year2022: 99, year2023: 93 },
  { category: "Project", year2021: 15, year2022: 36, year2023: 40 },
  { category: "Budget", year2021: 57, year2022: 94, year2023: 82 },
  { category: "Initiative", year2021: 52, year2022: 94, year2023: 29 },
  { category: "Project", year2021: 63, year2022: 92, year2023: 54 },
  { category: "Budget", year2021: 42, year2022: 15, year2023: 87 },
];
