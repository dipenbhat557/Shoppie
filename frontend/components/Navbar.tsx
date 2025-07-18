"use client"
import React, { useState } from 'react';
import { Heart, ShoppingCart, Search, Menu } from 'lucide-react';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <nav className="w-full bg-white shadow flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-8 py-3 md:py-4">
      <div className="flex items-center justify-between w-full md:w-auto">
        {/* Logo */}
        <div className="text-2xl font-extrabold tracking-tight text-black">Kinamna</div>
        {/* Hamburger for mobile */}
        <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(v => !v)}>
          <Menu className="w-7 h-7 text-black" />
        </button>
      </div>
      {/* Center Nav Links */}
      <div className={`flex-col md:flex-row md:flex gap-8 text-base font-medium text-black md:items-center ${mobileMenuOpen ? 'flex' : 'hidden'} md:flex w-full md:w-auto bg-white md:bg-transparent z-30`}> 
        <a href="#" className="hover:underline underline-offset-4 py-2 md:py-0">Home</a>
        <a href="#" className="hover:underline underline-offset-4 py-2 md:py-0">Contact</a>
        <a href="#" className="hover:underline underline-offset-4 py-2 md:py-0">About</a>
        <a href="#" className="hover:underline underline-offset-4 py-2 md:py-0">Sign Up</a>
      </div>
      {/* Right: Search, Heart, Cart */}
      <div className="flex items-center gap-2 md:gap-4 mt-2 md:mt-0 w-full md:w-auto">
        <div className="relative flex-1 md:flex-none">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="rounded-md border border-gray-300 px-4 py-2 pl-10 w-full md:w-56 focus:outline-none focus:ring-2 focus:ring-black/10 text-sm"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100 transition"><Heart className="w-6 h-6" /></button>
        <button className="p-2 rounded-full hover:bg-gray-100 transition"><ShoppingCart className="w-6 h-6" /></button>
      </div>
    </nav>
  );
};
