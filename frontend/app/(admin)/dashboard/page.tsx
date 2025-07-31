import { HeaderText } from "./components/HeaderText";
import { OrderCard } from "./components/OrderCard";
import { Sales } from "./components/Sales";
import { Search } from "./components/Search";
import { TopSelling } from "./components/TopSelling";
import { LatestOrder } from "./components/LatestOrder";
import { MobileSidebar } from "../components/MobileSidebar";
import { ProfileImg } from "../components/ProfileImg";
import avg from "@/public/images/dashboard/avg.png";
import total from "@/public/images/dashboard/total.png";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 lg:p-0 max-w-[1600px] mx-auto space-y-8">
        {/* Mobile Header */}
        <div className="flex items-center justify-between md:hidden">
          <MobileSidebar />
          <Search isMobile={true} />
          <ProfileImg />
        </div>

        {/* Desktop Search */}
        <div>
          <Search isMobile={false} />
        </div>

        {/* Welcome Section */}
        <HeaderText />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <OrderCard 
            title="AVG. Order Value"
            value="$77.21"
            change="+3.16%"
            color="#FFC633"
            logo={avg}
          />
          <OrderCard 
            title="Total Revenue"
            value="$124.2K"
            change="+2.56%"
            logo={total}
          />
          <OrderCard 
            title="Total Orders"
            value="1,240"
            change="+4.35%"
            logo={total}
          />
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Sales />
          <TopSelling />
        </div>

        {/* Latest Orders */}
        <div>
          <LatestOrder />
        </div>
      </div>
    </div>
  );
}
