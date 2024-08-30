'use client';

import { useState, useEffect } from 'react';
import { ProductData } from '../utils/store';
import { fetchProducts } from '../utils/api';
import ProductItem from './ProductItem';

const PRODUCTS_PER_PAGE = 8;

const ProductsClient: React.FC<{ products: ProductData[] }> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsData, setProductsData] = useState<ProductData[]>(products);

  const totalPages = Math.ceil(productsData.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = productsData.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Optionally re-fetch products if needed
  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProductsData(fetchedProducts);
    };

    loadProducts();
  }, []); // empty dependency array to run once on mount

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl sm:text-4xl font-bold text-slate-800 text-center my-8">
        All Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {paginatedProducts.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
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
  );
};

export default ProductsClient;
