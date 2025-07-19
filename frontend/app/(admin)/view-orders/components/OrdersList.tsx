// frontend/app/(admin)/view-orders/components/OrderList.tsx
"use client";

import { useMemo } from "react";
import {
  Search,
  Filter,
  Calendar,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";

// Mock data based on schema
const mockOrders1 = [
  {
    id: 1,
    price: 299.99,
    status: "PLACED",
    vendor: "Nike Store",
    orderDate: new Date("2024-03-10"),
    deliveryDate: null,
    user: {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
    },
    payment: {
      id: 1,
      status: "SUCCESS",
      method: "Credit Card",
      amount: 299.99,
    },
    items: [
      {
        id: 1,
        quantity: 2,
        price: 149.99,
        productVariant: {
          id: 1,
          sku: "NK-AM270-001",
          product: {
            name: "Nike Air Max 270",
          },
        },
      },
    ],
  },

  {
    id: 2,
    price: 299.99,
    status: "SHIPPED",
    vendor: "Nike Store",
    orderDate: new Date("2024-04-10"),
    deliveryDate: null,
    user: {
      id: 1,
      firstName: "test",
      lastName: "test",
      email: "test@test.com",
    },
    payment: {
      id: 1,
      status: "PENDING",
      method: "Credit Card",
      amount: 299.99,
    },
    items: [
      {
        id: 2,
        quantity: 2,
        price: 149.99,
        productVariant: {
          id: 2,
          sku: "NK-AM270-002",
          product: {
            name: "Nike Air  270",
          },
        },
      },
    ],
  },
  // Add more mock orders...
];

const StatusIcon = ({ status }: { status: keyof typeof statusColors }) => {
  const IconComponent = statusColors[status].icon;
  return <IconComponent className="w-4 h-4" />;
};

const paymentStatusColors = {
  SUCCESS: "text-green-600",
  PENDING: "text-yellow-600",
  FAILED: "text-red-600",
};

type PaymentStatus = "SUCCESS" | "PENDING" | "FAILED";

// Add payment status to sort fields
type SortField = "orderDate" | "price" | "status" | "id" | "payment";
type SortOrder = "asc" | "desc";

// frontend/app/(admin)/view-orders/types.ts
export type PaymentMethod =
  | "credit_card"
  | "debit_card"
  | "upi"
  | "net_banking";

export type OrderStatus =
  | "PLACED"
  | "ACCEPTED"
  | "SHIPPED"
  | "DELIVERING"
  | "DELIVERED";

export interface FilterState {
  selectedStatus: OrderStatus[];
  selectedPaymentStatus: PaymentStatus[];
  selectedPaymentMethods: PaymentMethod[];
  dateRange: {
    start: Date | null;
    end: Date | null;
    preset: string;
  };
  priceRange: {
    min: string;
    max: string;
  };
}

// frontend/app/(admin)/view-orders/components/FilterSection.tsx
import { useState } from "react";
import { X, Clock, Package, Truck, CheckCircle } from "lucide-react";

interface FilterSectionProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export const statusColors = {
  PLACED: { bg: "bg-blue-100", text: "text-blue-700", icon: Clock },
  ACCEPTED: { bg: "bg-yellow-100", text: "text-yellow-700", icon: Package },
  SHIPPED: { bg: "bg-purple-100", text: "text-purple-700", icon: Package },
  DELIVERING: { bg: "bg-orange-100", text: "text-orange-700", icon: Truck },
  DELIVERED: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle },
};

import { FilterSection } from "./FilterSection";

