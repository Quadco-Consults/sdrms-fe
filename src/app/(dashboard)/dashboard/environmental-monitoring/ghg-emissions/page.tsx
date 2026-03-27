import DashboardHeader from "@/components/dashboard/DashboardHeader";
import GHGEmissions from "@/modules/environmentalMonitoring/components/GHGEmissions";

export default function GHGEmissionsPage() {
  return (
    <div>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard" },
          { label: "Environmental Monitoring" },
          { label: "Greenhouse Gas Emission" },
        ]}
      />
      <GHGEmissions />
    </div>
  );
}
