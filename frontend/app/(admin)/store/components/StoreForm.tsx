"use client";

import { useState } from "react";
import { Store } from "@/fetchers/store/queries";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCreateStore, useUpdateStore } from "@/fetchers/store/mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Separator } from "@/components/ui/separator";
import { useUsers } from "@/fetchers/user/queries";
import { MapPin, Phone, User } from "lucide-react";

// Form validation schema
const storeFormSchema = z.object({
  name: z.string().min(1, "Store name is required"),
  contact: z.string().min(1, "Contact number is required"),
  location: z.object({
    houseNo: z.string().optional(),
    street: z.string().optional(),
    city: z.string().min(1, "City is required"),
    district: z.string().min(1, "District is required"),
    state: z.string().min(1, "State is required"),
    pinCode: z.string().min(1, "PIN code is required"),
    landmark: z.string().optional(),
  }),
  managerId: z.number(),
});

type StoreFormValues = z.infer<typeof storeFormSchema>;

interface StoreFormProps {
  store?: Store;
  onSuccess: () => void;
}

export function StoreForm({ store, onSuccess }: StoreFormProps) {
  const { data: users } = useUsers();
  const createStore = useCreateStore();
  const updateStore = useUpdateStore();

  // Get available managers (users with ADMIN role)
  const availableManagers =
    users?.filter((user) => user.role === "ADMIN") || [];

  const form = useForm<StoreFormValues>({
    resolver: zodResolver(storeFormSchema),
    defaultValues: {
      name: store?.name || "",
      contact: store?.contact || "",
      location: {
        houseNo: store?.location.houseNo || "",
        street: store?.location.street || "",
        city: store?.location.city || "",
        district: store?.location.district || "",
        state: store?.location.state || "",
        pinCode: store?.location.pinCode || "",
        landmark: store?.location.landmark || "",
      },
      managerId: store?.manager.id || 0,
    },
  });

  const onSubmit = async (data: StoreFormValues) => {
    try {
      if (store) {
        await updateStore.mutateAsync({
          id: store.id,
          ...data,
        });
      } else {
        await createStore.mutateAsync(data);
      }
      onSuccess();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Store Basic Info */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
            <div className="h-6 w-1 bg-[#FFC633] rounded-full" />
            <h3>Store Information</h3>
          </div>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter store name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      {...field}
                      className="pl-10"
                      placeholder="Enter contact number"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        {/* Location Details */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
            <div className="h-6 w-1 bg-[#FFC633] rounded-full" />
            <h3>Location Details</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="location.houseNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>House/Building No.</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter house/building number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter street name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter city" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location.district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter district" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location.state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter state" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location.pinCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PIN Code</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter PIN code" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location.landmark"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Landmark (Optional)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter nearby landmark" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        {/* Manager Selection */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-lg font-semibold text-gray-900">
            <div className="h-6 w-1 bg-[#FFC633] rounded-full" />
            <h3>Store Manager</h3>
          </div>

          <FormField
            control={form.control}
            name="managerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Manager</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a store manager" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableManagers.map((manager) => (
                      <SelectItem
                        key={manager.id}
                        value={manager.id.toString()}
                      >
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span>
                            {manager.firstName} {manager.lastName}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-3 pt-6">
          <Button
            type="submit"
            className="bg-[#FFC633] text-gray-900 hover:bg-[#FFD666]"
            disabled={createStore.isPending || updateStore.isPending}
          >
            {store ? "Update Store" : "Create Store"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
