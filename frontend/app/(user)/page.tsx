import { HeroSection } from "@/components/HeroSection";
import { FlashSale } from "@/components/FlashSale";
import { Categories } from "@/components/Categories";
import { NewArrival } from "@/components/NewArrival";
import { AdBanner } from "@/components/AdBanner";
import { BestSelling } from "@/components/BestSelling";

import { Features } from "@/components/Features";
import { TopDeals } from "@/components/TopDeals";
import { ExploreProducts } from "@/components/ExploreProducts";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
   
      <main className="w-full">
        <HeroSection />
      </main>
      {/* Flash Sale Section */}
      <FlashSale />
      {/* Categories Section */}
      <Categories />
      {/* New Arrival Section */}
      <NewArrival />
      {/* Ad Banner Section */}
      <AdBanner />
      <TopDeals />
      {/* Best Selling Section */}
      <BestSelling />

      {/* Features Section */}
      <Features />
      <ExploreProducts />

    </div>
  );
}
