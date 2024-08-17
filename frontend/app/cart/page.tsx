"use client";

import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import { CartData, cartState} from '../utils/store';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartItem from '../components/CartItem';


const CartPage = () => {
  const [cartItems, setCartItems] = useRecoilState(cartState);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(10);
  const [checkedout, setCheckedout] = useState(false);

  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubtotal(total);
    console.log("cart item is ",cartItems)
  }, [cartItems]);

  

  const totalAfterDiscount = subtotal - (subtotal * discount) / 100;

  const handleCheckout = async () => {
    setCheckedout(true);
    setCartItems([]);
    setTimeout(()=>{
      window.location.href = "/"    
    },3000)
    
  }

  return (
    <>
    <Navbar/>
     {checkedout && <div className='w-full h-[150px] text-white mt-3 bg-green-500 bg-opacity-50 flex flex-col gap-2 items-center justify-center font-semibold'><p>Thanks for shopping with us.</p><p className='w-[80%] text-center'>Please explore more and enjoy exclusive discounts.</p></div>}
      
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-4xl font-bold text-orange-500 text-center mb-8">Your Cart</h1>
      {cartItems?.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cartItems?.map((item:CartData, index:number) =>  {
            
            return (
              <CartItem key={index} item={item} setCartItems={setCartItems}/>
            )})}
          </div>
          <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-lg text-center">
            <p className="text-lg">Subtotal: ${subtotal.toFixed(2)}</p>
            <p className="text-lg">Discount: {discount}%</p>
            <p className="text-2xl font-semibold text-orange-500">
              Total: ${totalAfterDiscount.toFixed(2)}
            </p>
            <button onClick={handleCheckout} className="mt-4 bg-orange-500 text-white py-2 px-6 rounded hover:bg-orange-600">
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
