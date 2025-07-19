"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, X, Edit2, Save, Upload, AlertTriangle } from "lucide-react";

interface ProductVariant {
  id: number;
  sku: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  stockQuantity: number;
  images: string[];
  attributes: {
    [key: string]: string;
  };
  isActive: boolean;
}

// Mock data
const mockVariants: ProductVariant[] = [
  {
    id: 1,
    sku: "NK-AM270-BLK-42",
    name: "Air Max 270 - Black/42",
    price: 149.99,
    compareAtPrice: 179.99,
    stockQuantity: 25,
    images: [
      "https://imgs.search.brave.com/AZIzdfT3HLsdsxJi5LRUo-pd7W2vYaWymrpUk5EDC_k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9idXNh/bi1zb3V0aC1rb3Jl/YS1jaXJjYS1tYXkt/Y2xvc2UtdXAtc2hv/dC1uaWtlLXNpZ24t/bmlrZS0xMDkwNjAz/MzAuanBn",
      "https://imgs.search.brave.com/AZIzdfT3HLsdsxJi5LRUo-pd7W2vYaWymrpUk5EDC_k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9idXNh/bi1zb3V0aC1rb3Jl/YS1jaXJjYS1tYXkt/Y2xvc2UtdXAtc2hv/dC1uaWtlLXNpZ24t/bmlrZS0xMDkwNjAz/MzAuanBn",
      "https://imgs.search.brave.com/AZIzdfT3HLsdsxJi5LRUo-pd7W2vYaWymrpUk5EDC_k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9idXNh/bi1zb3V0aC1rb3Jl/YS1jaXJjYS1tYXkt/Y2xvc2UtdXAtc2hv/dC1uaWtlLXNpZ24t/bmlrZS0xMDkwNjAz/MzAuanBn",
      "https://imgs.search.brave.com/AZIzdfT3HLsdsxJi5LRUo-pd7W2vYaWymrpUk5EDC_k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9idXNh/bi1zb3V0aC1rb3Jl/YS1jaXJjYS1tYXkt/Y2xvc2UtdXAtc2hv/dC1uaWtlLXNpZ24t/bmlrZS0xMDkwNjAz/MzAuanBn",
    ],
    attributes: {
      Color: "Black",
      Size: "42",
    },
    isActive: true,
  },
  {
    id: 2,
    sku: "NK-AM270-WHT-41",
    name: "Air Max 270 - White/41",
    price: 149.99,
    stockQuantity: 15,
    images: [
      "https://imgs.search.brave.com/AZIzdfT3HLsdsxJi5LRUo-pd7W2vYaWymrpUk5EDC_k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9idXNh/bi1zb3V0aC1rb3Jl/YS1jaXJjYS1tYXkt/Y2xvc2UtdXAtc2hv/dC1uaWtlLXNpZ24t/bmlrZS0xMDkwNjAz/MzAuanBn",
      "https://imgs.search.brave.com/AZIzdfT3HLsdsxJi5LRUo-pd7W2vYaWymrpUk5EDC_k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9idXNh/bi1zb3V0aC1rb3Jl/YS1jaXJjYS1tYXkt/Y2xvc2UtdXAtc2hv/dC1uaWtlLXNpZ24t/bmlrZS0xMDkwNjAz/MzAuanBn",
      "https://imgs.search.brave.com/AZIzdfT3HLsdsxJi5LRUo-pd7W2vYaWymrpUk5EDC_k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9idXNh/bi1zb3V0aC1rb3Jl/YS1jaXJjYS1tYXkt/Y2xvc2UtdXAtc2hv/dC1uaWtlLXNpZ24t/bmlrZS0xMDkwNjAz/MzAuanBn",
      "https://imgs.search.brave.com/AZIzdfT3HLsdsxJi5LRUo-pd7W2vYaWymrpUk5EDC_k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9idXNh/bi1zb3V0aC1rb3Jl/YS1jaXJjYS1tYXkt/Y2xvc2UtdXAtc2hv/dC1uaWtlLXNpZ24t/bmlrZS0xMDkwNjAz/MzAuanBn",
    ],
    attributes: {
      Color: "White",
      Size: "41",
    },
    isActive: true,
  },
];

export function VariantList() {
  const [variants, setVariants] = useState(mockVariants);
  const [editingVariant, setEditingVariant] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<ProductVariant>>({});
  const [showAddForm, setShowAddForm] = useState(false);

  const handleEdit = (variant: ProductVariant) => {
    setEditingVariant(variant.id);
    setEditForm(variant);
  };

  const handleSave = () => {
    if (editingVariant) {
      setVariants(
        variants.map((variant) =>
          variant.id === editingVariant ? { ...variant, ...editForm } : variant
        )
      );
      setEditingVariant(null);
      setEditForm({});
    }
  };

  const handleCancel = () => {
    setEditingVariant(null);
    setEditForm({});
  };

  const handleAddVariant = () => {
    const newVariant: ProductVariant = {
      id: variants.length + 1,
      sku: "",
      name: "",
      price: 0,
      stockQuantity: 0,
      images: [],
      attributes: {},
      isActive: true,
    };
    setVariants([...variants, newVariant]);
    setEditingVariant(newVariant.id);
    setEditForm(newVariant);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Product Variants
        </h3>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#FFC633] text-gray-900 rounded-lg hover:bg-[#FFD666] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Variant
        </button>
      </div>

      {/* Variants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {variants.map((variant) => (
          <div
            key={variant.id}
            className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
          >
            {/* Image Gallery */}
            <div className="relative h-48 bg-gray-50">
              {variant.images.length > 0 ? (
                <Image
                  src={variant.images[0]}
                  alt={variant.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Upload className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>

            <div className="p-4">
              {editingVariant === variant.id ? (
                /* Edit Form */
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={editForm.name || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SKU
                    </label>
                    <input
                      type="text"
                      value={editForm.sku || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, sku: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price
                      </label>
                      <input
                        type="number"
                        value={editForm.price || 0}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            price: parseFloat(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 rounded border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Stock
                      </label>
                      <input
                        type="number"
                        value={editForm.stockQuantity || 0}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            stockQuantity: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 rounded border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 mt-4">
                    <button
                      onClick={handleCancel}
                      className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-3 py-2 bg-[#FFC633] text-gray-900 rounded-lg hover:bg-[#FFD666]"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                /* Display Mode */
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {variant.name}
                      </h4>
                      <p className="text-sm text-gray-500">{variant.sku}</p>
                    </div>
                    <button
                      onClick={() => handleEdit(variant)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Price</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">${variant.price}</span>
                        {variant.compareAtPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            ${variant.compareAtPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Stock</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {variant.stockQuantity}
                        </span>
                        {variant.stockQuantity < 10 && (
                          <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(variant.attributes).map(
                          ([key, value]) => (
                            <span
                              key={key}
                              className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                            >
                              {key}: {value}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Add New Variant Card */}
        {showAddForm && (
          <div
            className="bg-gray-50 rounded-xl border border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={handleAddVariant}
          >
            <div className="text-center p-6">
              <div className="w-12 h-12 rounded-full bg-[#FFC633] bg-opacity-20 flex items-center justify-center mx-auto mb-3">
                <Plus className="w-6 h-6 text-[#FFC633]" />
              </div>
              <h4 className="font-medium text-gray-900">Add New Variant</h4>
              <p className="text-sm text-gray-500 mt-1">
                Create a new product variant
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
