import Image from "next/image"
import { GiHamburgerMenu } from "react-icons/gi"
import { HiOutlineShoppingCart } from "react-icons/hi"
import { SearchBar } from "./SearchBar"
import nav_iamge from "../../public/svg/shop_nav.svg";


export const MobileNavbar = () => {
  return (
    <div
    className={`text-black w-full flex flex-col  justify-between sm:hidden px-4 py-2 gap-3`}
  >
    <div className="flex  justify-between w-full">
      <div>
      <Image src={nav_iamge} width={120} height={120} alt="Nav Logo" />
      </div>
      <div className="flex ">
        <HiOutlineShoppingCart size={22} />
        <GiHamburgerMenu size={22} />
      </div>
    </div>

   <div className="w-full">  
    <SearchBar />
    </div>

  </div>

  )
}

