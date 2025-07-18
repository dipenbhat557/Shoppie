"use client";
import React, { useState } from "react";
import {
  Search,
  Menu,
  X,
  ShoppingCart,
  User,
  Package,
  ChevronRight,
} from "lucide-react";

const NAV_BUTTONS = [
  {
    id: "orders",
    label: "Orders",
    icon: Package,
  },
  {
    id: "cart",
    label: "Cart",
    icon: ShoppingCart,
  },
  {
    id: "account",
    label: "Account",
    icon: User,
  },
] as const;

interface NavButtonProps {
  label: string;
  icon?: React.ElementType | null;
  className?: string;
  onClick?: () => void;
}

const NavButton = ({
  label,
  icon: Icon,
  className = "",
  onClick,
}: NavButtonProps) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center gap-1 px-4 py-1.5 text-black 
               border-[1.5px] border-black rounded-lg min-w-24 h-8
               transition-all duration-200 
               hover:bg-black hover:text-white hover:scale-105
               focus:outline-none focus:ring-2 focus:ring-black/20 ${className}`}
  >
    {Icon && <Icon className="w-5 h-5" />}
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const SearchBar = ({ className = "" }) => (
  <div
    className={`flex items-center gap-2 px-4 py-1.5 rounded-2xl h-9 
                bg-slate-100 border-[0.5px] border-black
                focus-within:border-black focus-within:ring-2 focus-within:ring-black/5 ${className}`}
  >
    <Search className="w-5 h-5 text-gray-500" />
    <input
      type="text"
      placeholder="Search your desired products"
      className="w-full bg-transparent outline-none text-sm text-gray-600 placeholder:text-gray-500"
    />
  </div>
);

const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => (
  <>
    {isOpen && (
      <div
        className="fixed inset-0 bg-black/50 transition-opacity z-40"
        onClick={onClose}
      />
    )}

    <div
      className={`fixed top-0 left-0 bottom-0 w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <img
            src="/images/LogoKinamna.png"
            alt="Logo"
            className="w-10 h-10 object-contain"
          />
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4">
          <SearchBar className="w-full" />
        </div>

        <nav className="flex-1 p-4">
          <div className="flex flex-col space-y-3">
            {NAV_BUTTONS.map(({ id, label, icon: Icon }) => (
              <div
                key={id}
                className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  {Icon && <Icon className="w-5 h-5" />}
                  <span className="text-sm font-medium">{label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </nav>
      </div>
    </div>
  </>
);

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <header className="relative bg-white">
      <div className="hidden lg:flex px-4 lg:px-14 items-center justify-between">
        <div className="flex items-center gap-5">
          <img src="/images/LogoKinamna.png" alt="Logo" className="w-14" />
          <SearchBar className="w-96" />
        </div>
        <nav className="flex items-center gap-6">
          {NAV_BUTTONS.map(({ id, label, icon }) => (
            <NavButton key={id} label={label} icon={icon} />
          ))}
        </nav>
      </div>

      <div className="lg:hidden flex items-center justify-between px-4 py-2">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <Menu className="w-6 h-6" />
        </button>

        <img
          src="/images/LogoKinamna.png"
          alt="Logo"
          className="w-24 h-24 object-contain"
        />

        <ShoppingCart className="w-6 h-6" />
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </header>
  );
}
