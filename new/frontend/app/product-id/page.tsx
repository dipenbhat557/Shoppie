import { Navigate } from "./components/Navigate";
import { Product } from "./components/Product";
import { BuyItem } from "./components/BuyItem";
import {SlideItem} from "./components/SlideItem";
import Reviews from "./components/Reviews";
import ReletedItems from "./components/ReletedItems";

export default function Page() {
    return (
        <div>
            <Navigate />
            <div className="container md:grid md:grid-cols-7 md:gap-5">
                <Product />
                <BuyItem />
            </div>
            <SlideItem />
            <Reviews />
            <ReletedItems />
        </div>
    )
}