'use client'

import React from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'

interface Product {
  id: number
  name: string
  price: number
  originalPrice: number | null
  discount: number | null
  rating: number
  image: string
}

interface ProductsCardsProps {
  product: Product
}

export const ProductsCards: React.FC<ProductsCardsProps> = ({ product }) => {
  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" />)
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />)
    }

    return stars
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="font-medium text-black text-sm mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex">
            {renderStars(product.rating)}
          </div>
          <span className="text-xs text-gray-600">
            {product.rating}/5
          </span>
        </div>

        {/* Price */}
        <div className="mb-3">
          {product.originalPrice && product.discount ? (
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-black">
                ${product.price}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
              <span className="text-sm text-red-500 font-medium">
                -{product.discount}%
              </span>
            </div>
          ) : (
            <span className="text-lg font-semibold text-black">
              ${product.price}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button className="w-full bg-[#E73C17] text-white py-2 px-4 rounded font-medium hover:bg-[#d63615] transition-colors">
          Add to cart
        </button>
      </div>
    </div>
  )
}
