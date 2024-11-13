import Image from "next/image"
import profile from "@/public/images/dashboard/profile.png"
import { ChevronDown } from 'lucide-react';
import { MobileSidebar } from "./MobileSidebar";

export const Nav=() => {
    return (
        <div className="flex justify-between py-2">
            <MobileSidebar />
            <div className="flex gap-2 items-center">
                <Image
                    src={profile}
                    alt="img"
                    width={45}
                    height={45}
                />
                {/* <div>
                    <div className="font-bold">Bishop Heahmund</div>
                    <div className="font-light">Bishophea223@gmail.com</div>
                </div> */}
                {/* <ChevronDown size={24} /> */}
            </div>
        </div>
    )
}