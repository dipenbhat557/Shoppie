import React from "react";
import DressStyle from "./DressStyle";

interface HomeDecorProps {
  offerImage: string;
  companyName: string;
  offer: string;
}

const HomeDecorComponent = ({
  offerImage,
  companyName,
  offer,
}: HomeDecorProps) => (
  <div className=" overflow-hidden">
    <div className="flex  justify-center">
      <img src={offerImage} alt="Ad" className="w-full object-cover" />
    </div>
    <div className="p-4 bg-white hover:bg-gray-100 shadow-lg cursor-pointer transition-colors duration-300 text-center">
      <p className="text-gray-700 md:text-sm text-xs">{companyName}</p>
      <p className="text-sm md:text-xl font-bold text-black pt-2">{offer}</p>
    </div>
  </div>
);

export const HomeDecor = () => {
  const of1 = "/images/hom1.png";
  const of2 = "/images/hom2.png";

  return (
    <div className="w-full p-2">
      <div className="hidden md:block w-full">
        <div className="w-[100%]  py-4">
          <h1 className="pt-2 text-3xl font-bold">Home & Decor</h1>
          <div className="flex gap-8">
            <div className="flex w-[60%] gap-2 pt-8">
              <HomeDecorComponent
                offer="1 For 1 Free"
                offerImage={of1}
                companyName="Premium Furnitures from Salimar.pvt.Ltd"
              />
              <HomeDecorComponent
                offer="50 % OFF"
                offerImage={of2}
                companyName="Premium Furnitures from Salimar.pvt.Ltd"
              />
              <HomeDecorComponent
                offer="1 For 1 Free"
                offerImage={of1}
                companyName="Premium Furnitures from Salimar.pvt.Ltd"
              />
            </div>
            <div className="w-[40%]  pb-4">
              <DressStyle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDecor;
