import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export interface Product {
  id: number;
  name: string;
  description: string;
  sale?: {
    id: number;
    description: string;
    startDate: Date;
    endDate: Date;
    discount: number;
    isPercentage: boolean;
    imageUrl: string;
  };
  brand: {
    id: number;
    name: string;
    logoUrl: string;
  };
  category: {
    id: number;
    name: string;
    imageUrl: string;
  };
  variants: ProductVariant[];
  reviews: Review[];
}

export interface ProductVariant {
  id: number;
  sku: string;
  price: number;
  stock: number;
  productId: number;
  productOptions: ProductOption[];
  store?: {
    id: number;
    name: string;
    location: {
      city: string;
      state: string;
    };
  };
  images: {
    id: number;
    imageUrl: string;
  }[];
}

export interface ProductOption {
  id: number;
  name: string;
  productOptionGroup: {
    id: number;
    name: string;
  };
}

export interface Review {
  id: number;
  rating: number;
  comment?: string;
  createdAt: Date;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    profileUrl: string;
  };
}

export const useProducts = (filters?: {
  categoryId?: number;
  brandId?: number;
  saleId?: number;
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

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Product>(`/products/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useProductVariants = (productId: number) => {
  return useQuery({
    queryKey: ["product-variants", productId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ProductVariant[]>(`/product-variants/product/${productId}`);
      return data;
    },
    enabled: !!productId,
  });
};

export const useProductOptionGroups = (categoryId?: number) => {
  return useQuery({
    queryKey: ["product-option-groups", categoryId],
    queryFn: async () => {
      const url = categoryId 
        ? `/product-option-groups/category/${categoryId}`
        : '/product-option-groups';
      const { data } = await axiosInstance.get(url);
      return data;
    },
  });
}; 

export const useProductReviews = (productId: number) => {
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