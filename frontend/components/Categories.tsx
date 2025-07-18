"use client"
import React, { useRef } from 'react';
import { Camera, Monitor, Smartphone, Headphones, Gamepad2, Watch, Laptop, ArrowLeft, ArrowRight } from 'lucide-react';

const categories = [
  { name: 'Phones', icon: Smartphone },
  { name: 'Computers', icon: Laptop },
  { name: 'SmartWatch', icon: Watch },
  { name: 'Camera', icon: Camera },
  { name: 'HeadPhones', icon: Headphones },
  { name: 'Gaming', icon: Gamepad2 },
  { name: 'Phones', icon: Smartphone },
  { name: 'Computers', icon: Laptop },
  { name: 'SmartWatch', icon: Watch },
  { name: 'Camera', icon: Camera },
  { name: 'HeadPhones', icon: Headphones },
  { name: 'Gaming', icon: Gamepad2 },
];

export const Categories = () => {
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
        <span className="text-xs text-red-500 font-semibold">Categories</span>
      </div>
      <h2 className="text-xl md:text-2xl font-bold text-black mb-6">Browse By Category</h2>
      {/* Category Cards Scroll */}
      <div className="relative flex items-center">
        {/* Left Arrow */}
        <button onClick={() => scroll('left')} className="absolute -left-8 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 shadow rounded-full p-2 hover:bg-gray-50 transition hidden sm:block">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide py-2 px-1 sm:px-8 w-full"
          style={{ scrollBehavior: 'smooth' }}
        >
          {categories.map((cat) => (
            <button
              key={cat.name}
              className={`flex flex-col items-center justify-center min-w-[120px] h-28 rounded-lg border transition-all px-4 py-2
                bg-white text-gray-700 border-gray-200 hover:bg-red-500 hover:text-white group`}
            >
              <cat.icon className={`w-8 h-8 mb-2 group-hover:text-white text-gray-700`} />
              <span className="font-semibold text-sm">{cat.name}</span>
            </button>
          ))}
        </div>
        {/* Right Arrow */}
        <button onClick={() => scroll('right')} className="absolute -right-8 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 shadow rounded-full p-2 hover:bg-gray-50 transition hidden sm:block">
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};
