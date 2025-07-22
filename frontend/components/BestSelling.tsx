"use client"
import React, { useRef, useState } from 'react';
import Link from 'next/link';
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
  }
];

export const BestSelling = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showHint, setShowHint] = useState(true);

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = dir === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  const handleUserInteraction = () => {
    if (showHint) setShowHint(false);
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
        {/* Removed 'View All' button as per request */}
      </div>
      {/* Product Cards Scroll */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide py-2 px-1 sm:px-0 relative"
        onScroll={handleUserInteraction}
        onTouchStart={handleUserInteraction}
        onMouseDown={handleUserInteraction}
      >
        {products.map((product, idx) => (
          <ProductCard key={idx} {...product} />
        ))}
        {/* Swipe hint overlay - only on mobile, only if showHint is true */}
        {showHint && (
          <div className="md:hidden pointer-events-none absolute bottom-2 right-4 z-20 flex items-center gap-1 bg-black/70 text-white text-xs px-3 py-1 rounded-full animate-pulse shadow-lg select-none">
            <span role="img" aria-label="hand">🖐️</span>
            <span>Swipe</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8m0 0l-4-4m4 4l-4 4" /></svg>
          </div>
        )}
      </div>
    </section>
  );
};
