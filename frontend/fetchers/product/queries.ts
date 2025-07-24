import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
  image: string;
  brand: string;
  category: string;
  variants: number;
  status: string;
}

const PRODUCTS_API = "/api/products";

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.get(PRODUCTS_API);
      return data;
    },
  });
}; 