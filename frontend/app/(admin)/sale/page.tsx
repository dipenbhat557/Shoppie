"use client";

import { useState } from "react";
import { Plus, Search, CalendarRange, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSales } from "@/fetchers/sale/queries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SaleCard } from "./components/SaleCard";
import { useRouter } from "next/navigation";

export default function SalePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "upcoming" | "ended"
  >("all");

  const { data: sales, isLoading } = useSales();

  const filteredSales = sales
    ? sales
        .filter((sale) =>
          sale.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter((sale) => {
          const now = new Date();
          switch (statusFilter) {
            case "active":
              return now >= sale.startDate && now <= sale.endDate;
            case "upcoming":
              return now < sale.startDate;
            case "ended":
              return now > sale.endDate;
            default:
              return true;
          }
        })
        .sort((a, b) => {
          // Sort by status (active first, then upcoming, then ended)
          const now = new Date();
          const aStatus =
            now >= a.startDate && now <= a.endDate
              ? 0
              : now < a.startDate
              ? 1
              : 2;
          const bStatus =
            now >= b.startDate && now <= b.endDate
              ? 0
              : now < b.startDate
              ? 1
              : 2;
          if (aStatus !== bStatus) return aStatus - bStatus;

          // Then sort by start date
          return (
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
          );
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-2 bg-[#FFC633] rounded-full" />
          <h1 className="text-2xl font-semibold text-gray-900">Sales</h1>
        </div>

        <Button
          className="bg-[#FFC633] text-gray-900 hover:bg-[#FFD666]"
          onClick={() => router.push("/sale/create")}
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Sale
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sales..."
              className="pl-10"
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(value: typeof statusFilter) =>
              setStatusFilter(value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sales</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="ended">Ended</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-600">
                Active Sales
              </div>
              <Percent className="w-5 h-5 text-[#FFC633]" />
            </div>
            <div className="mt-2 text-2xl font-semibold">
              {
                filteredSales.filter(
                  (sale) =>
                    new Date() >= sale.startDate && new Date() <= sale.endDate
                ).length
              }
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-600">
                Upcoming Sales
              </div>
              <CalendarRange className="w-5 h-5 text-[#FFC633]" />
            </div>
            <div className="mt-2 text-2xl font-semibold">
              {
                filteredSales.filter((sale) => new Date() < sale.startDate)
                  .length
              }
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-600">
                Total Sales
              </div>
              <CalendarRange className="w-5 h-5 text-[#FFC633]" />
            </div>
            <div className="mt-2 text-2xl font-semibold">
              {filteredSales.length}
            </div>
          </div>
        </div>
      </div>

      {/* Sales Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSales.map((sale) => (
          <SaleCard key={sale.id} sale={sale} />
        ))}

        {filteredSales.length === 0 && (
          <div className="col-span-full">
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">
                {searchQuery
                  ? "No sales found matching your search."
                  : "No sales found. Create your first sale!"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
