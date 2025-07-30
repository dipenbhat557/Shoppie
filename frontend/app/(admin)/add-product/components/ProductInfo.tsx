"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateProduct } from "@/fetchers/product/mutation";
import { useBrands, useCategories } from "@/fetchers/product/queries";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  brandId: z.string().min(1, "Brand is required").transform(val => parseInt(val, 10)),
  categoryId: z.string().min(1, "Category is required").transform(val => parseInt(val, 10)),
  saleId: z.string().optional().transform(val => val ? parseInt(val, 10) : undefined),
});

type ProductFormData = z.infer<typeof productSchema>;

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

  const onSubmit = async (data: ProductFormData) => {
    try {
      const product = await createProduct.mutateAsync(data);
      toast.success("Product created successfully");
      router.push(`/products/${product.id}`);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

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
