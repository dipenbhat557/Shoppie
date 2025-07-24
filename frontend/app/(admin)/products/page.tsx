import { MobileSidebar } from "../components/MobileSidebar";
import { MobileHeader } from "../components/MobileHeader";
import { ProductList } from "./components/ProductList";

export default function Page() {
  return (
    <div>
      <div className="flex justify-between md:pb-5">
        <MobileSidebar />
      </div>
      <MobileHeader title="Products" />
      <ProductList />
    </div>
  );
}
