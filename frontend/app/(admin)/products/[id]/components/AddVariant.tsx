"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateVariant } from "@/fetchers/product/mutation";
import { useProduct, useProductOptionGroups } from "@/fetchers/product/queries";
import { Upload, X, Plus } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import type { ProductOption, ProductOptionGroup } from "@/fetchers/product/queries";

const variantSchema = z.object({
  price: z.number().min(0, "Price must be non-negative"),
  stock: z.number().min(0, "Stock must be non-negative"),
  storeId: z.number().optional(),
  optionValues: z.record(z.string(), z.string()),
});

type VariantFormData = z.infer<typeof variantSchema>;

interface AddVariantProps {
  productId: string;
  onClose: () => void;
}

export function AddVariant({ productId, onClose }: AddVariantProps) {
  const { data: optionGroups, isLoading: loadingGroups } = useProductOptionGroups(productId);
  const { data: product } = useProduct(productId);
  const createVariant = useCreateVariant();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VariantFormData>({
    resolver: zodResolver(variantSchema),
    defaultValues: {
      optionValues: {},
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedImages(prev => [...prev, ...files]);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreview(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreview(prev => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const generateSKU = (values: Record<string, string>) => {
    const optionParts = Object.entries(values)
      .map(([_, value]) => value.toUpperCase())
      .join('-');
    return `${product?.name.slice(0, 3).toUpperCase() || 'PRD'}-${optionParts}`;
  };

  const onSubmit = async (data: VariantFormData) => {
    try {
      // Validate that all option groups have a selected value
      if (optionGroups && optionGroups.length > 0) {
        const missingOptions = optionGroups.filter(
          group => !data.optionValues[group.name]
        );
        if (missingOptions.length > 0) {
          toast.error(`Please select values for: ${missingOptions.map(g => g.name).join(', ')}`);
          return;
        }
      }

      const sku = generateSKU(data.optionValues);
      
      // Convert optionValues to optionIds
      const optionIds: number[] = [];
      for (const [groupName, optionValue] of Object.entries(data.optionValues)) {
        const group = optionGroups?.find((g: ProductOptionGroup) => g.name === groupName);
        const option = group?.productOptions.find((o: ProductOption) => o.name === optionValue);
        if (option) {
          optionIds.push(option.id);
        }
      }

      if (optionIds.length === 0) {
        toast.error("Please select at least one option value");
        return;
      }

      if (selectedImages.length === 0) {
        toast.error("Please select at least one image");
        return;
      }

      await createVariant.mutateAsync({
        productId: parseInt(productId),
        sku,
        price: data.price,
        stock: data.stock,
        storeId: data.storeId,
        images: selectedImages,
        optionIds,
      });

      toast.success("Variant created successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to create variant");
      console.error(error);
    }
  };

  if (loadingGroups) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Add Variant</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Price and Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  {...register("price", { valueAsNumber: true })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter price"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  {...register("stock", { valueAsNumber: true })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter stock"
                />
                {errors.stock && (
                  <p className="mt-1 text-sm text-red-500">{errors.stock.message}</p>
                )}
              </div>
            </div>

            {/* Option Groups */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Variant Options</h3>
              
              {/* Existing Option Groups */}
              {optionGroups?.map((group: ProductOptionGroup) => (
                <div key={group.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {group.name}
                  </label>
                  <select
                    {...register(`optionValues.${group.name}`)}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="">Select {group.name}</option>
                    {group.productOptions.map((option: ProductOption) => (
                      <option key={option.id} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Images
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Click to upload images</span>
                </label>
              </div>

              {/* Image Preview */}
              {imagePreview.length > 0 && (
                <div className="mt-4 grid grid-cols-4 gap-4">
                  {imagePreview.map((preview, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        width={100}
                        height={100}
                        className="rounded-lg object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 bg-[#FFC633] text-gray-900 rounded-lg hover:bg-[#FFD666] disabled:opacity-50"
              >
                {isSubmitting ? "Creating..." : "Create Variant"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
