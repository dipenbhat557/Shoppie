import { MobileSidebar } from "../components/MobileSidebar";
import { ProfileImg } from "../components/ProfileImg";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import { PromotionsList } from "./components/PromotionList";

export default function Page() {
  return (
    <div className="">
      <div className="flex justify-between md:pb-5">
        <MobileSidebar />
        <Header title="Promotions" />
        <ProfileImg />
      </div>
      <MobileHeader title="Promotions" />
      <PromotionsList />
    </div>
  );
}
