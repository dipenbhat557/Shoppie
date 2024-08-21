import { FaHome, FaShoppingCart, FaUser } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { MobileMenuProps } from "../types";
import Link from "next/link";
import { BiCategory } from "react-icons/bi";

const MobileMenu = ({
  isOpen,
  toggleMenu,
  categories,
  session,
  toggleDropdown,
  handleSignOut,
  dropdownOpen,
  cart,
  handleCategoryDropdown,
  categoryDropdownOpen
}: MobileMenuProps) => (
  <div className="sm:hidden flex flex-col gap-2">
    <div className=" flex items-center gap-3">
      <button onClick={toggleMenu} className="text-3xl focus:outline-none">
        {isOpen ? <HiX /> : <HiMenu />}
      </button>
      <div className="relative">
        <button onClick={toggleDropdown} className="flex items-center justify-center gap-2">
          <FaUser className="text-2xl" />
        </button>
        {dropdownOpen && (
          <div className="absolute z-10 right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-48">
            {!session ? (
              <>
                <Link href="/auth/signin" onClick={toggleDropdown}>
                  <span className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                    Sign In
                  </span>
                </Link>
                <Link href="/auth/signup" onClick={toggleDropdown}>
                  <span className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                    Sign Up
                  </span>
                </Link>
              </>
            ) : (
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Sign Out
              </button>
            )}
          </div>
        )}
      </div>
    </div>
      
      {isOpen && (
        <div className="sm:hidden absolute rounded-b-lg bg-white z-20 right-10 p-2 flex flex-col  gap-4 top-[10%]">
          <Link href="/" className="flex gap-2" onClick={toggleMenu}>
      <FaHome className="text-2xl" />
            Home
          </Link>
          <div className="relative" onClick={handleCategoryDropdown}>
            <button className="flex gap-2" >
        <BiCategory className="text-2xl" />
              Categories
            </button>
            {categoryDropdownOpen && (
              <div className=" mt-2 ">
                {categories.map((category, index) => (
                  <Link
                    href={`/products/category/${category}`}
                    key={index}
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={handleCategoryDropdown}
                  >
                    {category.toLocaleUpperCase()}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/cart" className="flex gap-2" onClick={toggleMenu}>
           <div className="relative">
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white text-xs font-semibold flex items-center justify-center rounded-full">
          {cart.length}
        </div>
        <FaShoppingCart className="text-2xl" />
      </div>
      <span className="hover:text-gray-800">Cart</span>
          </Link>
          
        </div>
      )}

  </div>
);

export default MobileMenu;
