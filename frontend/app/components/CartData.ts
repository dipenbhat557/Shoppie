"use client"
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { CartData, cartState, ProductData } from '../utils/store';
import { getSession } from 'next-auth/react';

function useCart(products: ProductData[]) { // Accept products as an argument
  const [cart, setCart] = useRecoilState(cartState);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCartData = async () => {
      const session = await getSession();
      setUserId(session?.user?.id || null);

      if (userId) {
        try {
          const response = await fetch(`/api/cart/user/${userId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch cart data');
          }
          const data: any = await response.json();

          const newCartItems: CartData[] = data?.items?.map((i: any) => {
            const itemProduct = products.find(p => p.id === i.productId);
            return itemProduct ? { ...itemProduct, quantity: i.quantity } : null;
          }).filter((item: CartData | null) => item !== null);

          setCart(newCartItems);
        } catch (error) {
          console.error('Error fetching cart data:', error);
          setCart([]);
        }
      }
    };

    fetchCartData();
  }, [userId, setCart, products]);

  const updateCart = async (newCartState: { productId: number; quantity: number }) => {
    const session = await getSession();
    const userId = session?.user?.id;

    if (userId) {
      try {
        const response = await fetch(`/api/cart/user/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCartState),
        });

        if (!response.ok) {
          throw new Error('Failed to update cart');
        }
        const data: any = await response.json();

        const newCartItems: CartData[] = data?.items?.map((i: any) => {
          const itemProduct = products.find(p => p.id === i.productId);
          return itemProduct ? { ...itemProduct, quantity: i.quantity } : null;
        }).filter((item: CartData | null) => item !== null);

        setCart(newCartItems);
      } catch (error) {
        console.error('Error updating cart:', error);
      }
    } else {
      const existingItem = cart.find(item => item.id === newCartState.productId);

      if (existingItem) {
        setCart(cart.map(item =>
          item.id === newCartState.productId
            ? { ...item, quantity: item.quantity + newCartState.quantity }
            : item
        ));
      } else {
        const product = products.find(p => p.id === newCartState.productId);
        if (product) {
          setCart([...cart, { ...product, quantity: newCartState.quantity }]);
        }
      }
    }
  };

  const removeItem = async (productId: number) => {
    const session = await getSession();
    const userId = session?.user?.id;

    if (userId) {
      try {
        const response = await fetch(`/api/cart/user/${userId}/${productId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete item');
        }

        const newCartItems: CartData[] = cart.filter(c => c.id !== productId);
        setCart(newCartItems);
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    } else {
      const updatedCart = cart.filter(item => item.id !== productId);
      setCart(updatedCart);
    }
  };

  return {
    removeItem,
    cart,
    updateCart,
  };
}

export default useCart;
