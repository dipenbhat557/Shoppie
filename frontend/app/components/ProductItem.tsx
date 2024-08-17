import React, { useState } from "react";
import { addedState, CartData, cartState, ProductData } from "../utils/store";
import Link from "next/link";
import { useSetRecoilState } from "recoil";
import { BiLoaderAlt } from "react-icons/bi";
import Image from "next/image";

const ProductItem = ({ product }: { product: ProductData }) => {
  const setCart = useSetRecoilState<CartData[]>(cartState);
  const [addedItem, setAddedItem] = useState(0);
  const [uselastid, setlastid] = useState(0);
  const setGlobalAdded = useSetRecoilState(addedState);

  const addToCart = async (product: ProductData) => {
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
  };

  const discountedPrice: number = product.price - (product.price * 10) / 100;

  return (
    <div key={product.id} className="">
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
              <span className="text-lg font-bold text-gray-800">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-red-500 font-bold ml-2">
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

export default ProductItem;