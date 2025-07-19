// frontend/app/(admin)/dispatch/components/DispatchList.tsx
"use client";

import { useState, useMemo } from "react";
import {
  Search,
  MapPin,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  PhoneCall,
} from "lucide-react";
import { format } from "date-fns";

interface DeliveryAddress {
  houseNo: string;
  street: string;
  city: string;
  district: string;
  state: string;
  pinCode: string;
  landmark?: string;
}

interface Dispatch {
  id: number;
  orderId: number;
  status: "ACCEPTED" | "SHIPPED" | "DELIVERING" | "DELIVERED";
  estimatedDelivery: Date;
  actualDelivery?: Date;
  address: DeliveryAddress;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  items: {
    name: string;
    quantity: number;
  }[];
  deliveryNotes?: string;
  trackingNumber: string;
  deliveryPartner: string;
}

const mockDispatches: Dispatch[] = [
  {
    id: 1,
    orderId: 123,
    status: "DELIVERING",
    estimatedDelivery: new Date("2024-03-15"),
    address: {
      houseNo: "42",
      street: "Main Street",
      city: "New York",
      district: "Manhattan",
      state: "NY",
      pinCode: "10001",
      landmark: "Near Central Park",
    },
    customer: {
      name: "John Doe",
      phone: "+1234567890",
      email: "john@example.com",
    },
    items: [{ name: "Nike Air Max 270", quantity: 2 }],
    trackingNumber: "SHIP123456",
    deliveryPartner: "FedEx",
    deliveryNotes: "Please call before delivery",
  },
  // Add more mock data...
];

const statusColors = {
  ACCEPTED: { bg: "bg-blue-100", text: "text-blue-700", icon: Package },
  SHIPPED: { bg: "bg-purple-100", text: "text-purple-700", icon: Truck },
  DELIVERING: { bg: "bg-orange-100", text: "text-orange-700", icon: Truck },
  DELIVERED: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle },
};

const StatusIcon = ({ status }: { status: keyof typeof statusColors }) => {
  const IconComponent = statusColors[status].icon;
  return <IconComponent className="w-3 h-3" />;
};

export function DispatchList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);

  const filteredDispatches = useMemo(() => {
    return mockDispatches.filter((dispatch) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          dispatch.trackingNumber.toLowerCase().includes(query) ||
          dispatch.customer.name.toLowerCase().includes(query) ||
          dispatch.customer.phone.includes(query) ||
          `#${dispatch.orderId}`.includes(query)
        );
      }
      return true;
    });
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(statusColors).map(([status, colors]) => (
          <div
            key={status}
            className="bg-white rounded-xl p-4 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-lg ${colors.bg}`}>
                <colors.icon className={`w-5 h-5 ${colors.text}`} />
              </div>
              <span className="text-sm text-gray-500">Today</span>
            </div>
            <div className="mt-3">
              <h3 className="text-2xl font-semibold text-gray-900">
                {mockDispatches.filter((d) => d.status === status).length}
              </h3>
              <p className="text-sm text-gray-600">{status.toLowerCase()}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search by tracking number, customer, or order ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <div className="flex gap-2">
            {Object.entries(statusColors).map(([status, colors]) => (
              <button
                key={status}
                onClick={() =>
                  setSelectedStatus((prev) =>
                    prev.includes(status)
                      ? prev.filter((s) => s !== status)
                      : [...prev, status]
                  )
                }
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedStatus.includes(status)
                    ? `${colors.bg} ${colors.text}`
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {status.toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dispatch Cards */}
      <div className="grid gap-4">
        {filteredDispatches.map((dispatch) => (
          <div
            key={dispatch.id}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Column - Order Info */}
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-medium text-gray-900">
                        Order #{dispatch.orderId}
                      </h3>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                          statusColors[dispatch.status].bg
                        } ${statusColors[dispatch.status].text}`}
                      >
                        <StatusIcon status={dispatch.status} />
                        {dispatch.status.toLowerCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Tracking: {dispatch.trackingNumber}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">
                      Estimated Delivery
                    </div>
                    <div className="text-sm text-gray-500">
                      {format(dispatch.estimatedDelivery, "MMM d, yyyy")}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Customer Details
                      </div>
                      <div className="mt-2 space-y-1">
                        <div className="text-sm text-gray-600">
                          {dispatch.customer.name}
                        </div>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                          <PhoneCall className="w-3 h-3" />
                          {dispatch.customer.phone}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        Delivery Partner
                      </div>
                      <div className="mt-2 space-y-1">
                        <div className="text-sm text-gray-600">
                          {dispatch.deliveryPartner}
                        </div>
                        {dispatch.deliveryNotes && (
                          <div className="text-sm text-gray-500 italic">
                            Note: {dispatch.deliveryNotes}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Delivery Address */}
              <div className="w-full md:w-72 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">
                    Delivery Address
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    {dispatch.address.houseNo}, {dispatch.address.street}
                  </p>
                  <p>
                    {dispatch.address.city}, {dispatch.address.district}
                  </p>
                  <p>
                    {dispatch.address.state} - {dispatch.address.pinCode}
                  </p>
                  {dispatch.address.landmark && (
                    <p className="text-gray-500 italic">
                      Landmark: {dispatch.address.landmark}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
