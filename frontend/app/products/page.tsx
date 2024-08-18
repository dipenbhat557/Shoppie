"use client"
import { FC } from 'react';
import { fetchProducts } from '../utils/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductsClient from '../components/ProductsClient';

const ProductsPage: FC = async () => {
  const products = await fetchProducts();

  return (
    <div>
      <Navbar />
      <ProductsClient products={products} />
      <Footer />
    </div>
  );
};

export default ProductsPage;
