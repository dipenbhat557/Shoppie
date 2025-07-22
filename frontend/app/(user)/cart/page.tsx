'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import Image from 'next/image'

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "LCD Monitor",
      price: 650,
      quantity: 1,
      image: "/newImages/products/p1.png",
      selected: true
    },
    {
      id: 2,
      name: "H1 Gamepad",
      price: 550,
      quantity: 2,
      image: "/newImages/products/p2.png",
      selected: true
    }
  ])

  const [couponCode, setCouponCode] = useState('')

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const toggleSelection = (id: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    )
  }

  const selectedItems = cartItems.filter(item => item.selected)
  const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 0 // Free shipping
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-white py-8 px-2 md:px-0">
      {/* Breadcrumbs */}
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-gray-800">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-black font-medium">Cart</span>
        </div>

        {/* Product Table */}
        <div className="mb-10">
          <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-4 px-4 font-bold text-black text-base">Product</th>
                  <th className="text-center py-4 px-2 font-bold text-black text-base">Price</th>
                  <th className="text-center py-4 px-2 font-bold text-black text-base">Quantity</th>
                  <th className="text-center py-4 px-2 font-bold text-black text-base">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, idx) => (
                  <tr key={item.id} className={`border-b border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}> 
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden shadow-sm">
                            <Image 
                              src={item.image} 
                              alt={item.name}
                              width={64}
                              height={64}
                              className="object-contain w-full h-full"
                            />
                          </div>
                          <button
                            onClick={() => toggleSelection(item.id)}
                            className={`absolute -top-2 -left-2 w-7 h-7 rounded-full flex items-center justify-center border-2 transition-colors shadow-md ${
                              item.selected 
                                ? 'bg-[#E73C17] border-[#E73C17]' 
                                : 'bg-white border-gray-300 hover:border-[#E73C17]'
                            }`}
                          >
                            {item.selected && <Check className="w-4 h-4 text-white" />}
                          </button>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-black text-base">{item.name}</span>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-xs text-red-500 hover:text-red-700 mt-1 w-fit font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-4 px-2 text-black font-medium">${item.price}</td>
                    <td className="text-center py-4 px-2">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-gray-100 rounded-full border border-gray-200 text-lg font-bold w-8 h-8 flex items-center justify-center"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity.toString().padStart(2, '0')}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="w-14 text-center border border-gray-300 rounded-full px-2 py-1 font-semibold text-base focus:ring-2 focus:ring-[#E73C17]"
                          min="1"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-gray-100 rounded-full border border-gray-200 text-lg font-bold w-8 h-8 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="text-center py-4 px-2 text-black font-bold">${item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Inline Minimal Coupon Section + Cart Total Side by Side */}
          <div className="flex flex-col md:flex-row gap-6 mt-6 mb-10 w-full">
            <div className="flex-1 flex items-center gap-2">
              {/* Optional: Coupon icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#E73C17]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6M9 11h6m-7 4h8m-9 4h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <input
                type="text"
                placeholder="Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-[#E73C17] text-base bg-white"
              />
              <span className="w-px h-8 bg-gray-200" />
              <button className="px-5 py-2 bg-[#E73C17] text-white rounded-r-full font-semibold hover:bg-[#d63615] transition text-sm">
                Apply
              </button>
            </div>
            <div className="w-full md:w-[350px]">
              <div className="border border-black p-8 rounded-2xl shadow bg-white">
                <h3 className="text-2xl font-bold text-black mb-6">Cart Total</h3>
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between">
                    <span className="text-black font-medium">Subtotal:</span>
                    <span className="text-black font-medium">${subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black font-medium">Shipping:</span>
                    <span className="text-black font-medium">Free</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span className="text-black">Total:</span>
                    <span className="text-black">${total}</span>
                  </div>
                </div>
                <Link
                  href="/check-out"
                  className="w-full block text-center px-8 py-3 bg-[#E73C17] text-white hover:bg-[#d63615] transition-colors rounded-full font-bold text-lg shadow"
                >
                  Proceed to checkout
                </Link>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-8">
            <Link
              href="/"
              className="px-8 py-2 border border-black text-black hover:bg-black hover:text-white transition-colors rounded-full font-semibold shadow-sm"
            >
              Return To Shop
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}