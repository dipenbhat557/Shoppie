"use client";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import Link from "next/link";
import Hero from "./components/Hero";
import { ProductData, productState } from "./utils/store";
import { useRecoilState, useRecoilValue } from "recoil";
import "./globals.css";
import ProductItem from "./components/ProductItem";

export default function Home() {
  const products= useRecoilValue<ProductData[]>(productState);
  
  return (
    <div>
      <Navbar />
      <Hero />

      <div className="container mx-auto px-4">
        <h1 className="text-2xl sm:text-4xl font-bold text-center my-8 text-orange-500">
          Featured Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product: ProductData,index:number) => {
            return <ProductItem key={index} product={product}/>
          })}
        </div>
        <div className="text-center mt-8">
          <Link href="/products">
            <p className="text-orange-500 hover:underline">View All Products</p>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
