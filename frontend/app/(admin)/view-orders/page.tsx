import { MobileSidebar } from "../components/MobileSidebar";
import { ProfileImg } from "../components/ProfileImg";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import { OrderList } from "./components/OrdersList";

export default function Page() {
  return (
    <div className="">
      <div className="flex justify-between md:pb-5">
        <MobileSidebar />
      </div>
      <MobileHeader title="Orders" />
      <OrderList />
    </div>
  );
}
