"use client";

import { useState } from "react";
import { useStore } from "@/fetchers/store/queries";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  User,
  Package,
  ArrowLeft,
  Edit,
  DollarSign,
  AlertTriangle,
  Search,
  ArrowUpDown,
  Filter,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StoreForm } from "../components/StoreForm";

export default function StorePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: store, isLoading } = useStore(parseInt(params.id));
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: "name" | "sku" | "stock" | "price";
    direction: "asc" | "desc";
  }>({ key: "name", direction: "asc" });
  const [filters, setFilters] = useState({
    lowStock: false,
    inStock: false,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="p-8">
        <h1>Store not found</h1>
      </div>
    );
  }

  const lowStockItems = store.variants.filter((v) => v.stock < 10);
  const totalValue = store.variants.reduce(
    (sum, v) => sum + v.price * v.stock,
    0
  );

  // Filter and sort variants
  const filteredVariants = store.variants
    .filter((variant) => {
      const matchesSearch =
        variant.product.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        variant.sku.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilters =
        (!filters.lowStock && !filters.inStock) ||
        (filters.lowStock && variant.stock < 10) ||
        (filters.inStock && variant.stock >= 10);

      return matchesSearch && matchesFilters;
    })
    .sort((a, b) => {
      const direction = sortConfig.direction === "asc" ? 1 : -1;
      switch (sortConfig.key) {
        case "name":
          return direction * a.product.name.localeCompare(b.product.name);
        case "sku":
          return direction * a.sku.localeCompare(b.sku);
        case "stock":
          return direction * (a.stock - b.stock);
        case "price":
          return direction * (a.price - b.price);
        default:
          return 0;
      }
    });

  const handleSort = (key: typeof sortConfig.key) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="h-8 w-2 bg-[#FFC633] rounded-full" />
          <h1 className="text-2xl font-semibold text-gray-900">{store.name}</h1>
        </div>

        <Button variant="outline" onClick={() => setShowEditDialog(true)}>
          <Edit className="w-4 h-4 mr-2" />
          Edit Store
        </Button>
      </div>

      {/* Store Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Location & Contact */}
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-gray-400" />
            <div>
              <h3 className="font-medium text-gray-900">Location</h3>
              <div className="mt-2 space-y-1 text-gray-600">
                {store.location.houseNo && <div>{store.location.houseNo}</div>}
                {store.location.street && <div>{store.location.street}</div>}
                <div>
                  {store.location.city}, {store.location.state}{" "}
                  {store.location.pinCode}
                </div>
                {store.location.landmark && (
                  <div className="text-gray-500">{store.location.landmark}</div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <div>
              <h3 className="font-medium text-gray-900">Contact</h3>
              <div className="mt-2 text-gray-600">{store.contact}</div>
            </div>
          </div>
        </div>

        {/* Manager Info */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-start space-x-3">
            <User className="w-5 h-5 text-gray-400" />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">Store Manager</h3>
              <div className="mt-4 flex items-center space-x-4">
                <div className="relative h-16 w-16 rounded-full overflow-hidden">
                  <Image
                    src={store.manager.profileUrl}
                    alt={`${store.manager.firstName} ${store.manager.lastName}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {store.manager.firstName} {store.manager.lastName}
                  </div>
                  <div className="text-gray-500">{store.manager.email}</div>
                  <div className="text-gray-500">{store.manager.phoneNo}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-600">Total Items</div>
            <Package className="w-5 h-5 text-[#FFC633]" />
          </div>
          <div className="mt-2 text-2xl font-semibold">
            {store.variants.length}
          </div>
          <div className="mt-1 text-sm text-gray-500">Product Variants</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-600">
              Inventory Value
            </div>
            <DollarSign className="w-5 h-5 text-[#FFC633]" />
          </div>
          <div className="mt-2 text-2xl font-semibold">
            ${totalValue.toFixed(2)}
          </div>
          <div className="mt-1 text-sm text-gray-500">Total Stock Value</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-600">
              Low Stock Items
            </div>
            <AlertTriangle
              className={`w-5 h-5 ${
                lowStockItems.length > 0 ? "text-red-500" : "text-green-500"
              }`}
            />
          </div>
          <div className="mt-2 text-2xl font-semibold">
            {lowStockItems.length}
          </div>
          <div className="mt-1 text-sm text-gray-500">
            Items Below Threshold
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Inventory</h2>
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Stock Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={filters.lowStock}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({ ...prev, lowStock: checked }))
                    }
                  >
                    Low Stock Items
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={filters.inStock}
                    onCheckedChange={(checked) =>
                      setFilters((prev) => ({ ...prev, inStock: checked }))
                    }
                  >
                    In Stock Items
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Sort */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    Sort by
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleSort("name")}>
                    Product Name
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort("sku")}>
                    SKU
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort("stock")}>
                    Stock Level
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleSort("price")}>
                    Price
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVariants.map((variant) => (
              <TableRow key={variant.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="relative h-10 w-10 rounded overflow-hidden">
                      <Image
                        src={variant.product.imageUrl}
                        alt={variant.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="font-medium">{variant.product.name}</div>
                  </div>
                </TableCell>
                <TableCell className="font-mono">{variant.sku}</TableCell>
                <TableCell className="text-right">
                  ${variant.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">{variant.stock}</TableCell>
                <TableCell>
                  {variant.stock < 10 ? (
                    <Badge variant="destructive">Low Stock</Badge>
                  ) : (
                    <Badge variant="default">In Stock</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}

            {filteredVariants.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-gray-500"
                >
                  No products found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Store Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Store</DialogTitle>
          </DialogHeader>
          <StoreForm store={store} onSuccess={() => setShowEditDialog(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
