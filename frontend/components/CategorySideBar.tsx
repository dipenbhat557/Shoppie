import React from 'react';
import { ChevronRight, Shirt, Monitor, Home, HeartPulse, Dumbbell, Baby, ShoppingCart, Stethoscope, User } from 'lucide-react';

const categories = [
  { name: "Woman’s", icon: User, expandable: true },
  { name: "Men’s", icon: Shirt, expandable: true },
  { name: "Electronics", icon: Monitor },
  { name: "Home", icon: Home },
  { name: "Medicine", icon: Stethoscope },
  { name: "Sports", icon: Dumbbell },
  { name: "Toys", icon: Baby },
  { name: "Groceries", icon: ShoppingCart },
  { name: "Health", icon: HeartPulse },
];

export const CategorySideBar = () => {
  return (
    <>
      {/* Mobile: horizontal scroll bar */}
      <nav className="flex md:hidden w-full overflow-x-auto gap-3 py-2 px-1 bg-white border-b border-gray-100 scrollbar-hide">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="flex flex-col items-center min-w-[64px] px-2 cursor-pointer rounded transition bg-white hover:bg-gray-100 group"
          >
            {cat.icon && <cat.icon className="w-6 h-6 mb-1 text-gray-700 group-hover:text-black transition" />}
            <span className="text-xs font-medium text-gray-700 group-hover:text-black transition whitespace-nowrap">{cat.name}</span>
          </div>
        ))}
      </nav>
      {/* Desktop: vertical sidebar */}
      <nav className="hidden md:flex w-full py-8 px-6 flex-col gap-2 text-lg font-medium text-black">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="flex items-center justify-between cursor-pointer hover:bg-gray-100 rounded transition px-2 py-2 group"
          >
            <div className="flex items-center gap-2">
              {cat.icon && <cat.icon className="w-5 h-5 text-gray-500 group-hover:text-black transition" />}
              <span className="group-hover:text-black transition">{cat.name}{cat.expandable ? "’s Fashion" : ""}</span>
            </div>
            {cat.expandable && <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-black transition" />}
          </div>
        ))}
      </nav>
    </>
  );
};
