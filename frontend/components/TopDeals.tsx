import React from 'react';
import Image from 'next/image';

const gadgets = [
    { name: 'Headset', price: 'From Rs 5000', img: '/images/topDeals/boat.png' },
  { name: 'Boats Airpods', price: 'From Rs 899', img: '/images/topDeals/airpods.png' },
  { name: 'Apple Mobiles', price: 'From Rs 90,000', img: '/images/topDeals/phone.png' },
  { name: 'Apple Airpods', price: 'From Rs 10,00', img: '/images/topDeals/headphone.png' },
  { name: 'Headset', price: 'From Rs 5000', img: '/images/topDeals/boat.png' },
];

export const TopDeals = () => {
  return (
    <section className="w-full max-w-7xl mx-auto mt-8 mb-12 px-2 sm:px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">Top Deals on Gadgets</h2>
      <div className="flex flex-col md:flex-row gap-4 items-stretch">
        {/* Gadget cards */}
        <div className="flex-1 flex flex-row gap-4">
          {gadgets.map((gadget, idx) => (
            <div key={gadget.name} className="bg-white rounded-xl shadow flex flex-col items-center justify-between h-64 w-full max-w-[180px] min-w-[150px] p-4">
              <Image src={gadget.img} alt={gadget.name} width={150} height={150} className="object-contain mb-4" />
              <div className="text-sm text-gray-700 text-center mb-1">{gadget.name}</div>
              <div className="font-bold text-base text-black text-center">{gadget.price}</div>
            </div>
          ))}
        </div>
        {/* Right promo card */}
        <div className="flex flex-col  bg-white  shadow overflow-hidden w-full max-w-[220px] min-w-[180px] h-96 md:h-[340px]">
          <div className="flex-1 w-full h-2/3 relative">
            <Image src="/images/topDeals/promo.png" alt="Promo" fill className="object-cover w-full h-full" />
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
