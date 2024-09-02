import { HomeDecorComponent } from "./HomeDecorComponent";

import of1 from "../../public/images/hom1.png";
import of2 from "../../public/images/hom2.png";
import DressStyle from "./DressStyle";

export const HomeDecor = () => {
  return (
    <div className="  w-[90%]  mx-auto py-4">
      <h1 className="pt-2 text-3xl  font-bold">Home & Decor</h1>
      <div className="flex">
        <div className=" flex w-[60%]  gap-2 pt-8">
          <HomeDecorComponent
            offer="1 For 1 Free"
            offerImage={of1}
            companyName="XXX"
          />
          <HomeDecorComponent
            offer="50 % OFF "
            offerImage={of2}
            companyName="Vixen"
          />
          <HomeDecorComponent
            offer="1 For 1 Free"
            offerImage={of1}
            companyName="XXX"
          />
        </div>
        <div className="w-[40%] px-5 pb-4">
          <DressStyle />
        </div>
      </div>
    </div>
  );
};
