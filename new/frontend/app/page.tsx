import { AdBanner1 } from "./components/AdBanner1";
import { BestDeals } from "./components/BestDeals";
import { BuyAgainComp } from "./components/BuyAgainComp";
import { CarouselComponent } from "./components/CarouselComponent";
import { HomeDecor } from "./components/HomeDecor";
import { RecentItem } from "./components/RecentItem";
import TopDeals from "./components/TopDeals";

export default function Home() {
  return (
    <div>
      <CarouselComponent/>
      <TopDeals/>
      <BestDeals/>
      <HomeDecor/>
      <RecentItem/>
      <AdBanner1/>
      <BuyAgainComp/>
    </div>
  )
} 