import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import products from '../../data';

export default function Products() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center my-8">Product Listing</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => {
            const discountedPrice = product.price - (product.price * product.discount) / 100;

            return (
              <div key={product.id} className="border rounded-lg p-4 shadow-lg">
                <img src={product.image} alt={product.name} className="w-full h-[250px] object-cover rounded-md" />
                <h2 className="text-xl font-semibold mt-4">{product.name}</h2>

                {product.discount > 0 ? (
                  <div className="mt-2">
                    <span className="text-gray-700 line-through">${product.price.toFixed(2)}</span>
                    <span className="text-red-500 font-bold ml-2">${discountedPrice.toFixed(2)}</span>
                  </div>
                ) : (
                  <p className="text-gray-700 mt-2">${product.price.toFixed(2)}</p>
                )}

                <p className="text-gray-500 mt-2">{product.description}</p>
                <button className="mt-4 w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600">
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
