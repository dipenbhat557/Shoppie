'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Phone, Mail } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <div className="min-h-screen bg-white ">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-6 ">
        <div className="flex items-center text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-gray-800">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-black font-medium">Contact</span>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
          {/* Left Section - Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="space-y-8">
              {/* Call To Us */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#E73C17] rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-black">Call To Us</h3>
                </div>
                <div className="ml-16 space-y-2">
                  <p className="text-black">We are available 24/7, 7 days a week.</p>
                  <p className="text-black">Phone: +8801611112222</p>
                </div>
                <div className="ml-16 border-t border-gray-200 pt-4"></div>
              </div>

              {/* Write To US */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[#E73C17] rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-black">Write To US</h3>
                </div>
                <div className="ml-16 space-y-2">
                  <p className="text-black">Fill out our form and we will contact you within 24 hours.</p>
                  <p className="text-black">Emails: customer@exclusive.com</p>
                  <p className="text-black">Emails: support@exclusive.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="md:col-span-2 bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name, Email, Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#E73C17] focus:border-transparent"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email *"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#E73C17] focus:border-transparent"
                  required
                />
                <input
                  type="tel"
                  placeholder="Your Phone *"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#E73C17] focus:border-transparent"
                  required
                />
              </div>

              {/* Message */}
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#E73C17] focus:border-transparent resize-none"
              />

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#E73C17] hover:bg-[#d63615] text-white px-8 py-3 rounded-md font-semibold transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}