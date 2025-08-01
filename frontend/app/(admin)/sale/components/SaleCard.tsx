"use client";

import { Sale } from "@/fetchers/sale/queries";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CalendarRange,
  Pencil,
  Trash2,
  Package,
  Percent,
} from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SaleForm } from "./SaleForm";
import { useDeleteSale } from "@/fetchers/sale/mutations";

interface SaleCardProps {
  sale: Sale;
}

export function SaleCard({ sale }: SaleCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const deleteSale = useDeleteSale();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this sale?")) {
      try {
        await deleteSale.mutateAsync(sale.id);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const now = new Date();
  const status =
    now >= sale.startDate && now <= sale.endDate
      ? "active"
      : now < sale.startDate
      ? "upcoming"
      : "ended";

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Sale Image */}
        <div className="relative h-48 w-full">
          <Image
            src={sale.imageUrl}
            alt={sale.description}
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute top-4 right-4 flex space-x-2">
            <Badge
              variant={
                status === "active"
                  ? "default"
                  : status === "upcoming"
                  ? "secondary"
                  : "outline"
              }
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
            <Badge variant={sale.isPercentage ? "default" : "secondary"}>
              {sale.isPercentage ? `${sale.discount}% Off` : `$${sale.discount} Off`}
            </Badge>
          </div>
        </div>

        {/* Sale Details */}
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            {sale.description}
          </h3>

          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-500">
              <CalendarRange className="w-4 h-4 mr-2" />
              <span>
                {format(sale.startDate, "MMM d, yyyy")} -{" "}
                {format(sale.endDate, "MMM d, yyyy")}
              </span>
            </div>

            <div className="flex items-center text-sm text-gray-500">
              <Package className="w-4 h-4 mr-2" />
              <span>{sale.products.length} Products</span>
            </div>

            <div className="flex items-center text-sm text-gray-500">
              <Percent className="w-4 h-4 mr-2" />
              <span>
                {sale.isPercentage
                  ? `${sale.discount}% discount`
                  : `$${sale.discount} discount`}
              </span>
            </div>
          </div>

          {/* Product Preview */}
          {sale.products.length > 0 && (
            <div className="mt-4">
              <div className="text-sm font-medium text-gray-700 mb-2">
                Featured Products
              </div>
              <div className="flex space-x-2">
                {sale.products.slice(0, 3).map((product) => (
                  <div
                    key={product.id}
                    className="relative h-12 w-12 rounded overflow-hidden"
                  >
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ))}
                {sale.products.length > 3 && (
                  <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center text-sm text-gray-500">
                    +{sale.products.length - 3}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end space-x-2 pt-4">
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
              onClick={handleDelete}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Sale</DialogTitle>
          </DialogHeader>
          <SaleForm sale={sale} onSuccess={() => setShowEditDialog(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
} 