"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { mockProducts } from "@/data/data";

export const ProductList = () => {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const toggleProductSelection = (productId: number) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleAllProducts = () => {
    setSelectedProducts((prev) =>
      prev.length === mockProducts.length ? [] : mockProducts.map((p) => p.id)
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header Section */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
            <div className="h-8 w-2 bg-[#FFC633] rounded-full mr-3" />
            Products
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({mockProducts.length} items)
            </span>
          </h2>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:min-w-[300px]">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-lg border ${
                showFilters
                  ? "border-[#FFC633] text-[#FFC633]"
                  : "border-gray-200 text-gray-600"
              } hover:border-[#FFC633] hover:text-[#FFC633] transition-colors`}
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedProducts.length > 0 && (
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-600">
              {selectedProducts.length} items selected
            </span>
            <button className="text-sm text-blue-600 hover:text-blue-700">
              Edit Selected
            </button>
            <button className="text-sm text-red-600 hover:text-red-700">
              Delete Selected
            </button>
          </div>
        )}

        {/* Filters Section */}
        {showFilters && (
          <div className="mt-4 p-4 border border-gray-200 rounded-lg grid grid-cols-1 md:grid-cols-4 gap-4">
            <select className="px-3 py-2 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50">
              <option>All Categories</option>
              {/* Add categories */}
            </select>
            <select className="px-3 py-2 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50">
              <option>All Brands</option>
              {/* Add brands */}
            </select>
            <select className="px-3 py-2 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50">
              <option>Status</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
            <select className="px-3 py-2 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50">
              <option>Price Range</option>
              {/* Add price ranges */}
            </select>
          </div>
        )}
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-4">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === mockProducts.length}
                  onChange={toggleAllProducts}
                  className="rounded border-gray-300 text-[#FFC633] focus:ring-[#FFC633]"
                />
              </th>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">SKU</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {mockProducts.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => toggleProductSelection(product.id)}
                    className="rounded border-gray-300 text-[#FFC633] focus:ring-[#FFC633]"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gray-100 relative overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {product.brand}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{product.sku}</td>
                <td className="px-6 py-4 text-gray-600">{product.category}</td>
                <td className="px-6 py-4 font-medium">${product.price}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{product.stock}</span>
                    <span className="text-xs text-gray-500">
                      in {product.variants} variants
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.stock > 10
                        ? "bg-green-100 text-green-700"
                        : product.stock > 0
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                      <Edit2 className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
        <div className="flex-1 flex justify-between sm:hidden">
          <button className="px-3 py-1 border rounded-md text-sm">
            Previous
          </button>
          <button className="px-3 py-1 border rounded-md text-sm">Next</button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">10</span> of{" "}
              <span className="font-medium">{mockProducts.length}</span> results
            </p>
          </div>
          <div>
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <ChevronLeft className="w-4 h-4" />
              </button>
              {/* Add page numbers */}
              <button className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <ChevronRight className="w-4 h-4" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
