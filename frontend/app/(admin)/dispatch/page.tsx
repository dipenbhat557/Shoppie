import { MobileSidebar } from "../components/MobileSidebar";
import { ProfileImg } from "../components/ProfileImg";
import { Header } from "../components/Header";
import { MobileHeader } from "../components/MobileHeader";
import { DispatchList } from "./components/DispatchList";

export default function Page() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-2 bg-[#FFC633] rounded-full" />
          <h1 className="text-2xl font-semibold text-gray-900">Dispatch</h1>
        </div>
      </div>

      <div className="flex justify-between md:pb-5">
        <MobileSidebar />
      </div>
      
      <MobileHeader title="Dispatch" />
      <DispatchList />
    </div>
  );
}
