"use client";
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Product {
  id: number;
  name: string;
  image: string;
}

interface ProductCardProps extends Omit<Product, "id"> {}

const products: Product[] = [
  {
    id: 1,
    name: "Boat Airdopes",
    image: "/images/topDeals/phone.png",
  },
  {
    id: 2,
    name: "iPhone 13 Pro",
    image: "/images/topDeals/phone.webp",
  },
  {
    id: 3,
    name: "Boat Rockerz",
    image: "/images/topDeals/airpods.png",
  },
  {
    id: 4,
    name: "Boat Headphones",
    image: "/images/topDeals/boat.png",
  },

  {
    id: 2,
    name: "iPhone 13 Pro",
    image: "/images/topDeals/phone.webp",
  },
  {
    id: 5,
    name: "Wireless Earbuds",
    image: "/images/topDeals/phone.png",
  },
];

const ProductCard: React.FC<ProductCardProps> = ({ image, name }) => (
  <div className="min-w-[250px] p-4 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow duration-300">
    <div className="h-48 flex items-center justify-center">
      <img
        src={image}
        alt={name}
        className="max-h-full w-auto object-contain"
      />
    </div>
  </div>
);

const RecentItem: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right"): void => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 300;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full p-6">
      <h1 className="text-2xl font-bold mb-6">Recently Viewed Items</h1>
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              image={product.image}
            />
          ))}
        </div>
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default RecentItem;
