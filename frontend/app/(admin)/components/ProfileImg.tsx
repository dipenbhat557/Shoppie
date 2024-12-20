import Image from "next/image";
import profile from "@/public/images/dashboard/profile.png";

export function ProfileImg(){
    return (
        <div>
            <Image src={profile} alt="img" width={45} height={45} />
      </div>
    )
}