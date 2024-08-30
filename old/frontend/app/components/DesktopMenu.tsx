import { FaHome, FaShoppingCart, FaUser } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import Link from "next/link";
import { DesktopMenuProps } from "../types";
import Search from "./Search";

const DesktopMenu = ({
  categories,
  dropdownOpen,
  categoryDropdownOpen,
  handleMouseOverDropdown,
  handleMouseLeaveDropdown,
  handleMouseOverCategory,
  handleMouseLeaveCategory,
  cart,
  session,
  handleSignOut,
  products
}: DesktopMenuProps) => (
  <div className="hidden sm:flex gap-4 items-center">
    <Search products={products} />
    <Link href="/" className="flex gap-2 items-center">
      <FaHome className="text-2xl" />
      <span className="hover:text-gray-800">Home</span>
    </Link>
    <div
      className="relative"
      onMouseEnter={handleMouseOverCategory}
      onMouseLeave={handleMouseLeaveCategory}
    >
      <button className="flex gap-2 items-center">
        <BiCategory className="text-2xl" />
        <span className="hover:text-gray-800">Categories</span>
      </button>
      {categoryDropdownOpen && (
        <div className="absolute left-0 z-10 mt-2 bg-white text-black rounded-lg shadow-lg w-52">
          {categories.map((category, index) => (
            <Link
              href={`/products/category/${category}`}
              key={index}
              className="block px-4 py-2 hover:text-gray-800"
            >
              {category.toLocaleUpperCase()}
            </Link>
          ))}
        </div>
      )}
    </div>
    <Link href="/cart" className="flex items-center gap-2 relative">
      <div className="relative">
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white text-xs font-semibold flex items-center justify-center rounded-full">
          {cart.length}
        </div>
        <FaShoppingCart className="text-2xl" />
      </div>
      <span className="hover:text-gray-800">Cart</span>
    </Link>
    <div
      className="relative"
      onMouseEnter={handleMouseOverDropdown}
      onMouseLeave={handleMouseLeaveDropdown}
    >
      <button className="flex gap-2 items-center">
        <FaUser className="text-2xl" />
        <span className="hover:text-gray-800">Account</span>
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 z-10 mt-2 bg-white text-black rounded-lg shadow-lg w-48">
          {!session ? (
            <>
              <Link href="/auth/signin" className="block px-4 py-2 hover:bg-gray-200">
                Sign In
              </Link>
              <Link href="/auth/signup" className="block px-4 py-2 hover:bg-gray-200">
                Sign Up
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
);

export default DesktopMenu;
