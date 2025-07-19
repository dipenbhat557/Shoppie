"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Calendar,
  Percent,
  Tag,
  Clock,
  CheckCircle,
  XCircle,
  ChevronDown,
} from "lucide-react";
import { format } from "date-fns";

type PromotionType = "PERCENTAGE" | "FIXED_AMOUNT";
type PromotionStatus = "ACTIVE" | "SCHEDULED" | "EXPIRED" | "DISABLED";

interface Promotion {
  id: number;
  name: string;
  description?: string;
  type: PromotionType;
  value: number;
  status: PromotionStatus;
  startDate: Date;
  endDate: Date;
  usageLimit?: number;
  usedCount: number;
  couponCode?: string;
  minOrderValue?: number;
}

const statusColors = {
  ACTIVE: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle },
  SCHEDULED: { bg: "bg-blue-100", text: "text-blue-700", icon: Clock },
  EXPIRED: { bg: "bg-gray-100", text: "text-gray-700", icon: XCircle },
  DISABLED: { bg: "bg-red-100", text: "text-red-700", icon: XCircle },
};

// Mock data
const mockPromotions: Promotion[] = [
  {
    id: 1,
    name: "Summer Sale 2024",
    description: "20% off on all summer collection",
    type: "PERCENTAGE",
    value: 20,
    status: "ACTIVE",
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-08-31"),
    usageLimit: 1000,
    usedCount: 150,
    minOrderValue: 50,
  },
  {
    id: 2,
    name: "Welcome10",
    description: "$10 off on your first purchase",
    type: "FIXED_AMOUNT",
    value: 10,
    status: "ACTIVE",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
    couponCode: "WELCOME10",
    minOrderValue: 50,
    usageLimit: 1,
    usedCount: 0,
  },
];

const StatusIcon = ({ status }: { status: keyof typeof statusColors }) => {
  const IconComponent = statusColors[status].icon;
  return <IconComponent className="w-3 h-3" />;
};

export function PromotionsList() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
            <div className="h-8 w-2 bg-[#FFC633] rounded-full mr-3" />
            Promotions
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({mockPromotions.length} total)
            </span>
          </h2>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:min-w-[300px]">
              <input
                type="text"
                placeholder="Search promotions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <button className="px-4 py-2 bg-[#FFC633] text-gray-900 rounded-lg font-medium hover:bg-[#FFD666] transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create new promotion
            </button>
          </div>
        </div>
      </div>

      {/* Promotions List */}
      <div className="p-6">
        <div className="grid gap-4">
          {mockPromotions.map((promotion) => (
            <div
              key={promotion.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-[#FFC633] transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium text-gray-900">
                      {promotion.name}
                    </h3>
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                        statusColors[promotion.status].bg
                      } ${statusColors[promotion.status].text}`}
                    >
                      <StatusIcon status={promotion.status} />
                      {promotion.status.toLowerCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {promotion.description}
                  </p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {promotion.type === "PERCENTAGE" ? (
                      <Percent className="w-4 h-4" />
                    ) : (
                      <Tag className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">
                      {promotion.type === "PERCENTAGE"
                        ? `${promotion.value}% off`
                        : `$${promotion.value} off`}
                    </div>
                    <div className="text-xs text-gray-500">Discount</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium">
                      {format(promotion.startDate, "MMM d")} -{" "}
                      {format(promotion.endDate, "MMM d, yyyy")}
                    </div>
                    <div className="text-xs text-gray-500">Duration</div>
                  </div>
                </div>

                {promotion.couponCode && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Tag className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium">{promotion.couponCode}</div>
                      <div className="text-xs text-gray-500">Coupon Code</div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-medium">
                      {promotion.usedCount} / {promotion.usageLimit || "∞"}
                    </div>
                    <div className="text-xs text-gray-500">Usage</div>
                  </div>
                </div>
              </div>

              {promotion.minOrderValue && (
                <div className="mt-4 text-sm text-gray-500">
                  Minimum order value: ${promotion.minOrderValue}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
