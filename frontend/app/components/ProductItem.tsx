import React, { useState } from "react";
import { addedState, CartData, cartState, ProductData } from "../utils/store";
import Link from "next/link";
import { useRecoilState, useSetRecoilState } from "recoil";
import { BiLoaderAlt } from "react-icons/bi";
import SessionProviderWrapper from "../utils/SessionProviderWrapper";
import useCart from "./CartData";
import Image from "next/image";

const Item = ({ product }: { product: ProductData }) => {
  const [cart,setCart] = useRecoilState(cartState); // Use Recoil to manage cart
  const [addedItem, setAddedItem] = useState(0);
  const [uselastid, setlastid] = useState(0);
  const setGlobalAdded = useSetRecoilState(addedState);
  const {updateCart} = useCart()

  const addToCart = async (product: ProductData) => {

    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === product.id);
    let newCart:CartData[] = [...cart];

    if (existingItem) {
      // Update quantity if product already exists
      newCart = newCart.map(item =>
        item.id === product?.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // Add new item if product does not exist
      newCart.push({ ...product,quantity:1 });
    }

    // Create CartReq object
  const cartReq: {productId:number;quantity:number} = {
    productId: product.id,
    quantity: 1,
  };

  // Update the cart
  await updateCart(cartReq);

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
  };

  const discountedPrice: number = product.price - (product.price * 10) / 100;

  return (
    <div key={product.id} className="flex flex-col items-center">
      <Link href={`/products/${product.id}`}>
        <div className="cursor-pointer w-72 p-5 rounded-xl bg-[#FFFFFF] text-center shadow-md">
          <div className="mb-4">
            <Image
              src={product.image}
              alt={product.title}
              width={100}
              height={52}
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

const ProductItem = ({ product }: { product: ProductData }) => {
  return (
    <SessionProviderWrapper>
      <Item product={product} />
    </SessionProviderWrapper>
  );
};

export default ProductItem;
