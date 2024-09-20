import React from 'react';
import Image, { StaticImageData } from 'next/image';


const SupportBar = ({ deliver, service, support }:{
  deliver: StaticImageData;
  service: StaticImageData;
  support: StaticImageData;
}) => {
  return (
    <div className="support-bar  max-w-screen-sm md:max-w-full flex justify-evenly py-6 sm:py-8 md:py-12 lg:py-16 px-4 sm:px-5 w-full sm:w-[95%] md:w-[90%] mx-auto">
      <SupportItem
        image={deliver}
        alt="Fast Delivery"
        title="FREE AND FAST DELIVERY"
        description="Free Delivery All Over Kathmandu"
      />
      <SupportItem
        image={service}
        alt="Customer Service"
        title="24/7 CUSTOMER SERVICE"
        description="Friendly 24/7 customer support"
      />
      <SupportItem
        image={support}
        alt="Money Back Guarantee"
        title="MONEY BACK GUARANTEE"
        description="We return money within 30 days"
      />
    </div>
  );
};

const SupportItem = ({ image, alt, title, description }:{
  image: StaticImageData;
  alt: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="support-icon flex flex-col items-center gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-0">
      <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 relative">
        <Image src={image} alt={alt} layout="fill" objectFit="contain" />
      </div>
      <div className="flex flex-col gap-1 sm:gap-2 md:gap-3 items-center ">
        <p className="support-text text-[8px] sm:text-sm md:text-xl lg:text-2xl font-semibold text-left sm:text-center">
          {title}
        </p>
        <p className="support-text  text-[6px] sm:text-sm md:text-base text-left sm:text-center">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SupportBar;