"use client";

import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import { CartData, cartState } from '../utils/store';
import CartItem from '../components/CartItem';

const CartPage = () => {
  // State to manage the cart items, subtotal, discount, and checkout status
  const [cartItems, setCartItems] = useRecoilState(cartState);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(10); // Default discount percentage
  const [checkedout, setCheckedout] = useState(false); // Flag to indicate if checkout was completed

  // Effect to recalculate the subtotal whenever cartItems change
  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity, // Calculate total price of items in cart
      0
    );
    setSubtotal(total);
  }, [cartItems]);

  // Calculate total after applying discount
  const totalAfterDiscount = subtotal - (subtotal * discount) / 100;

  // Function to handle checkout process
  const handleCheckout = async () => {
    setCheckedout(true); // Show checkout success message
    setCartItems([]); // Clear the cart
    setTimeout(() => {
      window.location.href = "/"; // Redirect to home page after 3 seconds
    }, 3000);
  };

  return (
    <div className=' relative'>

      {/* Show success message if checked out */}
      {checkedout && (
        <div className='w-full h-[150px] text-white mt-3 bg-green-500 bg-opacity-50 flex flex-col gap-2 items-center justify-center font-semibold'>
          <p>Thanks for shopping with us.</p>
          <p className='w-[80%] text-center'>
            Please explore more and enjoy exclusive discounts.
          </p>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-800 text-center mb-8">
          Your Cart
        </h1>
        
        {/* Render empty cart message if there are no items */}
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 h-[400px] flex items-center justify-center text-[40px]">
            Your cart is empty
          </p>
        ) : (
          <>
            {/* Render cart items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {cartItems.map((item: CartData, index: number) => (
                <CartItem key={index} item={item} setCartItems={setCartItems} />
              ))}
            </div>
            
            {/* Render summary and checkout button */}
            <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-lg text-center">
              <p className="text-lg">Subtotal: ${subtotal.toFixed(2)}</p>
              <p className="text-lg">Discount: {discount}%</p>
              <p className="text-2xl font-semibold text-slate-800">
                Total: ${totalAfterDiscount.toFixed(2)}
              </p>
              <button
                onClick={handleCheckout}
                className="mt-4 bg-slate-800 text-white py-2 px-6 rounded hover:bg-slate-900"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
      
      <div className='bg-white w-full h-[100px] flex' />
    </div>
  );
};

export default CartPage;
