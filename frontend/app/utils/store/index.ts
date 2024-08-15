import { atom } from 'recoil';

export const cartState = atom({
  key: 'cartState', 
  default: [] as CartData[], 
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