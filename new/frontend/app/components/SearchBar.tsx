"use client"
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="flex items-center border border-black rounded-3xl px-4 py-2 w-full ">
      {!inputValue && <FaSearch className="text-gray-500 mr-2" />}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search here..."
        className="flex-grow bg-transparent outline-none"
      />
    </div>
  );
};
