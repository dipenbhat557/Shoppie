import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface Product {
  name: string;
  color: string;
  category: string;
  price: number;
}

const products: Product[] = [
  {
    name: "Apple MacBook Pro 17",
    color: "Silver",
    category: "Laptop",
    price: 2999
  },
  {
    name: "Microsoft Surface Pro",
    color: "White",
    category: "Laptop PC",
    price: 1999
  },
  {
    name: "Magic Mouse 2",
    color: "Black",
    category: "Accessories",
    price: 99
  }
];

export const LatestOrder = () => {
  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Latest Products
          </h2>
          <Button variant="outline" size="sm" className="text-gray-600 gap-2">
            Export
            <Download className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative overflow-x-auto -mx-6">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-gray-600">
                  Product name
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-600">
                  Color
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-600">
                  Category
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-600">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product, index) => (
                <tr key={index} className="bg-white hover:bg-gray-50 transition-colors">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </th>
                  <td className="px-6 py-4 text-gray-600">
                    {product.color}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 text-gray-900 font-medium">
                    ${product.price.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
};
