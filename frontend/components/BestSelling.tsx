"use client"
import React, { useRef } from 'react';
import { ProductCard } from './ProductCard';

const products = Array(5).fill(null);

export const BestSelling = () => {
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
        <span className="text-xs text-red-500 font-semibold">This Month</span>
      </div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-black">Best Selling Products</h2>
        <button className="bg-red-500 text-white px-6 py-2 rounded font-semibold hover:bg-red-600 transition">View All</button>
      </div>
      {/* Product Cards Scroll */}
      <div className="flex gap-6 overflow-x-auto scrollbar-hide py-2 px-1 sm:px-0">
        {products.map((_, idx) => (
          <ProductCard key={idx} />
        ))}
      </div>
    </section>
  );
};
