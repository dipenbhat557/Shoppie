"use client"

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useRouter } from 'next/navigation';
import { CartData, cartState, ProductData } from '../utils/store';
import { useRecoilState } from 'recoil';
import Link from 'next/link';
import Loading from '../components/Loading';

const PRODUCTS_PER_PAGE = 8;


export default function Products() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useRecoilState<CartData[]>(cartState);
  const router = useRouter();
  const [added,setAdded] = useState(false)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
        .then((data) => {
            setProducts(data.sort(() => 0.5 - Math.random()));
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching product:', error);
          setLoading(false);
        });  
  }, []);
        
  if (loading) {
    return <Loading/>
  }

  const addToCart = async (product: ProductData) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
  
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            ...product, 
            quantity: 1,
          },
        ];
      }
    });

    setAdded(true);
    window.scrollTo(0,0)
    setTimeout(()=>setAdded(false),3000)
  };
  
  
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
      {added && <div className='w-full h-[100px] text-white mt-3 bg-opacity-50 bg-green-500 flex items-center justify-center font-semibold'>Item Added to Cart Successfully!!</div>}
      <div className="container mx-auto px-4">
        <h1 className="text-2xl sm:text-4xl font-bold text-orange-500 text-center my-8">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {paginatedProducts?.map((product) => {
            const discountedPrice = product.price - (product.price * 10) / 100;

            return (
              <div key={product.id} className="border rounded-lg p-4 shadow-lg">
                <Link href={`/products/${product.id}`}>
                  <div className="cursor-pointer">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-[300px] sm:h-[350px] object-cover rounded-md"
                    />
                    <h2 className="text-xl font-semibold mt-4 line-clamp-1">
                      {product.title}
                    </h2>
                    <div className="mt-2">
                      <span className="text-gray-700 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-red-500 font-bold ml-2">
                        ${discountedPrice.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-gray-500 mt-2 line-clamp-2">
                      {product.description}...
                    </p>
                  </div>
                </Link>
                <button
                  onClick={(e) => {
                    e.stopPropagation();                     
                    addToCart(product);
                  }}
                  className="mt-4 w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
                >
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
