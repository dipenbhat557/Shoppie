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

  const scrollRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setShowLeftButton(scrollLeft > 0);
        setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };

    if (scrollRef.current) {
      (scrollRef.current as HTMLElement).addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        (scrollRef.current as HTMLElement).removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scroll = (direction: string) => {
    if (scrollRef.current) {
      const scrollAmount = (scrollRef.current as HTMLElement).clientWidth * 0.8;
      (scrollRef.current as HTMLElement).scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
    <div className="hidden sm:flex  mx-auto py-8 px-4 lg:px-8  w-[90%]">
      <div className="w-1/4 bg-gray-100 flex justify-center items-center rounded-lg mr-4">
        <BestDealsAdd />
      </div>
      <div className="flex-1">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold pb-4 pl-4">
          Best Deals on Appliances
        </h2>
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide space-x-4"
          >
            {featuredProducts.map((product, index) => (
              <div
                key={index}
                className="flex-shrink-0 sm:w-[45%] md:w-[30%] lg:w-[23%]"
              >
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
              className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md"
              onClick={() => scroll('left')}
              aria-label="Scroll left"
            >
              <SlArrowLeft size={24} />
            </button>
          )}
          {showRightButton && (
            <button
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md"
              onClick={() => scroll('right')}
              aria-label="Scroll right"
            >
              <SlArrowRight size={24} />
            </button>
          )}
        </div>
      </div>
    </div>
    
    

      <div className="sm:hidden max-w-screen-sm py-4">
      <div className="flex-1">
        <h2 className="text-xl font-bold pb-4">
          Best Deals on Appliances
        </h2>
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide space-x-2 pb-4"
          >
            {featuredProducts.map((product, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[25%]"
              >
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
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md"
              onClick={() => scroll('left')}
              aria-label="Scroll left"
            >
              <SlArrowLeft size={18} />
            </button>
          )}
          {showRightButton && (
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md"
              onClick={() => scroll('right')}
              aria-label="Scroll right"
            >
              <SlArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
    </>
  );
};
