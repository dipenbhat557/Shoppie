import Image from "next/image";
import tv from "../../../public/images/cart/tv.png";
import { Information } from "./Information";
import { Delete } from "./Delete";

export function Card() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 border shadow-md p-2 rounded-lg">
            <div className="flex flex-col justify-around md:col-span-1">
                <div className="flex items-center gap-5">
                    <input type="checkbox" value="tv"/>
                    <Image src={tv} alt="tv" width={130} height={101}/>
                </div>
                <Delete />
            </div>
            <Information />
        </div>
    )
}