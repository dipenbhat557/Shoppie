import React from 'react';
import { CartData } from '../utils/store';
import Image from 'next/image';
import useCart from './CartData';

interface CartItemProps {
  item: CartData;
  setCartItems: React.Dispatch<React.SetStateAction<CartData[]>>;
}

export default function CartItem ({ item, setCartItems }:CartItemProps) {
  const { removeItem } = useCart();

  // Increase the quantity of the item in the cart
  const handleIncreaseQuantity = (id: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      )
    );
  };

  // Decrease the quantity of the item in the cart
  const handleDecreaseQuantity = (id: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((cartItem) =>
        cartItem.id === id && cartItem.quantity > 1
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
    );
  };

  // Remove the item from the cart
  const handleRemoveItem = (id: number) => {
    removeItem(id);
  };

  // Calculate the discounted price
  const discountedPrice: number = item.price - (item.price * 10) / 100;

  return (
    <div
      key={item.id}
      className="flex flex-col sm:flex-row items-center border rounded-lg p-4 shadow-lg"
    >
      <Image
        src={item?.image}
        alt={item.title}
        height={100}
        width={100}
        className="rounded-md object-cover"
      />
      <div className="flex-1 sm:ml-6 text-center sm:text-left">
        <h2 className="text-lg font-semibold">{item.title}</h2>
        <div className="mt-2">
          <span className="text-gray-700 line-through">${item.price.toFixed(2)}</span>
          <span className="text-red-500 font-bold ml-2">${discountedPrice.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-center sm:justify-start mt-4 gap-4">
          <button
            onClick={() => handleDecreaseQuantity(item.id)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-3 rounded"
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => handleIncreaseQuantity(item.id)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-3 rounded"
          >
            +
          </button>
        </div>
        <button
          onClick={() => handleRemoveItem(item.id)}
          className="mt-4 bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

