import { CartData, ProductData } from "../utils/store";

  export interface Session {
    user: {
      name: string;
      email: string;
      id:number;
    };
  }
  
  export interface NavbarProps {
    categories: string[];
    products:ProductData[]
  }
  
  export interface MobileMenuProps {
    isOpen: boolean;
    toggleMenu: () => void;
    categories: string[];
    session: any;
    toggleDropdown: () => void;
    handleSignOut: () => void;
    dropdownOpen:boolean;
    cart:CartData[];
    categoryDropdownOpen:boolean;
    handleCategoryDropdown:()=>void
  }
  
  export interface DesktopMenuProps {
    products:ProductData[],
    categories: string[];
    dropdownOpen: boolean;
    categoryDropdownOpen: boolean;
    handleMouseOverDropdown: () => void;
    handleMouseLeaveDropdown: () => void;
    handleMouseOverCategory: () => void;
    handleMouseLeaveCategory: () => void;
    cart: CartData[];
    session: any;
    handleSignOut: () => void;
  }
  