import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl?: string; // Add this field
  sale?: {
    id: string;
    description: string;
    startDate: Date;
    endDate: Date;
    discount: number;
    isPercentage: boolean;
    imageUrl: string;
  };
  brand: {
    id: string;
    name: string;
    logoUrl: string;
  };
  category: {
    id: string;
    name: string;
    imageUrl: string;
  };
  variants: ProductVariant[];
  reviews: Review[];
}

export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  stock: number;
  productId: string;
  productOptions: ProductOption[];
  store?: {
    id: string;
    name: string;
    location: {
      city: string;
      state: string;
    };
  };
  product: {
    id: string;
    name: string;
    description: string;
  };
  images: string[];
}

export interface ProductOption {
  id: string;
  name: string;
  productOptionGroup: {
    id: string;
    name: string;
  };
}

export interface Review {
  id: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    profileUrl: string;
  };
}

export const useProducts = (filters?: {
  categoryId?: string;
  brandId?: string;
  saleId?: string;
}) => {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters?.categoryId) params.append("categoryId", filters.categoryId.toString());
      if (filters?.brandId) params.append("brandId", filters.brandId.toString());
      if (filters?.saleId) params.append("saleId", filters.saleId.toString());

      const { data } = await axiosInstance.get<Product[]>("/products", { params });
      return data;
    },
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Product>(`/products/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useProductVariants = (productId: string) => {
  return useQuery({
    queryKey: ["product-variants", productId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ProductVariant[]>(`/product-variants/product/${productId}`);
      return data;
    },
    enabled: !!productId,
  });
};

export const useProductOptionGroups = (productId: string) => {
  return useQuery({
    queryKey: ["product-option-groups", productId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ProductOptionGroup[]>(`/product-option-groups/product/${productId}`);
      return data;
    },
    enabled: !!productId,
  });
};

export const useProductVariant = (variantId: string) => {
  return useQuery({
    queryKey: ["product-variant", variantId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ProductVariant>(`/product-variants/${variantId}`);
      return data;
    },
    enabled: !!variantId,
  });
};

export const useProductReviews = (productId: string) => {
  return useQuery({
    queryKey: ["product-reviews", productId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Review[]>(`/products/${productId}/reviews`);
      return data;
    },
    enabled: !!productId,
  });
};

export const useBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<any[]>("/brands");
      return data;
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axiosInstance.get< any[]>("/categories");
      return data;
    },
  });
};

export interface ProductOptionGroup {
  id: string;
  name: string;
  productId: string;
  productOptions: ProductOption[];
} 