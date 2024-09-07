import Image from "next/image";
import React from "react";

interface ProductCardProps {
  imageSrc: any;
  altText: string;
}
const ProductCard = ({ imageSrc, altText }: ProductCardProps) => {
  return (
    <div className="flex flex-col items-center text-center py-2">
      <div className="rounded-lg shadow-md bg-[#F0EEED] hover:bg-opacity-70 w-full h-full">
        <Image 
          src={imageSrc} 
          alt={altText} 
          className="rounded-lg object-cover w-full h-full"
          width={200}
          height={200}
          layout="responsive"
        />
      </div>
    </div>
  );
};

export default ProductCard;
