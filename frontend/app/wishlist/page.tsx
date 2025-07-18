"use client";
import React, { useState } from 'react';
import { ProductCard } from '../../components/ProductCard';
import { Trash2 } from 'lucide-react';

const initialProducts = [
  { name: 'Gucci duffle bag', price: '$960', oldPrice: '$1160', img: '/placeholder/gucci-bag.png', discount: '-35%' },
  { name: 'RGB liquid CPU Cooler', price: '$1960', img: '/placeholder/cooler.png' },
  { name: 'GP11 Shooter USB Gamepad', price: '$550', img: '/placeholder/gamepad.png' },
  { name: 'Quilted Satin Jacket', price: '$750', img: '/placeholder/jacket.png' },
];

export default function Wishlist() {
  const [products, setProducts] = useState(initialProducts);

  const handleDelete = (idx: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <section className="w-full max-w-7xl mx-auto mt-8 mb-12 px-2 sm:px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-black">Wishlist ({products.length})</h2>
        <button className="border border-gray-400 rounded px-6 py-2 font-medium hover:bg-gray-100 transition">Move All To Bag</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product, idx) => (
          <div key={product.name} className="relative flex flex-col">
            {/* Delete button */}
            <button
              className="absolute top-4 right-4 z-10 p-1 rounded-full bg-white border border-gray-200 hover:bg-gray-100"
              onClick={() => handleDelete(idx)}
              aria-label="Remove from wishlist"
            >
              <Trash2 className="w-5 h-5 text-gray-500" />
            </button>
            {/* ProductCard - you can extend ProductCard to accept props for image, name, price, etc. For now, use as is. */}
            <ProductCard />
            {/* Add To Cart button (already in ProductCard, but you can add here if needed) */}
          </div>
        ))}
      </div>
    </section>
  );
}   