'use client';

import Image from "next/image";
import two from "../../../public/images/product-id/two.png";
import three from "../../../public/images/product-id/three.png";
import four from "../../../public/images/product-id/four.png";
import five from "../../../public/images/product-id/five.png";
import { useState } from "react";

export function Product() {
    const [selectedImage, setSelectedImage] = useState(two);
    const [unselectedImages, setUnselectedImages] = useState([two, three, four, five]);
    return (
        <div className="md:flex md:justify-end md:gap-4 md:col-span-4 md:pt-4">
            <div className="flex md:order-2 justify-center">
                <Image
                    className="md:h-96 lg:w-full"
                    src={selectedImage}
                    height={100}
                    width={300}
                    alt="one"
                />
            </div>
            <div className="flex md:flex-col md:justify-start md:order-1 justify-center gap-2 py-2">
                {
                    unselectedImages.map((image, index) => (
                        <div key={index} onClick={() => setSelectedImage(image)}>
                            <Image
                                className="cursor-pointer md:h-20 md:w-32"
                                src={image}
                                width={70}
                                height={70}
                                alt="`image-${index}`"
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}