import { Nav } from "./components/Nav";
import { Sales } from "./components/Sales";
import { Search } from "./components/Search";

export default function Page() {
    return (
        <div className="container">
            <Nav />
            <Search />
            <Sales />
        </div>
    )
}