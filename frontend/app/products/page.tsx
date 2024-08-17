"use client"

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRouter } from 'next/navigation';
import ProductItem from '../components/ProductItem';
import { ProductData, productState } from '../utils/store';
import { useRecoilValue } from 'recoil';

const PRODUCTS_PER_PAGE = 8;


export default function Products() {
  const products = useRecoilValue<ProductData[]>(productState);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
 
  
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePageChange = (page:number) => {
    setCurrentPage(page);
    router.push(`/products?page=${page}`, undefined);
  };


  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-800 text-center my-8">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {paginatedProducts?.map((product,index) => {
           return <ProductItem product={product} key={index}/> 
          })}
        </div>
        <div className="flex justify-center mt-8">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`mx-2 px-4 py-2 rounded ${currentPage === i + 1 ? 'bg-slate-800 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
