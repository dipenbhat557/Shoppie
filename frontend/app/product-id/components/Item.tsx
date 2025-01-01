import Image from "next/image";
import { Ratings } from "../../components/Rating";
import related from "@/public/images/product-id/related.png";

export function Item() {
    return (
        <div className="flex justify-center">
            <div className="flex flex-col gap-2 items-center">
                <Image
                    className="rounded-3xl"
                    src={related}
                    width={238}
                    height={241}
                    alt="item"
                />

                <div className="text-center flex flex-col items-center">
                    <div className="text-xl font-bold">T-shirt</div>
                    <Ratings className="flex justify-center" rating={4} variant="yellow" totalstars={5} />
                    <div className="text-xl font-bold">$145</div>
                    <button className="text-center text-lg p-2 font-bold bg-[#FFC633] w-36">
                        Buy now
                    </button>
                </div>
            </div>
        </div>
    );
}
