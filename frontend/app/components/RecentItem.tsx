"use client";
import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import airpods from "../../public/images/topDeals/airpods.png";
import boat from "../../public/images/topDeals/boat.png";
import headphone from "../../public/images/topDeals/headphone.png";
import phone from "../../public/images/topDeals/phone.png";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { styles } from "../utils/styles";

export const featuredProducts = [
  {
    imageSrc: boat,
    name: "Boats Airpods",
    price: "From Rs 899",
    altText: "Boats Airpods",
  },
  {
    imageSrc: phone,
    name: "Apple Mobiles",
    price: "From Rs 90,000",
    altText: "Apple Mobiles",
  },
  {
    imageSrc: airpods,
    name: "Apple Airpods",
    price: "From Rs 10,000",
    altText: "Apple Airpods",
  },
  {
    imageSrc: headphone,
    name: "Headset",
    price: "From Rs 5000",
    altText: "Headset",
  },
  {
    imageSrc: airpods,
    name: "Apple Airpods",
    price: "From Rs 10,000",
    altText: "Apple Airpods",
  },
  {
    imageSrc: airpods,
    name: "Apple Airpods",
    price: "From Rs 10,000",
    altText: "Apple Airpods",
  },
  {
    imageSrc: headphone,
    name: "Headset",
    price: "From Rs 5000",
    altText: "Headset",
  },
  {
    imageSrc: airpods,
    name: "Apple Airpods",
    price: "From Rs 10,000",
    altText: "Apple Airpods",
  },
];

export const RecentItem = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowLeftButton(scrollLeft > 0);
        setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };

    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`py-4 sm:py-8 ${styles.maxScreenWidth} mx-auto px-4 sm:px-6 lg:px-8`}>
      <div className="flex-1">
        <h2 className="text-2xl sm:text-3xl font-bold font-sans pb-2 sm:pb-4">Recently Viewed Items</h2>
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide -mx-2 sm:mx-0"
            onScroll={() => {
              if (scrollContainerRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
                setShowLeftButton(scrollLeft > 0);
                setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
              }
            }}
          >
            {featuredProducts.map((product, index) => (
              <div
                key={index}
                className="w-1/3 sm:w-1/4 md:w-1/4 lg:w-1/5 flex-shrink-0 px-2"
              >
                <ProductCard imageSrc={product.imageSrc} altText={product.altText} />
              </div>
            ))}
          </div>

          {showLeftButton && (
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md hidden sm:block"
              onClick={() => scroll('left')}
            >
              <SlArrowLeft size={22}/>
            </button>
          )}
          {showRightButton && (
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md hidden sm:block"
              onClick={() => scroll('right')}
            >
              <SlArrowRight size={22}/>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default RecentItem;
