'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Package, Truck, CheckCircle, Clock, Star } from 'lucide-react'
import StatusDropdown from '@/components/ui/StatusDropdown';

export default function Orders({ params }: { params: { userId: string } }) {
  const [selectedStatus, setSelectedStatus] = useState('all')

  const orders = [
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "delivered",
      total: 245.00,
      items: [
        {
          id: 1,
          name: "Gradient Graphic T-shirt",
          price: 145.00,
          quantity: 1,
          image: "/newImages/products/p1.png"
        },
        {
          id: 2,
          name: "H1 Gamepad",
          price: 100.00,
          quantity: 1,
          image: "/newImages/products/p2.png"
        }
      ],
      tracking: "TRK123456789",
      estimatedDelivery: "2024-01-20"
    },
    {
      id: "ORD-002",
      date: "2024-01-10",
      status: "shipped",
      total: 180.00,
      items: [
        {
          id: 3,
          name: "Polo with Tipping Details",
          price: 180.00,
          quantity: 1,
          image: "/newImages/products/p3.png"
        }
      ],
      tracking: "TRK987654321",
      estimatedDelivery: "2024-01-18"
    },
    {
      id: "ORD-003",
      date: "2024-01-05",
      status: "processing",
      total: 360.00,
      items: [
        {
          id: 4,
          name: "Skinny Fit Jeans",
          price: 240.00,
          quantity: 1,
          image: "/newImages/products/p4.png"
        },
        {
          id: 5,
          name: "Checkered Shirt",
          price: 120.00,
          quantity: 1,
          image: "/newImages/products/p5.png"
        }
      ],
      tracking: null,
      estimatedDelivery: "2024-01-25"
    },
    {
      id: "ORD-004",
      date: "2023-12-28",
      status: "delivered",
      total: 130.00,
      items: [
        {
          id: 6,
          name: "Sleeve Striped T-shirt",
          price: 130.00,
          quantity: 1,
          image: "/newImages/products/p6.png"
        }
      ],
      tracking: "TRK456789123",
      estimatedDelivery: "2024-01-03"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />
      case 'shipped':
        return <Truck className="w-4 h-4" />
      case 'processing':
        return <Package className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
  ]

  const filteredOrders = selectedStatus === 'all'
    ? orders
    : orders.filter(order => order.status === selectedStatus)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-gray-800">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-black font-medium">My Orders</span>
        </div>

        {/* Header with Filter */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-black mb-2 md:mb-0">My Orders</h1>
              <p className="text-gray-600 text-sm md:text-base">Track your orders and view order history</p>
            </div>
            <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
              <label htmlFor="order-status" className="text-sm font-medium text-gray-700 whitespace-nowrap">Filter by status:</label>
              <StatusDropdown
                options={statusOptions}
                value={selectedStatus}
                onChange={setSelectedStatus}
              />
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Order Header */}
              <div className="p-4 md:p-6 border-b border-gray-100">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start space-y-4 md:space-y-0 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-black">Order #{order.id}</h3>
                    <p className="text-sm text-gray-600">Placed on {new Date(order.date).toLocaleDateString('en-US')}</p>
                  </div>
                  <div className="text-left md:text-right">
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="text-sm font-medium capitalize">{order.status}</span>
                    </div>
                    <p className="text-lg font-bold text-black mt-2">${order.total.toFixed(2)}</p>
                  </div>
                </div>

                                {/* Tracking Info */}
                {order.tracking && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
                      <div>
                        <p className="text-sm font-medium text-black">Tracking Number</p>
                        <p className="text-sm text-gray-600 break-all">{order.tracking}</p>
                      </div>
                      <div className="text-left md:text-right">
                        <p className="text-sm font-medium text-black">Estimated Delivery</p>
                        <p className="text-sm text-gray-600">{new Date(order.estimatedDelivery).toLocaleDateString('en-US')}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Items */}
              <div className="p-4 md:p-6">
                <h4 className="font-medium text-black mb-4">Order Items</h4>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 md:space-x-4">
                      <div className="relative w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-black text-sm md:text-base truncate">{item.name}</h5>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-medium text-black text-sm md:text-base">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 mt-6 pt-6 border-t border-gray-100">
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <button className="px-4 py-2 border border-[#E73C17] text-[#E73C17] rounded-lg hover:bg-[#E73C17] hover:text-white transition-colors font-medium text-sm md:text-base">
                      Track Order
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm md:text-base">
                      Download Invoice
                    </button>
                  </div>
                  
                  {order.status === 'delivered' && (
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                      <span className="text-sm text-gray-600">Rate your order:</span>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button key={star} className="text-gray-300 hover:text-yellow-400 transition-colors">
                            <Star className="w-4 h-4 md:w-5 md:h-5" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-12 text-center">
            <Package className="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg md:text-xl font-semibold text-black mb-2">No orders found</h3>
            <p className="text-gray-600 mb-6 text-sm md:text-base">You haven&apos;t placed any orders yet.</p>
            <Link
              href="/productslist"
              className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-[#E73C17] text-white rounded-lg hover:bg-[#d63615] transition-colors font-medium text-sm md:text-base"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}