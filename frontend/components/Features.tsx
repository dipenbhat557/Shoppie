'use client';
import React from 'react';
import { Truck, Headphones, ShieldCheck, ArrowUp } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'FREE AND FAST DELIVERY',
    desc: 'Free delivery for all orders over $140',
  },
  {
    icon: Headphones,
    title: '24/7 CUSTOMER SERVICE',
    desc: 'Friendly 24/7 customer support',
  },
  {
    icon: ShieldCheck,
    title: 'MONEY BACK GUARANTEE',
    desc: 'We return money within 30 days',
  },
];

export const Features = () => {
//   const handleScrollTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

  return (
    <section className="w-full max-w-7xl mx-auto py-10 px-2 sm:px-4 relative">
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-0 md:justify-between">
        {features.map((f, idx) => (
          <div key={f.title} className="flex flex-col items-center text-center flex-1 px-4">
            <div className="mb-4 flex items-center justify-center">
              <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-200">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-black">
                  <f.icon className="w-7 h-7 text-white" />
                </span>
              </span>
            </div>
            <div className="font-bold text-base md:text-lg mb-1">{f.title}</div>
            <div className="text-xs md:text-sm text-gray-600">{f.desc}</div>
          </div>
        ))}
      </div>
      {/* Scroll to top button */}
      {/* <button
        onClick={handleScrollTop}
        className="fixed bottom-6 right-6 z-50 bg-white border border-gray-300 shadow-lg rounded-full p-3 hover:bg-gray-100 transition"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 text-black" />
      </button> */}
    </section>
  );
};
