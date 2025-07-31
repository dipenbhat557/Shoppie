"use client";

import { useState } from "react";
import { useProductVariant } from "@/fetchers/product/queries";
import { useUpdateVariant } from "@/fetchers/product/mutation";
import Image from "next/image";
import { Upload, Save, X, Edit2, Package, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface VariantDetailProps {
  productId: string;
  selectedVariantId: string | null;
}

export function VariantDetail({ productId, selectedVariantId }: VariantDetailProps) {
  const { data: variant, isLoading } = useProductVariant(selectedVariantId!);
  const updateVariant = useUpdateVariant();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    sku: "",
    price: 0,
    stock: 0,
    images: [] as File[]
  });

  const handleSubmit = async () => {
    try {
      await updateVariant.mutateAsync({
        id: variant?.id ?? "",
        data: editForm
      });
      setIsEditing(false);
      toast.success("Variant updated successfully");
    } catch (error) {
      toast.error("Failed to update variant");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFC633]"></div>
      </div>
    );
  }

  if (!variant) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Variant not found</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-2 bg-[#FFC633] rounded-full" />
          <h3 className="text-lg font-semibold text-gray-900">
            {variant.product.name} - {variant.sku}
          </h3>
        </div>
        <button
          onClick={() => {
            if (isEditing) {
              setIsEditing(false);
            } else {
              setEditForm({
                sku: variant.sku,
                price: variant.price,
                stock: variant.stock,
                images: []
              });
              setIsEditing(true);
            }
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#FFC633] text-gray-900 rounded-lg hover:bg-[#FFD666]"
        >
          {isEditing ? (
            <>
              <X className="w-4 h-4" />
              Cancel
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4" />
              Edit Variant
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Images */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Images</h4>
            <div className="grid grid-cols-2 gap-4">
              {variant.images.length > 0 ? (
                variant.images.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-50">
                    <Image
                      src={image}
                      alt={`${variant.sku} - ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-2 aspect-square rounded-lg bg-gray-50 flex items-center justify-center">
                  <Package className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>
            {isEditing && (
              <div className="mt-4">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setEditForm(prev => ({ ...prev, images: files }));
                  }}
                  className="w-full"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white p-6 rounded-xl border border-gray-100">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Basic Information</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">SKU</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.sku}
                    onChange={(e) => setEditForm(prev => ({ ...prev, sku: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                ) : (
                  <p className="text-gray-900">{variant.sku}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Price</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={editForm.price}
                    onChange={(e) => setEditForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                ) : (
                  <p className="text-gray-900">${variant.price.toFixed(2)}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-1">Stock</label>
                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <input
                      type="number"
                      value={editForm.stock}
                      onChange={(e) => setEditForm(prev => ({ ...prev, stock: Number(e.target.value) }))}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  ) : (
                    <>
                      <p className={`text-gray-900 ${variant.stock < 10 ? 'text-yellow-600' : ''}`}>
                        {variant.stock}
                      </p>
                      {variant.stock < 10 && (
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="bg-white p-6 rounded-xl border border-gray-100">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Options</h4>
            <div className="flex flex-wrap gap-2">
              {variant.productOptions.map((option) => (
                <span
                  key={option.id}
                  className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm"
                >
                  {option.name}
                </span>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-white p-6 rounded-xl border border-gray-100">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Product Information</h4>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                Product Name: <span className="text-gray-900">{variant.product.name}</span>
              </p>
              <p className="text-sm text-gray-500">
                Description: <span className="text-gray-900">{variant.product.description}</span>
              </p>
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-4 py-2 bg-[#FFC633] text-gray-900 rounded-lg hover:bg-[#FFD666]"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}