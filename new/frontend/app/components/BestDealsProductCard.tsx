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
    <div className="flex flex-col items-center p-2">
      <Image
        src={imageSrc}
        alt={altText}
          className="object-contain h-64   w-64  pb-2"
      />
      <h3 className="text-lg font-semibold text-gray-700">{name}</h3>
      <p className="text-lg font-bold text-black">{price}</p>
    </div>
  );
};
