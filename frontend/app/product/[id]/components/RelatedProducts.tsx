import React from 'react'
import { ProductCard } from '@/components/ProductCard'

export const RelatedProducts = () => {
  const relatedProducts = [
    {
      id: 1,
      name: "HAVIT HV-G92 Gamepad",
      currentPrice: 120,
      originalPrice: 160,
      discount: 40,
      rating: 5,
      reviews: 88
    },
    {
      id: 2,
      name: "AK-900 Wired Keyboard",
      currentPrice: 960,
      originalPrice: 1160,
      discount: 35,
      rating: 4.5,
      reviews: 75
    },
    {
      id: 3,
      name: "IPS LCD Gaming Monitor",
      currentPrice: 370,
      originalPrice: 400,
      discount: 30,
      rating: 5,
      reviews: 99
    },
    {
      id: 4,
      name: "RGB liquid CPU Cooler",
      currentPrice: 160,
      originalPrice: 170,
      discount: 10,
      rating: 4.5,
      reviews: 65
    }
  ]

  return (
    <div className="mt-16">
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-8 bg-[#E73C17] rounded"></div>
        <h2 className="text-2xl font-bold text-black">Related Item</h2>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <div key={product.id} className=" p-4 rounded-lg">
            <ProductCard />
          </div>
        ))}
      </div>
    </div>
  )
}
