'use client'

import { useState, useEffect } from 'react'
import { Check } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function CheckOut() {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    companyName: '',
    streetAddress: '',
    apartment: '',
    townCity: '',
    phoneNumber: '',
    emailAddress: '',
    saveInfo: false
  })

  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [couponCode, setCouponCode] = useState('')

  const cartItems = [
    {
      id: 1,
      name: "LCD Monitor",
      price: 650,
      image: "/images/cart/monitor.png"
    },
    {
      id: 2,
      name: "H1 Gamepad",
      price: 1100,
      image: "/images/cart/gamepad.png"
    }
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0)
  const shipping = 0 // Free shipping
  const total = subtotal + shipping

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Order placed:', { formData, paymentMethod, total })
    setShowModal(true)
  }

  const handleContinueShopping = () => {
    router.push('/')
  }

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        router.push('/')
      }, 5000) // 5 seconds

      return () => clearTimeout(timer)
    }
  }, [showModal, router])

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-black mb-8">Billing Details</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Section - Billing Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    placeholder="First Name *"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E73C17] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E73C17] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Street Address *"
                  value={formData.streetAddress}
                  onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E73C17] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Apartment, floor, etc. (optional)"
                  value={formData.apartment}
                  onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E73C17] focus:border-transparent"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Town/City *"
                  value={formData.townCity}
                  onChange={(e) => setFormData({ ...formData, townCity: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E73C17] focus:border-transparent"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E73C17] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email Address *"
                    value={formData.emailAddress}
                    onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E73C17] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, saveInfo: !formData.saveInfo })}
                  className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                    formData.saveInfo 
                      ? 'bg-[#E73C17] border-[#E73C17]' 
                      : 'border-gray-300'
                  }`}
                >
                  {formData.saveInfo && <Check className="w-3 h-3 text-white" />}
                </button>
                <span className="text-black">Save this information for faster check-out next time</span>
              </div>
            </form>
          </div>

          {/* Right Section - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
              {/* Product List */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-600">{item.name}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-black">{item.name}</h4>
                      <p className="text-black">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-black">Subtotal:</span>
                  <span className="text-black">${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black">Shipping:</span>
                  <span className="text-black">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span className="text-black">Total:</span>
                    <span className="text-black">${total}</span>
                  </div>
                </div>
              </div>

              {/* Payment Options */}
              <div className="space-y-4">
                <h3 className="font-semibold text-black">Payment Method</h3>
                
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="bank"
                      checked={paymentMethod === 'bank'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-[#E73C17] focus:ring-[#E73C17]"
                    />
                    <span className="text-black">Bank</span>
                    <div className="flex items-center space-x-2 ml-4">
                      <div className="w-8 h-5 bg-gray-200 rounded text-xs flex items-center justify-center">bKash</div>
                      <div className="w-8 h-5 bg-blue-600 rounded text-xs text-white flex items-center justify-center">VISA</div>
                      <div className="w-8 h-5 bg-red-600 rounded text-xs text-white flex items-center justify-center">MC</div>
                      <div className="w-8 h-5 bg-green-600 rounded text-xs text-white flex items-center justify-center">নগদ</div>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-[#E73C17] focus:ring-[#E73C17]"
                    />
                    <span className="text-black">Cash on delivery</span>
                  </label>
                </div>
              </div>

              {/* Coupon Section */}
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E73C17] focus:border-transparent"
                  />
                  <button className="px-4 py-2 bg-[#E73C17] text-white hover:bg-[#d63615] transition-colors rounded-md text-sm">
                    Apply Coupon
                  </button>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-[#E73C17] hover:bg-[#d63615] text-white py-3 rounded-md font-semibold transition-colors"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-black mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-6">Your order has been placed successfully. We&apos;ll send you a confirmation email shortly.</p>
            <button
              onClick={handleContinueShopping}
              className="w-full bg-[#E73C17] hover:bg-[#d63615] text-white py-3 rounded-md font-semibold transition-colors"
            >
              Continue Shopping
            </button>
            <p className="text-sm text-gray-500 mt-4">You&apos;ll be redirected automatically in 5 seconds...</p>
          </div>
        </div>
      )}
    </div>
  )
}   