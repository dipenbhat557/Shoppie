"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProduct } from "@/fetchers/product/mutation";
import { useBrands, useCategories } from "@/fetchers/product/queries";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { Plus } from "lucide-react";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  brandId: z.string().min(1, "Brand is required"),
  categoryId: z.string().min(1, "Category is required"),
  saleId: z.string().optional(),
  image: z.any().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface OptionGroup {
  name: string;
  options: string[];
}

export function ProductInfo() {
  const createProduct = useCreateProduct();
  const { data: brands, isLoading: brandsLoading } = useBrands();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [optionGroups, setOptionGroups] = useState<OptionGroup[]>([]);

  const addOptionGroup = () => {
    setOptionGroups(prev => [...prev, { name: '', options: [] }]); // Initialize with empty options array
  };

  const removeOptionGroup = (groupIndex: number) => {
    setOptionGroups(prev => prev.filter((_, i) => i !== groupIndex));
  };

  const addOption = (groupIndex: number) => {
    setOptionGroups(prev => {
      const newGroups = [...prev];
      newGroups[groupIndex].options.push('');
      return newGroups;
    });
  };

  const removeOption = (groupIndex: number, optionIndex: number) => {
    setOptionGroups(prev => {
      const newGroups = [...prev];
      newGroups[groupIndex].options = newGroups[groupIndex].options.filter((_, i) => i !== optionIndex);
      return newGroups;
    });
  };

  const updateGroupName = (groupIndex: number, name: string) => {
    setOptionGroups(prev => {
      const newGroups = [...prev];
      newGroups[groupIndex].name = name;
      return newGroups;
    });
  };

  const updateOptionValue = (groupIndex: number, optionIndex: number, value: string) => {
    setOptionGroups(prev => {
      const newGroups = [...prev];
      newGroups[groupIndex].options[optionIndex] = value;
      return newGroups;
    });
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      const response = await createProduct.mutateAsync({
        ...data,
        image: selectedImage || undefined,
        optionGroups: optionGroups.map(group => ({
          name: group.name,
          options: group.options.filter(opt => opt.trim() !== '')
        }))
      });
      toast.success("Product created successfully");
      router.push(`/products/${response.id}`);
    } catch (error) {
      // Error handled by mutation
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Add this to clean up the preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  if (brandsLoading || categoriesLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-[#FFC633] animate-spin" />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-5xl mx-auto space-y-8"
    >
      {/* Basic Product Information */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-6">
          <div className="h-8 w-2 bg-[#FFC633] rounded-full" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Basic Information
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>
            <input
              {...register("name")}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50 transition-colors"
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-500 flex items-center">
                <span className="h-1 w-1 bg-red-500 rounded-full mr-2" />
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50 transition-colors resize-none"
              placeholder="Enter product description"
            />
            {errors.description && (
              <p className="mt-2 text-sm text-red-500 flex items-center">
                <span className="h-1 w-1 bg-red-500 rounded-full mr-2" />
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Brand Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand
            </label>
            <select
              {...register("brandId")}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50 transition-colors appearance-none bg-white"
            >
              <option value="">Select Brand</option>
              {brands?.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
            {errors.brandId && (
              <p className="mt-2 text-sm text-red-500 flex items-center">
                <span className="h-1 w-1 bg-red-500 rounded-full mr-2" />
                {errors.brandId.message}
              </p>
            )}
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              {...register("categoryId")}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50 transition-colors appearance-none bg-white"
            >
              <option value="">Select Category</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="mt-2 text-sm text-red-500 flex items-center">
                <span className="h-1 w-1 bg-red-500 rounded-full mr-2" />
                {errors.categoryId.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Add Image Upload Section */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-6">
          <div className="h-8 w-2 bg-[#FFC633] rounded-full" />
          <h2 className="text-2xl font-semibold text-gray-800">
            Product Image
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              {imagePreview ? (
                <div className="relative w-full h-full">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-contain p-4"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedImage(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG or WebP (MAX. 800x400px)</p>
                </div>
              )}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Option Groups Section - Updated UI */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-2 bg-[#FFC633] rounded-full" />
            <h2 className="text-2xl font-semibold text-gray-800">Product Options</h2>
          </div>
          <button
            type="button"
            onClick={addOptionGroup}
            className="flex items-center gap-2 px-4 py-2 bg-[#FFC633] text-gray-900 rounded-lg hover:bg-[#FFD666]"
          >
            <Plus className="w-4 h-4" />
            Add Option Group
          </button>
        </div>

        <div className="space-y-6">
          {optionGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="border rounded-lg p-6 space-y-4 bg-gray-50">
              {/* Option Group Header */}
              <div className="flex items-center justify-between pb-4 border-b">
                <div className="flex-1">
                  <input
                    type="text"
                    value={group.name}
                    onChange={(e) => updateGroupName(groupIndex, e.target.value)}
                    placeholder="Option Group Name (e.g., Size, Color)"
                    className="w-full px-4 py-2 bg-white border rounded-lg focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeOptionGroup(groupIndex)}
                  className="ml-2 p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Options List */}
              <div className="space-y-3">
                {group.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex gap-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updateOptionValue(groupIndex, optionIndex, e.target.value)}
                      placeholder={`Option value (e.g., Small, Red)`}
                      className="flex-1 px-4 py-2 bg-white border rounded-lg focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50"
                    />
                    <button
                      type="button"
                      onClick={() => removeOption(groupIndex, optionIndex)}
                      className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Add Option Button */}
                <button
                  type="button"
                  onClick={() => addOption(groupIndex)}
                  className="mt-2 flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Option
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || brandsLoading || categoriesLoading}
          className="px-8 py-3 bg-[#FFC633] text-gray-900 rounded-lg hover:bg-[#FFD666] transition-colors font-semibold shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create Product"
          )}
        </button>
      </div>
    </form>
  );
}
