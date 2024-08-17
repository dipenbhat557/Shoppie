"use client";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import Link from "next/link";
import Hero from "./components/Hero";
import { categoryState, ProductData, productState } from "./utils/store";
import { useRecoilState, useRecoilValue } from "recoil";
import "./globals.css";
import ProductItem from "./components/ProductItem";
import CategorywiseProduct from "./components/CategorywiseProduct";

export default function Home() {
  const products = useRecoilValue<ProductData[]>(productState);
  const categories = useRecoilValue(categoryState)
  
  return (
    <div>
      <Navbar />
      <Hero />

      <div className="container mx-auto px-4 border border-grey-800 mt-2 p-2 rounded-lg">
        <h1 className="text-2xl sm:text-4xl font-bold  my-8 text-grey-800">
          Featured Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products?.slice(0,4)?.map((product: ProductData,index:number) => {
            return <ProductItem key={index} product={product}/>
          })}
        </div>
        <div className="text-center mt-8">
          <Link href="/products">
            <p className="text-grey-800 hover:underline text-right">View All Products</p>
          </Link>
        </div>
      </div>

      {categories?.map((c:string,index:number)=>{return(
        <CategorywiseProduct category={c} key={index}/>
      )})}
      <Footer />
    </div>
  );
}
