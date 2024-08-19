import ProductsClient from '../components/ProductsClient';
import { fetchProducts } from '../utils/api';

export default async function ProductsPage () {

  const products = await fetchProducts();
  return (
    <div>
      <ProductsClient products={products} />
    </div>
  );
};

