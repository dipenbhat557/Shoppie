import { DesktopSidebar } from "./components/DesktopSidebar";
import { HeaderText } from "./components/HeaderText";
import { Nav } from "./components/Nav";
import { OrderCard } from "./components/OrderCard";
import { Sales } from "./components/Sales";
import { Search } from "./components/Search";
import avg from "@/public/images/dashboard/avg.png";
import total from "@/public/images/dashboard/total.png";
import { TopSelling } from "./components/TopSelling";
import { LatestOrder } from "./components/LatestOrder";

export default function Page() {
    return (
        <div className="bg-[#F7F7F7] min-h-screen md:grid md:grid-cols-4">
            <DesktopSidebar />
            <div className="md:col-span-3 md:p-4 p-2">
                <div className="md:flex md:items-center md:justify-between">
                    <Nav />
                    <Search />
                </div>
                <HeaderText />
                <div className="flex flex-col gap-2 py-2 md:flex-row">
                    <OrderCard logo={avg} color="#FFC633"/>
                    <OrderCard logo={total} color="white"/>
                    <OrderCard logo={total} color="white"/>
                </div>
                <div className="flex flex-col gap-2 py-2 lg:flex-row">
                    <Sales />
                    <TopSelling />
                </div>
                <LatestOrder />
            </div>
        </div>
    )
}