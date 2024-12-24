"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
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

const CarouselComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === CAROUSEL_IMAGES.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? CAROUSEL_IMAGES.length - 1 : prevIndex - 1
    );
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance > 0) {
      goToNext();
    } else {
      goToPrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    },
    [goToNext, goToPrevious]
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoPlaying) {
      interval = setInterval(goToNext, 5000);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isAutoPlaying, goToNext, handleKeyDown]);

  const currentImage = useMemo(
    () => CAROUSEL_IMAGES[currentIndex],
    [currentIndex]
  );

  return (
    <div
      className="relative w-full max-w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] group bg-gray-100"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Image carousel"
    >
      <Link
        href={currentImage.href}
        className="block w-full h-full"
        aria-label={`View ${currentImage.title}`}
      >
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            priority={currentIndex === 0}
            quality={100}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 80vw, 60vw"
            className={`object-fit transition-opacity duration-500 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoadingComplete={() => setIsLoading(false)}
          />
          <div className="absolute bottom-4 left-4 right-4 bg-black/40 p-3 sm:p-4 rounded-md md:left-8 md:right-auto md:bottom-8 lg:px-6 lg:py-4 backdrop-blur-sm">
            <h2 className="text-white text-base sm:text-lg font-medium md:text-xl lg:text-2xl">
              {currentImage.title}
            </h2>
          </div>
        </div>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();
          goToPrevious();
        }}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1.5 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 md:left-4 lg:p-3 touch:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          goToNext();
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1.5 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 md:right-4 lg:p-3 touch:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
      </button>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 md:gap-2 md:bottom-4">
        {CAROUSEL_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              goToSlide(index);
            }}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 ${
              currentIndex === index
                ? "bg-white w-2.5 sm:w-3 md:w-4"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={currentIndex === index ? "true" : "false"}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselComponent;
