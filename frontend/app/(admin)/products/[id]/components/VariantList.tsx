"use client";

import { useState } from "react";
import { useProductVariants } from "@/fetchers/product/queries";
import { useCreateVariant, useUpdateVariant, useDeleteVariant } from "@/fetchers/product/mutation";
import { useProductOptionGroups } from "@/fetchers/product/queries";
import Image from "next/image";
import { Plus, X, Edit2, Save, Upload, AlertTriangle } from "lucide-react";
import { AddVariant } from "./AddVariant";

interface VariantFormData {
  sku: string;
  price: number;
  stock: number;
  storeId?: number;
  optionIds: number[];
  images: File[];
}

export function VariantList({ productId }: { productId: string }) {
  const [showAddVariant, setShowAddVariant] = useState(false);
  const { data: variants, isLoading } = useProductVariants(parseInt(productId));
  const { data: optionGroups } = useProductOptionGroups();
  const createVariant = useCreateVariant();
  const updateVariant = useUpdateVariant();
  const deleteVariant = useDeleteVariant();

  const [editingVariant, setEditingVariant] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<VariantFormData>({
    sku: "",
    price: 0,
    stock: 0,
    optionIds: [],
    images: []
  });
  const [selectedImages, setSelectedImages] = useState<{ [key: number]: File[] }>({});

  const handleSave = async () => {
    try {
      if (editingVariant) {
        await updateVariant.mutateAsync({
          id: editingVariant,
          data: {
            ...editForm,
            productId: parseInt(productId)
          }
        });
      } else {
        await createVariant.mutateAsync({
          ...editForm,
          productId: parseInt(productId)
        });
      }
      setEditingVariant(null);
      setEditForm({
        sku: "",
        price: 0,
        stock: 0,
        optionIds: [],
        images: []
      });
    } catch (error) {
      // Error handled by mutation
    }
  };

  const handleDelete = async (variantId: number) => {
    try {
      await deleteVariant.mutateAsync(variantId);
    } catch (error) {
      // Error handled by mutation
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Product Variants</h3>
          <button
            onClick={() => setShowAddVariant(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#FFC633] text-gray-900 rounded-lg hover:bg-[#FFD666] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Variant
          </button>
        </div>

        {/* Variants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {variants?.map((variant) => (
            <div
              key={variant.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
            >
              {/* Image Gallery */}
              <div className="relative h-48 bg-gray-50">
                {variant.images.length > 0 ? (
                  <Image
                    src={variant.images[0] || ""}
                    alt={variant.sku}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Upload className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>

              {editingVariant === variant.id ? (
                <div className="p-4 space-y-4">
                  <input
                    type="text"
                    value={editForm.sku}
                    onChange={(e) => setEditForm({ ...editForm, sku: e.target.value })}
                    placeholder="SKU"
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input
                        type="number"
                        value={editForm.price}
                        onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                        placeholder="Price"
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        value={editForm.stock}
                        onChange={(e) => setEditForm({ ...editForm, stock: Number(e.target.value) })}
                        placeholder="Stock"
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Option Groups */}
                  {optionGroups?.map((group: any) => (
                    <div key={group.id}>
                      <label className="block text-sm font-medium mb-1">{group.name}</label>
                      <select
                        value={editForm.optionIds.find((id) => 
                          group.productOptions.some((opt: any) => opt.id === id)
                        )}
                        onChange={(e) => {
                          const newOptionIds = editForm.optionIds.filter((id) =>
                            !group.productOptions.some((opt: any) => opt.id === id)
                          );
                          if (e.target.value) {
                            newOptionIds.push(Number(e.target.value));
                          }
                          setEditForm({ ...editForm, optionIds: newOptionIds });
                        }}
                        className="w-full px-3 py-2 border rounded-lg"
                      >
                        <option value="">Select {group.name}</option>
                        {group.productOptions.map((option: any) => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Images</label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        setEditForm({ ...editForm, images: files });
                      }}
                      className="w-full"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditingVariant(null)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-[#FFC633] text-gray-900 rounded-lg hover:bg-[#FFD666]"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{variant.sku}</h4>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingVariant(variant.id);
                          setEditForm({
                            sku: variant.sku,
                            price: variant.price,
                            stock: variant.stock,
                            optionIds: variant.productOptions.map((opt) => opt.id),
                            images: []
                          });
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(variant.id)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Price</span>
                      <span className="font-medium">${variant.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Stock</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{variant.stock}</span>
                        {variant.stock < 10 && (
                          <AlertTriangle className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {variant.productOptions.map((option) => (
                      <span
                        key={option.id}
                        className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                      >
                        {option.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {showAddVariant && (
        <AddVariant
          productId={productId}
          onClose={() => setShowAddVariant(false)}
        />
      )}
    </>
  );
}
