// frontend/app/(admin)/payments/components/PaymentItems.tsx
"use client";

import { useState, useMemo } from "react";
import {
  Search,
  ChevronDown,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";

// Types based on schema
type PaymentStatus = "SUCCESS" | "PENDING" | "FAILED";
type PaymentMethod = "Credit Card" | "Debit Card" | "UPI" | "Net Banking";

interface Payment {
  id: number;
  amount: number;
  status: PaymentStatus;
  paymentDate: Date;
  method: PaymentMethod;
  referenceId?: string;
  orders: {
    id: number;
    price: number;
    user: {
      firstName: string;
      lastName: string;
      email: string;
    };
  }[];
}

const statusColors = {
  SUCCESS: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle },
  PENDING: { bg: "bg-yellow-100", text: "text-yellow-700", icon: Clock },
  FAILED: { bg: "bg-red-100", text: "text-red-700", icon: AlertCircle },
};

// Mock data
const mockPayments: Payment[] = [
  {
    id: 1,
    amount: 299.99,
    status: "SUCCESS",
    paymentDate: new Date("2024-03-10"),
    method: "Credit Card",
    referenceId: "PAY-123456",
    orders: [
      {
        id: 1,
        price: 299.99,
        user: {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
        },
      },
    ],
  },
  // Add more mock payments...
];

export function PaymentItems() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    field: "date" | "amount" | "status";
    order: "asc" | "desc";
  }>({ field: "date", order: "desc" });

  const filteredPayments = useMemo(() => {
    let result = [...mockPayments];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (payment) =>
          payment.referenceId?.toLowerCase().includes(query) ||
          payment.orders.some(
            (order) =>
              order.user.email.toLowerCase().includes(query) ||
              `${order.user.firstName} ${order.user.lastName}`
                .toLowerCase()
                .includes(query)
          )
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortConfig.field) {
        case "date":
          return sortConfig.order === "asc"
            ? a.paymentDate.getTime() - b.paymentDate.getTime()
            : b.paymentDate.getTime() - a.paymentDate.getTime();
        case "amount":
          return sortConfig.order === "asc"
            ? a.amount - b.amount
            : b.amount - a.amount;
        case "status":
          const priority = { SUCCESS: 3, PENDING: 2, FAILED: 1 };
          return sortConfig.order === "asc"
            ? priority[a.status] - priority[b.status]
            : priority[b.status] - priority[a.status];
        default:
          return 0;
      }
    });

    return result;
  }, [mockPayments, sortConfig, searchQuery]);

  const StatusIcon = ({ status }: { status: keyof typeof statusColors }) => {
    const IconComponent = statusColors[status].icon;
    return <IconComponent className="w-4 h-4" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col min-h-[calc(100vh-200px)]">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
            <div className="h-8 w-2 bg-[#FFC633] rounded-full mr-3" />
            Payments
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({filteredPayments.length} total)
            </span>
          </h2>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:min-w-[300px]">
              <input
                type="text"
                placeholder="Search by reference ID or customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
            <tr>
              <th className="px-6 py-4">Reference ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Method</th>
              <th
                onClick={() =>
                  setSortConfig((prev) => ({
                    field: "amount",
                    order:
                      prev.field === "amount" && prev.order === "asc"
                        ? "desc"
                        : "asc",
                  }))
                }
                className="px-6 py-4 cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  Amount
                  {sortConfig.field === "amount" && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        sortConfig.order === "asc" ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>
              </th>
              <th
                onClick={() =>
                  setSortConfig((prev) => ({
                    field: "status",
                    order:
                      prev.field === "status" && prev.order === "asc"
                        ? "desc"
                        : "asc",
                  }))
                }
                className="px-6 py-4 cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  Status
                  {sortConfig.field === "status" && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        sortConfig.order === "asc" ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>
              </th>
              <th
                onClick={() =>
                  setSortConfig((prev) => ({
                    field: "date",
                    order:
                      prev.field === "date" && prev.order === "asc"
                        ? "desc"
                        : "asc",
                  }))
                }
                className="px-6 py-4 cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  Date
                  {sortConfig.field === "date" && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        sortConfig.order === "asc" ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </div>
              </th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPayments.map((payment) => (
              <tr
                key={payment.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 font-medium">
                  #{payment.referenceId}
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900">
                      {payment.orders[0].user.firstName}{" "}
                      {payment.orders[0].user.lastName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {payment.orders[0].user.email}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">{payment.method}</td>
                <td className="px-6 py-4 font-medium">${payment.amount}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                      statusColors[payment.status].bg
                    } ${statusColors[payment.status].text}`}
                  >
                    <StatusIcon status={payment.status} />
                    {payment.status.toLowerCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-gray-900">
                      {format(payment.paymentDate, "MMM d, yyyy")}
                    </div>
                    <div className="text-sm text-gray-500">
                      {format(payment.paymentDate, "h:mm a")}
                    </div>
                  </div>
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
      <div className="px-6 py-4 border-t border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">10</span> of{" "}
            <span className="font-medium">{filteredPayments.length}</span>{" "}
            payments
          </p>
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
  );
}
