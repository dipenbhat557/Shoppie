import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiFillProduct } from "react-icons/ai";
import { FaHome, FaShoppingCart, FaUser } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { useSession, signOut } from "next-auth/react";
import SessionProviderWrapper from "../utils/SessionProviderWrapper";
import { useRecoilState, useRecoilValue } from "recoil";
import { CartData, cartState, categoryState, productState } from "../utils/store";
import Loading from "./Loading";
import { BiCategory } from "react-icons/bi";
import Search from "./Search";

function Nav() {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const [dropdownOpen, setDropdownOpen] = useState(false); // Auth dropdown state
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false); // Category dropdown state
  const { data: session } = useSession(); // User session data
  const [cart, setCartItems] = useRecoilState(cartState); // Recoil cart state
  const [categories, setCategories] = useRecoilState(categoryState); // Recoil categories state
  const [loading, setLoading] = useState(true); // Loading state for fetching categories
  const timeoutId = useRef<NodeJS.Timeout | null>(null); // Ref for managing timeout

  const products = useRecoilValue(productState);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [setCategories]);

  useEffect(() => {
    const fetchCartData = async () => {
      const userId = typeof window !== 'undefined' ? localStorage.getItem("userId") : null;

      if (userId) {
        try {
          const response = await fetch(`/api/cart/user/${userId}`);
          if (!response.ok) throw new Error("Failed to fetch cart data");
          const data: any = await response.json();

          const newCartItems: CartData[] = data?.items?.map((i: any) => {
            const itemProduct = products?.find(p => p.id === i.productId);
            return itemProduct ? { ...itemProduct, quantity: i.quantity } : null;
          }).filter((item: CartData | null) => item !== null) || [];

          setCartItems(newCartItems);
        } catch (error) {
          console.error("Error fetching cart data:", error);
          setCartItems([]);
        }
      }
    };

    fetchCartData();
  }, [products, setCartItems]);

  if (loading) {
    return <Loading />;
  }

  // Mobile menu toggle
  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  // Auth dropdown toggle for mobile
  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleCategoryDropdown = () => {
    setCategoryDropdownOpen(prev => !prev);
  };

  // Show auth dropdown on larger screens
  const handleMouseOverDropdown = () => {
    setDropdownOpen(true);
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
  };

  // Hide auth dropdown with a delay on larger screens
  const handleMouseLeaveDropdown = () => {
    timeoutId.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 1000);
  };

  // Show category dropdown on larger screens
  const handleMouseOverCategory = () => {
    setCategoryDropdownOpen(true);
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
  };

  // Hide category dropdown with a delay on larger screens
  const handleMouseLeaveCategory = () => {
    timeoutId.current = setTimeout(() => {
      setCategoryDropdownOpen(false);
    }, 1000);
  };

  const handleSignOut = () => {
    signOut();
    localStorage.removeItem("userId");
  };

  return (
    <nav className="bg-[#F2F0F1] text-black px-4 py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Main Logo */}
        <Link href="/" className="flex items-center justify-center gap-4">
          <Image
            src="/icon.png"
            height={50}
            width={50}
            alt="logo"
            className="rounded-full"
          />
          <span className="text-2xl font-bold">Shoppie</span>
        </Link>

        {/* Mobile menu */}
        <div className="sm:hidden flex items-center gap-3">
          <button onClick={toggleMenu} className="text-3xl focus:outline-none">
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-center gap-2"
            >
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

        {/* Larger screen navigation */}
        <div className="hidden sm:flex gap-4 items-center">
          <Search />

          <Link href="/" className="flex gap-2 items-center">
            <FaHome className="text-2xl" />
            <span className="hover:text-gray-800">Home</span>
          </Link>

          {/* Category dropdown */}
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
            <span className="hover:text-gray-800 transition-colors duration-200">
              Cart
            </span>
          </Link>

          {/* Auth dropdown for larger screens */}
          <div
            className="relative"
            onMouseEnter={handleMouseOverDropdown}
            onMouseLeave={handleMouseLeaveDropdown}
          >
            <button className="flex items-center justify-center gap-2">
              <FaUser className="text-2xl" />
              <span className="text-md font-bold">
                {session?.user?.name?.split(" ")?.[0] || "User"}
              </span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-48">
                {!session ? (
                  <>
                    <Link href="/auth/signin">
                      <span className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                        Sign In
                      </span>
                    </Link>
                    <Link href="/auth/signup">
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
      </div>

      {/* Mobile menu items */}
      {isOpen && (
        <div className="sm:hidden flex flex-col items-center gap-4 mt-4">
          <Link href="/" onClick={toggleMenu}>
            Home
          </Link>
          <div className="relative">
            <button onClick={handleCategoryDropdown}>
              Categories
            </button>
            {categoryDropdownOpen && (
              <div className="absolute z-10 mt-2 bg-white text-black rounded-lg shadow-lg w-52">
                {categories.map((category, index) => (
                  <Link
                    href={`/products/category/${category}`}
                    key={index}
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    {category.toLocaleUpperCase()}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/cart" onClick={toggleMenu}>
            Cart ({cart.length})
          </Link>
          <div>
            {!session ? (
              <>
                <Link href="/auth/signin" onClick={toggleMenu}>
                  Sign In
                </Link>
                <Link href="/auth/signup" onClick={toggleMenu}>
                  Sign Up
                </Link>
              </>
            ) : (
              <button onClick={handleSignOut}>
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default function Navbar() {
  return (
    // session provider wrapper for getting user session
    <SessionProviderWrapper>
      <Nav />
    </SessionProviderWrapper>
  );
}