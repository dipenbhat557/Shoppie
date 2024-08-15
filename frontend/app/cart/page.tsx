
// import { useSession } from 'next-auth/react';
// import ProtectedRoute from '../components/ProtectedRoute';

// export default function Dashboard() {
//   const session = useSession()
  
//   return (
//     <ProtectedRoute>
//       <div>Welcome to the Dashboard!,{session?.data?.user?.name}</div>
//     </ProtectedRoute>
//   );
// }

"use client";

import { useRecoilState } from 'recoil';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { cartState} from '../utils/store';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const CartPage = () => {
  const [cartItems, setCartItems] = useRecoilState(cartState);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(10); // For example, a 10% discount

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubtotal(total);
    console.log("cart item is ",cartItems)
  }, [cartItems]);

  const handleIncreaseQuantity = (id: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (id: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== id)
    );
  };

  const totalAfterDiscount = subtotal - (subtotal * discount) / 100;

  return (
    <>
    <Navbar/>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-4xl font-bold text-orange-500 text-center mb-8">Your Cart</h1>
      {cartItems?.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cartItems?.map((item) => (
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
                  <p className="text-gray-700 mt-2">${item.price.toFixed(2)}</p>
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
            ))}
          </div>
          <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-lg text-center">
            <p className="text-lg">Subtotal: ${subtotal.toFixed(2)}</p>
            <p className="text-lg">Discount: {discount}%</p>
            <p className="text-2xl font-semibold text-orange-500">
              Total: ${totalAfterDiscount.toFixed(2)}
            </p>
            <button className="mt-4 bg-orange-500 text-white py-2 px-6 rounded hover:bg-orange-600">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default CartPage;
