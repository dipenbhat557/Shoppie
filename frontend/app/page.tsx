"use client"

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Hero from './components/Hero';

interface ProductData{
    id:number;
    title:string;
    price:number;
    category:string;
    description:string;
    image:string;
}

export default function Home() {
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=8')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div>
      <Navbar />
      <Hero/>
      <div className="container mx-auto px-4">
        <h1 className=" text-2xl sm:text-4xl font-bold text-center my-8 text-orange-500">Featured Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product:ProductData) => {
            const discountedPrice: number= product.price - (product.price * 10) / 100;

            return (
              <div key={product.id} className="border rounded-lg p-4 shadow-lg">
                <img src={product.image} alt={product.title} className="w-full h-[300px] sm:h-[350px] object-cover rounded-md" />
                <h2 className="text-xl font-semibold mt-4 line-clamp-1">{product.title}</h2>
                <div className="mt-2">
                  <span className="text-gray-700 line-through">${product.price.toFixed(2)}</span>
                  <span className="text-red-500 font-bold ml-2">${discountedPrice.toFixed(2)}</span>
                </div>
                <p className="text-gray-500 mt-2 line-clamp-2">{product.description}...</p>
                <button onClick={()=>window.location.href="/cart"} className="mt-4 w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <Link href="/products">
            <p className="text-blue-500 hover:underline">View All Products</p>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
