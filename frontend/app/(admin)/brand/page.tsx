"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Search, ArrowUpDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";
import { useBrands } from "@/fetchers/brand/queries";
import {
  useCreateBrand,
  useUpdateBrand,
  useDeleteBrand,
} from "@/fetchers/brand/mutation";

export interface Brand {
  id: number;
  name: string;
  logoUrl: string;
}

export default function BrandsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const { data: brands, isLoading } = useBrands();
  const createBrand = useCreateBrand();
  const updateBrand = useUpdateBrand();
  const deleteBrand = useDeleteBrand();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || (!selectedBrand && !logo)) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      if (selectedBrand) {
        await updateBrand.mutateAsync({
          id: selectedBrand.id,
          name,
          logo: logo || undefined,
        });
      } else {
        await createBrand.mutateAsync({
          name,
          logo: logo!,
        });
      }
      resetForm();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (brand: Brand) => {
    if (window.confirm("Are you sure you want to delete this brand?")) {
      try {
        await deleteBrand.mutateAsync(brand.id);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const resetForm = () => {
    setIsOpen(false);
    setSelectedBrand(null);
    setName("");
    setLogo(null);
    setLogoPreview("");
  };

  const handleEdit = (brand: Brand) => {
    setSelectedBrand(brand);
    setName(brand.name);
    setLogoPreview(brand.logoUrl);
    setIsOpen(true);
  };

  const filteredAndSortedBrands = brands
    ? brands
        .filter((brand) =>
          brand.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
          const comparison = a.name.localeCompare(b.name);
          return sortOrder === "asc" ? comparison : -comparison;
        })
    : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-2 bg-[#FFC633] rounded-full" />
          <h1 className="text-2xl font-semibold text-gray-900">Brands</h1>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#FFC633] text-gray-900 hover:bg-[#FFD666]">
              <Plus className="w-5 h-5 mr-2" />
              Add Brand
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedBrand ? "Edit Brand" : "Add New Brand"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand Name
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter brand name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo
                </label>
                <div className="space-y-4">
                  {logoPreview && (
                    <div className="relative h-40 w-full rounded-lg overflow-hidden">
                      <Image
                        src={logoPreview}
                        alt="Preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#FFC633] text-gray-900 hover:bg-[#FFD666]"
                >
                  {selectedBrand ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search brands..."
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="flex items-center space-x-2"
        >
          <span>Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}</span>
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredAndSortedBrands.length > 0 ? (
            filteredAndSortedBrands.map((brand) => (
              <div
                key={brand.id}
                className="p-6 flex items-center space-x-6 hover:bg-gray-50 transition-colors"
              >
                <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                  <Image
                    src={brand.logoUrl}
                    alt={brand.name}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {brand.name}
                  </h3>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(brand)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(brand)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {searchQuery
                  ? "No brands found matching your search."
                  : "No brands found. Create your first brand!"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
