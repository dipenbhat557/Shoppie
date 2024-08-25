import Link from "next/link";
import Hero from "./components/Hero";
import { fetchProducts } from "./utils/api";
import ProductItem from "./components/ProductItem";
import CategorywiseProduct from "./components/CategorywiseProduct";

export default async function Home() {
  const products = await fetchProducts();
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div>
      <Hero />

      <div className="container mx-auto px-4 border border-grey-800 mt-2 p-2 rounded-lg">
        <h1 className="text-2xl sm:text-4xl font-bold my-8 text-grey-800">
          Featured Product
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/products">
            <p className="text-grey-800 hover:underline text-right">
              View All Products
            </p>
          </Link>
        </div>
      </div>

      <div className="py-2">
        {categories.map((category, index) => (
          <CategorywiseProduct category={category} key={index} />
        ))}
      </div>
      <div className="bg-white w-full h-[100px] flex" />
    </div>
  );
}
