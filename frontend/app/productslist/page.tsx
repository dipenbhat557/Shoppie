'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight, Star, Filter } from 'lucide-react'
import { ProductsCards } from './components/ProductsCards'

export default function Products() {
  const [sortBy, setSortBy] = useState('Most Popular')
  const [priceRange, setPriceRange] = useState([50, 200])
  const [selectedColor, setSelectedColor] = useState('blue')
  const [selectedSize, setSelectedSize] = useState('Large')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])

  const colors = [
    { name: 'green', hex: '#22C55E' },
    { name: 'red', hex: '#EF4444' },
    { name: 'yellow', hex: '#EAB308' },
    { name: 'orange', hex: '#F97316' },
    { name: 'blue', hex: '#3B82F6' },
    { name: 'purple', hex: '#A855F7' },
    { name: 'pink', hex: '#EC4899' },
    { name: 'white', hex: '#FFFFFF' },
    { name: 'black', hex: '#000000' }
  ]

  const sizes = ['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large']
  const categories = ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans']
  const dressStyles = ['Casual', 'Formal', 'Party', 'Gym']

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const toggleStyle = (style: string) => {
    setSelectedStyles(prev => 
      prev.includes(style) 
        ? prev.filter(s => s !== style)
        : [...prev, style]
    )
  }

  const products = [
    {
      id: 1,
      name: "Gradient Graphic T-shirt",
      price: 145,
      originalPrice: null,
      discount: null,
      rating: 3.5,
      image: "/newImages/productList/p1.png"
    },
    {
      id: 2,
      name: "Polo with Tipping Details",
      price: 180,
      originalPrice: null,
      discount: null,
      rating: 4.5,
      image: "/newImages/productList/p2.png"
    },
    {
      id: 3,
      name: "Black Striped T-shirt",
      price: 120,
      originalPrice: 150,
      discount: 30,
      rating: 5.0,
      image: "/newImages/productList/p3.png"
    },
    {
      id: 4,
      name: "Skinny Fit Jeans",
      price: 240,
      originalPrice: 260,
      discount: 20,
      rating: 3.5,
      image: "/newImages/productList/p4.png"
    },
    {
      id: 5,
      name: "Checkered Shirt",
      price: 180,
      originalPrice: null,
      discount: null,
      rating: 4.5,
      image: "/newImages/productList/p5.png"
    },
    {
      id: 6,
      name: "Sleeve Striped T-shirt",
      price: 130,
      originalPrice: 160,
      discount: 30,
      rating: 4.5,
      image: "/newImages/productList/p6.png"
    },
    {
      id: 7,
      name: "Vertical Striped Shirt",
      price: 212,
      originalPrice: 232,
      discount: 20,
      rating: 5.0,
      image: "/newImages/productList/p7.png"
    },
    {
      id: 8,
      name: "Courage Graphic T-shirt",
      price: 145,
      originalPrice: null,
      discount: null,
      rating: 4.0,
      image: "/newImages/productList/p8.png"
    },
    {
      id: 9,
      name: "Loose Fit Bermuda Shorts",
      price: 80,
      originalPrice: null,
      discount: null,
      rating: 3.0,
      image: "/newImages/productList/p9.png"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumbs and Sort */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-800">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-black font-medium">Casual</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#E73C17] pr-8"
              >
                <option>Most Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
                <option>Best Rating</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Filter className="w-5 h-5" />
                <h3 className="font-semibold text-lg">Filters</h3>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium text-black mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center justify-between">
                      <button
                        onClick={() => toggleCategory(category)}
                        className={`text-sm hover:text-[#E73C17] transition-colors ${
                          selectedCategories.includes(category) ? 'text-[#E73C17]' : 'text-gray-600'
                        }`}
                      >
                        {category}
                      </button>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-black mb-3">Price</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>

              {/* Colors */}
              <div className="mb-6">
                <h4 className="font-medium text-black mb-3">Colors</h4>
                <div className="grid grid-cols-3 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === color.name ? 'border-black scale-110' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColor === color.name && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="mb-6">
                <h4 className="font-medium text-black mb-3">Size</h4>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-2 py-1 text-xs border rounded transition-colors ${
                        selectedSize === size
                          ? 'bg-black text-white border-black'
                          : 'border-gray-300 text-gray-700 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dress Style */}
              <div className="mb-6">
                <h4 className="font-medium text-black mb-3">Dress Style</h4>
                <div className="space-y-2">
                  {dressStyles.map((style) => (
                    <div key={style} className="flex items-center justify-between">
                      <button
                        onClick={() => toggleStyle(style)}
                        className={`text-sm hover:text-[#E73C17] transition-colors ${
                          selectedStyles.includes(style) ? 'text-[#E73C17]' : 'text-gray-600'
                        }`}
                      >
                        {style}
                      </button>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Apply Filter Button */}
              <button className="w-full bg-black text-white py-3 rounded font-medium hover:bg-gray-800 transition-colors">
                Apply Filter
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-black mb-6">Casual</h2>
            
            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {products.map((product) => (
                <ProductsCards key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-2">
              <button className="px-4 py-2 text-gray-600 hover:text-black transition-colors">
                ← Previous
              </button>
              <div className="flex space-x-1">
                <button className="px-3 py-2 bg-gray-200 text-black rounded">1</button>
                <button className="px-3 py-2 text-gray-600 hover:text-black transition-colors">2</button>
                <button className="px-3 py-2 text-gray-600 hover:text-black transition-colors">3</button>
                <span className="px-3 py-2 text-gray-600">...</span>
                <button className="px-3 py-2 text-gray-600 hover:text-black transition-colors">8</button>
                <button className="px-3 py-2 text-gray-600 hover:text-black transition-colors">9</button>
                <button className="px-3 py-2 text-gray-600 hover:text-black transition-colors">10</button>
              </div>
              <button className="px-4 py-2 text-gray-600 hover:text-black transition-colors">
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}   