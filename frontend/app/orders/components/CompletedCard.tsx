import Image from "next/image";
import tshirt from "@/public/images/orders/t-shirt.png";

export const CompletedCard = () => {
  return (
    <div className="flex gap-2 rounded-lg border p-2 py-5">
      <div className="p-3 rounded-lg border w-fit h-fit">
        <Image src={tshirt} width={109} height={104} alt="t-shirt" />
      </div>
      <div className="flex flex-col gap-3 sm:flex sm:flex-row sm:justify-between sm:w-full">
        <div className="flex flex-col gap-2">
          <div className="font-bold">Delivered on 20 August</div>
          <div>
            <div>Regular Fit Slogan</div>
            <div>Size M</div>
          </div>
          <div className="flex justify-between">
            <div>$1,190</div>
            <button className="bg-yellow-500 font-bold p-2">Buy again</button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button className="bg-black text-white rounded-xl px-4 py-1">View Item</button>
          <button className="border border-black p-2 text-xs">
            leave a product feedback
          </button>
        </div>
      </div>
    </div>
  );
};
