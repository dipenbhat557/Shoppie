import Image from "next/image";
import tshirt from "@/public/images/orders/t-shirt.png";

export const OngoingCard = ({status}: {status: string}) => {
  return (
    <div className="flex gap-2 rounded-lg border p-2">
      <div className="p-3 rounded-lg border w-fit">
        <Image src={tshirt} width={109} height={104} alt="t-shirt" />
      </div>
      <div className="flex w-full flex-col justify-between">
        <div className="flex justify-between gap-2">
            <div className="flex flex-col">
                <div>Regular Fit Slogan</div>
                <div className="text-[#808080] text-sm">Size M</div>
            </div>
            <div className="rounded-xl bg-[#D9D9D9CF] h-fit p-2">{status}</div>
        </div>
        <div className="flex justify-between">
            <div>$1,190</div>
            <div className="text-[#DA5353]">Cancel</div>
        </div>
      </div>
    </div>
  );
};
