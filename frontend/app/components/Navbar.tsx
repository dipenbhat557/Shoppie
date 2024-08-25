import { useState, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import {useRecoilValue } from "recoil";
import { cartState } from "../utils/store";
import MainLogo from "./MainLogo";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import { NavbarProps } from "../types";

const Navbar = ({ categories,products }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const { data: session } = useSession();
  const cart = useRecoilValue(cartState);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  const handleMouseOverDropdown = () => {
    setDropdownOpen(true);
    if (timeoutId.current) clearTimeout(timeoutId.current);
  };

  const handleMouseLeaveDropdown = () => {
    timeoutId.current = setTimeout(() => setDropdownOpen(false), 1000);
  };

  const handleMouseOverCategory = () => {
    setCategoryDropdownOpen(true);
    if (timeoutId.current) clearTimeout(timeoutId.current);
  };

  const handleMouseLeaveCategory = () => {
    timeoutId.current = setTimeout(() => setCategoryDropdownOpen(false), 1000);
  };

  const handleSignOut = () => {
    signOut();
    localStorage.removeItem("userId");
  };

  const handleCategoryDropdown = () => {
    setCategoryDropdownOpen(prev => !prev);
  };

  return (
    <nav className="bg-[#F2F0F1] text-black px-4 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <MainLogo />
        <MobileMenu
        dropdownOpen={dropdownOpen} 
          isOpen={isOpen} 
          toggleMenu={toggleMenu} 
          categories={categories} 
          session={session}
          toggleDropdown={toggleDropdown} 
          handleSignOut={handleSignOut}
          cart={cart}
          handleCategoryDropdown={handleCategoryDropdown}
          categoryDropdownOpen={categoryDropdownOpen}
        />
        <DesktopMenu
        products={products}
          categories={categories}
          dropdownOpen={dropdownOpen}
          categoryDropdownOpen={categoryDropdownOpen}
          handleMouseOverDropdown={handleMouseOverDropdown}
          handleMouseLeaveDropdown={handleMouseLeaveDropdown}
          handleMouseOverCategory={handleMouseOverCategory}
          handleMouseLeaveCategory={handleMouseLeaveCategory}
          cart={cart}
          session={session}
          handleSignOut={handleSignOut}
        />
      </div>
      
    </nav>
  );
};

export default Navbar;
