import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

// types.ts
export interface Product {
  imageSrc: StaticImport;
  name: string;
  price: string;
  altText: string;
}

export const BestDealsProductCard = ({
  imageSrc,
  name,
  price,
  altText,
}: Product) => {
  return (
    <div className="flex w-full flex-col items-center p-0  md:p-1 lg:p-2">
      <Image
        src={imageSrc}
        alt={altText}
          className="object-contain md:h-64   md:w-64  pb-0  md:pb-1 lg:pb-2"
      />
      <h3 className=" text-sm md:text-xl font-semibold text-gray-700">{name}</h3>
      <p className="text-xs md:text-xl font-bold text-black">{price}</p>
    </div>
  );
};
