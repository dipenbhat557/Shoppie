"use client";

import { useEffect, useState } from 'react';
import { CartData, cartState, ProductData } from '@/app/utils/store';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useParams } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import Loading from '@/app/components/Loading';
import ProductItem from '@/app/components/ProductItem';

const PRODUCTS_PER_PAGE = 8;

export default function ProductPage() {
  const params = useParams();
let category: string = '';

if (typeof params?.category === 'string') {
  category = decodeURIComponent(params.category);
} else if (Array.isArray(params?.category)) {
  // If for some reason category is an array, handle it accordingly
  category = decodeURIComponent(params.category.join(' ')); // or choose how you want to handle the array
}

  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [cart, setCart] = useRecoilState<CartData[]>(cartState);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter()

  useEffect(() => {
    if (category) {
      fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then((res) => res.json())
        .then((data) => {
            setProducts(data.sort(() => 0.5 - Math.random()));
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching product:', error);
          setLoading(false);
        });
    }
  }, [category]);

  if (loading) {
    return <Loading/>
  }

  if (!products) {
    return <div>Products not found!</div>;
  }

  
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
      {added && (
        <div className="w-full h-[100px] bg-opacity-50 text-white mt-3 bg-green-500 flex items-center justify-center font-semibold">
          Item Added to Cart Successfully!!
        </div>
      )}
      <div className="container mx-auto px-4">
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-800 text-center my-8">{category?.toLocaleUpperCase()}</h1>
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
    <div className='bg-white w-full h-[100px] flex' />
         <Footer />
    </div>
  );
}
