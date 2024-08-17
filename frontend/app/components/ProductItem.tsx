import React, { useState } from 'react'
import { addedState, CartData, cartState, ProductData } from '../utils/store';
import Link from 'next/link';
import { useSetRecoilState } from 'recoil';
import { BiLoaderAlt } from 'react-icons/bi';

const ProductItem = ({product}:{product:ProductData}) => {
    const setCart = useSetRecoilState<CartData[]>(cartState);
  const [addedItem, setAddedItem] = useState(0);
  const [uselastid, setlastid] = useState(0);
  const  setGlobalAdded = useSetRecoilState(addedState)

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
      setGlobalAdded(true)
    }, 1000);

    setTimeout(() => {
      setlastid(0);
      setGlobalAdded(false)
    }, 4000);

  };

     const discountedPrice: number =
              product.price - (product.price * 10) / 100;

            return (
              <div key={product.id} className="border rounded-lg p-4 shadow-lg">
                <Link href={`/products/${product.id}`}>
                  <div className="cursor-pointer">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-[300px] sm:h-[350px] object-cover rounded-md"
                    />
                    <h2 className="text-xl font-semibold mt-4 line-clamp-1">
                      {product.title}
                    </h2>
                    <div className="mt-2">
                      <span className="text-gray-700 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-red-500 font-bold ml-2">
                        ${discountedPrice.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-gray-500 mt-2 line-clamp-2">
                      {product.description}...
                    </p>
                  </div>
                </Link>
                {!(product?.id === addedItem) ? (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className={`mt-4 w-full  text-white py-2 px-4 rounded hover:bg-orange-600 ${
                        uselastid === product.id
                          ? "bg-orange-900"
                          : "bg-orange-500"
                      }`}
                    >
                      {uselastid == product.id ? (
                        <p>Added to Cart</p>
                      ) : (
                        <> Add to Cart </>
                      )}
                    </button>
                  </>
                ) : (
                  <div className="mt-4 w-full bg-orange-500 text-white py-2 px-4 rounded flex items-center justify-center">
                    <BiLoaderAlt className=" animate-spin" />
                  </div>
                )}
              </div>
            );

}

export default ProductItem