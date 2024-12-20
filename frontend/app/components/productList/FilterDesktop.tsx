import { PriceRange } from "./PriceRange";

export default function FilterDesktop() {
    return (
        <div className="border rounded-xl w-10/12 p-5">
            <div className="text-xl">Filters</div>
            <hr className="w-11/12 h-0.5 my-4 bg-gray-100 border-0 rounded md:my-10"></hr>
            <div className="flex flex-col gap-4">
                <div>Price</div>
                <PriceRange />
            </div>
        </div>
    )
}