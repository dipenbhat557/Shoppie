import { ProductData } from "./store";

export const fetchProducts = async (): Promise<ProductData[]> => {
    const res = await fetch('https://fakestoreapi.com/products');
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
};

export async function fetchCategories(): Promise<string[]> {
    const res = await fetch("https://fakestoreapi.com/products/categories");
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    return res.json();
  }
  
  