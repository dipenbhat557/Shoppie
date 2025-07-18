import React from "react";
import Image from "next/image";

interface Props {
  imageUrl: string;
  style: string;
  index: number;
}

const DressStyleItem = ({ imageUrl, style, index }: Props) => {
  return (
    
    <div 
      className={`relative      rounded-lg overflow-hidden ${
        index == 0 || index == 3 ? "w-[34%]" : "w-[64%]"
      } `}
    >
      <Image
        src={imageUrl}
        alt={style}
        width={100}
        height={100}
        className="w-full    h-24  md:h-32 object-cover"
      />
      <div className="absolute  left-6 top-6   bg-opacity-50flex items-center justify-center">
        <h3 className="text-black text-lg font-bold">{style}</h3>
      </div>
    </div>
    
  );
};

export const DressStyle = () => {
  const dressStyles = [
    {
      style: "Casual",
      imageUrl: "/images/fashion/f1.png",
    },
    {
      style: "Formal",
      imageUrl: "/images/fashion/f2.png",
    },
    {
      style: "Party",
      imageUrl: "/images/fashion/f4.png",
    },
    {
      style: "Gym",
      imageUrl: "/images/fashion/f3.png",
    },
  ];

  return (
    <div className="container pb-8 w-full bg-[rgb(240,238,237)] border rounded-2xl ">
      <h2 className="text-3xl font-extrabold font-serif md:text-4xl  pl-4 text-center py-10 ">
        BROWSE BY DRESS STYLE
      </h2>
      <div className="flex  flex-wrap  gap-2">
        {dressStyles.map((dressStyle, index) => (
          <DressStyleItem

            key={dressStyle.style}
            imageUrl={dressStyle.imageUrl}
            style={dressStyle.style}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default DressStyle;
