"use client";
import React, { useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Trash2 } from 'lucide-react';

const initialProducts = [
  { 
    id: 1,
    name: 'Gradient Graphic T-shirt', 
    price: 145, 
    originalPrice: null, 
    discount: null, 
    rating: 3.5,
    image: '/newImages/products/p1.png' 
  },
  { 
    id: 2,
    name: 'H1 Gamepad', 
    price: 550, 
    originalPrice: null, 
    discount: null, 
    rating: 4.2,
    image: '/newImages/products/p2.png' 
  },
  { 
    id: 3,
    name: 'Polo with Tipping Details', 
    price: 180, 
    originalPrice: null, 
    discount: null, 
    rating: 4.5,
    image: '/newImages/products/p3.png' 
  },
  { 
    id: 4,
    name: 'Skinny Fit Jeans', 
    price: 240, 
    originalPrice: 260, 
    discount: 20, 
    rating: 3.5,
    image: '/newImages/products/p4.png' 
  },
  { 
    id: 5,
    name: 'Checkered Shirt', 
    price: 180, 
    originalPrice: null, 
    discount: null, 
    rating: 4.5,
    image: '/newImages/products/p5.png' 
  },
  { 
    id: 6,
    name: 'Sleeve Striped T-shirt', 
    price: 130, 
    originalPrice: 160, 
    discount: 30, 
    rating: 4.5,
    image: '/newImages/products/p6.png' 
  }
];

export default function Wishlist() {
  const [products, setProducts] = useState(initialProducts);

  const handleDelete = (productId: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-600 mb-8">
          <a href="/" className="hover:text-gray-800">Home</a>
          <span className="mx-2">/</span>
          <span className="text-black font-medium">Wishlist</span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-black mb-2">My Wishlist</h1>
              <p className="text-gray-600 text-sm md:text-base">{products.length} items in your wishlist</p>
            </div>
            {products.length > 0 && (
              <button className="px-6 py-3 bg-[#E73C17] text-white rounded-lg hover:bg-[#d63615] transition-colors font-medium text-sm md:text-base">
                Move All To Cart
              </button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="relative">
                {/* Delete button */}
                <button
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-100 transition-colors shadow-sm"
                  onClick={() => handleDelete(product.id)}
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4 text-gray-500" />
                </button>
                
                {/* ProductCard with proper props */}
                <ProductCard 
                  name={product.name}
                  currentPrice={`$${product.price}`}
                  originalPrice={product.originalPrice ? `$${product.originalPrice}` : undefined}
                  discount={product.discount || undefined}
                  rating={product.rating}
                  image={product.image}
                  id={product.id}
                />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-black mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-6 text-sm md:text-base">Start adding items to your wishlist to save them for later.</p>
            <a
              href="/productslist"
              className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-[#E73C17] text-white rounded-lg hover:bg-[#d63615] transition-colors font-medium text-sm md:text-base"
            >
              Start Shopping
            </a>
          </div>
        )}
      </div>
    </div>
  );
}   