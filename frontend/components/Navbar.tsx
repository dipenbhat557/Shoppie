"use client"

//when user is signed in, signup btn will change to my Account that will be dropdown menu which will show my orders,switch account,logout and other

import React, { useState, useEffect, useRef } from 'react';
import { Heart, ShoppingCart, Search, Menu, User, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const categoriesDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAccountDropdownOpen(false);
      }
      if (categoriesDropdownRef.current && !categoriesDropdownRef.current.contains(event.target as Node)) {
        setCategoriesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const categories = [
    { name: 'Electronics', href: '#' },
    { name: 'Fashion', href: '#' },
    { name: 'Home & Garden', href: '#' },
    { name: 'Sports & Outdoors', href: '#' },
    { name: 'Beauty & Health', href: '#' },
    { name: 'Books & Media', href: '#' },
    { name: 'Toys & Games', href: '#' },
    { name: 'Automotive', href: '#' }
  ];

  return (
    <nav className="w-full bg-white shadow border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-8 py-3 md:py-4">
      <div className="flex items-center justify-between w-full md:w-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center h-10 w-auto">
          <Image src="/newImages/logo.png" alt="Kinamna Logo" width={150} height={70} className="object-contain h-16 w-auto" priority unoptimized/>
        </Link>
        {/* Hamburger for mobile */}
        <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(v => !v)}>
          <Menu className="w-7 h-7 text-black" />
        </button>
      </div>
      {/* Center Nav Links */}
      <div className={`flex-col md:flex-row md:flex gap-8 text-base font-medium text-black md:items-center ${mobileMenuOpen ? 'flex' : 'hidden'} md:flex w-full md:w-auto bg-white md:bg-transparent z-30`}> 
        <Link href="/" className="hover:underline underline-offset-4 py-2 md:py-0">Home</Link>
        
        {/* Categories Dropdown */}
        <div className="relative" ref={categoriesDropdownRef}>
          <button 
            className="flex items-center gap-1 hover:underline underline-offset-4 py-2 md:py-0"
            onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
          >
            Categories
            <ChevronDown className={`w-4 h-4 transition-transform ${categoriesDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {categoriesDropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
              <div className="py-1">
                {categories.map((category, index) => (
                  <a 
                    key={index}
                    href={category.href} 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <Link href="/contact" className="hover:underline underline-offset-4 py-2 md:py-0">Contact</Link>
        <Link href="/about-us" className="hover:underline underline-offset-4 py-2 md:py-0">About</Link>
      </div>
      {/* Right: Search, Heart, Cart, Account */}
      <div className="flex items-center gap-2 md:gap-4 mt-2 md:mt-0 w-full md:w-auto">
        <div className="relative flex-1 md:flex-none">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="rounded-md border border-gray-300 px-4 py-2 pl-10 w-full md:w-56 focus:outline-none focus:ring-2 focus:ring-black/10 text-sm"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        <Link href="/wishlist" className="p-2 rounded-full hover:bg-gray-100 transition">
          <Heart className="w-6 h-6" />
        </Link>
        <Link href="/cart" className="p-2 rounded-full hover:bg-gray-100 transition">
          <ShoppingCart className="w-6 h-6" />
        </Link>
        
        {/* Account Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 transition"
            onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
          >
            <User className="w-6 h-6" />
          </button>
          
          {accountDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
              <div className="py-1">
                <a href="/orders/1" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Orders</a>
                <a href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Account</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Switch Account</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
