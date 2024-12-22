import React from "react";
import Image from "next/image";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { MdOutlineAccountCircle } from "react-icons/md";

const NAV_BUTTONS = [
  {
    id: "orders",
    label: "Orders",
    icon: null,
  },
  {
    id: "cart",
    label: "Cart",
    icon: CiShoppingCart,
  },
  {
    id: "account",
    label: "Account",
    icon: MdOutlineAccountCircle,
  },
] as const;

interface NavButtonProps {
  label: string;
  icon?: React.ElementType | null;
}

const NavButton = ({ label, icon: Icon }: NavButtonProps) => (
  <button
    className="flex items-center justify-center gap-1 px-4 py-1.5 text-black 
               border-[1.5px] border-black rounded-lg min-w-24 h-8
               transition-all duration-200 
               hover:bg-black hover:text-white hover:scale-105
               focus:outline-none focus:ring-2 focus:ring-black/20"
  >
    {Icon && <Icon className="w-6 h-6" />}
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const SearchBar = () => (
  <div
    className="flex items-center gap-2 px-4 py-1.5 rounded-2xl w-96 h-9 
                  bg-slate-100 border-[0.5px] border-black
                  focus-within:border-black focus-within:ring-2 focus-within:ring-black/5"
  >
    <CiSearch className="w-6 h-6 text-gray-500" />
    <input
      type="text"
      placeholder="Search your desired products"
      className="w-full bg-transparent outline-none text-sm text-gray-600 placeholder:text-gray-500"
    />
  </div>
);

export default function Navbar() {
  return (
    <header className="px-14 flex items-center justify-between">
      <div className="flex items-center gap-5">
        <Image
          src="/svg/shop_nav.svg"
          alt="Logo"
          width={130}
          height={130}
          priority
        />
        <SearchBar />
      </div>

      <nav className="flex items-center gap-6">
        {NAV_BUTTONS.map(({ id, label, icon }) => (
          <NavButton key={id} label={label} icon={icon} />
        ))}
      </nav>
    </header>
  );
}
