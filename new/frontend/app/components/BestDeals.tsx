"use client";

import fridge from "../../public/images/appliance/fridge.png";
import wash from "../../public/images/appliance/wash.png";
import tv from "../../public/images/appliance/tv.png";

import { BestDealsProductCard } from "./BestDealsProductCard";
import { BestDealsAdd } from "./BestDealsAdd";

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
          <div className="flex overflow-x-auto scrollbar-hide space-x-4">
            {featuredProducts.map((product, index) => (
              <div key={index} className="max-w-[50%] min-w-[19%]">
                <BestDealsProductCard
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
