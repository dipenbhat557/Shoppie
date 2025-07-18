// BuyAgainCard.tsx
import Image from "next/image";
import { FaStar } from "react-icons/fa";

interface BuyAgainCardProps {
  name: string;
  imageSrc: string;
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
  const discountedPrice = price - discount;
  const discountPercentage = Math.round((discount / price) * 100);

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden">
      <div className="aspect-square relative w-full bg-gray-50">
        <Image
          src={imageSrc}
          alt={altText}
          layout="fill"
          objectFit="contain"
          className="p-4"
        />
      </div>

      <div className="p-3 flex flex-col gap-2">
        <h3 className="font-medium text-sm sm:text-base line-clamp-1">
          {name}
        </h3>

        <div className="flex items-center gap-2">
          <div className="flex">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar
                key={i}
                className={`w-3 h-3 sm:w-4 sm:h-4 ${
                  i < rating ? "text-yellow-400" : "text-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="text-xs sm:text-sm text-gray-600">{rating}/5</span>
        </div>

        <div className="relative">
          <div className="flex items-center gap-2">
            <span className="text-lg sm:text-xl font-bold">
              ₹{discountedPrice}
            </span>
            <span className="text-sm sm:text-base text-gray-400 line-through">
              ₹{price}
            </span>
          </div>
          <span className="absolute -top-1 right-0 bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded">
            -{discountPercentage}%
          </span>
        </div>

        <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-sm sm:text-base py-2 rounded-md font-medium transition-colors">
          Buy now
        </button>
      </div>
    </div>
  );
};
