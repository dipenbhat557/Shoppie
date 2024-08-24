"use client";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { fetchProducts } from "../utils/api";
import { productState } from "../utils/store";

const ProductFetcher = () => {
  const setProducts = useSetRecoilState(productState);

  useEffect(() => {
    const fetchData = async () => {
      const products = await fetchProducts();
      setProducts(products);
    };
    
    fetchData();
  }, [setProducts]);

  return null; 
};

export default ProductFetcher;
