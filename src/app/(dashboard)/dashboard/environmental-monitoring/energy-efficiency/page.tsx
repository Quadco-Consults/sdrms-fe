import DashboardHeader from "@/components/dashboard/DashboardHeader";
import EnergyEfficiency from "@/modules/environmentalMonitoring/components/EnergyEfficiency";

export default function EnergyEfficiencyPage() {
  return (
    <div>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard" },
          { label: "Environmental Monitoring" },
          { label: "Energy Efficiency" },
        ]}
      />
      <EnergyEfficiency />
    </div>
  );
}
