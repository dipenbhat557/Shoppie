import { MobileSidebar } from "../components/MobileSidebar";
import { ProfileImg } from "../components/ProfileImg";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import { NewDeliveredOrder } from "./components/NewDeliveredOrder";

export default function Page() {
    return (
        <div>
            <div className="flex justify-between md:pb-5">
                <MobileSidebar />
                <Header title="Orders" />
                <ProfileImg />
            </div>
            <MobileHeader title="Orders" />
            <NewDeliveredOrder />
        </div>
    )
}