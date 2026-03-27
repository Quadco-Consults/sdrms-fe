import DashboardHeader from "@/components/dashboard/DashboardHeader";
import GHGTracking from "@/modules/environmentalMonitoring/components/GHGTracking";

export default function GHGTrackingPage() {
  return (
    <div>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard" },
          { label: "Environmental Monitoring" },
          { label: "Greenhouse Gas Emissions Tracking" },
        ]}
      />
      <GHGTracking />
    </div>
  );
}
