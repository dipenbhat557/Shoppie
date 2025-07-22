'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Building2, DollarSign, Gift, Wallet, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function AboutUs() {
  const [currentTeamIndex, setCurrentTeamIndex] = useState(1)

  const stats = [
    {
      icon: Building2,
      number: "10.5k",
      label: "Sallers active our site",
      highlighted: false
    },
    {
      icon: DollarSign,
      number: "33k",
      label: "Mopnthly Produduct Sale",
      highlighted: true
    },
    {
      icon: Gift,
      number: "45.5k",
      label: "Customer active in our site",
      highlighted: false
    },
    {
      icon: Wallet,
      number: "25k",
      label: "Anual gross sale in our site",
      highlighted: false
    }
  ]

  const teamMembers = [
    {
      name: "Tom Cruise",
      title: "Founder & Chairman",
      image: "/images/team/tom-cruise.jpg"
    },
    {
      name: "Emma Watson",
      title: "Managing Director",
      image: "/images/team/emma-watson.jpg"
    },
    {
      name: "Will Smith",
      title: "Product Designer",
      image: "/images/team/will-smith.jpg"
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-gray-800">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-black font-medium">About</span>
        </div>

        {/* Our Story Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Text */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-black">Our Story</h1>
            <div className="space-y-4 text-black">
              <p>
                Launced in 2015, Exclusive is South Asia&apos;s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region.
              </p>
              <p>
                Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging from consumer.
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="w-full h-96 bg-pink-200 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-600">
                <p className="text-lg font-medium">Team Image Placeholder</p>
                <p className="text-sm">Two women with shopping bags</p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`p-6 rounded-lg text-center ${
                stat.highlighted 
                  ? 'bg-[#E73C17] text-white' 
                  : 'bg-white border border-gray-200 text-black'
              }`}
            >
              <div className={`mx-auto mb-4 ${
                stat.highlighted ? 'text-white' : 'text-black'
              }`}>
                <stat.icon className="w-8 h-8 mx-auto" />
              </div>
              <div className={`text-2xl font-bold mb-2 ${
                stat.highlighted ? 'text-white' : 'text-black'
              }`}>
                {stat.number}
              </div>
              <div className={`text-sm ${
                stat.highlighted ? 'text-white' : 'text-gray-600'
              }`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-black text-center mb-12">Our Team</h2>
          
          {/* Team Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-48 h-48 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs">Profile Image</p>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">{member.name}</h3>
                <p className="text-gray-600 mb-4">{member.title}</p>
                
                {/* Social Icons */}
                <div className="flex justify-center space-x-4">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition">
                    <Twitter className="w-5 h-5 text-black" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition">
                    <Instagram className="w-5 h-5 text-black" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition">
                    <Linkedin className="w-5 h-5 text-black" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center space-x-2">
            {[0, 1, 2, 3, 4].map((index) => (
              <button
                key={index}
                onClick={() => setCurrentTeamIndex(index)}
                className={`w-3 h-3 rounded-full transition ${
                  index === currentTeamIndex 
                    ? 'bg-[#E73C17]' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}