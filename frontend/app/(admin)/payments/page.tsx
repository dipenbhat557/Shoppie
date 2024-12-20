import { MobileSidebar } from "../components/MobileSidebar";
import { ProfileImg } from "../components/ProfileImg";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import { PaymentItems } from "./components/PaymentItems";


export default function Page() {
    return (
        <div>
            <div className="flex justify-between md:pb-5">
                <MobileSidebar />
                <Header title="Payments" />
                <ProfileImg />
            </div>
            <MobileHeader title="Payments" />
            <PaymentItems />
        </div>
    )
}