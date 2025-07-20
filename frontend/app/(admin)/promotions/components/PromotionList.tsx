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
  DollarSign,
  X,
  Edit2,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";

// Types from Prisma schema
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

interface NewPromotion {
  name: string;
  description: string;
  type: PromotionType;
  value: number;
  startDate: string;
  endDate: string;
  usageLimit?: number;
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
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  const [promotions, setPromotions] = useState(mockPromotions);
  const [newPromotion, setNewPromotion] = useState<NewPromotion>({
    name: "",
    description: "",
    type: "PERCENTAGE",
    value: 0,
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd"),
    usageLimit: undefined,
    couponCode: "",
    minOrderValue: undefined,
  });

  const handleEdit = (promotion: Promotion) => {
    setSelectedPromotion(promotion);
    setNewPromotion({
      name: promotion.name,
      description: promotion.description || "",
      type: promotion.type,
      value: promotion.value,
      startDate: format(new Date(promotion.startDate), "yyyy-MM-dd"),
      endDate: format(new Date(promotion.endDate), "yyyy-MM-dd"),
      usageLimit: promotion.usageLimit,
      couponCode: promotion.couponCode,
      minOrderValue: promotion.minOrderValue,
    });
    setShowModal(true);
  };

  const handleDelete = (promotion: Promotion) => {
    setSelectedPromotion(promotion);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedPromotion) {
      // Here you would typically make an API call to delete the promotion
      setPromotions(promotions.filter(p => p.id !== selectedPromotion.id));
      setShowDeleteModal(false);
      setSelectedPromotion(null);
    }
  };

  const handleCreateOrUpdate = () => {
    if (selectedPromotion) {
      // Update existing promotion
      setPromotions(promotions.map(p =>
        p.id === selectedPromotion.id
          ? {
              ...p,
              ...newPromotion,
              startDate: new Date(newPromotion.startDate),
              endDate: new Date(newPromotion.endDate),
            }
          : p
      ));
    } else {
      // Create new promotion
      const newId = Math.max(...promotions.map(p => p.id)) + 1;
      setPromotions([...promotions, {
        id: newId,
        ...newPromotion,
        startDate: new Date(newPromotion.startDate),
        endDate: new Date(newPromotion.endDate),
        status: "SCHEDULED",
        usedCount: 0,
      }]);
    }
    
    setShowModal(false);
    setSelectedPromotion(null);
    setNewPromotion({
      name: "",
      description: "",
      type: "PERCENTAGE",
      value: 0,
      startDate: format(new Date(), "yyyy-MM-dd"),
      endDate: format(new Date(), "yyyy-MM-dd"),
      usageLimit: undefined,
      couponCode: "",
      minOrderValue: undefined,
    });
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
              <div className="h-8 w-2 bg-[#FFC633] rounded-full mr-3" />
              Promotions
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({promotions.length} total)
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
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-[#FFC633] text-gray-900 rounded-lg font-medium hover:bg-[#FFD666] transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create new promotion
              </button>
            </div>
          </div>
        </div>

        {/* Promotions List */}
        <div className="p-6">
          <div className="grid gap-4">
            {promotions.map((promotion) => (
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
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(promotion)}
                      className="p-2 text-gray-400 hover:text-[#FFC633] rounded-lg hover:bg-gray-50"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(promotion)}
                      className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
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
                        <div className="font-medium">
                          {promotion.couponCode}
                        </div>
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

      {/* Create/Edit Promotion Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-4">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                {selectedPromotion ? "Edit Promotion" : "Create New Promotion"}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedPromotion(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Promotion Name
                  </label>
                  <input
                    type="text"
                    value={newPromotion.name}
                    onChange={(e) =>
                      setNewPromotion({ ...newPromotion, name: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50"
                    placeholder="e.g., Summer Sale 2024"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newPromotion.description}
                    onChange={(e) =>
                      setNewPromotion({
                        ...newPromotion,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50"
                    placeholder="Describe your promotion..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discount Type
                    </label>
                    <select
                      value={newPromotion.type}
                      onChange={(e) =>
                        setNewPromotion({
                          ...newPromotion,
                          type: e.target.value as PromotionType,
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50"
                    >
                      <option value="PERCENTAGE">Percentage</option>
                      <option value="FIXED_AMOUNT">Fixed Amount</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Value
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {newPromotion.type === "PERCENTAGE" ? (
                          <Percent className="w-4 h-4 text-gray-400" />
                        ) : (
                          <DollarSign className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      <input
                        type="number"
                        value={newPromotion.value}
                        onChange={(e) =>
                          setNewPromotion({
                            ...newPromotion,
                            value: parseFloat(e.target.value),
                          })
                        }
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={newPromotion.startDate}
                      onChange={(e) =>
                        setNewPromotion({
                          ...newPromotion,
                          startDate: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={newPromotion.endDate}
                      onChange={(e) =>
                        setNewPromotion({
                          ...newPromotion,
                          endDate: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Usage Limit (Optional)
                    </label>
                    <input
                      type="number"
                      value={newPromotion.usageLimit || ""}
                      onChange={(e) =>
                        setNewPromotion({
                          ...newPromotion,
                          usageLimit: e.target.value
                            ? parseInt(e.target.value)
                            : undefined,
                        })
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50"
                      placeholder="Unlimited"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Minimum Order Value (Optional)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        value={newPromotion.minOrderValue || ""}
                        onChange={(e) =>
                          setNewPromotion({
                            ...newPromotion,
                            minOrderValue: e.target.value
                              ? parseFloat(e.target.value)
                              : undefined,
                          })
                        }
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50"
                        placeholder="No minimum"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Coupon Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={newPromotion.couponCode || ""}
                    onChange={(e) =>
                      setNewPromotion({
                        ...newPromotion,
                        couponCode: e.target.value || undefined,
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50"
                    placeholder="e.g., SUMMER2024"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedPromotion(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateOrUpdate}
                className="px-4 py-2 bg-[#FFC633] text-gray-900 rounded-lg font-medium hover:bg-[#FFD666] transition-colors"
              >
                {selectedPromotion ? "Update Promotion" : "Create Promotion"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedPromotion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Delete Promotion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the promotion &quot;{selectedPromotion.name}&quot;? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedPromotion(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
              >
                Delete Promotion
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
