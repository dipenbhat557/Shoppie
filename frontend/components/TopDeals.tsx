"use client";
import React from "react";
import Image from "next/image";
import Ads from "./Ads";
// yesma product ko price ani name  fetch garney yo real mah kunai pani specific
const DEAL_PRODUCTS = [
  {
    id: 1,
    name: "Boats Airpods",
    price: "From Rs 899",
    image: "/images/topDeals/airpods.png",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "From Rs 1,499",
    image: "/images/topDeals/boat.png",
  },
  {
    id: 3,
    name: "Wireless Mouse",
    price: "From Rs 599",
    image: "/images/topDeals/headphone.png",
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: "From Rs 1,299",
    image: "/images/topDeals/phone.webp",
  },
  {
    id: 5,
    name: "Power Bank",
    price: "From Rs 999",
    image: "/images/topDeals/phone.png",
  },
] as const;

const ProductCard = ({
  name,
  price,
  image,
}: {
  name: string;
  price: string;
  image: string;
}) => (
  <div className="flex flex-col w-full">
    <div className="bg-[#F0EEED] rounded-xl h-40 sm:h-48 md:h-52 lg:h-56 w-full flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full h-[80%] px-4">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
      </div>
    </div>
    <div className="mt-2 pl-2 sm:pl-4">
      <h2 className="text-gray-800 font-medium text-sm sm:text-base">{name}</h2>
      <p className="font-semibold text-gray-900 text-sm sm:text-base">
        {price}
      </p>
    </div>
  </div>
);

export default function TopDeals() {
  return (
    <section className="px-2 sm:px-4 py-4 sm:py-6 w-full">
      <h1 className="text-xl sm:text-2xl font-medium mb-4 sm:mb-6">
        Top Deals on Gadgets
      </h1>
      <div className="flex flex-col lg:flex-row lg:gap-6">
        <div className="w-full lg:w-4/5">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {DEAL_PRODUCTS.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
        </div>
        <div className="mt-6 lg:mt-0 lg:w-1/5">
          <Ads />
        </div>
      </div>
    </section>
  );
}
