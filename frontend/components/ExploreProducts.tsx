"use client"
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { ProductCard } from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const products = [
  { 
    id: 1,
    name: 'Breed Dry Dog Food', 
    currentPrice: '$100', 
    originalPrice: '$120',
    discount: 20,
    rating: 3, 
    reviews: 35, 
    image: '/newImages/products/p1.png' 
  },
  { 
    id: 2,
    name: 'CANON EOS DSLR Camera', 
    currentPrice: '$360', 
    originalPrice: '$400',
    discount: 10,
    rating: 4, 
    reviews: 95, 
    image: '/newImages/products/p2.png', 
    showAddToCart: true 
  },
  { 
    id: 3,
    name: 'ASUS FHD Gaming Laptop', 
    currentPrice: '$700', 
    originalPrice: '$800',
    discount: 15,
    rating: 5, 
    reviews: 325, 
    image: '/newImages/products/p3.png' 
  },
  { 
    id: 4,
    name: 'Curology Product Set', 
    currentPrice: '$500', 
    originalPrice: '$600',
    discount: 20,
    rating: 4, 
    reviews: 145, 
    image: '/newImages/products/p4.png' 
  },
  { 
    id: 5,
    name: 'Kids Electric Car', 
    currentPrice: '$960', 
    originalPrice: '$1000',
    discount: 5,
    rating: 5, 
    reviews: 65, 
    image: '/newImages/products/p5.png', 
    showAddToCart: true 
  },
  { 
    id: 6,
    name: 'Jr. Zoom Soccer Cleats', 
    currentPrice: '$1160', 
    originalPrice: '$1300',
    discount: 15,
    rating: 5, 
    reviews: 35, 
    image: '/newImages/products/p6.png' 
  },
  { 
    id: 7,
    name: 'GP11 Shooter USB Gamepad', 
    currentPrice: '$660', 
    originalPrice: '$700',
    discount: 10,
    rating: 4, 
    reviews: 55, 
    image: '/newImages/products/p1.png', 
    showAddToCart: true 
  },
  { 
    id: 8,
    name: 'Quilted Satin Jacket', 
    currentPrice: '$660', 
    originalPrice: '$750',
    discount: 15,
    rating: 4, 
    reviews: 55, 
    image: '/newImages/products/p2.png' 
  },
];

export const ExploreProducts = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showHint, setShowHint] = useState(true);

  const handleUserInteraction = () => {
    if (showHint) setShowHint(false);
  };

  return (
    <section className="w-full max-w-7xl mx-auto mt-8 mb-12 px-2 sm:px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-6 bg-red-500 rounded mr-2" />
          <span className="text-xs text-red-500 font-semibold">Our Products</span>
        </div>
        {/* Hide arrows on mobile */}
        <div className="hidden md:flex gap-2">
          <button className="bg-white border border-gray-200 rounded-full p-2 shadow hover:bg-gray-100 transition">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="bg-white border border-gray-200 rounded-full p-2 shadow hover:bg-gray-100 transition">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">Explore Our Products</h2>
      {/* Product Cards: slider on mobile, grid on md+ */}
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide mb-8 md:grid md:grid-cols-4 md:gap-6 md:overflow-x-visible relative"
        onScroll={handleUserInteraction}
        onTouchStart={handleUserInteraction}
        onMouseDown={handleUserInteraction}
      >
        {products.map((product, idx) => (
          <div key={product.name} className="flex-shrink-0 w-64 md:w-auto flex justify-center">
            <ProductCard {...product} />
          </div>
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
      {/* View All Products Button */}
      <div className="flex justify-center mt-4">
        <Link href="/productslist" className="bg-red-500 text-white px-8 py-3 rounded font-semibold hover:bg-red-600 transition">View All Products</Link>
      </div>
    </section>
  );
};
