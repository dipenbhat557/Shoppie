import Navbar from "../components/Navbar";
import { Topbar } from "../components/Topbar";
import { Card } from "./components/Card";
import { Navigate } from "./components/Navigate";
import { DesktopTotalCart } from "./components/DesktopTotalCart";
import { MobileTotalCart } from "./components/MobileTotalCart";
import ReletedItems from "../product-id/components/ReletedItems";

export default function AddCartPage() {
  return (
    <div>
      <Topbar />
      <Navbar />
      <Navigate />
      <div className="md:grid md:grid-cols-3 lg:gap-2 md:p-4">
        <MobileTotalCart />
        <div className="flex flex-col gap-4 md:col-span-2 md:col-start-1 md:pt-7">
          <Card />
          <Card />
          <Card />
        </div>
        <DesktopTotalCart />
      </div>
      <ReletedItems />
    </div>
  );
}
