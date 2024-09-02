import Image, { StaticImageData } from "next/image";
import React from "react";

interface HomeDecorProps {
  offerImage: StaticImageData;
  companyName: string;
  offer: string;
}

export const HomeDecorComponent = ({
  offerImage,
  companyName,
  offer,
}: HomeDecorProps) => {
  return (
        <div className="  hover:bg-slate-100  rounded-xl     overflow-hidden ">
      <div className="flex justify-center">
        <Image src={offerImage} alt="Ad" className="w-full  object-cover" />
      </div>
      <div className="p-4 text-center">
        <p className="text-gray-700 text-sm">{companyName}</p>
        <p className="text-xl font-bold text-black pt-2">{offer}</p>
      </div>
    </div>
  );
};
