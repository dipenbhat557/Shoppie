
"use client";
import Image, { StaticImageData } from "next/image";
import f1 from "../../public/images/fashion/f1.png";
import f2 from "../../public/images/fashion/f2.png";
import f3 from "../../public/images/fashion/f3.png";
import f4 from "../../public/images/fashion/f4.png";

interface Props {
    imageUrl: StaticImageData;
    style: string;
    index: number;
  }

export const DressStyleMobileComponent = () => {
    const dressStyles = [
        {
          style: "Casual",
          imageUrl: f1,
        },
        {
          style: "Formal",
          imageUrl: f2,
        },
        {
          style: "Party",
          imageUrl: f4,
        },
        {
          style: "Gym",
          imageUrl: f3,
        },
      ];

    return (
        <div className="container sm:hidden  pb-2 max-w-screen-sm w-screen bg-[rgb(240,238,237)] border rounded-2xl ">
          <h2 className="text-2xl  font-bold font-serif   text-center py-4 ">
            BROWSE BY DRESS STYLE
          </h2>
          <div className="flex   flex-wrap w-full  gap-2">
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
}





const DressStyleItem = ({ imageUrl, style, index }: Props) => {
  return (
    
    <div 
      className={`relative  rounded-md overflow-hidden  ${
        index == 0 || index == 3 ? "w-[34%]" : "w-[63%]"
      } `}
    >
      <Image
        src={imageUrl}
        alt={style}
        className=" w-full    h-28   object-cover"
      />
      <div className="absolute  left-2 top-2   bg-opacity-50 flex items-center justify-center">
        <h3 className="text-black text-xl font-bold">{style}</h3>
      </div>
    </div>
    
  );
};



 

