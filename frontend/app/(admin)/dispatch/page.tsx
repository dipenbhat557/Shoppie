import { MobileSidebar } from "../components/MobileSidebar";
import { ProfileImg } from "../components/ProfileImg";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import { DispatchList } from "./components/DispatchList";

export default function Page() {
    return (
        <div>
            <div className="flex justify-between md:pb-5">
                <MobileSidebar />
                <Header title="Dispatch" />
                <ProfileImg />
            </div>
            <MobileHeader title="Dispatch" />
            <DispatchList />
        </div>
    )
}