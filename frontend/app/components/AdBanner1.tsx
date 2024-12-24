import React from "react";
import Image from "next/image";
function AdBanner1() {
  return (
    <div className="flex justify-center items-center p-10">
      <div className=" w-screen lg:w-[60%] md:w-[40%]">
        <Image
          src="/images/AdBanner1.png"
          width={1000}
          height={500}
          alt="banner1"
        />
      </div>
    </div>
  );
}

export default AdBanner1;
