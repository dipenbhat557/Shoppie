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
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        setShowLeftButton(scrollContainerRef.current.scrollLeft > 0);
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

  return (
    <div className={`py-8 ${styles.maxScreenWidth} mx-auto`}>
    <div className="flex-1">
      <h2 className="text-3xl font-bold font-sans pb-2">Recently Viewed Items</h2>
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide"
          onScroll={() => {
            if (scrollContainerRef.current) {
              setShowLeftButton(scrollContainerRef.current.scrollLeft > 0);
            }
          }}
        >
          {featuredProducts.map((product, index) => (
            <div
              key={index}
              className="max-w-[80%] sm:max-w-[60%] md:max-w-[50%] lg:max-w-[25%] min-w-[60%] sm:min-w-[40%] md:min-w-[25%] lg:min-w-[20%] px-2"
            >
              <ProductCard imageSrc={product.imageSrc} altText={product.altText} />
            </div>
          ))}
        </div>
          {showLeftButton && (
            <button
              className="absolute md:-left-0 lg:-left-10 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md"
              onClick={() => {
                if (scrollContainerRef.current) {
                  scrollContainerRef.current.scrollBy({
                    left: -400,
                    behavior: "smooth",
                  });
                }
              }}
            >
              <SlArrowLeft size={22}/>
            </button>
          )}
          <button
            className="absolute md:-right-0 lg:-right-10 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md"
            onClick={() => {
              if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollBy({
                  left: 400,
                  behavior: "smooth",
                });
              }
            }}
          >
         <SlArrowRight size={22}/>
         
          </button>
        </div>
      </div>
    </div>
  );
};
export default RecentItem;
