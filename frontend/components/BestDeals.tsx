import React from "react";

const DEAL_PRODUCTS = [
  {
    id: 1,
    name: "Boats Airpods",
    price: "From Rs 899",
    image: "/images/appliance/wash.png",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "From Rs 1,499",
    image: "/images/appliance/tv.png",
  },
  {
    id: 3,
    name: "Wireless Mouse",
    price: "From Rs 599",
    image: "/images/appliance/fridge.png",
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
    image: "/images/appliance/fridge.png",
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
  <div className="flex flex-col gap-3">
    <div className="rounded-xl h-48 w-44 hover:shadow-lg transition-shadow duration-300 flex items-center justify-center">
      <div className="relative w-40 h-40">
        <img src={image} alt={name} className="object-contain w-full h-full" />
      </div>
    </div>
    <div className="relative left-6">
      <h2 className="text-gray-800 text-base  font-medium">{name}</h2>
      <p className="font-semibold text-gray-900 text-xl">{price}</p>
    </div>
  </div>
);

function BestDeals() {
  return (
    <div className="p-4">
      <h1 className="text-black font-medium text-2xl mb-6">
        Best Deals on Appliances
      </h1>
      <div className="w-full overflow-x-auto">
        <div className="flex flex-nowrap gap-4 min-w-min pb-4">
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
    </div>
  );
}

export default BestDeals;
