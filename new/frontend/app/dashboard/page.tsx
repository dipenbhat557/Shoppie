import { DesktopSidebar } from "./components/DesktopSidebar";
import { Nav } from "./components/Nav";
import { Sales } from "./components/Sales";
import { Search } from "./components/Search";

export default function Page() {
    return (
        <div className=" bg-[#F7F7F7] md:grid md:grid-cols-4">
            <DesktopSidebar />
            <div className="md:col-span-3 md:p-4">
                <Nav />
                <Search />
                <Sales />
            </div>
        </div>
    )
}