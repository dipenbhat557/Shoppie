"use client"
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductsClient from '../components/ProductsClient';
import { useRecoilValue } from 'recoil';
import { productState } from '../utils/store';

const ProductsPage = () => {
  const products = useRecoilValue(productState);

  return (
    <div>
      <Navbar />
      <ProductsClient products={products} />
      <Footer />
    </div>
  );
};

export default ProductsPage;
