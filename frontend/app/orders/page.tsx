import Navbar from "../../components/Navbar";
import { Topbar } from "../../components/Topbar";
import { Main } from "./components/Main";

export default function Page() {
    return (
        <div>
            <Topbar />
            <Navbar />
            <Main />
        </div>
    )
}