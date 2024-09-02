import men_sport from "../../public/images/DealsAdd/men_sport.png";
import men from "../../public/images/DealsAdd/men.png";
import women from "../../public/images/DealsAdd/women.png";

import women_shoe from "../../public/images/DealsAdd/women_shoes.png";

import Image from "next/image";

export const BestDealsAdd = () => {
  return (
    <div className="px-4 bg-white hover:bg-slate-100 shadow-md rounded-lg max-w-xl mx-auto">
      <p className="lg:text-xl md:text-xs font-bold p-4 ">
        Up to 40% off | Men's and Women's Footwear
      </p>

      <div className="grid grid-cols-2 gap-4 ">
        <div className="flex flex-col items-center">
          <Image
            src={men}
            alt="Men's shoes"
            className="w-full h-32 object-cover rounded-md"
          />
          <p className="mt-2 font-medium">Men's shoes</p>
        </div>

        <div className="flex flex-col items-center">
          <Image
            src={women_shoe}
            alt="Women's shoes"
            className="w-full h-32 object-cover rounded-md"
          />
          <p className="mt-2 font-medium">Women's shoes</p>
        </div>

        <div className="flex flex-col items-center">
          <Image
            src={men_sport}
            alt="Men's Casual"
            className="w-full h-32 object-cover rounded-md"
          />
          <p className="mt-2 font-medium">Men's Casual</p>
        </div>

        <div className="flex flex-col items-center">
          <Image
            src={women}
            alt="Women's Footwear"
            className="w-full h-32 object-cover rounded-md"
          />
          <p className="mt-2 font-medium">Women's Footwear</p>
        </div>
      </div>
    </div>
  );
};
