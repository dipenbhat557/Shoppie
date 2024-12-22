"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CAROUSEL_IMAGES = [
  {
    id: 1,
    src: "/images/crousel/c1.png",
    alt: "Carousel image 1",
    href: "/category/featured-1",
    title: "Featured Products",
  },
  {
    id: 2,
    src: "/images/crousel/c2.jpg",
    alt: "Carousel image 2",
    href: "/category/featured-2",
    title: "New Arrivals",
  },
  {
    id: 3,
    src: "/images/crousel/c3.png",
    alt: "Carousel image 3",
    href: "/category/featured-3",
    title: "Special Offers",
  },
  {
    id: 4,
    src: "/images/crousel/c3.png",
    alt: "Carousel image 4",
    href: "/category/featured-4",
    title: "Season Sale",
  },
] as const;

export default function CarouselComponent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === CAROUSEL_IMAGES.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? CAROUSEL_IMAGES.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoPlaying) {
      interval = setInterval(goToNext, 5000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAutoPlaying]);

  return (
    <div
      className="relative w-full h-[500px] group bg-gray-100"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <Link
        href={CAROUSEL_IMAGES[currentIndex].href}
        className="block w-full h-full"
      >
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src={CAROUSEL_IMAGES[currentIndex].src}
            alt={CAROUSEL_IMAGES[currentIndex].alt}
            fill
            priority
            quality={90}
            sizes="100vw"
            className={`object-cover transition-opacity duration-500 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoadingComplete={() => setIsLoading(false)}
          />

          <div className="absolute bottom-16 left-8 bg-black/40 px-6 py-3 rounded-lg">
            <h2 className="text-white text-2xl font-semibold">
              {CAROUSEL_IMAGES[currentIndex].title}
            </h2>
          </div>
        </div>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();
          goToPrevious();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 
                   bg-black/30 hover:bg-black/50 text-white p-2 rounded-full
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300
                   focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          goToNext();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 
                   bg-black/30 hover:bg-black/50 text-white p-2 rounded-full
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300
                   focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {CAROUSEL_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              goToSlide(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 
                       focus:outline-none focus:ring-2 focus:ring-white/50
                       ${
                         currentIndex === index
                           ? "bg-white w-4"
                           : "bg-white/50 hover:bg-white/80"
                       }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
