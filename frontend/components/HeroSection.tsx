"use client"

import { useState, useEffect } from 'react'

//Dipen prefered hero section 

export const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    
    const images = [
        "/newImages/hero.png",
        // "/newImages/hero2.png", 
        "/newImages/hero3.png"
    ]

    // Auto-slide every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length)
        }, 5000)

        return () => clearInterval(timer)
    }, [images.length])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % images.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
    }

    return (
        <div className="w-full relative">
            {/* Images with same CSS as before */}
            {images.map((image, index) => (
                <img 
                    key={index}
                    src={image} 
                    alt={`Hero banner ${index + 1}`} 
                    className={`w-full h-auto object-cover transition-opacity duration-700 ease-in-out ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                    } ${index === currentSlide ? 'relative' : 'absolute top-0 left-0'}`}
                />
            ))}

            {/* Navigation Arrows */}
            <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-10"
            >
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-10"
            >
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentSlide 
                                ? 'bg-white scale-110' 
                                : 'bg-white/50 hover:bg-white/75'
                        }`}
                    />
                ))}
            </div>
        </div>
    )
}