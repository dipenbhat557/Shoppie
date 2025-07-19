"use client";
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  name?: string;
  currentPrice?: string;
  originalPrice?: string;
  discount?: number;
  rating?: number;
  reviews?: number;
  image?: string;
  showAddToCart?: boolean;
  id?: string | number;
}

export const ProductCard = ({ 
  name = "HAVIT HV-G92 Gamepad",
  currentPrice = "$120",
  originalPrice = "$160",
  discount = 40,
  rating = 5,
  reviews = 88,
  image = "/newImages/products/p1.png",
  showAddToCart = true,
  id = 1
}: ProductCardProps) => {
  const [wishlisted, setWishlisted] = useState(false);
  const router = useRouter();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`text-lg ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
    ));
  };

  const handleCardClick = () => {
    router.push(`/product/${id}`);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking wishlist button
    setWishlisted((w) => !w);
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking add to cart button
    // Add to cart logic here
    console.log('Add to cart:', name);
  };

  return (
    <div 
      className="relative bg-white rounded-xl cursor-pointer shadow border border-gray-100 p-3 flex flex-col w-[230px] min-w-[230px] max-w-[260px] transition hover:shadow-lg group"
      onClick={handleCardClick}
    >
      {/* Discount badge */}
      {discount > 0 && (
        <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">-{discount}%</span>
      )}
      {/* Wishlist icon only */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          className="p-1 rounded-full bg-white border border-gray-200 hover:bg-gray-100"
          onClick={handleWishlistClick}
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
        <img src={image} alt={name} className="object-contain h-28 transition-transform duration-200 group-hover:scale-105 cursor-pointer" />
        {/* Add to cart button on hover of card */}
        {showAddToCart && (
          <button 
            className="absolute left-0 right-0 bottom-0 h-10 bg-black text-white text-base font-semibold rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={handleAddToCartClick}
          >
            Add To Cart
          </button>
        )}
      </div>
      {/* Product name */}
      <div className="font-semibold text-base text-gray-900 mb-1">{name}</div>
      {/* Price */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-red-500 font-bold text-lg">{currentPrice}</span>
        {originalPrice && (
          <span className="text-gray-400 line-through text-base">{originalPrice}</span>
        )}
      </div>
      {/* Rating */}
      <div className="flex items-center gap-1 mb-2">
        {renderStars(rating)}
        <span className="text-gray-500 text-base ml-1">({reviews})</span>
      </div>
    </div>
  );
};
