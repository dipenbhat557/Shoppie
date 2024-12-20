import { MobileSidebar } from "../components/MobileSidebar";
import { ProfileImg } from "../components/ProfileImg";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import { ProductList } from "./components/ProductList";


export default function Page() {
    return (
        <div>
            <div className="flex justify-between md:pb-5">
                <MobileSidebar />
                <Header title="Products" />
                <ProfileImg />
            </div>
            <MobileHeader title="Products" />
            <ProductList />
        </div>
    )
}