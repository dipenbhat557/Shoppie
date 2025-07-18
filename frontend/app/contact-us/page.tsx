import ContactCard from "../../components/contact/ContactCard";
import { Navigate } from "../../components/contact/Navigate";
import { UserDetail } from "../../components/contact/UserDetail";
import SupportBar from "../../components/Support";
import service from "../../public/images/service.png"
import deliver from "../../public/images/delivery.png"
import support from "../../public/images/support.png"

export default function Page() {
    return (
        <div className="container flex flex-col gap-11 py-6">
            <Navigate />
            <div className="md:grid md:grid-cols-3 md:gap-5 flex flex-col gap-5">
                <ContactCard />
                <UserDetail />
            </div>
            <SupportBar service={service} deliver={deliver} support={support} />
        </div>
    )
}