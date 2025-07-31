"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Plus,
  Package,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useProducts } from "@/fetchers/product/queries";
import { useDeleteProduct } from "@/fetchers/product/mutation";
import { Button } from "@/components/ui/button";

export const ProductList = () => {
  const router = useRouter();
  const { data: products, isLoading } = useProducts();
  const deleteProduct = useDeleteProduct();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products?.filter(product => {
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.brand.name.toLowerCase().includes(searchLower) ||
      product.category.name.toLowerCase().includes(searchLower)
    );
  });

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleAllProducts = () => {
    setSelectedProducts((prev) =>
      prev.length === products?.length
        ? []
        : (products?.map((p) => p.id) || [])
    );
  };

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct.mutateAsync(productId);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFC633]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-2 bg-[#FFC633] rounded-full" />
          <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
        </div>

        <Button 
          className="bg-[#FFC633] text-gray-900 hover:bg-[#FFD666]"
          onClick={() => router.push('/add-product')}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {/* Search and Filter Section */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative flex-1">
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

          {/* Bulk Actions */}
          {selectedProducts.length > 0 && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">
                {selectedProducts.length} items selected
              </span>
              <button className="text-sm text-red-600 hover:text-red-700">
                Delete Selected
              </button>
            </div>
          )}

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 p-4 border border-gray-200 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
              <select className="px-3 py-2 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50">
                <option value="">All Categories</option>
                {/* Add categories */}
              </select>
              <select className="px-3 py-2 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50">
                <option value="">All Brands</option>
                {/* Add brands */}
              </select>
              <select className="px-3 py-2 rounded-lg border border-gray-200 focus:border-[#FFC633] focus:ring focus:ring-[#FFC633] focus:ring-opacity-50">
                <option value="">Has Variants</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          )}
        </div>

        {/* Products Table or Empty State */}
        {filteredProducts && filteredProducts.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedProducts.length === products?.length}
                        onChange={toggleAllProducts}
                        className="rounded border-gray-300 text-[#FFC633] focus:ring-[#FFC633]"
                      />
                    </th>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Brand</th>
                    <th className="px-6 py-4">Variants</th>
                    <th className="px-6 py-4">Reviews</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts?.map((product) => (
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
                          onClick={(e) => e.stopPropagation()}
                        />
                      </td>
                      <td
                        className="px-6 py-4 cursor-pointer"
                        onClick={() => handleProductClick(product.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-lg bg-gray-100 relative overflow-hidden">
                            {product.imageUrl ? (
                              <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <Package className="w-6 h-6 text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 flex items-center gap-2">
                              {product.name}
                              <ExternalLink className="w-4 h-4 text-gray-400" />
                            </div>
                            <div className="text-xs text-gray-500 line-clamp-1">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">{product.category.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">{product.brand.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          {product.variants.length} variants
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full text-xs flex items-center gap-1 w-fit">
                          <Star className="w-3 h-3" />
                          {product.reviews.length}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProductClick(product.id);
                            }}
                          >
                            <Edit2 className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteProduct(product.id);
                            }}
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

            {/* Pagination */}
            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">{filteredProducts?.length || 0}</span> of{" "}
                  <span className="font-medium">{products?.length || 0}</span> results
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 border rounded-lg text-gray-600 hover:bg-gray-50">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-2 border rounded-lg text-gray-600 hover:bg-gray-50">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12 px-4">
            <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">
              {searchQuery
                ? "No products found matching your search."
                : "No products found. Add your first product!"}
            </p>
            <Button 
              className="bg-[#FFC633] text-gray-900 hover:bg-[#FFD666] mt-4"
              onClick={() => router.push('/add-product')}
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Product
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};