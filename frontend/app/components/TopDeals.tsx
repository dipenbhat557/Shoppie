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
  <div className="flex flex-col">
    <div
      className="bg-[#F0EEED] rounded-xl h-56 w-52 flex items-center justify-center 
                    hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative w-[210px] h-[180px]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-contain"
          sizes="190px"
        />
      </div>
    </div>
    <div className="mt-2 pl-10">
      <h2 className="text-gray-800 font-medium">{name}</h2>
      <p className="font-semibold text-gray-900">{price}</p>
    </div>
  </div>
);

export default function TopDeals() {
  return (
    <section className="px-4 py-6 w-full ">
      <h1 className="text-2xl font-medium mb-6">Top Deals on Gadgets</h1>
      <div className="flex gap-7">
        <div className="w-[80%]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
        <Ads />
      </div>
    </section>
  );
}
