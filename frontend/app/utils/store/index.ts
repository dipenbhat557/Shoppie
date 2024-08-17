import { atom } from 'recoil';

export const cartState = atom({
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

export const productState = atom({
  key: 'productState',
  default: [] as ProductData[]
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