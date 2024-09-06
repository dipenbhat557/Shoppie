import React from "react";
import service from "../../public/images/service.png";
import deliver from "../../public/images/delivery.png";
import support from "../../public/images/support.png";
import Image from "next/image";

export const Support = () => {
  return (
    <div className="support-bar flex justify-evenly sm:py-10 md:py-16  px-5 w-[90] mx-auto">
      <div className="support-icon flex flex-col gap-8 items-center">
        <Image src={deliver} alt="Fast Delivery" />

        <div className="flex flex-col gap-3 items-center">
          <p className="support-text  text-2xl font-semibold ">
            FREE AND FAST DELIVERY
          </p>
          <p className="support-text">Free Delivery All Over Kathmandu</p>
        </div>
      </div>
      <div className="support-icon flex flex-col gap-8 items-center ">
        <Image src={service} alt="Cheap Prices" />
        <div className="flex flex-col gap-3 items-center">
          <p className="support-text text-2xl font-semibold">
            24/7 CUSTOMER SERVICE
          </p>
          <p className="support-text">Friendly 24/7 customer support</p>
        </div>
      </div>
      <div className="support-icon flex flex-col gap-8 items-center ">
        <Image src={support} alt="Easy Returns" />
        <div className="flex flex-col gap-3 items-center">
          <p className="support-text text-2xl font-semibold">
            MONEY BACK GUARANTEE
          </p>
          <p className="support-text">We reurn money within 30 days</p>
        </div>
      </div>
    </div>
  );
};
