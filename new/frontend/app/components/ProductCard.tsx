import Image from "next/image";
import React from "react";

interface ProductCardProps {
  imageSrc: any;
  altText: string;
}

const ProductCard = ({ imageSrc, altText }: ProductCardProps) => {
  return (
    <div className="flex flex-col items-center text-center py-2">
      <div className="rounded-lg shadow-md bg-[#F0EEED] hover:bg-opacity-70">
        <Image src={imageSrc} alt={altText} className="rounded-lg" />
      </div>
    </div>
  );
};

export default ProductCard;
