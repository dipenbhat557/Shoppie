
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
            {cartItems?.map((item) =>  {
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
