"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export const HeroBanner = () => {
  // Array of hero banner images - easily add more banners here
  const heroBanners = [
    {
      src: "/newImages/Banners/HeroBanner4.jpg",
      alt: "Hero Banner 1"
    },
    {
      src: "/newImages/Banners/HeroBanner5.avif", 
      alt: "Hero Banner 2"
    }
    // Add more hero banners here as needed
    // {
    //   src: "/newImages/HeroBanner3.png",
    //   alt: "Hero Banner 3"
    // }
  ];

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Auto-rotate banners every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => 
        (prevIndex + 1) % heroBanners.length
      );
    }, 5000); // Change banner every 5 seconds

    return () => clearInterval(interval);
  }, [heroBanners.length]);

  // Manual navigation function

  const goToSlide = (index: number) => {
    setCurrentBannerIndex(index);
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-0 sm:p-2 md:p-4">
      <div className="relative w-full">
        {/* Hero Banner Image */}
        <div className="relative overflow-hidden rounded-xl">
          <Image
            src={heroBanners[currentBannerIndex].src}
            alt={heroBanners[currentBannerIndex].alt}
            width={900}
            height={400}
            className="object-contain w-full max-h-[300px] sm:max-h-[400px] md:max-h-[500px] rounded-xl shadow transition-opacity duration-500"
            priority
          />
        </div>



        {/* Dots Indicator (only show if more than 1 banner) */}
        {heroBanners.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {heroBanners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentBannerIndex
                    ? 'bg-white'
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
                aria-label={`Go to hero banner ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};