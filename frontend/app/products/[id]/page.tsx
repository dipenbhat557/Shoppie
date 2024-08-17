"use client";

import { useEffect, useState } from 'react';
import { addedState, CartData, cartState, ProductData } from '@/app/utils/store';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useParams } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { BiLoaderAlt } from 'react-icons/bi';
import Link from 'next/link';
import Loading from '@/app/components/Loading';

export default function ProductPage() {
    const id = useParams()?.id
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [cart, setCart] = useRecoilState<CartData[]>(cartState);
  const [product, setProduct] = useState<ProductData | null>(null);
  const [moreProducts, setMoreProducts] = useState<ProductData[]>([])
  const [addedItem, setAddedItem] = useState(0);
  const [uselastid, setlastid] = useState(0);
  const [globalAdded, setGlobalAdded] = useRecoilState(addedState)

  useEffect(() => {
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching product:', error);
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    if (product?.category) {
      fetch(`https://fakestoreapi.com/products/category/${product.category}`)
        .then((res) => res.json())
        .then((data) => {
          setMoreProducts(data.filter((d:ProductData)=>d?.id !== product?.id));
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching more products:', error);
        });
    }
  }, [product?.category]);

  if (loading) {
    return <Loading/>;
  }

  if (!product) {
    return <div>Product not found!</div>;
  }

  
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
      setAdded(true);
      setGlobalAdded(true)
    }, 1000);

    setTimeout(() => {
      setlastid(0);
      setGlobalAdded(false)
    }, 4000);

    // window.scrollTo(0, 0);
    setTimeout(() => setAdded(false), 2000);
  };

  const discountedPrice: number = product.price - (product.price * 10) / 100;

  return (
    <div>
      <Navbar />
      {added && (
        <div className="w-full h-[100px] bg-opacity-50 text-white mt-3 bg-green-500 flex items-center justify-center font-semibold">
          Item Added to Cart Successfully!!
        </div>
      )}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-[350px] object-contain rounded-md"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-gray-700 mt-4">{product.description}</p>
            <div className="mt-4">
              <span className="text-gray-700 line-through">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-red-500 font-bold ml-2">
                ${discountedPrice.toFixed(2)}
              </span>
            </div>
            <button onClick={()=>addToCart(product)} className="mt-6 bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
              Add to Cart
            </button>
          </div>
        </div>
      </div><div className="container mx-auto px-4">
        <h1 className="text-2xl sm:text-4xl font-bold text-center my-8 text-orange-500">
          More like this
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {moreProducts.map((product: ProductData) => {
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
          })}
        </div>
        <div className="text-center mt-8">
          <Link href="/products">
            <p className="text-orange-500 hover:underline">View All Products</p>
          </Link>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
