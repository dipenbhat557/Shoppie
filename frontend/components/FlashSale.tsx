"use client";
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from './ProductCard';

const products = Array(6).fill(null);

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
          {products.map((_, idx) => (
            <ProductCard key={idx} />
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