export function OrderList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [statusChangeOrder, setStatusChangeOrder] = useState<number | null>(
    null
  );
  const [mockOrders, setMockOrders] = useState(mockOrders1);
  const [sortConfig, setSortConfig] = useState<{
    field: SortField;
    order: SortOrder;
  }>({ field: "orderDate", order: "desc" });

  const [filters, setFilters] = useState<FilterState>({
    selectedStatus: [],
    selectedPaymentStatus: [],
    selectedPaymentMethods: [],
    dateRange: { start: null, end: null, preset: "all" },
    priceRange: { min: "", max: "" },
  });

  const handleStatusChange = (orderId: number, newStatus: string) => {
    // Handle status change logic here
    console.log(`Changing order ${orderId} status to ${newStatus}`);

    // Update the order status in the mock data
    const updatedOrders = mockOrders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );

    // Update the mock data state
    setMockOrders(updatedOrders);
  };

  const handleSort = (field: SortField) => {
    setSortConfig((current) => ({
      field,
      order:
        current.field === field && current.order === "asc" ? "desc" : "asc",
    }));
  };

  const sortedAndFilteredOrders = useMemo(() => {
    let result = [...mockOrders];

    // Enhanced search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (order) =>
          order.id.toString().includes(query) ||
          order.user.email.toLowerCase().includes(query) ||
          `${order.user.firstName} ${order.user.lastName}`
            .toLowerCase()
            .includes(query) ||
          order.vendor.toLowerCase().includes(query) ||
          // Add product name search
          order.items.some((item) =>
            item.productVariant.product.name.toLowerCase().includes(query)
          )
      );
    }

    // Apply all filters
    if (filters.selectedStatus.length > 0) {
      result = result.filter((order) =>
        filters.selectedStatus.includes(order.status as OrderStatus)
      );
    }

    if (filters.selectedPaymentStatus.length > 0) {
      result = result.filter((order) =>
        filters.selectedPaymentStatus.includes(
          order.payment.status as PaymentStatus
        )
      );
    }

    if (filters.selectedPaymentMethods.length > 0) {
      result = result.filter((order) =>
        filters.selectedPaymentMethods.includes(
          order.payment.method as PaymentMethod
        )
      );
    }

    if (filters.dateRange.start || filters.dateRange.end) {
      result = result.filter((order) => {
        const orderDate = new Date(order.orderDate);
        const start = filters.dateRange.start
          ? new Date(filters.dateRange.start)
          : null;
        const end = filters.dateRange.end
          ? new Date(filters.dateRange.end)
          : null;

        if (start && end) {
          return orderDate >= start && orderDate <= end;
        } else if (start) {
          return orderDate >= start;
        } else if (end) {
          return orderDate <= end;
        }
        return true;
      });
    }

    if (filters.priceRange.min || filters.priceRange.max) {
      result = result.filter((order) => {
        const min = filters.priceRange.min
          ? parseFloat(filters.priceRange.min)
          : -Infinity;
        const max = filters.priceRange.max
          ? parseFloat(filters.priceRange.max)
          : Infinity;
        return order.price >= min && order.price <= max;
      });
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortConfig.field) {
        case "orderDate":
          return sortConfig.order === "asc"
            ? a.orderDate.getTime() - b.orderDate.getTime()
            : b.orderDate.getTime() - a.orderDate.getTime();
        case "price":
          return sortConfig.order === "asc"
            ? a.price - b.price
            : b.price - a.price;
        case "payment":
          // Sort by payment status priority: SUCCESS > PENDING > FAILED
          const statusPriority: Record<PaymentStatus, number> = {
            SUCCESS: 3,
            PENDING: 2,
            FAILED: 1,
          };
          const priorityA = statusPriority[a.payment.status as PaymentStatus];
          const priorityB = statusPriority[b.payment.status as PaymentStatus];
          return sortConfig.order === "asc"
            ? priorityA - priorityB
            : priorityB - priorityA;
        default:
          return 0;
      }
    });

    return result;
  }, [mockOrders, sortConfig, filters, searchQuery]);

    return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col min-h-[calc(100vh-200px)]">
      {/* Header with Search */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
            <div className="h-8 w-2 bg-[#FFC633] rounded-full mr-3" />
            Orders
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({sortedAndFilteredOrders.length} total)
            </span>
          </h2>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:min-w-[300px]">
              <input
                type="text"
                placeholder="Search by order ID, customer, product name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Filters Bar */}
      <FilterSection filters={filters} onFiltersChange={setFilters} />

      {/* Table Section */}
      <div className="flex-1 flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
              <tr>
                <th
                  onClick={() => handleSort("id")}
                  className="px-6 py-4 whitespace-nowrap cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-2">
                    Order ID
                    {sortConfig.field === "id" && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          sortConfig.order === "asc" ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </div>
              </th>
                <th
                  onClick={() => handleSort("orderDate")}
                  className="px-6 py-4 whitespace-nowrap cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-2">
                    Date
                    {sortConfig.field === "orderDate" && (
                      <span>{sortConfig.order === "asc" ? "↑" : "↓"}</span>
                    )}
                  </div>
              </th>
                <th className="px-6 py-4 whitespace-nowrap">Customer</th>
                <th className="px-6 py-4 whitespace-nowrap">Items</th>
                <th className="px-6 py-4 whitespace-nowrap">Total</th>
                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                <th
                  onClick={() => handleSort("payment")}
                  className="px-6 py-4 whitespace-nowrap cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center gap-2">
                    Payment Status
                    {sortConfig.field === "payment" && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          sortConfig.order === "asc" ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </div>
              </th>
                <th className="px-6 py-4 whitespace-nowrap">Actions</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedAndFilteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium">#{order.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-gray-900">
                        {format(order.orderDate, "MMM d, yyyy")}
                      </div>
                      <div className="text-sm text-gray-500">
                        {format(order.orderDate, "h:mm a")}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">
                        {order.user.firstName} {order.user.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.user.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-1">
                          <span className="text-gray-600">
                            {item.quantity}x
                          </span>
                          <span className="text-gray-900">
                            {item.productVariant.product.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">${order.price}</td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <button
                        onClick={() => setStatusChangeOrder(order.id)}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                          statusColors[
                            order.status as keyof typeof statusColors
                          ].bg
                        } ${
                          statusColors[
                            order.status as keyof typeof statusColors
                          ].text
                        }`}
                      >
                        <StatusIcon
                          status={order.status as keyof typeof statusColors}
                        />
                        {order.status.toLowerCase()}
                        <ChevronDown className="w-4 h-4" />
                      </button>

                      {/* Status Change Dropdown */}
                      {statusChangeOrder === order.id && (
                        <div className="absolute top-full left-0 mt-2 w-48 rounded-lg bg-white shadow-lg border border-gray-100 py-1 z-10">
                          {Object.keys(statusColors).map((status) => (
                            <button
                              key={status}
                              onClick={() => {
                                handleStatusChange(order.id, status);
                                setStatusChangeOrder(null);
                              }}
                              className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 ${
                                status === order.status
                                  ? "text-[#FFC633]"
                                  : "text-gray-700"
                              }`}
                            >
                              <StatusIcon
                                status={status as keyof typeof statusColors}
                              />
                              {status.toLowerCase()}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`flex items-center gap-1 ${
                        paymentStatusColors[
                          order.payment
                            .status as keyof typeof paymentStatusColors
                        ]
                      }`}
                    >
                      {order.payment.status === "SUCCESS" && (
                        <CheckCircle className="w-4 h-4" />
                      )}
                      {order.payment.status === "PENDING" && (
                        <Clock className="w-4 h-4" />
                      )}
                      {order.payment.status === "FAILED" && (
                        <AlertCircle className="w-4 h-4" />
                      )}
                      {order.payment.status.toLowerCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-[#FFC633] hover:text-[#FFD666] font-medium">
                      View Details
                    </button>
                  </td>
            </tr>
              ))}
          </tbody>
        </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 bg-white mt-auto">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">10</span> of{" "}
                <span className="font-medium">
                  {sortedAndFilteredOrders.length}
                </span>{" "}
                orders
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-4 py-2 bg-[#FFC633] text-gray-900 rounded-lg text-sm font-medium hover:bg-[#FFD666]">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const DateRangeFilter = () => {
  const [isCustomDate, setIsCustomDate] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Date:</span>
        <div className="flex items-center bg-white rounded-lg border border-gray-200 divide-x">
          <select
            className="text-sm py-2 px-3 border-none rounded-l-lg focus:ring-0 focus:border-none"
            onChange={(e) => setIsCustomDate(e.target.value === "custom")}
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="custom">Custom Range</option>
          </select>

          {isCustomDate && (
            <div className="flex items-center px-3 gap-2">
              <input
                type="date"
                className="text-sm border-none focus:ring-0"
                placeholder="Start date"
              />
              <span className="text-gray-400">to</span>
              <input
                type="date"
                className="text-sm border-none focus:ring-0"
                placeholder="End date"
              />
            </div>
          )}
        </div>
      </div>
      </div>
    );
  };
  