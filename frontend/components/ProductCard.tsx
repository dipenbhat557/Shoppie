"use client";
import React, { useState } from 'react';
import { Heart } from 'lucide-react';

export const ProductCard = () => {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div className="relative bg-white rounded-xl shadow border border-gray-100 p-3 flex flex-col w-[230px] min-w-[230px] max-w-[260px] transition hover:shadow-lg group">
      {/* Discount badge */}
      <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">-40%</span>
      {/* Wishlist icon only */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          className="p-1 rounded-full bg-white border border-gray-200 hover:bg-gray-100"
          onClick={() => setWishlisted((w) => !w)}
          aria-label="Add to wishlist"
        >
          <Heart
            className={`w-5 h-5 transition-colors duration-200 ${wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
            fill={wishlisted ? 'currentColor' : 'none'}
          />
        </button>
      </div>
      {/* Product image area */}
      <div className="relative w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden mb-4">
        <img src="/placeholder/product1.png" alt="Product" className="object-contain h-28 transition-transform duration-200 group-hover:scale-105 cursor-pointer" />
        {/* Add to cart button on hover of card */}
        <button className="absolute left-0 right-0 bottom-0 h-10 bg-black text-white text-base font-semibold rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">Add To Cart</button>
      </div>
      {/* Product name */}
      <div className="font-semibold text-base text-gray-900 mb-1">HAVIT HV-G92 Gamepad</div>
      {/* Price */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-red-500 font-bold text-lg">$120</span>
        <span className="text-gray-400 line-through text-base">$160</span>
      </div>
      {/* Rating */}
      <div className="flex items-center gap-1 mb-2">
        <span className="text-yellow-400 text-lg">★</span>
        <span className="text-yellow-400 text-lg">★</span>
        <span className="text-yellow-400 text-lg">★</span>
        <span className="text-yellow-400 text-lg">★</span>
        <span className="text-yellow-400 text-lg">★</span>
        <span className="text-gray-500 text-base ml-1">(88)</span>
      </div>
    </div>
  );
};
