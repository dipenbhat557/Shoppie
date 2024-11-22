import { HeaderText } from "./components/HeaderText";
import { OrderCard } from "./components/OrderCard";
import { Sales } from "./components/Sales";
import { Search } from "./components/Search";
import avg from "@/public/images/dashboard/avg.png";
import total from "@/public/images/dashboard/total.png";
import { TopSelling } from "./components/TopSelling";
import { LatestOrder } from "./components/LatestOrder";
import { MobileSidebar } from "../components/MobileSidebar";
import { ProfileImg } from "../components/ProfileImg";

export default function Page() {
  return (
    <>
      <div className="flex justify-between py-2 ">
        <MobileSidebar />
        <Search isMobile={true} />
        <ProfileImg />
      </div>
      <Search isMobile={false} />
      <HeaderText />
      <div className="flex flex-col gap-2 py-2 md:flex-row">
        <OrderCard logo={avg} color="#FFC633" />
        <OrderCard logo={total} color="" />
        <OrderCard logo={total} color="" />
      </div>
      <div className="flex flex-col gap-2 py-2 lg:flex-row">
        <Sales />
        <TopSelling />
      </div>
      <LatestOrder />
    </>
  );
}
