"use client";

import { useEffect, useState } from 'react';
import { addedState, CartData, cartState, ProductData, productState } from '@/app/utils/store';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useParams } from 'next/navigation';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { BiLoaderAlt } from 'react-icons/bi';
import Link from 'next/link';
import ProductItem from '@/app/components/ProductItem';
import useCart from '@/app/components/CartData';

export default function ProductPage() {
    const id = useParams()?.id
  const  setCart = useSetRecoilState<CartData[]>(cartState);
  const [product, setProduct] = useState<ProductData | null>(null);
  const [moreProducts, setMoreProducts] = useState<ProductData[]>([])
  const [addedItem, setAddedItem] = useState(0);
  const [uselastid, setlastid] = useState(0);
  const  setGlobalAdded = useSetRecoilState(addedState)
  const products = useRecoilValue(productState)
  const {updateCart,cart} = useCart()

  useEffect(() => {
    if (id) {
      setProduct(products?.filter(p=>p?.id === Number(id))?.[0])
    }
    
  }, [id]);

  useEffect(()=>{
      if(product?.category){
      setMoreProducts(products?.filter(p => p?.category === product?.category && p?.id !== product?.id))
    }

  },[product?.category])

  if (!product) {
    return <div>Product not found!</div>;
  }

  
  const addToCart = async (product: ProductData) => {
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === product.id);
    let newCart:CartData[] = [...cart];

    if (existingItem) {
      // Update quantity if product already exists
      newCart = newCart.map(item =>
        item.id === product?.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // Add new item if product does not exist
      newCart.push({ ...product,quantity:1 });
    }

    // Create CartReq object
  const cartReq: {productId:number;quantity:number} = {
    productId: product.id,
    quantity: 1,
  };

  // Update the cart
  await updateCart(cartReq);

    setAddedItem(product?.id);
    setlastid(product?.id);

    setTimeout(() => {
      setAddedItem(0);
      setGlobalAdded(true)
    }, 1000);

    setTimeout(() => {
      setlastid(0);
      setGlobalAdded(false)
    }, 2000);

  };

  const discountedPrice: number = product.price - (product.price * 10) / 100;

  return (
    <div>
      <Navbar />
      
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-[350px] object-contain rounded-md"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-gray-700 mt-4">{product.description}</p>
            <div className="mt-4">
              <span className="text-gray-700 line-through">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-red-500 font-bold ml-2">
                ${discountedPrice.toFixed(2)}
              </span>
            </div>
           {!(product?.id === addedItem) ? (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className={`mt-4 w-full  text-white py-2 px-4 rounded hover:bg-slate-700 ${
                        uselastid === product.id
                          ? "bg-slate-900"
                          : "bg-slate-800"
                      }`}
                    >
                      {uselastid == product.id ? (
                        <p>Added to Cart</p>
                      ) : (
                        <p> Add to Cart </p>
                      )}
                    </button>
                  </>
                ) : (
                  <div className="mt-4 w-full bg-slate-800 text-white py-2 px-4 rounded flex items-center justify-center">
                    <BiLoaderAlt className=" animate-spin" />
                  </div>
                )}          </div>
        </div>

      </div>
      
      <div className="container mx-auto p-4">
        <h1 className="text-2xl sm:text-4xl font-bold text-center my-8 text-slate-800">
          More like this
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {moreProducts.map((product: ProductData,index:number) => {
           return <ProductItem key={index} product={product}/> 
          })}
        </div>
        
        <div className="text-center mt-8">
          <Link href="/products">
            <p className="text-slate-800 hover:underline">View All Products</p>
          </Link>
        </div>
      </div>
    <div className='bg-white w-full h-[100px] flex' />
      <Footer/>
    </div>
  );
}
