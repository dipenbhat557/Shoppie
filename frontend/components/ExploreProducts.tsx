import React from 'react';
import { ProductCard } from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const products = [
  { name: 'Breed Dry Dog Food', price: '$100', rating: 3, reviews: 35, img: '/placeholder/dogfood.png' },
  { name: 'CANON EOS DSLR Camera', price: '$360', rating: 4, reviews: 95, img: '/placeholder/camera.png', addToCart: true },
  { name: 'ASUS FHD Gaming Laptop', price: '$700', rating: 5, reviews: 325, img: '/placeholder/laptop.png' },
  { name: 'Curology Product Set', price: '$500', rating: 4, reviews: 145, img: '/placeholder/curology.png' },
  { name: 'Kids Electric Car', price: '$960', rating: 5, reviews: 65, img: '/placeholder/car.png', badge: 'NEW', colors: ['#00e676', '#ff1744'] },
  { name: 'Jr. Zoom Soccer Cleats', price: '$1160', rating: 5, reviews: 35, img: '/placeholder/cleats.png', colors: ['#00e676', '#ffeb3b'] },
  { name: 'GP11 Shooter USB Gamepad', price: '$660', rating: 4, reviews: 55, img: '/placeholder/gamepad.png', badge: 'NEW', colors: ['#00e676', '#ff1744'] },
  { name: 'Quilted Satin Jacket', price: '$660', rating: 4, reviews: 55, img: '/placeholder/jacket.png', colors: ['#00e676', '#ffeb3b'] },
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
            {/* You can extend ProductCard to accept props for image, name, price, rating, etc. For now, use as is. */}
            <ProductCard />
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
