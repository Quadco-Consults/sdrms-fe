import DashboardHeader from "@/components/dashboard/DashboardHeader";
import EnvironmentalMonitoring from "@/modules/environmentalMonitoring/components/EnvironmentalMonitoring";

export default function EnvironmentalMonitoringPage() {
  return (
    <div>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard" },
          { label: "Environmental Monitoring" },
        ]}
      />
      <EnvironmentalMonitoring />
    </div>
  );
}
