import DashboardHeader from "@/components/dashboard/DashboardHeader";
import Methane from "@/modules/environmentalMonitoring/components/Methane";

export default function MethanePage() {
  return (
    <div>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard" },
          { label: "Environmental Monitoring" },
          { label: "Methane (CH4) Emissions" },
        ]}
      />
      <div className="p-6">
        <Methane />
      </div>
    </div>
  );
}
