import Image from "next/image";

export const BestDealsAdd = () => {
  return (
    <div className="w-full lg:w-[30%] bg-white shadow-md rounded-lg">
      <p className="lg:text-xl md:text-xs font-bold p-4">
        Up to 40% off | Mens and Womens Footwear
      </p>
      <div className="grid grid-cols-2 md:gap-4 gap-2 p-2">
        <div className="flex flex-col items-center">
          <Image
            src="/images/DealsAdd/men.png"
            width={100}
            height={100}
            alt="Men's shoes"
            className="w-[90%] md:w-full h-32 object-cover rounded-md"
          />
          <p className="font-medium">Mens shoes</p>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src="/images/DealsAdd/women_shoes.png"
            width={100}
            height={100}
            alt="Women's shoes"
            className="w-[90%] md:w-full h-32 object-cover rounded-md"
          />
          <p className="font-medium">Womens shoes</p>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src="/images/DealsAdd/men_sport.png"
            width={100}
            height={100}
            alt="Men's Casual"
            className="w-[90%] md:w-full h-32 object-cover rounded-md"
          />
          <p className="font-medium">Mens Casual</p>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src="/images/DealsAdd/women.png"
            width={100}
            height={100}
            alt="Women's Footwear"
            className="w-[90%] md:w-full h-32 object-cover rounded-md"
          />
          <p className="font-medium">Womens Footwear</p>
        </div>
      </div>
    </div>
  );
};
