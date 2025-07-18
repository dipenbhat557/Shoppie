import React from 'react';
import Image from 'next/image';

export const HeroBanner = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-0 sm:p-2 md:p-4">
      <Image
        src="/newImages/HeroBanner.png"
        alt="Hero Banner"
        width={900}
        height={400}
        className="object-contain w-full max-h-[300px] sm:max-h-[400px] md:max-h-[500px] rounded-xl shadow"
        priority
      />
    </div>
  );
};
