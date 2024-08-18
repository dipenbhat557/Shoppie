import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CartData, cartState, productState } from '../utils/store';
import { getSession } from 'next-auth/react';

function useCart() {
  // State to manage the cart and user ID
  const [cart, setCart] = useRecoilState(cartState);
  const [userId, setUserId] = useState<string | null>(null); // Default to null, representing no user
  const products = useRecoilValue(productState); // Products from Recoil state

  useEffect(() => {
    const fetchCartData = async () => {
      const session = await getSession();
      setUserId(session?.user?.id || null); // Set user ID from session, default to null if no user

      if (userId) {
        try {
          // Fetch cart data for authenticated user
          const response = await fetch(`/api/cart/user/${userId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch cart data');
          }
          const data: any = await response.json();
          console.log("data from navbar is ", data?.items);

          // Map fetched data to cart items, including quantity and product details
          const newCartItems: CartData[] = data?.items?.map((i: any) => {
            const itemProduct = products?.find(p => p?.id === i?.productId);
            return itemProduct ? { ...itemProduct, quantity: i?.quantity } : null;
          }).filter((item: CartData | null) => item !== null); // Filter out any null items

          console.log("new cart items is ", newCartItems);
          setCart(newCartItems); // Update Recoil state with fetched cart data
        } catch (error) {
          console.error('Error fetching cart data:', error);
          setCart([]); // Reset cart items in case of error
        }
      }
    };

    fetchCartData();
  }, [userId, setCart, products]); // Dependency array includes userId, setCart, and products

  const updateCart = async (newCartState: { productId: number; quantity: number }) => {
    const session = await getSession();
    setUserId(session?.user?.id || null); // Set user ID from session

    if (userId) {
      try {
        // Update cart for authenticated user
        const response = await fetch(`/api/cart/user/${userId}`, {
          method: 'PUT', // or POST depending on your API design
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCartState), // Send updated cart state to the backend
        });

        if (!response.ok) {
          throw new Error('Failed to update cart');
        }
        const data: any = await response.json();
        console.log("data from navbar is ", data?.items);

        // Map updated data to cart items
        const newCartItems: CartData[] = data?.items?.map((i: any) => {
          const itemProduct = products?.find(p => p?.id === i?.productId);
          return itemProduct ? { ...itemProduct, quantity: i?.quantity } : null;
        }).filter((item: CartData | null) => item !== null); // Filter out any null items

        console.log("new cart items is ", newCartItems);
        setCart(newCartItems); // Update Recoil state with new cart items
      } catch (error) {
        console.error('Error updating cart:', error);
      }
    } else {
      // Manage cart locally if the user is not authenticated
      const existingItem = cart.find(item => item.id === newCartState.productId);

      if (existingItem) {
        // Update existing item quantity
        setCart(cart.map(item =>
          item.id === newCartState.productId
            ? { ...item, quantity: item.quantity + newCartState.quantity }
            : item
        ));
      } else {
        // Add new item to cart
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
        // Remove item for authenticated user
        const response = await fetch(`/api/cart/user/${userId}/${productId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete item');
        }

        // Update cart items locally after successful removal from backend
        const newCartItems: CartData[] = cart.filter(c => c.id !== productId);
        setCart(newCartItems);
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    } else {
      // Remove item locally if user is not authenticated
      const updatedCart = cart.filter(item => item.id !== productId);
      setCart(updatedCart);
    }
  };

  // Return cart operations and state
  return {
    removeItem,
    cart,
    updateCart,
  };
}

export default useCart;
