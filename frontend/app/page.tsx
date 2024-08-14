import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface ProductData{
    id:number;
    title:string;
    price:string;
    category:string;
    description:string;
    image:string;
}

export default function Home() {
  const [products, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=6')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center my-8">Featured Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product:ProductData) => {
            const discountedPrice = product.price - (product.price * 10) / 100;

            return (
              <div key={product.id} className="border rounded-lg p-4 shadow-lg">
                <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded-md" />
                <h2 className="text-xl font-semibold mt-4">{product.title}</h2>
                <div className="mt-2">
                  <span className="text-gray-700 line-through">${product.price.toFixed(2)}</span>
                  <span className="text-red-500 font-bold ml-2">${discountedPrice.toFixed(2)}</span>
                </div>
                <p className="text-gray-500 mt-2">{product.description.substring(0, 60)}...</p>
                <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-8">
          <Link href="/products">
            <a className="text-blue-500 hover:underline">View All Products</a>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
