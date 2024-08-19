import { atom, selector } from 'recoil';

export const cartState = atom<CartData[]>({
  key: 'cartState',
  default: [],
});

export const addedState = atom<boolean>({
  key: 'addedState',
  default: false,
});

export const categoryState = atom<string[]>({
  key: 'categoryState',
  default: [],
});

export interface ProductData {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface CartData {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  quantity: number;
}

export const productState = selector<ProductData[]>({
  key: 'productState',
  get: async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products`);
      if (!response.ok) throw new Error('Failed to fetch products');
      return await response.json();
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  },
});
