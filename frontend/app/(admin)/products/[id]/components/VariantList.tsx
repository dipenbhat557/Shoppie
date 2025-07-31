"use client";

import { useState } from "react";
import { useProductVariants } from "@/fetchers/product/queries";
import { useDeleteVariant } from "@/fetchers/product/mutation";
import Image from "next/image";
import { Plus, X, Package, Search, Edit2, Trash2, AlertTriangle } from "lucide-react";
import { AddVariant } from "./AddVariant";

interface VariantListProps {
  productId: string;
  onVariantSelect: (variantId: string) => void;
}

export function VariantList({ productId, onVariantSelect }: VariantListProps) {
  const [showAddVariant, setShowAddVariant] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: variants, isLoading } = useProductVariants(productId);
  const deleteVariant = useDeleteVariant();

  const filteredVariants = variants?.filter(variant => {
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    return (
      variant.sku.toLowerCase().includes(searchLower) ||
      variant.productOptions.some(opt => 
        opt.name.toLowerCase().includes(searchLower)
      )
    );
  });

  const handleDelete = async (variantId: string) => {
    try {
      await deleteVariant.mutateAsync(variantId);
    } catch (error) {
      // Error handled by mutation
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFC633]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header and Search */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-2 bg-[#FFC633] rounded-full" />
          <h3 className="text-lg font-semibold text-gray-900">Product Variants</h3>
        </div>
        <button
          onClick={() => setShowAddVariant(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#FFC633] text-gray-900 rounded-lg hover:bg-[#FFD666]"
        >
          <Plus className="w-4 h-4" />
          Add Variant
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search variants..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>

      {/* Variants Table */}
      {filteredVariants?.length && filteredVariants.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-4">Variant</th>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Options</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredVariants.map((variant) => (
                <tr
                  key={variant.id}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg bg-gray-100 relative overflow-hidden">
                        {variant.images?.length > 0 ? (
                          <Image
                            src={variant.images[0]}
                            alt={variant.sku}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <Package className="w-6 h-6 text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        )}
                      </div>
                      <div 
                        className="cursor-pointer"
                        onClick={() => onVariantSelect(variant.id)}
                      >
                        <div className="font-medium text-gray-900 flex items-center gap-2 group-hover:text-[#FFC633]">
                          Variant #{variant.id.slice(-4)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {variant.productOptions.map(opt => opt.name).join(" / ")}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600">{variant.sku}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium">${variant.price.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${
                        variant.stock < 10 ? 'text-yellow-600' : 'text-gray-900'
                      }`}>
                        {variant.stock}
                      </span>
                      {variant.stock < 10 && (
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {variant.productOptions.map((option) => (
                        <span
                          key={option.id}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                        >
                          {option.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onVariantSelect(variant.id);
                        }}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm("Are you sure you want to delete this variant?")) {
                            handleDelete(variant.id);
                          }
                        }}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No Variants Found
          </h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            {searchQuery
              ? "No variants match your search criteria."
              : "Create variants to offer different options for this product."}
          </p>
          <button
            onClick={() => setShowAddVariant(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFC633] text-gray-900 rounded-lg hover:bg-[#FFD666]"
          >
            <Plus className="w-4 h-4" />
            Add Variant
          </button>
        </div>
      )}

      {showAddVariant && (
        <AddVariant
          productId={productId}
          onClose={() => setShowAddVariant(false)}
        />
      )}
    </div>
  );
}
