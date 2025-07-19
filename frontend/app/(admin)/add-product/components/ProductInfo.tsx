"use client";

import { useState } from "react";
import { Trash2, Plus, X } from "lucide-react";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mockData } from "@/data/data";

// Validation schema based on Prisma schema
const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  brandId: z.number().min(1, "Brand is required"),
  categoryId: z.number().min(1, "Category is required"),
  saleId: z.number().optional(),
  variants: z
    .array(
      z.object({
        sku: z.string().min(1, "SKU is required"),
        price: z.number().min(0, "Price must be positive"),
        stock: z.number().min(0, "Stock must be non-negative"),
        storeId: z.number().optional(),
        images: z.array(
          z.object({
            imageUrl: z.string(), // Removed URL validation since we're handling files
          })
        ),
        productOptions: z.array(
          z.object({
            optionGroupId: z.number(),
            optionId: z.number(),
          })
        ),
      })
    )
    .min(1, "At least one variant is required"),
});

type ProductFormData = z.infer<typeof productSchema>;

export function ProductInfo() {
  const [selectedImages, setSelectedImages] = useState<{
    [key: number]: File[];
  }>({});

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      variants: [
        {
          sku: "",
          price: 0,
          stock: 0,
          images: [],
          productOptions: [],
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const onSubmit = (data: ProductFormData) => {
    // Just log the form data for now
    console.log("Form Data:", data);
    console.log("Selected Images:", selectedImages);
  };

  // Rest of your component remains the same, but use mockData instead of props
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
            <div className="relative">
              <select
                {...register("brandId", { valueAsNumber: true })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50 transition-colors appearance-none bg-white"
              >
                <option value="">Select Brand</option>
                {mockData.brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            {errors.brandId && (
              <p className="mt-2 text-sm text-red-500 flex items-center">
                <span className="h-1 w-1 bg-red-500 rounded-full mr-2" />
                {errors.brandId.message}
              </p>
            )}
          </div>

          {/* Category Selection - Similar styling to Brand */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <div className="relative">
              <select
                {...register("categoryId", { valueAsNumber: true })}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50 transition-colors appearance-none bg-white"
              >
                <option value="">Select Category</option>
                {mockData.categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            {errors.categoryId && (
              <p className="mt-2 text-sm text-red-500 flex items-center">
                <span className="h-1 w-1 bg-red-500 rounded-full mr-2" />
                {errors.categoryId.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Product Variants */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-2 bg-[#FFC633] rounded-full" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Product Variants
            </h2>
          </div>
          <button
            type="button"
            onClick={() =>
              append({
                sku: "",
                price: 0,
                stock: 0,
                images: [],
                productOptions: [],
              })
            }
            className="flex items-center px-4 py-2 bg-[#FFC633] text-gray-900 rounded-lg hover:bg-[#FFD666] transition-colors font-medium shadow-sm hover:shadow"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Variant
          </button>
        </div>

        <div className="space-y-8">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="p-6 border border-gray-100 rounded-xl bg-gray-50"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Variant {index + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* SKU */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SKU
                  </label>
                  <input
                    {...register(`variants.${index}.sku`)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50 transition-colors"
                    placeholder="Enter SKU"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      {...register(`variants.${index}.price`, {
                        valueAsNumber: true,
                      })}
                      className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50 transition-colors"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock
                  </label>
                  <input
                    type="number"
                    {...register(`variants.${index}.stock`, {
                      valueAsNumber: true,
                    })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50 transition-colors"
                    placeholder="Enter stock quantity"
                  />
                </div>

                {/* Store */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store
                  </label>
                  <div className="relative">
                    <select
                      {...register(`variants.${index}.storeId`, {
                        valueAsNumber: true,
                      })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50 transition-colors appearance-none bg-white"
                    >
                      <option value="">Select Store</option>
                      {mockData.stores.map((store) => (
                        <option key={store.id} value={store.id}>
                          {store.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Options */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Product Options
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {mockData.productOptionGroups.map((group) => (
                    <div key={group.id}>
                      <label className="block text-sm text-gray-600 mb-2">
                        {group.name}
                      </label>
                      <div className="relative">
                        <select
                          {...register(
                            `variants.${index}.productOptions.${group.id}.optionId`,
                            { valueAsNumber: true }
                          )}
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50 transition-colors appearance-none bg-white"
                        >
                          <option value="">Select {group.name}</option>
                          {group.options.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Upload */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Product Images
                </label>
                <div className="p-4 border-2 border-dashed border-gray-200 rounded-lg">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      setSelectedImages((prev) => ({
                        ...prev,
                        [index]: files,
                      }));
                    }}
                    className="w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-lg file:border-0
                      file:text-sm file:font-semibold
                      file:bg-[#FFC633] file:text-gray-900
                      hover:file:bg-[#FFD666]
                      cursor-pointer"
                  />
                </div>

                {/* Image Preview */}
                <div className="mt-4 grid grid-cols-4 gap-4">
                  {selectedImages[index]?.map((file, fileIndex) => (
                    <div key={fileIndex} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${fileIndex}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newImages = [...(selectedImages[index] || [])];
                          newImages.splice(fileIndex, 1);
                          setSelectedImages((prev) => ({
                            ...prev,
                            [index]: newImages,
                          }));
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-8 py-3 bg-[#FFC633] text-gray-900 rounded-lg hover:bg-[#FFD666] transition-colors font-semibold shadow-sm hover:shadow"
        >
          Create Product
        </button>
      </div>
    </form>
  );
}
