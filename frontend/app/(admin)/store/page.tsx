"use client";

import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useStores, type Store } from "@/fetchers/store/queries";
import { useDeleteStore } from "@/fetchers/store/mutations";
import { StoreCard } from "./components/StoreCard";
import { StoreForm } from "./components/StoreForm";

export default function StoresPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const { data: stores, isLoading } = useStores();
  const deleteStore = useDeleteStore();

  const handleViewStore = (storeId: number) => {
    router.push(`/store/${storeId}`);
  };

  const handleDelete = async (store: Store) => {
    if (window.confirm("Are you sure you want to delete this store?")) {
      try {
        await deleteStore.mutateAsync(store.id);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const filteredStores = stores
    ? stores.filter(
        (store) =>
          store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          store.location.city
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          store.manager.firstName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          store.manager.lastName
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-2 bg-[#FFC633] rounded-full" />
          <h1 className="text-2xl font-semibold text-gray-900">Stores</h1>
        </div>

        <Button
          className="bg-[#FFC633] text-gray-900 hover:bg-[#FFD666]"
          onClick={() => setShowCreateDialog(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Store
        </Button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stores by name, location, or manager..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Stores List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-200">
          {filteredStores.map((store) => (
            <StoreCard
              key={store.id}
              store={store}
              onView={handleViewStore}
              onDelete={handleDelete}
            />
          ))}

          {filteredStores.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {searchQuery
                  ? "No stores found matching your search."
                  : "No stores found. Add your first store!"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Create Store Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Store</DialogTitle>
          </DialogHeader>
          <StoreForm onSuccess={() => setShowCreateDialog(false)} />
        </DialogContent>
      </Dialog>
      
    </div>
  );
}
