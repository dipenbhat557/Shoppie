import Image, { StaticImageData } from "next/image";
import shoe from "@/public/images/dashboard/shoe.png";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ProductItemProps {
  image: StaticImageData;
  name: string;
  sales: number;
  stock: number;
}

function ProductItem({ image, name, sales, stock }: ProductItemProps) {
  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex gap-4 items-center">
        <div className="bg-gray-100 rounded-lg p-3">
          <Image 
            src={shoe} 
            alt={name} 
            width={40} 
            height={40}
            className="object-contain" 
          />
        </div>
        <div>
          <h3 className="font-medium text-gray-900 mb-1">{name}</h3>
          <p className="text-sm text-gray-600">{sales.toLocaleString()} Sales</p>
        </div>
      </div>
      <div className="text-right">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Available
        </span>
        <p className="text-sm text-gray-600 mt-2">{stock} Stocks Remaining</p>
      </div>
    </div>
  );
}

const products = [
  {
    image: shoe,
    name: "Red Tape Sports Shoes for Men",
    sales: 12429,
    stock: 135
  },
  {
    image: shoe,
    name: "Nike Air Max Running Shoes",
    sales: 10892,
    stock: 89
  },
  {
    image: shoe,
    name: "Adidas Ultraboost 21",
    sales: 9876,
    stock: 167
  }
];

export function TopSelling() {
  return (
    <Card className="flex-1">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Top Selling Products
          </h2>
          <Button variant="outline" size="sm" className="text-gray-600 gap-2">
            See All Products
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          {products.map((product, index) => (
            <ProductItem key={index} {...product} />
          ))}
        </div>
      </div>
    </Card>
  );
}
