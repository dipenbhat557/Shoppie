import Image from "next/image";
import nav_iamge from "../../public/svg/shop_nav.svg";
import { FaChevronDown } from "react-icons/fa";
import { SearchBar } from "./SearchBar";
import { MdOutlineAccountCircle } from "react-icons/md";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { styles } from "../utils/styles";
const Navbar = () => {
  return (
    <div
      className={` text-black  w-full ${styles.screenMarginAuto} ${styles.paddingX}  flex flex-col md:flex-row  justify-between `}
    >
      <div className="flex justify-between sm:w-full md:w-1/2">
        <div className="p-3">
          <Image src={nav_iamge} width={180} height={150} alt="Nav Logo" />
        </div>
          <SearchBar />
      </div>

      <div className="flex justify-evenly sm:w-full md:w-1/2 lg:w-1/4  pr-2  ">
        <div className="flex items-center  gap-2 border  border-black rounded-md px-4 py-2">
          <FaChevronDown size={22} />
          <span>Clearance</span>
        </div>

        <div className="flex items-center border   gap-2 border-black rounded-md px-4 py-2">
          <HiOutlineShoppingCart size={22} />
          <span>Basket</span>
        </div>

        <div className="flex items-center border   gap-2 border-black rounded-md px-4 py-2">
          <MdOutlineAccountCircle size={22} />
          <span>Account</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
