"use client"

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRouter } from 'next/navigation';

const PRODUCTS_PER_PAGE = 8;

interface ProductData{
    id:number;
    title:string;
    price:number;
    category:string;
    description:string;
    image:string;
}
export default function Products() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.sort(() => 0.5 - Math.random()));
      });
  }, []);

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
        <h1 className="text-2xl sm:text-4xl font-bold text-orange-500 text-center my-8">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => {
            const discountedPrice = product.price - (product.price * 10) / 100;

            return (
              <div key={product.id} className="border rounded-lg p-4 shadow-lg">
                <img src={product.image} alt={product.title} className="w-full h-[300px] sm:h-[350px] object-cover rounded-md" />
                <h2 className="text-xl font-semibold mt-4 line-clamp-1">{product.title}</h2>
                <div className="mt-2">
                  <span className="text-gray-700 line-through">${product.price.toFixed(2)}</span>
                  <span className="text-red-500 font-bold ml-2">${discountedPrice.toFixed(2)}</span>
                </div>
                <p className="text-gray-500 mt-2 line-clamp-2">{product.description}...</p>
                <button className="mt-4 w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center mt-8">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`mx-2 px-4 py-2 rounded ${currentPage === i + 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700'}`}
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
