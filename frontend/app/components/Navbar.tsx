import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AiFillProduct } from 'react-icons/ai';
import { FaHome, FaShoppingCart } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-orange-500 text-white px-4 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className='flex items-center justify-center gap-4'>
          <Image src="/icon.svg" height={50} width={50} alt='logo' className='rounded-full' />
          <span className="text-2xl font-bold">Shoppie</span>
        </Link>

        {/* Hamburger Menu for mobile */}
        <div className="sm:hidden flex items-center">
          <button onClick={toggleMenu} className="text-3xl focus:outline-none">
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Links for larger screens */}
        <div className="hidden sm:flex gap-4">
          <Link href="/" className='flex gap-2 items-center'>
            <FaHome className='text-2xl' />
            <span className="hover:text-gray-200">Home</span>
          </Link>
          <Link href="/products" className='flex gap-2 items-center'>
            <AiFillProduct className='text-2xl' />
            <span className="hover:text-gray-200">Products</span>
          </Link>
          <Link href="/cart" className='flex gap-2 items-center'>
            <FaShoppingCart className='text-2xl' />
            <span className="hover:text-gray-200">Cart</span>
          </Link>
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
