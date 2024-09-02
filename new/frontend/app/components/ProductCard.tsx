import Image from "next/image";
import React from "react";

interface ProductCardProps {
  imageSrc: any;
  name: string;
  price: string;
  altText: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageSrc,
  name,
  price,
  altText,
}) => {
  return (
    <div className="flex  flex-col items-center text-center  py-2">
      <div className=" rounded-lg shadow-md bg-[#F0EEED] ">
        <Image src={imageSrc} alt={altText} width={222} height={222} />
      </div>

      <h3 className="text-sm font-medium pt-4">{name}</h3>
      <p className="text-lg font-bold text-black">{price}</p>
    </div>
  );
};

export default ProductCard;
