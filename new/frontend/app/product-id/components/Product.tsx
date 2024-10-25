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
        <div>
            <div>
                <Image
                    src={selectedImage}
                    height={100}
                    width={300}
                    alt="one"
                />
            </div>
            <div className="flex gap-2 py-2">
                {
                    unselectedImages.map((image, index) => (
                        <div key={index} onClick={() => setSelectedImage(image)}>
                            <Image
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