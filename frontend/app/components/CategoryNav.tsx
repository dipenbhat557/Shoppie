"use client";
import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    className="flex flex-col items-center p-3 rounded-lg transition-all duration-200
               hover:bg-gray-50 hover:scale-105 focus:outline-none focus:ring-2 
               focus:ring-gray-200 group min-w-[100px] mx-8"
  >
    <div className="w-14 h-14 mb-2 relative">
      <img
        src={image}
        alt={`${name} category`}
        className="object-contain w-full h-full"
      />
    </div>
    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 whitespace-nowrap">
      {name}
    </span>
  </button>
);

const ScrollButton = ({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`absolute top-1/2 -translate-y-1/2 z-10 
                ${direction === "left" ? "left-2" : "right-2"}
                p-2 bg-white shadow-lg rounded-full
                hover:bg-gray-50 disabled:opacity-0
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-gray-200`}
  >
    {direction === "left" ? (
      <ChevronLeft className="w-5 h-5" />
    ) : (
      <ChevronRight className="w-5 h-5" />
    )}
  </button>
);

export function CategoryNav() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScroll, 300);
    }
  };
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="w-[98%] mx-auto">
      <nav className="bg-white shadow-lg rounded-xl relative top-1 border border-gray-100">
        <div className="relative px-8">
          <ScrollButton
            direction="left"
            onClick={() => scroll("left")}
            disabled={!showLeftScroll}
          />
          <ScrollButton
            direction="right"
            onClick={() => scroll("right")}
            disabled={!showRightScroll}
          />

          <div
            ref={scrollRef}
            className="flex items-center overflow-x-auto py-4 scrollbar-hide"
            onScroll={checkScroll}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {CATEGORIES.map(({ id, name, image }) => (
              <CategoryItem key={id} name={name} image={image} />
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
