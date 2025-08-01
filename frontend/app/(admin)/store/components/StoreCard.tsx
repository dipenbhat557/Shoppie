"use client";

import { useState } from "react";
import { Store } from "@/fetchers/store/queries";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Phone,
  User,
  Package,
  ChevronRight,
  Store as StoreIcon,
  Trash2,
  Pencil,
  ArrowUpDown,
  Search,
} from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { StoreForm } from "./StoreForm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StoreCardProps {
  store: Store;
  onView: (id: number) => void;
  onDelete: (store: Store) => void;
}

export function StoreCard({ store, onView, onDelete }: StoreCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: "name" | "sku" | "stock" | "price";
    direction: "asc" | "desc";
  }>({ key: "name", direction: "asc" });

  const filteredVariants = store.variants
    .filter(
      (variant) =>
        variant.product.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        variant.sku.toLowerCase().includes(searchQuery.toLowerCase())
    )
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
    <>
      <div className="p-6 hover:bg-gray-50 transition-colors">
        <div className="flex items-start justify-between">
          <div className="space-y-4 flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <StoreIcon className="w-5 h-5 mr-2 text-[#FFC633]" />
                  {store.name}
                </h3>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <Phone className="w-4 h-4 mr-1" />
                  {store.contact}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowInventory(!showInventory)}
                >
                  <Package className="w-4 h-4 mr-1" />
                  Inventory
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(store.id)}
                >
                  View Details
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowEditDialog(true)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => onDelete(store)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Location Info */}
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                <div>
                  <div className="text-sm font-medium text-gray-700">
                    Location
                  </div>
                  <div className="text-sm text-gray-600">
                    {store.location.street && (
                      <div>{store.location.street}</div>
                    )}
                    <div>
                      {store.location.city}, {store.location.state}{" "}
                      {store.location.pinCode}
                    </div>
                    {store.location.landmark && (
                      <div className="text-gray-500">
                        {store.location.landmark}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Manager Info */}
              <div className="flex items-start space-x-2">
                <User className="w-4 h-4 text-gray-400 mt-1" />
                <div>
                  <div className="text-sm font-medium text-gray-700">
                    Manager
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative h-6 w-6 rounded-full overflow-hidden">
                      <Image
                        src={store.manager.profileUrl}
                        alt={`${store.manager.firstName} ${store.manager.lastName}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="text-sm">
                      <div className="text-gray-600">
                        {store.manager.firstName} {store.manager.lastName}
                      </div>
                      <div className="text-gray-500">{store.manager.email}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inventory Summary */}
              <div className="flex items-start space-x-2">
                <Package className="w-4 h-4 text-gray-400 mt-1" />
                <div>
                  <div className="text-sm font-medium text-gray-700">
                    Inventory
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-600">
                      {store.variants.length} Product Variants
                    </div>
                    <div className="flex items-center space-x-2">
                      {store.variants.some((v) => v.stock < 10) ? (
                        <Badge variant="destructive">Low Stock Items</Badge>
                      ) : (
                        <Badge variant="default">Stock Healthy</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inventory Details */}
            {showInventory && (
              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <div className="mb-4 flex items-center justify-between">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by product name or SKU..."
                      className="pl-10"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          Sort by
                          <ArrowUpDown className="ml-2 h-4 w-4" />
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

                <div className="divide-y divide-gray-200">
                  {filteredVariants.map((variant) => (
                    <div
                      key={variant.id}
                      className="py-3 flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative h-10 w-10 rounded overflow-hidden">
                          <Image
                            src={variant.product.imageUrl}
                            alt={variant.product.name}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div>
                          <div className="font-medium">
                            {variant.product.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            SKU: {variant.sku}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-medium">
                            ${variant.price.toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-500">
                            Stock: {variant.stock}
                          </div>
                        </div>
                        <Badge
                          variant={
                            variant.stock < 10 ? "destructive" : "default"
                          }
                        >
                          {variant.stock < 10 ? "Low Stock" : "In Stock"}
                        </Badge>
                      </div>
                    </div>
                  ))}

                  {filteredVariants.length === 0 && (
                    <div className="py-8 text-center text-gray-500">
                      No products found matching your search.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
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
    </>
  );
}
