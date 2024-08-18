import React from 'react'
import { CartData } from '../utils/store';
import Image from 'next/image';
import useCart from './CartData';

const CartItem = ({item,setCartItems}:{item:CartData;setCartItems:any}) => {
  const {removeItem} = useCart();

    const handleIncreaseQuantity = (id: number) => {
        setCartItems((prevCartItems:CartData[]) =>
          prevCartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
      };
    
      const handleDecreaseQuantity = (id: number) => {
        setCartItems((prevCartItems:CartData[]) =>
          prevCartItems.map((item) =>
            item.id === id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        );
      };
    
      const handleRemoveItem = (id: number) => {
        // setCartItems((prevCartItems:CartData[]) =>
        //   prevCartItems.filter((item) => item.id !== id)
        // );
        removeItem(id)
      };

      const discountedPrice: number= item.price - (item.price * 10) / 100;


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
  )
}

export default CartItem