// frontend/fetchers/product/mutation.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { Product, ProductVariant } from "./queries";

export interface CreateProductData {
    name: string;
    description: string;
    categoryId: number;
    brandId: number;
    saleId?: number;
    image?: File; // Add this field
}

export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateProductData) => {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("description", data.description);
            formData.append("categoryId", data.categoryId.toString());
            formData.append("brandId", data.brandId.toString());
            if (data.saleId) {
                formData.append("saleId", data.saleId.toString());
            }
            if (data.image) {
                formData.append("image", data.image);
            }

            const { data: response } = await axiosInstance.post<Product>("/products",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Product created successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to create product");
        },
    });
};

export const useCreateVariant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateVariantData) => {
            const formData = new FormData();
            formData.append("productId", data.productId.toString());
            formData.append("sku", data.sku);
            formData.append("price", data.price.toString());
            formData.append("stock", data.stock.toString());
            if (data.storeId) formData.append("storeId", data.storeId.toString());
            data.optionIds.forEach(id => formData.append("optionIds[]", id.toString()));
            data.images.forEach(file => formData.append("images", file));

            const { data: response } = await axiosInstance.post<ProductVariant>("/product-variants", formData);
            return response;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["product-variants", variables.productId] });
            toast.success("Variant created successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to create variant");
        },
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: Partial<CreateProductData> }) => {
            const { data: response } = await axiosInstance.put<Product>(`/products/${id}`, data);
            return response;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["product", variables.id] });
            toast.success("Product updated successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to update product");
        },
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            await axiosInstance.delete(`/products/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            toast.success("Product deleted successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to delete product");
        },
    });
};

export const useUpdateVariant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: Partial<CreateVariantData> }) => {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (key === 'images') {
                    (value as File[]).forEach(file => formData.append('images', file));
                } else if (key === 'optionIds') {
                    (value as number[]).forEach(id => formData.append('optionIds[]', id.toString()));
                } else {
                    formData.append(key, value?.toString() || '');
                }
            });

            const { data: response } = await axiosInstance.put<ProductVariant>(`/product-variants/${id}`, formData);
            return response;
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["product-variants"] });
            toast.success("Variant updated successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to update variant");
        },
    });
};

export const useDeleteVariant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            await axiosInstance.delete(`/product-variants/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["product-variants"] });
            toast.success("Variant deleted successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to delete variant");
        },
    });
};
