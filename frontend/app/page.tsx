import { Topbar } from "../components/Topbar";
import { Navbar } from "../components/Navbar";
import { HeroBanner } from "../components/HeroBanner";
import { CategorySideBar } from "../components/CategorySideBar";
import { FlashSale } from "../components/FlashSale";
import { Categories } from "../components/Categories";
import { NewArrival } from "../components/NewArrival";
import { AdBanner } from "../components/AdBanner";
import { BestSelling } from "../components/BestSelling";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Features } from "@/components/Features";
import { TopDeals } from "@/components/TopDeals";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Topbar />
      <div className="sticky top-0 z-30 bg-white shadow-sm">
        <Navbar />
      </div>
      <main className="flex flex-col md:flex-row w-full max-w-7xl mx-auto mt-2 md:mt-4 gap-0 px-2 sm:px-4">
        {/* Mobile: Category bar as horizontal scroll */}
        <div className="block md:hidden w-full mb-2">
          <CategorySideBar />
        </div>
        {/* Left: Category Sidebar (hidden on mobile) */}
        <aside className="hidden md:block w-1/4 min-w-[200px] max-w-xs border-r border-gray-200 bg-white">
          <CategorySideBar />
        </aside>
        {/* Right: Hero Banner */}
        <section className="flex-1 flex items-center justify-center bg-white p-0 md:p-6">
          <div className="w-full h-full flex items-center justify-center">
            <HeroBanner />
          </div>
        </section>
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
      <Footer/>
    </div>
  );
}
