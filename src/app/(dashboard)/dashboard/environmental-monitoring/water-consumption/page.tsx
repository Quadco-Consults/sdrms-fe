import DashboardHeader from "@/components/dashboard/DashboardHeader";
import WaterConsumption from "@/modules/environmentalMonitoring/components/WaterConsumption";

export default function WaterConsumptionPage() {
  return (
    <div>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard" },
          { label: "Environmental Monitoring" },
          { label: "Water Consumption" },
        ]}
      />
      <WaterConsumption />
    </div>
  );
}
