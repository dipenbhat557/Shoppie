import Image from "next/image"
import { Ratings } from "./Rating"
import img from "../../../public/images/productList/t-shirt.png"

export function Card() {
    return (
        <div className="flex flex-col gap-2">
            <div>
                <Image
                    className="rounded-3xl"
                    src={img}
                    width={294}
                    height={441}
                    alt="item"
                />
            </div>
            <div className="text-xl font-bold">Gradient Graphic T-shirt</div>
            <Ratings rating={4} variant="yellow" totalStars={5} />
            <div className="text-xl font-bold">$145</div>
            <div className="text-center text-lg p-2 font-bold bg-[#FB641B]">Add to cart</div>
        </div>
    )
}