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

export const TopDeals = () => {
  return (
    <div className="flex max-w-[90%] mx-auto py-8">
      {/* Products Section */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold pb-2">Top Deals</h2>
        <div className="relative">
          <div className="flex overflow-x-auto scrollbar-hide space-x-4">
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

      {/* Advertisement Section */}
<      div className="w-1/6 ml-4 bg-gray-100 pb-4 flex justify-center items-center">
        <div className="text-center">
          <Image src={ad1} alt="Ad" className="mb-2" />
          <p className="font-bold text-red-500">Flat 40% off in H&M Brand</p>
          <p>From Rs 5000</p>
        </div>
      </div>
    </div>
  );
};

export default TopDeals;
