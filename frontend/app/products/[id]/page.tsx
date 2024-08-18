"use client";

import { useEffect, useState } from 'react';
import { addedState, CartData, ProductData, productState } from '@/app/utils/store';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useParams } from 'next/navigation';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { BiLoaderAlt } from 'react-icons/bi';
import Link from 'next/link';
import ProductItem from '@/app/components/ProductItem';
import useCart from '@/app/components/CartData';
import Image from 'next/image';

export default function ProductPage() {
  const id = useParams()?.id;
  const [product, setProduct] = useState<ProductData | null>(null);
  const [moreProducts, setMoreProducts] = useState<ProductData[]>([]);
  const [addedItem, setAddedItem] = useState<number | null>(null);
  const [uselastid, setlastid] = useState<number | null>(null);
  const setGlobalAdded = useSetRecoilState(addedState);
  const products = useRecoilValue(productState);
  const { updateCart, cart } = useCart();

  useEffect(() => {
    if (id) {
      const foundProduct = products.find(p => p.id === Number(id));
      setProduct(foundProduct || null);
    }
  }, [id, products]);

  useEffect(() => {
    if (product?.category) {
      setMoreProducts(products.filter(p => p.category === product.category && p.id !== product.id));
    }
  }, [product, products]);

  if (!product) {
    return <div className="text-center py-10">Product not found!</div>;
  }

  const addToCart = async (product: ProductData) => {
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === product.id);
    let newCart: CartData[] = [...cart];

    if (existingItem) {
      // Update quantity if product already exists
      newCart = newCart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // Add new item if product does not exist
      newCart.push({ ...product, quantity: 1 });
    }

    // Create CartReq object
    const cartReq = {
      productId: product.id,
      quantity: 1,
    };

    // Update the cart
    await updateCart(cartReq);

    setAddedItem(product.id);
    setlastid(product.id);

    setTimeout(() => {
      setAddedItem(null);
      setGlobalAdded(true);
    }, 1000);

    setTimeout(() => {
      setlastid(null);
      setGlobalAdded(false);
    }, 2000);
  };

  const discountedPrice = product.price * 0.9;

  return (
    <div>
      <Navbar />

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Image 
              width={500}
              height={500}
              src={product.image}
              alt={product.title}
              className="w-full h-[350px] object-contain rounded-md"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-gray-700 mt-4">{product.description}</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="text-gray-700 line-through">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-red-500 font-bold">
                ${discountedPrice.toFixed(2)}
              </span>
            </div>
            {addedItem !== product.id ? (
              <button
                onClick={() => addToCart(product)}
                className={`mt-4 w-full text-white py-2 px-4 rounded hover:bg-slate-700 ${uselastid === product.id ? "bg-slate-900" : "bg-slate-800"}`}
              >
                {uselastid === product.id ? (
                  <p>Added to Cart</p>
                ) : (
                  <p>Add to Cart</p>
                )}
              </button>
            ) : (
              <div className="mt-4 w-full bg-slate-800 text-white py-2 px-4 rounded flex items-center justify-center">
                <BiLoaderAlt className="animate-spin" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <h1 className="text-2xl sm:text-4xl font-bold text-center my-8 text-slate-800">
          More like this
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {moreProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/products">
            <p className="text-slate-800 hover:underline">View All Products</p>
          </Link>
        </div>
      </div>
      
      <div className='bg-white w-full h-[100px] flex' />
      <Footer />
    </div>
  );
}
