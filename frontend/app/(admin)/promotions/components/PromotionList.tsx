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
import { useCreatePromotion } from "@/fetchers/promotion/mutation";
import { useDeletePromotion } from "@/fetchers/promotion/mutation";
import { useUpdatePromotion } from "@/fetchers/promotion/mutation";
import { useProducts } from "@/fetchers/product/queries";
import { useCategories } from "@/fetchers/category/queries";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/fetchers/product/queries";
import { Category } from "@/fetchers/category/queries";

// Types from Prisma schema
type PromotionType = "PERCENTAGE" | "FIXED_AMOUNT";
type PromotionStatus = "ACTIVE" | "SCHEDULED" | "EXPIRED" | "DISABLED";

interface Promotion {
  id: string;
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
  products: {
    id: string;
    name: string;
  }[];
  categories: {
    id: string;
    name: string;
  }[];
  orders: {
    id: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
    };
  }[];
  createdAt: Date;
  updatedAt: Date;
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
  productIds: string[];
  categoryIds: string[];
}

const statusColors = {
  ACTIVE: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle },
  SCHEDULED: { bg: "bg-blue-100", text: "text-blue-700", icon: Clock },
  EXPIRED: { bg: "bg-gray-100", text: "text-gray-700", icon: XCircle },
  DISABLED: { bg: "bg-red-100", text: "text-red-700", icon: XCircle },
};

const StatusIcon = ({ status }: { status: keyof typeof statusColors }) => {
  const IconComponent = statusColors[status].icon;
  return <IconComponent className="w-3 h-3" />;
};

