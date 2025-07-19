"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export const AdBanner = () => {
  // Array of banner images - easily add more banners here
  const banners = [
    {
      src: "/newImages/Banners/adBanner.png",
      alt: "Advertisement Banner 1"
    },
  
    // Add more banners here as needed
    // {
    //   src: "/newImages/banner3.png",
    //   alt: "Banner 3"
    // }
  ];

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  // Auto-rotate banners every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => 
        (prevIndex + 1) % banners.length
      );
    }, 5000); // Change banner every 2 seconds

    return () => clearInterval(interval);
  }, [banners.length]);

  // Manual navigation functions
  const goToPrevious = () => {
    setCurrentBannerIndex((prevIndex) => 
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentBannerIndex((prevIndex) => 
      (prevIndex + 1) % banners.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentBannerIndex(index);
  };

  return (
    <div className="w-full flex items-center justify-center my-8">
      <div className="flex justify-center items-center p-2 sm:p-6 md:p-10 w-full">
        <div className="w-full max-w-4xl md:max-w-5xl h-[220px] sm:h-[300px] md:h-[360px] lg:h-[400px] relative">
          {/* Banner Image */}
          <div className="relative overflow-hidden rounded-lg w-full h-full">
            <Image
              src={banners[currentBannerIndex].src}
              fill
              alt={banners[currentBannerIndex].alt}
              className="w-full h-full object-cover transition-opacity duration-500"
            />
          </div>

          {/* Navigation Arrows (only show if more than 1 banner) */}
          {banners.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200"
                aria-label="Previous banner"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200"
                aria-label="Next banner"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Dots Indicator (only show if more than 1 banner) */}
          {banners.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentBannerIndex
                      ? 'bg-white'
                      : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                  }`}
                  aria-label={`Go to banner ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};