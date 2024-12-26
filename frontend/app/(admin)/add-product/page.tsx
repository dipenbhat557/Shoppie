import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import { MobileSidebar } from "../components/MobileSidebar";
import { ProfileImg } from "../components/ProfileImg";
import { ProductList } from "../products/components/ProductList";
import { ProductInfo } from "./components/ProductInfo";

export default function Page() {
  return (
    <div>
      <div className="flex justify-between md:pb-5">
        <MobileSidebar />
        <Header title="Add Products" />
        <ProfileImg />
      </div>
      <MobileHeader title="Add Products" />
      <ProductInfo />
    </div>
  );
}
