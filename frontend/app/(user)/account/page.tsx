'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { User, Settings, Package, Heart, MapPin, CreditCard, LogOut, Edit, Camera } from 'lucide-react'

export default function Account() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: '/newImages/dashboard/profile.png',
    joinDate: 'January 2024',
    totalOrders: 12,
    totalSpent: 2450.00
  }

  const recentOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 245.00,
      items: 2
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'shipped',
      total: 180.00,
      items: 1
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'processing',
      total: 360.00,
      items: 2
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const tabs = [
    { key: 'profile', label: 'Profile', icon: User },
    { key: 'orders', label: 'Orders', icon: Package },
    { key: 'wishlist', label: 'Wishlist', icon: Heart },
    { key: 'addresses', label: 'Addresses', icon: MapPin },
    { key: 'payment', label: 'Payment', icon: CreditCard },
    { key: 'settings', label: 'Settings', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-gray-800">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-black font-medium">My Account</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {/* User Info */}
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <button className="absolute bottom-0 right-0 w-6 h-6 bg-[#E73C17] rounded-full flex items-center justify-center">
                    <Camera className="w-3 h-3 text-white" />
                  </button>
                </div>
                <h3 className="font-semibold text-black">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-xs text-gray-500 mt-1">Member since {user.joinDate}</p>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.key
                          ? 'bg-[#E73C17] text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  )
                })}
              </nav>

              {/* Logout Button */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-black">Profile Information</h2>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center space-x-2 px-4 py-2 border border-[#E73C17] text-[#E73C17] rounded-lg hover:bg-[#E73C17] hover:text-white transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      <span>{isEditing ? 'Save' : 'Edit'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        defaultValue={user.name}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E73C17] disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E73C17] disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        defaultValue={user.phone}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E73C17] disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                      <input
                        type="date"
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E73C17] disabled:bg-gray-50"
                      />
                    </div>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Package className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-2">{user.totalOrders}</h3>
                    <p className="text-gray-600">Total Orders</p>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-2">8</h3>
                    <p className="text-gray-600">Wishlist Items</p>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CreditCard className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-2">${user.totalSpent.toFixed(0)}</h3>
                    <p className="text-gray-600">Total Spent</p>
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-black">Order History</h2>
                  <Link
                    href="/orders/123"
                    className="px-4 py-2 bg-[#E73C17] text-white rounded-lg hover:bg-[#d63615] transition-colors"
                  >
                    View All Orders
                  </Link>
                </div>

                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Package className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-black">{order.id}</h4>
                          <p className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString('en-US')}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                        <p className="text-lg font-bold text-black mt-1">${order.total.toFixed(2)}</p>
                        <p className="text-sm text-gray-600">{order.items} items</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-black">My Wishlist</h2>
                  <Link
                    href="/wishlist"
                    className="px-4 py-2 bg-[#E73C17] text-white rounded-lg hover:bg-[#d63615] transition-colors"
                  >
                    View All Items
                  </Link>
                </div>
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-black mb-2">Your wishlist is empty</h3>
                  <p className="text-gray-600 mb-6">Start adding items to your wishlist to save them for later.</p>
                  <Link
                    href="/productslist"
                    className="inline-flex items-center px-6 py-3 bg-[#E73C17] text-white rounded-lg hover:bg-[#d63615] transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-black">My Addresses</h2>
                  <button className="px-4 py-2 bg-[#E73C17] text-white rounded-lg hover:bg-[#d63615] transition-colors">
                    Add New Address
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-black">Home Address</h4>
                      <button className="text-[#E73C17] hover:text-[#d63615]">Edit</button>
                    </div>
                    <p className="text-gray-600 text-sm">
                      123 Main Street<br />
                      Apartment 4B<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-black">Work Address</h4>
                      <button className="text-[#E73C17] hover:text-[#d63615]">Edit</button>
                    </div>
                    <p className="text-gray-600 text-sm">
                      456 Business Ave<br />
                      Suite 200<br />
                      New York, NY 10002<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Tab */}
            {activeTab === 'payment' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-black">Payment Methods</h2>
                  <button className="px-4 py-2 bg-[#E73C17] text-white rounded-lg hover:bg-[#d63615] transition-colors">
                    Add New Card
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-black">Visa ending in 4242</h4>
                          <p className="text-sm text-gray-600">Expires 12/25</p>
                        </div>
                      </div>
                      <button className="text-red-600 hover:text-red-700">Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-black mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-4">Notifications</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#E73C17] focus:ring-[#E73C17]" />
                        <span className="ml-3 text-gray-700">Email notifications</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#E73C17] focus:ring-[#E73C17]" />
                        <span className="ml-3 text-gray-700">SMS notifications</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-[#E73C17] focus:ring-[#E73C17]" />
                        <span className="ml-3 text-gray-700">Marketing emails</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-4">Privacy</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-[#E73C17] focus:ring-[#E73C17]" />
                        <span className="ml-3 text-gray-700">Profile visibility</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-[#E73C17] focus:ring-[#E73C17]" />
                        <span className="ml-3 text-gray-700">Order history visibility</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}   