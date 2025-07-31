 "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProducts } from "@/fetchers/product/queries";
import { useCreateSale } from "@/fetchers/sale/mutations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ArrowLeft,
  Search,
  Plus,
  Trash2,
  CalendarRange,
  Percent,
} from "lucide-react";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const createSaleSchema = z.object({
  description: z.string().min(1, "Description is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  discount: z.number().min(0, "Discount must be positive"),
  isPercentage: z.boolean(),
  imageUrl: z.string().min(1, "Image URL is required"),
  productIds: z.array(z.string()).min(1, "At least one product is required"),
});

type CreateSaleValues = z.infer<typeof createSaleSchema>;

export default function CreateSalePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: products } = useProducts();
  const createSale = useCreateSale();

  const form = useForm<CreateSaleValues>({
    resolver: zodResolver(createSaleSchema),
    defaultValues: {
      description: "",
      startDate: "",
      endDate: "",
      discount: 0,
      isPercentage: true,
      imageUrl: "",
      productIds: [],
    },
  });

  const selectedProductIds = form.watch("productIds");
  const discount = form.watch("discount");
  const isPercentage = form.watch("isPercentage");

  const filteredProducts = products?.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateDiscountedPrice = (price: number) => {
    if (isPercentage) {
      return price - (price * discount) / 100;
    }
    return Math.max(0, price - discount);
  };

  const onSubmit = async (data: CreateSaleValues) => {
    try {
      await createSale.mutateAsync({
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
      });
      router.push("/sale");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-2 bg-[#FFC633] rounded-full" />
            <h1 className="text-2xl font-semibold text-gray-900">Create Sale</h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sale Details Form */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sale Description</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter sale description" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="discount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount Amount</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isPercentage"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                          <FormLabel>Percentage Discount</FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Banner Image URL</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter banner image URL" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-[#FFC633] text-gray-900 hover:bg-[#FFD666]"
                  disabled={createSale.isPending}
                >
                  Create Sale
                </Button>
              </form>
            </Form>
          </div>

          {/* Selected Products Preview */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Selected Products ({selectedProductIds.length})
            </h2>
            <div className="space-y-4">
              {products
                ?.filter((p) => selectedProductIds.includes(p.id))
                .map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative h-12 w-12 rounded overflow-hidden">
                        <Image
                          src={product.imageUrl || ""}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          form.setValue(
                            "productIds",
                            selectedProductIds.filter((id) => id !== product.id)
                          );
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}

              {selectedProductIds.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No products selected. Select products from the list.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Selection */}
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="pl-10"
              />
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredProducts?.map((product) => (
              <div
                key={product.id}
                className="py-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative h-16 w-16 rounded overflow-hidden">
                    <Image
                      src={product.imageUrl || ""}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-500">
                      {product.description}
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newIds = selectedProductIds.includes(product.id)
                      ? selectedProductIds.filter((id) => id !== product.id)
                      : [...selectedProductIds, product.id];
                    form.setValue("productIds", newIds);
                  }}
                >
                  {selectedProductIds.includes(product.id) ? (
                    "Remove"
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-1" />
                      Add
                    </>
                  )}
                </Button>
              </div>
            ))}

            {filteredProducts?.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No products found matching your search.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}