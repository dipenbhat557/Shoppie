import Link from 'next/link'
import { ProductDetails } from './components/ProductDetails'
import { RelatedProducts } from './components/RelatedProducts'

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-gray-800">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/product-list" className="hover:text-gray-800">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-black font-medium">Havic HV G-92 Gamepad</span>
        </div>

        {/* Product Details */}
        <ProductDetails />

        {/* Related Products */}
        <RelatedProducts />
      </div>
    </div>
  )
}