"use client";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useEffect, useRef, useState } from "react";
import { BuyAgainCard } from "./BuyAgainCard";
export const featuredProducts = [
  {
    imageSrc: "/images/topDeals/boat.png",
    rating: 4,
    discount: 100,
    price: 1000,
    name: "Boats Airpods",
    altText: "Boats Airpods",
  },
  {
    imageSrc: "/images/topDeals/phone.png",
    rating: 4,
    discount: 100,
    price: 1000,
    name: "Apple Mobiles",
    altText: "Apple Mobiles",
  },
  {
    imageSrc: "/images/topDeals/airpods.png",
    rating: 4,
    discount: 100,
    price: 1000,
    name: "Apple Airpods",
    altText: "Apple Airpods",
  },
  {
    imageSrc: "/images/topDeals/headphone.png",
    rating: 4,
    discount: 100,
    price: 1000,
    name: "Headset",
    altText: "Headset",
  },
  {
    imageSrc: "/images/topDeals/airpods.png",
    rating: 4,
    discount: 100,
    price: 1000,
    name: "Apple Airpods",
    altText: "Apple Airpods",
  },
  {
    imageSrc: "/images/topDeals/airpods.png",
    rating: 4,
    discount: 100,
    price: 1000,
    name: "Apple Airpods",
    altText: "Apple Airpods",
  },
];
export const BuyAgainComp = () => {
  const scrollref = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollref.current) {
        setShowLeftButton(scrollref.current.scrollLeft > 0);
        setShowRightButton(
          scrollref.current.scrollLeft <
            scrollref.current.scrollWidth - scrollref.current.clientWidth
        );
      }
    };
    const element = scrollref.current;
    element?.addEventListener("scroll", handleScroll);
    return () => element?.removeEventListener("scroll", handleScroll);
  }, []);

  const scroll = (direction: string) => {
    if (scrollref.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollref.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 py-8 overflow-hidden">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Buy Again</h1>
      <div className="relative">
        <div
          ref={scrollref}
          className="flex gap-4 overflow-x-scroll scrollbar-hide pb-4 -mx-4 px-4"
        >
          {featuredProducts.map((item: any, index: any) => (
            <div
              key={index}
              className="flex-none w-[180px] sm:w-[250px] md:w-[280px]"
            >
              <BuyAgainCard {...item} />
            </div>
          ))}
        </div>
        {showLeftButton && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 hidden md:block"
          >
            <SlArrowLeft className="w-5 h-5" />
          </button>
        )}
        {showRightButton && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 hidden md:block"
          >
            <SlArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
