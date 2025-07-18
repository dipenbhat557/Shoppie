"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { id: "signin", label: "Signin", href: "/signin" },
  { id: "register", label: "Register", href: "/register" },
  { id: "contact", label: "Contact Us", href: "/contact" },
  { id: "seller", label: "Become a seller", href: "/seller" },
] as const;

const NavButton = ({ label, href }: { label: string; href: string }) => (
  <a
    href={href}
    className="hover:underline transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/20 rounded px-2 py-1"
  >
    {label}
  </a>
);

export function Topbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
        {/* Desktop View */}
        <div className="hidden md:flex items-center justify-between">
          <p className="text-sm font-medium">Free Delivery all over Nepal!</p>
          <nav className="flex items-center space-x-6">
            {NAV_ITEMS.map(({ id, label, href }) => (
              <NavButton key={id} label={label} href={href} />
            ))}
          </nav>
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Free Delivery all over Nepal!</p>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 focus:outline-none focus:ring-2 focus:ring-white/20 rounded"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <nav className="mt-2 py-2 border-t border-white/10">
              <div className="flex flex-col space-y-2">
                {NAV_ITEMS.map(({ id, label, href }) => (
                  <a
                    key={id}
                    href={href}
                    className="px-2 py-1 hover:bg-white/10 rounded transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
