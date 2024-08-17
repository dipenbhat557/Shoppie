import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AiFillProduct } from 'react-icons/ai';
import { FaHome, FaShoppingCart, FaUser } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import { useSession, signOut } from 'next-auth/react';
import SessionProviderWrapper from './SessionProviderWrapper';
import { useRecoilValue } from 'recoil';
import { cartState } from '../utils/store';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); 
  const { data: session, status } = useSession(); 
  const cart = useRecoilValue(cartState)
  let timeoutId: NodeJS.Timeout;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setDropdownOpen(false);
    }, 1000);
  };

  const handleMouseOverDropdown = () => {
    setDropdownOpen(true);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  const handleSignOut = () =>{
    signOut()
  }

  return (
    <nav className="bg-orange-500 text-white px-4 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center justify-center gap-4">
          <Image src="/icon.svg" height={50} width={50} alt="logo" className="rounded-full" />
          <span className="text-2xl font-bold">Shoppie</span>
        </Link>

        {/* Menu for mobile */}
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
                  <div>
                     <Link href="/auth/signin" onClick={toggleDropdown}>
                      <span className="block w-full text-left px-4 py-2 hover:bg-gray-200">Sign In</span>
                    </Link>
                    <Link href="/auth/signup" onClick={toggleDropdown}>
                      <span className="block w-full text-left px-4 py-2 hover:bg-gray-200">Sign Up</span>
                    </Link>
                  </div>
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

        {/* Links for larger screens */}
        <div className="hidden sm:flex gap-4 items-center">

          <Link href="/" className="flex gap-2 items-center">
            <FaHome className="text-2xl" />
            <span className="hover:text-gray-200">Home</span>
          </Link>

          <Link href="/products" className="flex gap-2 items-center">
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

          <div className="relative">
            <button onClick={toggleDropdown}  
              onMouseEnter={() => {
                setDropdownOpen(true);
              }}
              onMouseLeave={() => {
                handleMouseLeave();
              }} 
              className="flex items-center justify-center gap-2">
                  
              <FaUser className="text-2xl" />
              <span className="text-md font-bold">{session?.user?.name || "User"}</span>
            </button>

            {dropdownOpen && (
              <div 
                onMouseLeave={() => handleMouseLeave()}
                onMouseOver={() => handleMouseOverDropdown()} 
                className="absolute -right-32 mt-2 bg-white text-black rounded-b-lg shadow-lg w-11 sm:w-48">
                
                  {!session ? (
                    <div>
                    <Link href="/auth/signin" onClick={toggleDropdown}>
                        <span className="block w-full text-left px-4 py-2 hover:bg-gray-200">Sign In</span>
                      </Link>
                      <Link href="/auth/signup" onClick={toggleDropdown}>
                        <span className="block w-full text-left px-4 py-2 hover:bg-gray-200">Sign Up</span>
                      </Link>
                    </div>
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

      {/* Mobile Menu */}
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
          <Link href="/cart" onClick={toggleMenu} className="flex gap-2 items-center">
            <FaShoppingCart className="text-2xl" />
            <span className="hover:text-gray-200">Cart</span>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default function Navbar() {
  return (
    <SessionProviderWrapper>
      <Nav />
    </SessionProviderWrapper>
  );
}
