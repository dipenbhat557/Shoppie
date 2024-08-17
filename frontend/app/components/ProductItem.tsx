import React, { useEffect, useState } from "react";
import { addedState, CartData, cartState, ProductData } from "../utils/store";
import Link from "next/link";
import { useSetRecoilState } from "recoil";
import { BiLoaderAlt } from "react-icons/bi";
import Image from "next/image";
import SessionProviderWrapper from "../utils/SessionProviderWrapper";
import { getSession, useSession } from "next-auth/react";

const Item = ({ product }: { product: ProductData }) => {
  const setCart = useSetRecoilState<CartData[]>(cartState);
  const [addedItem, setAddedItem] = useState(0);
  const [uselastid, setlastid] = useState(0);
  const setGlobalAdded = useSetRecoilState(addedState);

  useEffect(()=>{
    const load = async () => {
      const session = await getSession();
      console.log("session is ",session?.user?.id)
    }

    load()
  },[])

  const addToCart = async (product: ProductData) => {
    const session = await getSession();
  
    // If no session exists, handle the cart locally
    if (!session) {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === product.id);
  
        if (existingItem) {
          return prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [
            ...prevCart,
            {
              ...product,
              quantity: 1,
            },
          ];
        }
      });
  
      setAddedItem(product?.id);
      setlastid(product?.id);
  
      setTimeout(() => {
        setAddedItem(0);
        setGlobalAdded(true);
      }, 1000);
  
      setTimeout(() => {
        setlastid(0);
        setGlobalAdded(false);
      }, 4000);
    } else {
      // If session exists, send a request to the backend to update the cart
      try {
        const userId = session?.user?.id; // Get the user ID from session
        const response = await fetch(`/api/cart/user/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: product.id,
            quantity: 1, // You can modify this quantity based on user input
          }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to update cart');
        }
  
        const updatedCart = await response.json();
        console.log('Cart updated:', updatedCart);
  
        // Optionally update the frontend cart state based on the response
        setCart((prevCart) => {
          const existingItem = prevCart.find((item) => item.id === product.id);
  
          if (existingItem) {
            return prevCart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            return [
              ...prevCart,
              {
                ...product,
                quantity: 1,
              },
            ];
          }
        });
  
        setAddedItem(product?.id);
        setlastid(product?.id);
  
        setTimeout(() => {
          setAddedItem(0);
          setGlobalAdded(true);
        }, 1000);
  
        setTimeout(() => {
          setlastid(0);
          setGlobalAdded(false);
        }, 4000);
      } catch (error) {
        console.error('Error updating cart:', error);
      }
    }
  };
  

    const discountedPrice: number = product.price - (product.price * 10) / 100;

  return (
    <div key={product.id} className=" flex flex-col items-center">
      <Link href={`/products/${product.id}`}>
        <div className="cursor-pointer w-72 p-5 rounded-xl bg-[#Ffffff] text-center shadow-md">
          <div className="mb-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-52 rounded-lg object-contain"
            />
            <h2 className="text-[18px] line-clamp-1 mb-2">{product.title}</h2>
            <div className="mt-2">
              <span className="text-lg font-bold text-red-500 line-through">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-gray-800 font-bold ml-2">
                ${discountedPrice.toFixed(2)}
              </span>
            </div>
            <p className="text-gray-500 mt-4 line-clamp-2">
              {product.description}...
            </p>
          </div>
        </div>
      </Link>
      {!(product?.id === addedItem) ? (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className={`mt-4 mb-6 w-[80%] text-white py-2 px-4 rounded-lg transition-colors duration-300 ${
              uselastid === product.id
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-black hover:bg-gray-800"
            }`}
          >
            {uselastid === product.id ? <p>Added to Cart</p> : <>Add to Cart</>}
          </button>
        </>
      ) : (
        <div className="mt-4 w-full bg-gray-800 text-white py-2 px-4 rounded flex items-center justify-center">
          <BiLoaderAlt className=" animate-spin" />
        </div>
      )}
    </div>
  );
};

const ProductItem = ({product}:{product:ProductData}) =>{
  return(<SessionProviderWrapper><Item product={product} /></SessionProviderWrapper>)
};

export default ProductItem;