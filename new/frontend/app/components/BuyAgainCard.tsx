import Image, { StaticImageData } from "next/image";
import { FaStar } from "react-icons/fa";

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
    <div className="flex flex-col w-[20%]  ">
      <Image src={imageSrc} alt={altText} />
      <div className="flex flex-col justify-between gap-2  h-[60%] items-center w-full">
        <p className=" text-[20px] font-semibold"> {name}</p>
        <div className="w-full flex pb-4  justify-center gap-3">
          <div className=" flex  gap-2">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar
                className={`${
                  i < rating ? "text-[#FFC633]" : "text-slate-200"
                }`}
                key={i}
              />
            ))}
          </div>
          <div>{rating} / 5</div>
        </div>
        <div className=" relative    w-[90%]  ">
          <div className="flex  gap-3 font-semibold ">
          <p className=" line-through text-slate-400 text-[16px]">
            {" "}
            Rs. {price}
          </p>
          <p className="text-[18px]">Rs. {price - discount}</p>
          </div>

          <div className=" text-[12px] absolute -top-4 right-10 py-1 px-3 bg-red-300  bg-opacity-35  border rounded-lg   text-red-500">
              -Rs {discount}
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <button className="bg-[#FFC633] font-medium  w-[80%]  p-2">
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};
