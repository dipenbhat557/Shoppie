import React from 'react';
import Image from 'next/image';

export const AdBanner = () => {
  return (
    <div className="w-full flex items-center justify-center my-8">
     <div className="flex justify-center items-center p-10">
      <div className=" w-screen lg:w-[60%] md:w-[40%]">
        <Image
          src="/newImages/adBanner.png"
          width={1000}
          height={500}
          alt="banner1"
        />
      </div>
    </div>
    </div>
  );
};
