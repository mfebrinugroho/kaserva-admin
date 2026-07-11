import PageMeta from "@/components/common/PageMeta";
import DashboardCard from "@/components/dashboard/DashboardCard";
import DashNew from "@/components/dashboard/DashNew";
import OperationalStatus from "@/components/dashboard/OperationalStatus";
import RecentOrders from "@/components/dashboard/RecentOrders";
import StatsGrid from "@/components/dashboard/StatsGrid";
import TopSellingMenus from "@/components/dashboard/TopSellingMenus";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <PageMeta
        title="OrderKuy - Dashboard"
        description="OrderKuy is Application POS"
      />

      <DashboardCard user={user} />

      <div className="mt-8">
        <DashNew />
      </div>

      <div className="mt-8">
        <OperationalStatus />
      </div>

      <div className="mt-8">
        <StatsGrid />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentOrders />
        <TopSellingMenus />
      </div>
    </>
  );
}
