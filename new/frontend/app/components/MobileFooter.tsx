"use client"
import Image from "next/image";
import React, { useState } from "react";

import paypal from "../../public/images/foot/foot.png";
import visa from "../../public/images/foot/visa.png";
import apay from "../../public/images/foot/apay.png";
import gpay from "../../public/images/foot/gpay.png";
import { BsFacebook, BsPinterest, BsTwitter } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { ChevronDown, ChevronUp } from "lucide-react";

import { ReactNode } from "react";


export const MobileFooter = () => {
  return (
    <footer className="w-full flex flex-col md:hidden gap-1">
      <div className="bg-black w-full flex flex-col text-white rounded-2xl py-2 px-4">
        <h2 className="text-sm font-sans font-bold p-2 text-center">
          STAY UP TO DATE ABOUT OUR LATEST OFFERS
        </h2>
        <div className="flex flex-col gap-3 items-center w-full">
          <input
            type="email"
            placeholder="Enter your email address"
            className="py-3 px-2 placeholder:text-center placeholder:text-xs w-[90%] rounded-full text-black"
          />
          <button className="bg-white text-black w-[50%] text-sm py-2 px-1 rounded-full font-bold">
            Subscribe to Newsletters
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col relative justify-around gap-3">
        <div className="h-auto w-full bg-gray-100 pt-4">
          <div className="w-[90%] mx-auto pb-5">
            <div className="p-2">
              <h3 className="text-xl font-bold">SHOP.CO</h3>
              <p className="text-gray-600 mt-4">
                We have clothes that suit your style and which youre proud to
                wear. From women to men.
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="#"><BsTwitter /></a>
                <a href="#"><BsFacebook /></a>
                <a href="#"><FaInstagram /></a>
                <a href="#"><BsPinterest /></a>
              </div>
            </div>

            <CollapsibleSection title="COMPANY">
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-black">About</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black">Features</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black">Works</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black">Career</a></li>
              </ul>
            </CollapsibleSection>

            <CollapsibleSection title="HELP">
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-black">Customer Support</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black">Delivery Details</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black">Terms & Conditions</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black">Privacy Policy</a></li>
              </ul>
            </CollapsibleSection>

            <CollapsibleSection title="FAQ">
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-black">Account</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black">Manage Deliveries</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black">Orders</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black">Payments</a></li>
              </ul>
            </CollapsibleSection>

            <CollapsibleSection title="RESOURCES">
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-black">Free eBooks</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black">Development Tutorial</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black">How to - Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-black">Youtube Playlist</a></li>
              </ul>
            </CollapsibleSection>
          </div>

          <div className="w-full border-b border-slate-400" />

          <div className="flex w-[90%] mx-auto py-10 justify-between items-center flex-col sm:flex-row">
            <p className="text-gray-600 text-center sm:text-left mb-4 sm:mb-0">
              Shop.co © 2000-2023, All Rights Reserved
            </p>
            <div className="flex space-x-4">
              <Image src={visa} alt="Visa" width={40} height={25} />
              <Image src={paypal} alt="PayPal" width={40} height={25} />
              <Image src={apay} alt="Apple Pay" width={40} height={25} />
              <Image src={gpay} alt="Google Pay" width={40} height={25} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};


const CollapsibleSection = ({ title, children }: { title: string, children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-2">
      <div 
        className="flex justify-between items-center cursor-pointer" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4 className="text-lg font-bold">{title}</h4>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      {isOpen && <div className="mt-2">{children}</div>}
    </div>
  );
};

