import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { CartData, cartState, productState } from '../utils/store';
import { getSession } from 'next-auth/react';



function useCart() {
  const [cart, setCart] = useRecoilState(cartState);
  const [userId,setUserId] = useState<string | null>("")
  const products = useRecoilValue(productState)

  useEffect(() => {
    

    const fetchCartData = async () => {
      const session = await getSession();
      setUserId(session?.user?.id)
      if (userId) {
        try {
          const response = await fetch(`/api/cart/user/${userId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch cart data');
          }
          const data: any = await response.json();
          console.log("data from navbar is ", data?.items);
  
          // Assuming products is an array of product objects
          const newCartItems: CartData[] = data?.items?.map((i: any) => {
            // Find the product in the products array
            const itemProduct = products?.find(p => p?.id === i?.productId);
            // Return a new object with the found product and its quantity
            return itemProduct ? { ...itemProduct, quantity: i?.quantity } : null;
          }).filter((item: CartData | null) => item !== null); // Filter out any null items
          
          console.log("new cart items is ",newCartItems)
          setCart(newCartItems); // Set the fetched data into Recoil state // Set the fetched data into Recoil state
        } catch (error) {
          console.error('Error fetching cart data:', error);
          setCart([]); // Reset cart items in case of error
        }
      } 
    };

    fetchCartData();
  }, [setCart]);

  const updateCart = async (newCartState: {productId:number;quantity:number}) => {
    const session = await getSession();
    setUserId(session?.user?.id)
    if (userId) {
      try {
        const response = await fetch(`/api/cart/user/${userId}`, {
          method: 'PUT', // or POST depending on your API design
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCartState), // Send the new cart state to the backend
        });

        if (!response.ok) {
          throw new Error('Failed to update cart');
        }
        const data: any = await response.json();
          console.log("data from navbar is ", data?.items);
  
          // Assuming products is an array of product objects
          const newCartItems: CartData[] = data?.items?.map((i: any) => {
            // Find the product in the products array
            const itemProduct = products?.find(p => p?.id === i?.productId);
            // Return a new object with the found product and its quantity
            return itemProduct ? { ...itemProduct, quantity: i?.quantity } : null;
          }).filter((item: CartData | null) => item !== null); // Filter out any null items
          
          console.log("new cart items is ",newCartItems)
          setCart(newCartItems); // Set the fetched data into Recoil state
      } catch (error) {
        console.error('Error updating cart:', error);
      }
    }else {
      // User is not authenticated, manage the cart locally
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
}
  
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

      // Update the cart items locally after successful removal from backend
      const newCartItems: CartData[] = cart?.filter(c => c?.id !== productId);
      setCart(newCartItems);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  } else {
    // User is not authenticated, manage the cart locally
    const updatedCart = cart.filter(item => item.id !== productId);

    // Update the Recoil state with the locally updated cart
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
