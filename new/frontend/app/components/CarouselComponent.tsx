"use client";
import c1 from "../../public/images/crousel/c1.png";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { styles } from "../utils/styles";

export const CarouselComponent = () => {
  return (
    <div className={`relative w-[90%] overflow-hidden ${styles.screenMarginAuto} flex items-center justify-center pt-10`}>
      <Carousel
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
      >
        <CarouselContent className="relative w-full h-full">
          <CarouselItem className="relative w-full h-full flex items-center justify-center">
            <Image 
              src={c1} 
               height={800}
               width={1750} 
              
              alt="c1" 
            />
          </CarouselItem>
          <CarouselItem className="relative  w-full h-full flex items-center justify-center">
            <Image 
              src={c1} 
              
              height={800}
              width={1750} 

              alt="c2" 
            />
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};
