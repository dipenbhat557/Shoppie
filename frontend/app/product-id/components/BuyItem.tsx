import { Ratings } from "@/components/Rating";
import { BuyDetails } from "./BuyDetails";
import ProductDescription from "./ProductDescription";

export function BuyItem() {
  return (
    <div className="md:col-span-3 flex w-full justify-center">
      <div className="">
        <div className="flex flex-col justify-center md:p-4">
          <div className="flex flex-col gap-2 py-4">
            <div className="font-bold text-xl">Havic HV G-92 Gamepad</div>
            <div className="flex gap-2">
              <div>Sold by</div>
              <div className="text-[#30A35E]">Souled store</div>
            </div>
            <div className="flex flex-col gap-2">
              <Ratings rating={4} variant="yellow" totalstars={5} />
              <div className="flex">
                <div>(150 Reviews)</div>
                <div> | In Stock</div>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="text-xl">$192.00</div>
              <div className="text-gray-400 text-xl line-through">$232</div>
              <div className="text-[#FF3333] bg-[#FF33331A] p-1 rounded-2xl">
                -20%
              </div>
            </div>
          </div>
          <BuyDetails />
        </div>
        <ProductDescription />
      </div>
    </div>
  );
}
