"use client"; 

import React, { useEffect, useState } from 'react';
import { ProductData, productState} from '../utils/store';
import ProductItem from './ProductItem';
import { useRecoilValue } from 'recoil';

interface CategorywiseProductProps {
  category: string;
}

const CategorywiseProduct: React.FC<CategorywiseProductProps> = ({ category}) => {
  const allProducts = useRecoilValue(productState)
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    const filteredProducts = allProducts.filter(product => product.category === category);
    setProducts(filteredProducts);
  }, [category, allProducts]);

  return (
    <div className="container mx-auto px-4 border border-grey-800 mt-2 p-2 rounded-lg">
      <h2 className="text-2xl sm:text-4xl font-bold my-8 text-grey-800">
        {category.toUpperCase()}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map(product => (
            <ProductItem key={product.id} product={product} />
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategorywiseProduct;
