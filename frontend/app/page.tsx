import AdBanner1 from "./components/AdBanner1";
import BestDeals from "./components/BestDeals";
import { BuyAgainComp } from "./components/BuyAgainComp";
import CarouselComponent from "./components/CarouselComponent";

import HomeDecor from "./components/HomeDecor";

import RecentItem from "./components/RecentItem";
import TopDeals from "./components/TopDeals";

import service from "../public/images/service.png";
import deliver from "../public/images/delivery.png";
import support from "../public/images/support.png";
import SupportBar from "./components/Support";
import {Topbar} from "./components/Topbar";
import Navbar from "./components/Navbar";
import {CategoryNav} from "./components/CategoryNav";
import { Footer } from "./components/Footer";
import { BestDealsAdd } from "./components/BestDealsAdd";

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen  w-full   ">
        <div className="w-full flex flex-col gap-5  ">
          <Topbar />
          <Navbar />
          <CategoryNav />
        </div>
        <CarouselComponent />
        <TopDeals />
        <div className="flex lg:flex-row flex-col gap-4 w-full">
          <BestDealsAdd />
          <BestDeals />
        </div>

        <HomeDecor />

        <RecentItem />
        <AdBanner1 />
        <BuyAgainComp />
        <SupportBar service={service} deliver={deliver} support={support} />
        <Footer />
      </div>
    </>
  );
}
