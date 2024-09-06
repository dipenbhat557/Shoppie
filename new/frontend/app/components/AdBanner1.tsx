import Image from "next/image"
import c1 from "../../public/images/crousel/c1.png";


export const AdBanner1 = () => {
  return (
    <div className="flex justify-center items-center p-10">
        <div className=" lg:w-[60%] md:w-[40%]">
            <Image src={c1} alt="banner1" />
        </div>

    </div>
  )
}
