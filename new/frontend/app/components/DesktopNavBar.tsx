import Image from "next/image"
import { SearchBar } from "./SearchBar"
import nav_iamge from "../../public/svg/shop_nav.svg";
import { FaChevronDown } from "react-icons/fa"
import { HiOutlineShoppingCart } from "react-icons/hi"
import { styles } from "../utils/styles"
import { MdOutlineAccountCircle } from "react-icons/md"

export const DesktopNavBar = () => {
  return (
    <div
    className={`text-black w-full ${styles.screenMarginAuto} ${styles.paddingX} hidden sm:flex flex-col md:flex-row justify-between`}
  >
    {/* Left section with image and search bar */}
    <div className="flex justify-between w-full md:w-1/2 items-center">
      <div className="p-3">
        <Image src={nav_iamge} width={180} height={150} alt="Nav Logo" />
      </div>
      <div className="flex-1 px-3">
        <SearchBar />
      </div>
    </div>

    {/* Right section with Clearance, Basket, and Account */}
    <div className="flex justify-evenly w-full md:w-1/2 lg:w-1/4 mt-4 md:mt-0 pr-2">
      {/* Clearance button */}
      <div className="flex items-center gap-2 border border-black rounded-md px-4 py-2">
        <FaChevronDown size={22} />
        <span>Clearance</span>
      </div>

      {/* Basket button */}
      <div className="flex items-center gap-2 border border-black rounded-md px-4 py-2">
        <HiOutlineShoppingCart size={22} />
        <span>Basket</span>
      </div>

      {/* Account button */}
      <div className="flex items-center gap-2 border border-black rounded-md px-4 py-2">
        <MdOutlineAccountCircle size={22} />
        <span>Account</span>
      </div>
    </div>
  </div>
  )
}
