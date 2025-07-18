import Navbar from "../../components/Navbar";
import { Topbar } from "../../components/Topbar";
import { BillingDetails } from "./components/BillingDetails";

export default function Page() {
    return (
        <div>
            <Topbar />
            <Navbar />
            <BillingDetails />
        </div>
    )
}