"use client"
import { FC, useEffect } from 'react';
import { fetchProducts } from '../utils/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductsClient from '../components/ProductsClient';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { productState } from '../utils/store';

const ProductsPage: FC = async () => {
  
  const [products,setProducts] = useRecoilState(productState)

  useEffect(()=>{
    const loadProducts = async () =>{
      const data = await fetchProducts();

      setProducts(data)
    }

    loadProducts()
  },[])

  return (
    <div>
      <Navbar />
      <ProductsClient products={products} />
      <Footer />
    </div>
  );
};

export default ProductsPage;
