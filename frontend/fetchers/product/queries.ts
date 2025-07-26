import { useQuery } from "@tanstack/react-query";

export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

// Mock data for development
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Premium T-Shirt",
    description: "High-quality cotton t-shirt",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    price: 29.99,
  },
  {
    id: 2,
    name: "Designer Jeans",
    description: "Stylish and comfortable jeans",
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d",
    price: 89.99,
  },
  {
    id: 3,
    name: "Running Shoes",
    description: "Professional running shoes",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    price: 119.99,
  },
  {
    id: 4,
    name: "Leather Wallet",
    description: "Genuine leather wallet",
    imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93",
    price: 49.99,
  },
];

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      // TODO: Replace with actual API call
      return mockProducts;
    },
  });
}; 