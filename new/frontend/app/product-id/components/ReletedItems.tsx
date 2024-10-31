import Image from "next/image";
import { Item } from "./Item";
import rec from "@/public/images/product-id/rec.png";

export default function ReletedItems() {
    return(
        <div>
            <div className="flex gap-3 p-3 pt-3">
                <Image
                    src={rec}
                    width={20}
                    height={40}
                    alt="rec"
                />
                <div className="font-bold text-xl">
                    Related Item
                </div>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-5">
                <Item />
                <Item />
                <Item />
                <Item />
                <Item />
            </div>
        </div>
    )
}