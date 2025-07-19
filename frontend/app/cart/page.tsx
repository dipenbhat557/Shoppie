'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X, ChevronUp, ChevronDown } from 'lucide-react'

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "LCD Monitor",
      price: 650,
      quantity: 1,
      image: "/images/cart/monitor.png"
    },
    {
      id: 2,
      name: "H1 Gamepad",
      price: 550,
      quantity: 2,
      image: "/images/cart/gamepad.png"
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

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 0 // Free shipping
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-gray-800">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-black font-medium">Cart</span>
        </div>

        {/* Product Table */}
        <div className="mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 font-semibold text-black">Product</th>
                  <th className="text-center py-4 font-semibold text-black">Price</th>
                  <th className="text-center py-4 font-semibold text-black">Quantity</th>
                  <th className="text-center py-4 font-semibold text-black">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-xs text-gray-600">{item.name}</span>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="absolute -top-2 -left-2 w-6 h-6 bg-[#E73C17] rounded-full flex items-center justify-center"
                          >
                            <X className="w-3 h-3 text-white" />
                          </button>
                        </div>
                        <span className="font-medium text-black">{item.name}</span>
                      </div>
                    </td>
                    <td className="text-center py-4 text-black">${item.price}</td>
                    <td className="text-center py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <input
                          type="number"
                          value={item.quantity.toString().padStart(2, '0')}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="w-12 text-center border border-gray-300 rounded px-2 py-1"
                          min="1"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="text-center py-4 text-black">${item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-6">
            <Link
              href="/"
              className="px-6 py-2 border border-black text-black hover:bg-black hover:text-white transition-colors rounded"
            >
              Return To Shop
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Coupon Section */}
          <div className="space-y-4">
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 px-4 py-2 border border-black rounded focus:outline-none focus:ring-2 focus:ring-[#E73C17]"
              />
              <button className="px-6 py-2 bg-[#E73C17] text-white hover:bg-[#d63615] transition-colors rounded">
                Apply Coupon
              </button>
            </div>
          </div>

          {/* Cart Total */}
          <div className="border border-black p-6 rounded">
            <h3 className="text-xl font-bold text-black mb-4">Cart Total</h3>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-black">Subtotal:</span>
                <span className="text-black">${subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black">Shipping:</span>
                <span className="text-black">Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span className="text-black">Total:</span>
                <span className="text-black">${total}</span>
              </div>
            </div>
            <Link
              href="/check-out"
              className="w-full block text-center px-6 py-3 bg-[#E73C17] text-white hover:bg-[#d63615] transition-colors rounded font-semibold"
            >
              Proceed to checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}