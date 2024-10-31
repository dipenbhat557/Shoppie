'use client'

import { Slider } from "@/components/ui/slider"; // Adjust the import path accordingly
import { SetStateAction, useState } from "react";

export function PriceRange(){
  const [range, setRange] = useState([0, 2000]);

  const handleRangeChange = (value: SetStateAction<number[]>) => {
    setRange(value);
  };

  return (
    <Slider
          className="w-80"
          max={5000}
          min={0}
          step={1}
          value={range}
          onValueChange={handleRangeChange}
          formatLabel={(value) => `$ ${value}`} minStepsBetweenThumbs={0}    />
  );
};