"use client";
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartState, ProductData, userIdState, } from '../utils/store';
import { fetchCartData, removeCartItem, updateCartData } from '../utils/cartUtils';

function useCart(products: ProductData[]) {
  const [cart, setCart] = useRecoilState(cartState);
  const userId = useRecoilValue(userIdState);

  useEffect(() => {
    const loadCart = async () => {
      const cartData = await fetchCartData(userId, products,cart);
      setCart(cartData);
    };
    loadCart();
  }, [ setCart]);

  const updateCart = async (newCartState: { productId: number; quantity: number }) => {
    const updatedCart = await updateCartData(userId, newCartState, products,cart);
    setCart(updatedCart);
  };

  const removeItem = async (productId: number) => {
    const updatedCart = await removeCartItem(userId, productId, cart);
    setCart(updatedCart);
  };

  return {
    removeItem,
    cart,
    updateCart,
  };
}

export default useCart;
