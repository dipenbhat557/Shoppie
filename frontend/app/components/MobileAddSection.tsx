import Image from "next/image";
import ad1 from "../../public/images/customad.png";
import { BestDealsAdd } from "./BestDealsAdd";

export const MobileAddSection = () => {
  return (
    <div className=" flex felx-col  sm:hidden     max-w-screen-sm">
      {/* <div className="w-1/2  bg-gray-100   ">
          <Image src={ad1} alt="Ad" className="" />
          <p className="font-bold text-red-500">Flat 40% off in H&M Brand</p>
          <p>
            From Rs<span>5000</span>{" "}
          </p>
      </div> */}

      <BestDealsAdd />
    </div>
  );
};
