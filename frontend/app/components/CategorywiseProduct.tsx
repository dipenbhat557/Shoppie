import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ProductData, productState } from '../utils/store';
import ProductItem from './ProductItem';
import Link from 'next/link';

interface CategorywiseProductProps {
  category: string;
}

const CategorywiseProduct: React.FC<CategorywiseProductProps> = ({ category }) => {
  const products = useRecoilValue(productState);
  const [items, setItems] = useState<ProductData[]>([]);

  useEffect(() => {
    // Filter products by category and update the state
    setItems(products.filter(p => p.category === category));
  }, [category, products]);

  return (
    <div className="container mx-auto px-4 border border-gray-800 mt-2 p-2 rounded-lg">
      <h1 className="text-2xl sm:text-4xl font-bold my-8 text-gray-800">
        {category.toUpperCase()}
      </h1>
      <div className="grid grid-cols-1 items-center sm:grid-cols-2 md:grid-cols-4 gap-6">
        {items.slice(0, 4).map((product: ProductData, index: number) => (
          <ProductItem key={index} product={product} />
        ))}
      </div>
      <div className="text-center mt-8">
        <Link href={`/products/category/${category}`}>
          <p className="text-gray-800 hover:underline">View All Products</p>
        </Link>
      </div>
    </div>
  );
};

export default CategorywiseProduct;
