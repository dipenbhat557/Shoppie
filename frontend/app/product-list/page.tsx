import { Card } from "../../components/productList/Card";
import Cards from "../../components/productList/Cards";
import FilterDesktop from "../../components/productList/FilterDesktop";
import { FilterMobile } from "../../components/productList/FilterMobile";
import { NavigateProduct } from "../../components/productList/NavigateProduct";

export default function Page() {
    return (
        <>
        <div className="flex justify-start p-2 w-full">
            <NavigateProduct/>
        </div>
            <div className="md:grid md:grid-cols-3">
                <div className="hidden md:block">
                    <FilterDesktop />
                </div>
                <div className="md:hidden py-3 flex justify-end">
                    <FilterMobile />
                </div>
                <Cards />
            </div>
        </>
    )
}