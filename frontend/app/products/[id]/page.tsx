"use client";

import { useEffect, useState } from 'react';
import { CartData, cartState, ProductData } from '@/app/utils/store';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useParams } from 'next/navigation';
import { useRecoilState } from 'recoil';

export default function ProductPage() {
    const id = useParams()?.id
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [cart, setCart] = useRecoilState<CartData[]>(cartState);

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

  if (loading) {
    return <div>Loading...</div>;
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

    setAdded(true);
    window.scrollTo(0, 0);
    setTimeout(() => setAdded(false), 3000);
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
      </div>
      <Footer />
    </div>
  );
}
