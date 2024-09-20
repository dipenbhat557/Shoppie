import { AdBanner1 } from "./components/AdBanner1";
import { BestDeals } from "./components/BestDeals";
import { BuyAgainComp } from "./components/BuyAgainComp";
import { CarouselComponent } from "./components/CarouselComponent";
import { DressStyleMobileComponent } from "./components/DressStyleMobileComponent";
import { HomeDecor } from "./components/HomeDecor";
import { HomeDecorMobileComponent } from "./components/HomeDecorMobileComponent";
import { MobileAddSection } from "./components/MobileAddSection";
import { RecentItem } from "./components/RecentItem";
import TopDeals from "./components/TopDeals";

import service from "../public/images/service.png";
import deliver from "../public/images/delivery.png";
import support from "../public/images/support.png";
import SupportBar from "./components/Support";

export default function Home() {
  return (
    <div>
      <CarouselComponent />
      <TopDeals />
      <MobileAddSection />
      <BestDeals />
      <HomeDecor />
      <HomeDecorMobileComponent />
      <DressStyleMobileComponent />
      <RecentItem />
      <AdBanner1 />
      <BuyAgainComp />
      <SupportBar service={service} deliver={deliver} support={support} />
    </div>
  );
}
