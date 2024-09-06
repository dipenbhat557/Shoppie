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
    <div className=" flex flex-col max-w-[90%] mx-auto py-8 px-2">
      <h1 className="text-3xl font-bold py-2">Buy Again</h1>
      <div className="relative">
        <div ref={scrollref} className="flex overflow-x-auto scrollbar-hide space-x-4">
          {featuredProducts.map((item, index) => {
            return (
              <div key={index} className=" md:min-w-[19%] sm:min-w-[18%]">
                <BuyAgainCard
                  key={index}
                  name={item.name}
                  imageSrc={item.imageSrc}
                  altText={item.altText}
                  rating={item.rating}
                  price={item.price}
                  discount={item.discount}
                />
              </div>
            );
          })}
        </div>
        {showLeftButton && (
            <button
              className="absolute md:-left-0 lg:-left-10 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md"
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
  );
};
