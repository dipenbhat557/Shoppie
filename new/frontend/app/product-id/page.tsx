import Image from "next/image";
import { Navigate } from "./components/Navigate";
import { Product } from "./components/Product";
import { BuyItem } from "./components/BuyItem";

export default function Page() {
    return (
        <div>
            <Navigate />
            <Product />
            <BuyItem />
        </div>
    )
}