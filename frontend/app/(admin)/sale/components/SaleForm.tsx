"use client";

import { useState } from "react";
import { Sale } from "@/fetchers/sale/queries";
import { useCreateSale, useUpdateSale } from "@/fetchers/sale/mutations";
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
import { format } from "date-fns";
import { useProducts } from "@/fetchers/product/queries";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

interface SaleFormProps {
  sale?: Sale;
  onSuccess: () => void;
}

const saleFormSchema = z.object({
  description: z.string().min(1, "Description is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  discount: z.number().min(0, "Discount must be positive"),
  isPercentage: z.boolean(),
  imageUrl: z.string().min(1, "Image URL is required"),
  productIds: z.array(z.string()).min(1, "At least one product is required"),
});

type SaleFormValues = z.infer<typeof saleFormSchema>;

export function SaleForm({ sale, onSuccess }: SaleFormProps) {
  const [open, setOpen] = useState(false);
  const { data: products } = useProducts();
  const createSale = useCreateSale();
  const updateSale = useUpdateSale();

  const form = useForm<SaleFormValues>({
    resolver: zodResolver(saleFormSchema),
    defaultValues: {
      description: sale?.description || "",
      startDate: sale ? format(sale.startDate, "yyyy-MM-dd") : "",
      endDate: sale ? format(sale.endDate, "yyyy-MM-dd") : "",
      discount: sale?.discount || 0,
      isPercentage: sale?.isPercentage ?? true,
      imageUrl: sale?.imageUrl || "",
      productIds: sale?.products.map((p) => p.id) || [],
    },
  });

  const onSubmit = async (data: SaleFormValues) => {
    try {
      if (sale) {
        await updateSale.mutateAsync({
          id: sale.id,
          ...data,
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
        });
      } else {
        await createSale.mutateAsync({
          ...data,
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
        });
      }
      onSuccess();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const selectedProducts = form.watch("productIds");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter sale description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount</FormLabel>
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

        <FormField
          control={form.control}
          name="productIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Products</FormLabel>
              <FormControl>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                    >
                      {selectedProducts.length > 0
                        ? `${selectedProducts.length} products selected`
                        : "Select products"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search products..." />
                      <CommandEmpty>No products found.</CommandEmpty>
                      <CommandGroup className="max-h-64 overflow-auto">
                        {products?.map((product) => (
                          <CommandItem
                            key={product.id}
                            value={product.name}
                            onSelect={() => {
                              const newIds = selectedProducts.includes(product.id)
                                ? selectedProducts.filter((id) => id !== product.id)
                                : [...selectedProducts, product.id];
                              form.setValue("productIds", newIds);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedProducts.includes(product.id)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {product.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <div className="flex flex-wrap gap-2 mt-2">
                {products
                  ?.filter((p) => selectedProducts.includes(p.id))
                  .map((product) => (
                    <Badge
                      key={product.id}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => {
                        form.setValue(
                          "productIds",
                          selectedProducts.filter((id) => id !== product.id)
                        );
                      }}
                    >
                      {product.name} ×
                    </Badge>
                  ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-3">
          <Button
            type="submit"
            className="bg-[#FFC633] text-gray-900 hover:bg-[#FFD666]"
            disabled={createSale.isPending || updateSale.isPending}
          >
            {sale ? "Update Sale" : "Create Sale"}
          </Button>
        </div>
      </form>
    </Form>
  );
} 