import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AiFillProduct } from 'react-icons/ai';
import { FaHome, FaShoppingCart, FaUser } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import { useSession, signOut } from 'next-auth/react';
import SessionProviderWrapper from '../utils/SessionProviderWrapper';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartState, categoryState } from '../utils/store';
import Loading from './Loading';
import { BiCategory } from 'react-icons/bi';

function Nav() {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const [dropdownOpen, setDropdownOpen] = useState(false); // Auth dropdown state
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false); // Category dropdown state
  const { data: session } = useSession(); // User session data
  const cart = useRecoilValue(cartState); // Recoil cart state
  const [categories, setCategories] = useRecoilState(categoryState); // Recoil categories state
  const [loading, setLoading] = useState(true); // Loading state for fetching categories
  let timeoutId: NodeJS.Timeout;

  // Fetch categories from API
  useEffect(() => {
    console.log("session user is ",session?.user)
    fetch('https://fakestoreapi.com/products/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
        setLoading(false);
      });
  }, [setCategories]);

  if (loading) {
    return <Loading />;
  }

  // Mobile menu toggle
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Auth dropdown toggle for mobile
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleCategoryDropdown = () => {
    setCategoryDropdownOpen(!categoryDropdownOpen)
  }

  // Show auth dropdown on larger screens
  const handleMouseOverDropdown = () => {
    setDropdownOpen(true);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  // Hide auth dropdown with a delay on larger screens
  const handleMouseLeaveDropdown = () => {
    timeoutId = setTimeout(() => {
      setDropdownOpen(false);
    }, 1000);
  };

  // Show category dropdown on larger screens
  const handleMouseOverCategory = () => {
    setCategoryDropdownOpen(true);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  // Hide category dropdown with a delay on larger screens
  const handleMouseLeaveCategory = () => {
    timeoutId = setTimeout(() => {
      setCategoryDropdownOpen(false);
    }, 1000);
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <nav className="bg-orange-500 text-white px-4 py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Main Logo */}
        <Link href="/" className="flex items-center justify-center gap-4">
          <Image src="/icon.svg" height={50} width={50} alt="logo" className="rounded-full" />
          <span className="text-2xl font-bold">Shoppie</span>
        </Link>

        {/* Mobile menu */}
        <div className="sm:hidden flex items-center gap-3">
          <button onClick={toggleMenu} className="text-3xl focus:outline-none">
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
          <div className="relative">
            <button onClick={toggleDropdown} className="flex items-center justify-center gap-2">
              <FaUser className="text-2xl" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-48">
                {!session ? (
                  <>
                    <Link href="/auth/signin" onClick={toggleDropdown}>
                      <span className="block w-full text-left px-4 py-2 hover:bg-gray-200">Sign In</span>
                    </Link>
                    <Link href="/auth/signup" onClick={toggleDropdown}>
                      <span className="block w-full text-left px-4 py-2 hover:bg-gray-200">Sign Up</span>
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
          <Link href="/" className="flex gap-2 items-center">
            <FaHome className="text-2xl" />
            <span className="hover:text-gray-200">Home</span>
          </Link>

          <Link href="/products" className="flex gap-2 items-center">
            <AiFillProduct className="text-2xl" />
            <span className="hover:text-gray-200">Products</span>
          </Link>

          {/* Category dropdown */}
          <div
            className="relative"
            onMouseEnter={handleMouseOverCategory}
            onMouseLeave={handleMouseLeaveCategory}
          >
            <button className="flex gap-2 items-center">
              <BiCategory className="text-2xl" />
              <span className="hover:text-gray-200">Categories</span>
            </button>
            {categoryDropdownOpen && (
              <div className="absolute left-0 mt-2 bg-white text-black rounded-lg shadow-lg w-52">
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

          <Link href="/cart" className="flex items-center gap-2 relative">
            <div className="relative">
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-orange-500 text-white text-xs font-semibold flex items-center justify-center rounded-full">
                {cart?.length}
              </div>
              <FaShoppingCart className="text-2xl" />
            </div>
            <span className="hover:text-gray-500 transition-colors duration-200">Cart</span>
          </Link>

          {/* Auth dropdown for larger screens */}
          <div
            className="relative"
            onMouseEnter={handleMouseOverDropdown}
            onMouseLeave={handleMouseLeaveDropdown}
          >
            <button className="flex items-center justify-center gap-2">
              <FaUser className="text-2xl" />
              <span className="text-md font-bold">{session?.user?.name || 'User'}</span>
            </button>
            {dropdownOpen && (
              <div className="absolute -right-5 mt-2 bg-white text-black rounded-b-lg shadow-lg w-48">
                {!session ? (
                  <>
                    <Link href="/auth/signin" onClick={toggleDropdown}>
                      <span className="block w-full text-left px-4 py-2 hover:bg-gray-200">Sign In</span>
                    </Link>
                    <Link href="/auth/signup" onClick={toggleDropdown}>
                      <span className="block w-full text-left px-4 py-2 hover:bg-gray-200">Sign Up</span>
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

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="sm:hidden flex flex-col gap-4 bg-orange-500 text-white px-4 py-4">
          <Link href="/" onClick={toggleMenu} className="flex gap-2 items-center">
            <FaHome className="text-2xl" />
            <span className="hover:text-gray-200">Home</span>
          </Link>
          <Link href="/products" onClick={toggleMenu} className="flex gap-2 items-center">
            <AiFillProduct className="text-2xl" />
            <span className="hover:text-gray-200">Products</span>
          </Link>
          <Link href="/cart" className="flex items-center gap-2 relative">
            <div className="relative">
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-orange-500 text-white text-xs font-semibold flex items-center justify-center rounded-full">
                {cart?.length}
              </div>
              <FaShoppingCart className="text-2xl" />
            </div>
            <span className="hover:text-gray-500 transition-colors duration-200">Cart</span>
          </Link>
          {/* Category dropdown */}
          <div
            className="relative"
            onClick={handleCategoryDropdown}
          >
            <button className="flex gap-2 items-center">
              <BiCategory className="text-2xl" />
              <span className="hover:text-gray-200">Categories</span>
            </button>
            {categoryDropdownOpen && (
              <div className="  ">
                {categories.map((category, index) => (
                  <Link
                    href={`/products/category/${category}`}
                    key={index}
                    className="block px-4 py-2"
                  >
                    {category.toLocaleUpperCase()}
                  </Link>
                ))}
              </div>
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
