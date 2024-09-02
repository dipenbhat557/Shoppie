"use client";

import fridge from "../../public/images/appliance/fridge.png";
import wash from "../../public/images/appliance/wash.png";
import tv from "../../public/images/appliance/tv.png";

import { BestDealsProductCard } from "./BestDealsProductCard";
import { BestDealsAdd } from "./BestDealsAdd";
import { useEffect, useRef, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

export const featuredProducts = [
  {
    imageSrc: fridge,
    name: "Fridges",
    price: "From Rs 90,000",
    altText: "Apple Mobiles",
  },
  {
    imageSrc: tv,
    name: "Televisions",
    price: "From Rs 899",
    altText: "Boats Airpods",
  },
  {
    imageSrc: wash,
    name: "Apple Airpods",
    price: "From Rs 10,000",
    altText: "Apple Airpods",
  },
  {
    imageSrc: wash,
    name: "Apple Airpods",
    price: "From Rs 10,000",
    altText: "Apple Airpods",
  },
  {
    imageSrc: wash,
    name: "Apple Airpods",
    price: "From Rs 10,000",
    altText: "Apple Airpods",
  },
  {
    imageSrc: tv,
    name: "Televisions",
    price: "From Rs 899",
    altText: "Boats Airpods",
  },
  {
    imageSrc: fridge,
    name: "Fridges",
    price: "From Rs 90,000",
    altText: "Apple Mobiles",
  },
  {
    imageSrc: tv,
    name: "Televisions",
    price: "From Rs 899",
    altText: "Boats Airpods",
  },
  {
    imageSrc: fridge,
    name: "Fridges",
    price: "From Rs 90,000",
    altText: "Apple Mobiles",
  },
];

export const BestDeals = () => {
  const scrollref = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (scrollref.current) {
        setShowLeftButton(scrollref.current.scrollLeft > 0);
      }
    };

    if (scrollref.current) {
      scrollref.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollref.current) {
        scrollref.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="flex max-w-[90%] mx-auto py-4">
      <div className="w-1/4  bg-gray-100  flex justify-center items-center">
        <BestDealsAdd />
      </div>
      {/* Products Section */}
      <div className="flex-1">
        <h2 className="text-4xl font-bold pb-2 pl-4 ">
          Best Deals on Appliances
        </h2>
        <div className="relative">
          <div ref={scrollref} className="flex overflow-x-auto scrollbar-hide space-x-2">
            {featuredProducts.map((product, index) => (
              <div key={index} className="lg:max-w-[50%] md:max-w-[60%] sm:max-w-[90%]  md:min-w-[22%] sm:min-w-[20%] lg:min-w-[24%] ">
                <BestDealsProductCard
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
              className="absolute md:-left-2 lg:-left-5 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md"
              onClick={() => {
                if (scrollref.current) {
                  scrollref.current.scrollBy({
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
              if (scrollref.current) {
                scrollref.current.scrollBy({
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
