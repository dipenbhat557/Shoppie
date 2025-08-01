"use client"
import React, { useRef, useState } from 'react';
import Image from 'next/image';

const gadgets = [
    { name: 'Headset', price: 'From Rs 5000', img: '/images/topDeals/boat.png' },
  { name: 'Boats Airpods', price: 'From Rs 899', img: '/images/topDeals/airpods.png' },
  { name: 'Apple Mobiles', price: 'From Rs 90,000', img: '/images/topDeals/phone.png' },
  { name: 'Apple Airpods', price: 'From Rs 10,00', img: '/images/topDeals/headphone.png' },
  { name: 'Headset', price: 'From Rs 5000', img: '/images/topDeals/boat.png' },
];

export const TopDeals = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showHint, setShowHint] = useState(true);

  const handleUserInteraction = () => {
    if (showHint) setShowHint(false);
  };

  return (
    <section className="w-full max-w-7xl mx-auto mt-8 mb-12 px-2 sm:px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">Top Deals on Gadgets</h2>
      <div className="flex flex-col md:flex-row gap-4 items-stretch">
        {/* Gadget cards - horizontal scroll on mobile */}
        <div
          ref={sliderRef}
          className="flex-1 flex gap-4 overflow-x-auto scrollbar-hide md:overflow-x-visible md:flex-row relative"
          onScroll={handleUserInteraction}
          onTouchStart={handleUserInteraction}
          onMouseDown={handleUserInteraction}
        >
          {gadgets.map((gadget, idx) => (
            <div key={gadget.name + idx} className="cursor-pointer bg-white rounded-xl shadow flex flex-col items-center justify-between h-64 w-[150px] min-w-[150px] max-w-[180px] p-4 flex-shrink-0">
              <Image src={gadget.img} unoptimized alt={gadget.name} width={150} height={150} className="object-contain mb-4" />
              <div className="text-sm text-gray-700 text-center mb-1">{gadget.name}</div>
              <div className="font-bold text-base text-black text-center">{gadget.price}</div>
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
        {/* Right promo card - stack below on mobile, right on desktop */}
        <div className="flex flex-col bg-white shadow cursor-pointer overflow-hidden w-full max-w-[220px] min-w-[180px] h-96 md:h-[340px] md:ml-0 mt-4 md:mt-0 mx-auto md:mx-0">
          <div className="flex-1 w-full h-2/3 relative">
            <Image unoptimized src="/newImages/sideAd.png" alt="Promo" fill className="object-cover w-full h-full" />
          </div>
          <div className="w-full p-4 border-t border-gray-200 flex flex-col items-start justify-end flex-shrink-0">
            <div className="text-red-600 font-bold text-sm mb-1">Flat 40% off in HnM Brand</div>
            <div className="font-bold text-base text-black">From Rs 5000</div>
          </div>
        </div>
      </div>
    </section>
  );
};
