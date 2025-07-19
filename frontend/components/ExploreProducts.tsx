import React from 'react';
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
  return (
    <section className="w-full max-w-7xl mx-auto mt-8 mb-12 px-2 sm:px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-6 bg-red-500 rounded mr-2" />
          <span className="text-xs text-red-500 font-semibold">Our Products</span>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-gray-200 rounded-full p-2 shadow hover:bg-gray-100 transition">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="bg-white border border-gray-200 rounded-full p-2 shadow hover:bg-gray-100 transition">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">Explore Our Products</h2>
      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {products.map((product, idx) => (
          <div key={product.name} className="flex justify-center">
            <ProductCard {...product} />
          </div>
        ))}
      </div>
      {/* View All Products Button */}
      <div className="flex justify-center mt-4">
        <button className="bg-red-500 text-white px-8 py-3 rounded font-semibold hover:bg-red-600 transition">View All Products</button>
      </div>
    </section>
  );
};
