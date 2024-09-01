"use client";
import React from "react";
import ProductCard from "./ProductCard";
import airpods from "../../public/images/topDeals/airpods.png";
import boat from "../../public/images/topDeals/boat.png";
import headphone from "../../public/images/topDeals/headphone.png";
import phone from "../../public/images/topDeals/phone.png";
import Image from "next/image";
import ad1 from "../../public/images/customad.png";

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
    imageSrc: headphone,
    name: "Headset",
    price: "From Rs 5000",
    altText: "Headset",
  },
];

export const RecentItem = () => {
  return (
    <div className=" max-w-[90%] mx-auto py-8">
      <div className="flex-1">
        <h2 className="text-3xl font-bold   font-sans pb-2">Recently Viewed Items</h2>
        <div className="relative">
          <div className="flex overflow-x-auto scrollbar-hide ">
            {featuredProducts.map((product, index) => (
              <div key={index} className="max-w-[50%] min-w-[16%]">
                <ProductCard
                  imageSrc={product.imageSrc}
                  name={product.name}
                  price={product.price}
                  altText={product.altText}
                />
              </div>
            ))}
          </div>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-md"
            onClick={() => {
              const container = document.querySelector(".overflow-x-auto");
              container!.scrollBy({ left: 400, behavior: "smooth" });
            }}
          >
            &gt;
          </button>
        </div>
      </div>

    </div>
  );
};
export default RecentItem;
