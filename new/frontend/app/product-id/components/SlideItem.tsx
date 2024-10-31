"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";
import img from "../../../public/images/product-id/image.png";
import left from "../../../public/images/product-id/left.png";
import right from "../../../public/images/product-id/right.png";
import Image from "next/image";

export function SlideItem() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [
    Autoplay({ delay: 2500 }),
  ]);
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="flex flex-col gap-3 pt-4">
      <div className="font-bold text-2xl">
        From the brand
      </div>
      <div className="relative embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            <div className="embla__slide flex justify-center">
              <Image
                className="w-[1440px] h-[250px] md:h-[607px]"
                src={img}
                height={607}
                width={1440}
                alt="image"
              />
            </div>
            <div className="embla__slide flex justify-center">
              <Image
                className="w-[1440px] h-[250px] md:h-[607px]"
                src={img}
                height={607}
                width={1440}
                alt="image"
              />
            </div>
            <div className="embla__slide flex justify-center">
              <Image
                className="w-[1440px] h-[250px] md:h-[607px]"
                src={img}
                height={607}
                width={1440}
                alt="image"
              />
            </div>
          </div>
        </div>
        <button
          className="absolute left-3 md:top-1/2 top-20 embla__prev"
          onClick={scrollPrev}
        >
          <Image
            className="h-14 w-14 md:h-85 md:w-85"
            src={left}
            alt="left"
            height={85}
            width={85}
          />
        </button>
        <button
          className="absolute right-3 md:top-1/2 top-20 embla__next"
          onClick={scrollNext}
        >
          <Image
            className="h-14 w-14 md:h-85 md:w-85"
            src={right}
            alt="left"
            height={85}
            width={85}
          />
        </button>
      </div>
    </div>
  );
}
