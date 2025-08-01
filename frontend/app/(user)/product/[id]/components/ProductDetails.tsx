'use client'

import React, { useState } from 'react'
import { Heart, Truck, RotateCcw } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export const ProductDetails = () => {
  const router = useRouter()
  const [selectedColor, setSelectedColor] = useState('blue')
  const [selectedSize, setSelectedSize] = useState('M')
  const [quantity, setQuantity] = useState(2)
  const [wishlisted, setWishlisted] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  const productImages = [
    '/newImages/productDetails/main.png',
    '/newImages/productDetails/side1.png',
    '/newImages/productDetails/side2.png',
    '/newImages/productDetails/side3.png'
  ]

  const colors = [
    { name: 'blue', value: 'blue', selected: selectedColor === 'blue' },
    { name: 'red', value: 'red', selected: selectedColor === 'red' }
  ]

  const sizes = ['XS', 'S', 'M', 'L', 'XL']

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const handleBuyNow = () => {
    // You can add logic here to add the product to cart or store the selection
    console.log('Buy Now clicked:', {
      product: 'Havic HV G-92 Gamepad',
      color: selectedColor,
      size: selectedSize,
      quantity: quantity
    })
    router.push('/check-out')
  }

  return (
    <div className="grid lg:grid-cols-5 gap-8">
      {/* Left Section - Product Images */}
      <div className="lg:col-span-2">
        <div className="flex gap-4">
          {/* Thumbnail Images */}
          <div className="flex flex-col gap-4">
            {productImages.map((image, index) => (
              <div 
                key={index} 
                className={`w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:border-2 hover:border-[#E73C17] ${
                  selectedImage === index ? 'border-2 border-[#E73C17]' : ''
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image 
                  src={image} 
                  alt={`Product image ${index + 1}`}
                  width={64}
                  height={64}
                  className="object-contain w-full h-full rounded"
                  unoptimized
                />
              </div>
            ))}
          </div>
          
          {/* Main Image */}
          <div className="flex-1">
            <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
              <Image 
                src={productImages[selectedImage]} 
                alt="Main product image"
                width={400}
                height={400}
                className="object-contain w-full h-full"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Product Details */}
      <div className="lg:col-span-3">
        <div className="space-y-6">
          {/* Product Title */}
          <h1 className="text-3xl font-bold text-black">Havic HV G-92 Gamepad</h1>

          {/* Reviews and Stock */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <span className="text-gray-600">(150 Reviews)</span>
            </div>
            <span className="text-green-600 font-medium">In Stock</span>
          </div>

          {/* Price */}
          <div className="text-3xl font-bold text-black">$192.00</div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.
          </p>

          {/* Colors */}
          <div className="space-y-3">
            <h3 className="font-semibold text-black">Colours:</h3>
            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    color.selected ? 'border-black' : 'border-gray-300'
                  } ${
                    color.value === 'blue' ? 'bg-blue-500' : 'bg-red-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="space-y-3">
            <h3 className="font-semibold text-black">Size:</h3>
            <div className="flex gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md transition-colors ${
                    selectedSize === size
                      ? 'bg-[#E73C17] text-white border-[#E73C17]'
                      : 'bg-white text-black border-gray-300 hover:border-[#E73C17]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-3">
            <h3 className="font-semibold text-black">Quantity:</h3>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(quantity - 1)}
                className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => updateQuantity(parseInt(e.target.value) || 1)}
                className="w-16 h-10 border border-gray-300 rounded-md text-center"
                min="1"
              />
              <button
                onClick={() => updateQuantity(quantity + 1)}
                className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button 
              onClick={handleBuyNow}
              className="flex-1 bg-[#E73C17] hover:bg-[#d63615] text-white py-3 rounded-md font-semibold transition-colors"
            >
              Buy Now
            </button>
            <button
              onClick={() => setWishlisted(!wishlisted)}
              className={`w-12 h-12 border-2 rounded-md flex items-center justify-center transition-colors ${
                wishlisted
                  ? 'border-[#E73C17] bg-[#E73C17]'
                  : 'border-gray-300 hover:border-[#E73C17]'
              }`}
            >
              <Heart
                className={`w-6 h-6 ${
                  wishlisted ? 'text-white fill-white' : 'text-gray-500'
                }`}
              />
            </button>
          </div>

          {/* Delivery & Return Info */}
          <div className="space-y-4 pt-6 border-t border-gray-200">
            <div className="flex items-start gap-3">
              <Truck className="w-6 h-6 text-gray-600 mt-1" />
              <div>
                <h4 className="font-semibold text-black">Free Delivery</h4>
                <a href="#" className="text-[#E73C17] hover:underline text-sm">
                  Enter your postal code for Delivery Availability
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <RotateCcw className="w-6 h-6 text-gray-600 mt-1" />
              <div>
                <h4 className="font-semibold text-black">Return Delivery</h4>
                <p className="text-gray-600 text-sm">
                  Free 30 Days Delivery Returns. Details
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
