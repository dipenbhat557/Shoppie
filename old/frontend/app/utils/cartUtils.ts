import { CartData, ProductData } from './store';

export const fetchCartData = async (userId: string | null, products: ProductData[],cart:CartData[]) => {
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

      return newCartItems;
    } catch (error) {
      console.error('Error fetching cart data:', error);
      return [];
    }
  }else{
    return cart;
  }
};

export const updateCartData = async (userId: string | null, newCartState: { productId: number; quantity: number }, products: ProductData[],cart:CartData[]) => {
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

      return newCartItems;
    } catch (error) {
      console.error('Error updating cart:', error);
      return [];
    }
  }
};

export const removeCartItem = async (userId: string | null, productId: number, cart: CartData[]) => {
  if (userId) {
    try {
      const response = await fetch(`/api/cart/user/${userId}/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      const newCartItems: CartData[] = cart.filter(c => c.id !== productId);
      return newCartItems;
    } catch (error) {
      console.error('Error deleting item:', error);
      return cart;
    }
  } else {
    const updatedCart = cart.filter(item => item.id !== productId);
    return updatedCart;
  }
};
