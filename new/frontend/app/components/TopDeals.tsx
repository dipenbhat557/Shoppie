"use client";
import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import airpods from "../../public/images/topDeals/airpods.png";
import boat from "../../public/images/topDeals/boat.png";
import headphone from "../../public/images/topDeals/headphone.png";
import phone from "../../public/images/topDeals/phone.png";
import Image from "next/image";
import ad1 from "../../public/images/customad.png";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { styles } from "../utils/styles";

export const featuredProducts = [
  {
    imageSrc: boat,
    name: "Boats Airpods",
price:899,
    altText: "Boats Airpods",
  },
  {
    imageSrc: phone,
    name: "Apple Mobiles",
price:899,
    altText: "Apple Mobiles",
  },
  {
    imageSrc: airpods,
    name: "Apple Airpods",
price:899,
    altText: "Apple Airpods",
  },
  {
    imageSrc: headphone,
    name: "Headset",
price:899,
    altText: "Headset",
  },
  {
    imageSrc: airpods,
    name: "Apple Airpods",
price:899,
    altText: "Apple Airpods",
  },
  {
    imageSrc: headphone,
    name: "Headset",
price:899,
    altText: "Headset",
  },
];

export const TopDeals = () => {
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
    <div className={`flex py-8 ${styles.maxScreenWidth} ${styles.screenMarginAuto}`}>
      {/* Products Section */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold pb-2">Top Deals</h2>
        <div className="relative">
          <div
            ref={scrollContainerRef}
            
            className="flex overflow-x-auto scrollbar-hide space-x-4"
          >
            {featuredProducts.map((product, index) => (
              <div key={index} className="max-w-[50%] min-w-[19%]">
                <ProductCard
                  imageSrc={product.imageSrc}
                  name={product.name}
                  price={product.price}
                  altText={product.altText}
                />
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

      {/* Advertisement Section */}
      <div className="w-1/6 ml-4 bg-gray-100 pb-4 flex justify-center items-center">
        <div className="text-center">
          <Image src={ad1} alt="Ad" className="mb-2" />
          <p className="font-bold text-red-500">Flat 40% off in H&M Brand</p>
          <p>From Rs<span>5000</span> </p>
        </div>
      </div>
    </div>
  );
};

export default TopDeals;
