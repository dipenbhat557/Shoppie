import React from "react";
import Image from "next/image";

const CATEGORIES = [
  {
    id: "fashion",
    name: "Fashion",
    image: "/images/catagoryNav/fashion.png",
  },
  {
    id: "electronics",
    name: "Electronics",
    image: "/images/catagoryNav/electonics.png",
  },
  {
    id: "home",
    name: "Home & Living",
    image: "/images/catagoryNav/home.png",
  },
  {
    id: "phone",
    name: "Phone",
    image: "/images/catagoryNav/phone.png",
  },
  {
    id: "sports",
    name: "Sports",
    image: "/images/catagoryNav/home.png",
  },
  {
    id: "books",
    name: "Books",
    image: "/images/catagoryNav/electonics.png",
  },
  {
    id: "toys",
    name: "Toys & Games",
    image: "/images/catagoryNav/fashion.png",
  },
  {
    id: "grocery",
    name: "Grocery",
    image: "/images/catagoryNav/phone.png",
  },
] as const;

interface CategoryItemProps {
  name: string;
  image: string;
}

const CategoryItem = ({ name, image }: CategoryItemProps) => (
  <button
    className="flex flex-col items-center p-2 rounded-lg transition-all duration-200
               hover:bg-gray-50 hover:scale-105 focus:outline-none focus:ring-2 
               focus:ring-gray-200 group"
  >
    <div className="relative w-10 h-12 mb-1">
      <Image
        src={image}
        alt={`${name} category`}
        fill
        className="object-contain"
        sizes="40px"
      />
    </div>
    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
      {name}
    </span>
  </button>
);

export default function CategoryNav() {
  return (
    <div className="w-[98%] mx-auto  ">
      <nav className="bg-white shadow-lg rounded-xl relative top-1 border border-gray-100">
        <div className="flex items-center justify-between px-6 py-2">
          {CATEGORIES.map(({ id, name, image }) => (
            <CategoryItem key={id} name={name} image={image} />
          ))}
        </div>
      </nav>
    </div>
  );
}
