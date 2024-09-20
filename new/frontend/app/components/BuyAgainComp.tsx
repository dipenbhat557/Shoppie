"use client";
import { useEffect, useRef, useState } from "react";
import airpods from "../../public/images/topDeals/airpods.png";
import boat from "../../public/images/topDeals/boat.png";
import headphone from "../../public/images/topDeals/headphone.png";
import phone from "../../public/images/topDeals/phone.png";
import { BuyAgainCard } from "./BuyAgainCard";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

export const featuredProducts = [
  {
    imageSrc: boat,
    rating: 4,
    discount: 100,
    price: 1000,
    name: "Boats Airpods",
    altText: "Boats Airpods",
  },
  {
    imageSrc: phone,
    rating: 4,
    discount: 100,
    price: 1000,
    name: "Apple Mobiles",
    altText: "Apple Mobiles",
  },
  {
    imageSrc: airpods,
    rating: 4,
    discount: 100,
    price: 1000,
    name: "Apple Airpods",
    altText: "Apple Airpods",
  },
  {
    imageSrc: headphone,
    rating: 4,
    discount: 100,
    price: 1000,
    name: "Headset",
    altText: "Headset",
  },
  {
    imageSrc: airpods,
    rating: 4,
    discount: 100,
    price: 1000,
    name: "Apple Airpods",
    altText: "Apple Airpods",
  },
  {
    imageSrc: airpods,
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

    scrollref.current?.addEventListener('scroll', handleScroll);
    return () => scrollref.current?.removeEventListener('scroll', handleScroll);
  }, []);

  const scroll = (direction:string) => {
    if (scrollref.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollref.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };


  return (
    <div className="max-w-screen-sm sm:max-w-[95%] md:max-w-[90%] mx-auto py-2 sm:py-4 md:py-8 px-1 sm:px-2">
    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold py-2">Buy Again</h1>
    <div className="relative">
      <div 
        ref={scrollref} 
        className="flex overflow-x-auto scrollbar-hide space-x-2 sm:space-x-3 md:space-x-4 pb-4"
      >
        {featuredProducts.map((item, index) => (
          <div key={index} className="min-w-[20%] xs:min-w-[20%] sm:min-w-[25%] md:min-w-[22%] lg:min-w-[18%]">
            <BuyAgainCard
              name={item.name}
              imageSrc={item.imageSrc}
              altText={item.altText}
              rating={item.rating}
              price={item.price}
              discount={item.discount}
            />
          </div>
        ))}
      </div>
      {showLeftButton && (
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-1 sm:p-2 shadow-md"
          onClick={() => scroll('left')}
        >
          <SlArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
        </button>
      )}
      {showRightButton && (
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-1 sm:p-2 shadow-md"
          onClick={() => scroll('right')}
        >
          <SlArrowRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
        </button>
      )}
    </div>
  </div>
  );

};
