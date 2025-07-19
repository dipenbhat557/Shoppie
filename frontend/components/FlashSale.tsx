"use client";
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from './ProductCard';

const products = [
  {
    id: 1,
    name: "HAVIT HV-G92 Gamepad",
    currentPrice: "$120",
    originalPrice: "$160",
    discount: 40,
    rating: 5,
    reviews: 88,
    image: "/newImages/products/p1.png"
  },
  {
    id: 2,
    name: "AK-900 Wired Keyboard",
    currentPrice: "$960",
    originalPrice: "$1160",
    discount: 35,
    rating: 4,
    reviews: 75,
    image: "/newImages/products/p2.png"
  },
  {
    id: 3,
    name: "IPS LCD Gaming Monitor",
    currentPrice: "$370",
    originalPrice: "$400",
    discount: 30,
    rating: 5,
    reviews: 99,
    image: "/newImages/products/p3.png"
  },
  {
    id: 4,
    name: "RGB liquid CPU Cooler",
    currentPrice: "$160",
    originalPrice: "$170",
    discount: 10,
    rating: 4,
    reviews: 65,
    image: "/newImages/products/p4.png"
  },
  {
    id: 5,
    name: "GP11 Shooter USB Gamepad",
    currentPrice: "$660",
    originalPrice: "$700",
    discount: 25,
    rating: 4,
    reviews: 55,
    image: "/newImages/products/p5.png"
  },
  {
    id: 6,
    name: "Quilted Satin Jacket",
    currentPrice: "$660",
    originalPrice: "$800",
    discount: 30,
    rating: 4,
    reviews: 55,
    image: "/newImages/products/p6.png"
  }
];

export const FlashSale = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = dir === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto mt-8 mb-12 px-2 sm:px-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2 h-6 bg-red-500 rounded mr-2" />
        <span className="text-xs text-red-500 font-semibold">Today&apos;s</span>
      </div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-4 gap-2 md:gap-0">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-1 md:mb-0">Flash Sales</h2>
        {/* Countdown Timer */}
        <div className="flex items-center gap-4 text-xs md:text-sm font-semibold text-gray-700">
          <span>Days</span>
          <span className="text-xl font-bold text-black">03</span> :
          <span>Hours</span>
          <span className="text-xl font-bold text-black">23</span> :
          <span>Minutes</span>
          <span className="text-xl font-bold text-black">19</span> :
          <span>Seconds</span>
          <span className="text-xl font-bold text-black">56</span>
        </div>
      </div>
      {/* Product Cards Scroll */}
      <div className="relative">
        <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full p-2 shadow hover:bg-gray-100 hidden sm:block">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide py-2 px-1 sm:px-8"
          style={{ scrollBehavior: 'smooth' }}
        >
          {products.map((product, idx) => (
            <ProductCard key={idx} {...product} />
          ))}
        </div>
        <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full p-2 shadow hover:bg-gray-100 hidden sm:block">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      {/* View All Button */}
      <div className="flex justify-center mt-6">
        <button className="bg-red-500 text-white px-6 py-2 rounded font-semibold hover:bg-red-600 transition">View All Products</button>
      </div>
    </section>
  );
};
