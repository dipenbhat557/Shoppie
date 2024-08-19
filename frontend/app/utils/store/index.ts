import { atom, selector } from 'recoil';

// CartData is the shape of your cart items
export const cartState = atom<CartData[]>({
  key: 'cartState',
  default: [] as CartData[],
});

export const addedState = atom({
  key: 'addedState',
  default: false
})

export const categoryState = atom({
  key: 'categoryState',
  default: [] as string[]
})


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
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data: ProductData[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  },
});