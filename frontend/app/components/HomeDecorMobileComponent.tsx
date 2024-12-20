
import of1 from "../../public/images/hom1.png";
import of2 from "../../public/images/hom2.png";
import DressStyle from "./DressStyle";
import { HomeDecorComponent } from "./HomeDecorComponent";


export const HomeDecorMobileComponent = () => {
    return (
        <div className=" max-w-sm w-full sm:hidden   mx-auto">
          <h1 className="pt-2 text-2xl w-full  font-bold">Home & Decor</h1>
            <div className=" flex w-full gap-1 pt-2">
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
         
          </div>
      );
}
