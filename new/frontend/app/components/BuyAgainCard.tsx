import Image, { StaticImageData } from "next/image";
import { FaStar } from "react-icons/fa";
import { styles } from "../utils/styles";

interface BuyAgainCardProps {
  name: string;
  imageSrc: StaticImageData;
  price: number;
  discount: number;
  rating: number;
  altText: string;
}
export const BuyAgainCard = ({
  name,
  imageSrc,
  price,
  discount,
  altText,
  rating,
}: BuyAgainCardProps) => {
  return (
    <div className="flex flex-col items-center">
    <div className={`rounded-lg shadow-md ${styles.productCardColor} w-full aspect-square relative`}>
      <Image 
        src={imageSrc} 
        alt={altText} 
        layout="fill" 
        objectFit="cover"
        className="rounded-lg"
      />
    </div>
    <div className="flex flex-col justify-between gap-1 py-1 sm:py-2 items-center w-full">
      <p className="text-xs sm:text-sm md:text-base font-semibold text-center line-clamp-1">{name}</p>
      <div className="w-full flex pb-1 sm:pb-2 justify-center gap-1">
        <div className="flex gap-0.5 sm:gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <FaStar
              className={`${i < rating ? "text-[#FFC633]" : "text-slate-200"} w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4`}
              key={i}
            />
          ))}
        </div>
        <div className="text-[8px] sm:text-xs md:text-sm">{rating}/5</div>
      </div>
      <div className="relative w-full px-1 sm:px-2">
        <div className="flex gap-1 sm:gap-2 font-semibold justify-center">
          <p className="line-through text-slate-400 text-[8px] sm:text-xs md:text-sm">
            Rs. {price}
          </p>
          <p className="text-[10px] sm:text-sm md:text-base">Rs. {price - discount}</p>
        </div>
        <div className="text-[6px] sm:text-[8px] md:text-xs absolute -top-3 sm:-top-4 right-1 sm:right-2 py-0.5 px-1 sm:py-1 sm:px-2 bg-red-300 bg-opacity-35 border rounded-lg text-red-500">
          -Rs {discount}
        </div>
      </div>
      <div className="flex items-center justify-center w-full mt-1 sm:mt-2">
        <button className={`${styles.buyNowButtonColor} ${styles.buyNowButtonHoverColor} font-medium w-full text-[8px] sm:text-xs md:text-sm py-1 px-2 sm:py-1.5 sm:px-3`}>
          Buy now
        </button>
      </div>
    </div>
  </div>
  );
};