// Mock data
const mockPromotions: Promotion[] = [
  {
    id: "1",
    name: "Summer Sale 2024",
    description: "Get amazing discounts on summer collection",
    type: "PERCENTAGE",
    value: 20,
    status: "ACTIVE",
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-08-31"),
    usageLimit: 1000,
    usedCount: 145,
    minOrderValue: 50,
    products: [
      { id: "1", name: "Summer T-Shirt" },
      { id: "2", name: "Beach Shorts" },
    ],
    categories: [
      { id: "1", name: "Summer Wear" },
      { id: "2", name: "Beach Collection" },
    ],
    orders: [],
    createdAt: new Date("2024-05-15"),
    updatedAt: new Date("2024-05-15"),
  },
  {
    id: "2",
    name: "First Purchase Discount",
    description: "Special discount for new customers",
    type: "FIXED_AMOUNT",
    value: 10,
    status: "ACTIVE",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-12-31"),
    usageLimit: undefined,
    usedCount: 328,
    couponCode: "WELCOME10",
    minOrderValue: 50,
    products: [],
    categories: [],
    orders: [],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
      id: "3",
    name: "Flash Sale - 50% Off",
    description: "Limited time mega discount on selected items",
    type: "PERCENTAGE",
    value: 50,
    status: "SCHEDULED",
    startDate: new Date("2024-07-01"),
    endDate: new Date("2024-07-02"),
    usageLimit: 500,
    usedCount: 0,
    products: [
      { id: "3", name: "Premium Watch" },
      { id: "4", name: "Designer Bag" },
    ],
    categories: [],
    orders: [],
    createdAt: new Date("2024-06-15"),
    updatedAt: new Date("2024-06-15"),
  },
  {
    id: "4",
    name: "Holiday Bundle",
    description: "Special holiday season discounts",
    type: "PERCENTAGE",
    value: 30,
    status: "EXPIRED",
    startDate: new Date("2023-12-01"),
    endDate: new Date("2023-12-31"),
    usageLimit: 2000,
    usedCount: 1876,
    couponCode: "HOLIDAY30",
    minOrderValue: 100,
    products: [],
    categories: [
      { id: "3", name: "Winter Collection" },
      { id: "4", name: "Accessories" },
    ],
    orders: [],
    createdAt: new Date("2023-11-15"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "5",
    name: "Clearance Sale",
    description: "Up to 70% off on last season items",
    type: "PERCENTAGE",
    value: 70,
    status: "DISABLED",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-03-31"),
    usageLimit: undefined,
    usedCount: 432,
    products: [],
    categories: [{ id: "5", name: "Last Season" }],
    orders: [],
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-04-01"),
  },
];

export function PromotionsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(
    null
  );
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);
  const updatePromotion = useUpdatePromotion();
  const deletePromotion = useDeletePromotion();
  const createPromotion = useCreatePromotion();
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
    productIds: [],
    categoryIds: [],
  });

  const { data: products } = useProducts();
  const { data: categories } = useCategories();

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
      productIds: promotion.products.map((p) => p.id),
      categoryIds: promotion.categories.map((c) => c.id),
    });
    setShowModal(true);
  };

  const handleDelete = (promotion: Promotion) => {
    setSelectedPromotion(promotion);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (selectedPromotion) {
      try {
        await deletePromotion.mutateAsync(selectedPromotion.id);
        setShowDeleteModal(false);
        setSelectedPromotion(null);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleCreateOrUpdate = async () => {
    try {
      if (selectedPromotion) {
        await updatePromotion.mutateAsync({
          id: selectedPromotion.id,
          ...newPromotion,
        });
      } else {
        await createPromotion.mutateAsync(newPromotion);
      }
      setShowModal(false);
      setSelectedPromotion(null);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
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

              {/* Product Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Products (Optional)
                </label>
                <div className="space-y-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add products
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Search products..." />
                        <CommandEmpty>No products found.</CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-auto">
                          {products?.map((product: Product) => (
                            <CommandItem
                              key={product.id}
                              onSelect={() => {
                                setNewPromotion((prev) => ({
                                  ...prev,
                                  productIds: prev.productIds.includes(
                                    product.id
                                  )
                                    ? prev.productIds.filter(
                                        (id) => id !== product.id
                                      )
                                    : [...prev.productIds, product.id],
                                }));
                              }}
                            >
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="mr-2"
                                  checked={newPromotion.productIds.includes(
                                    product.id
                                  )}
                                  readOnly
                                />
                                {product.name}
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  {/* Selected Products Display */}
                  <div className="flex flex-wrap gap-2">
                    {products
                      ?.filter((p: Product) =>
                        newPromotion.productIds.includes(p.id)
                      )
                      .map((product: Product) => (
                        <Badge
                          key={product.id}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {product.name}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() =>
                              setNewPromotion((prev) => ({
                                ...prev,
                                productIds: prev.productIds.filter(
                                  (id) => id !== product.id
                                ),
                              }))
                            }
                          />
                        </Badge>
                      ))}
                  </div>
                </div>
              </div>

              {/* Category Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Categories (Optional)
                </label>
                <div className="space-y-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add categories
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Search categories..." />
                        <CommandEmpty>No categories found.</CommandEmpty>
                        <CommandGroup className="max-h-64 overflow-auto">
                          {categories?.map((category: Category) => (
                            <CommandItem
                              key={category.id}
                              onSelect={() => {
                                setNewPromotion((prev) => ({
                                  ...prev,
                                  categoryIds: prev.categoryIds.includes(
                                    category.id
                                  )
                                    ? prev.categoryIds.filter(
                                        (id) => id !== category.id
                                      )
                                    : [...prev.categoryIds, category.id],
                                }));
                              }}
                            >
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  className="mr-2"
                                  checked={newPromotion.categoryIds.includes(
                                    category.id
                                  )}
                                  readOnly
                                />
                                {category.name}
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  {/* Selected Categories Display */}
                  <div className="flex flex-wrap gap-2">
                    {categories
                      ?.filter((c: Category) =>
                        newPromotion.categoryIds.includes(c.id)
                      )
                      .map((category: Category) => (
                        <Badge
                          key={category.id}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {category.name}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() =>
                              setNewPromotion((prev) => ({
                                ...prev,
                                categoryIds: prev.categoryIds.filter(
                                  (id) => id !== category.id
                                ),
                              }))
                            }
                          />
                        </Badge>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex justify-end gap-3">
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Delete Promotion
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the promotion &quot;
              {selectedPromotion.name}&quot;? This action cannot be undone.
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
