import DashboardHeader from "@/components/dashboard/DashboardHeader";
import EnergyConsumption from "@/modules/environmentalMonitoring/components/EnergyConsumption";

export default function EnergyConsumptionPage() {
  return (
    <div>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard" },
          { label: "Environmental Monitoring" },
          { label: "Energy Consumption" },
        ]}
      />
      <EnergyConsumption />
    </div>
  );
}
