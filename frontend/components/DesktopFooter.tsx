import Image from "next/image";
import React from "react";

import { BsFacebook, BsPinterest, BsTwitter } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";

export const DesktopFooter = () => {
  return (
    <footer className=" w-full h-auto  hidden     md:flex md:flex-col  ">
      <div className="w-full h-[120px]" />
      <div className=" w-full  flex flex-col relative  justify-around gap-3 ">
        <div className="bg-black w-[90%]  h-48  absolute -top-[20%]  right-[5%]  flex  justify-between   items-center       mx-auto text-white rounded-3xl py-6 px-8">
          <h2 className="text-5xl font-sans w-[50%] font-bold">
            STAY UP TO DATE ABOUT OUR LATEST OFFERS
          </h2>
          <div className="flex  flex-col gap-5 items-center w-[40%] space-x-4">
            <input
              type="email"
              placeholder={` Enter your email address`}
              className="py-3 px-2 placeholder:text-center  w-[50%] rounded-full text-black"
            />
            <button className="bg-white text-black w-[50%]  py-3 px-2 rounded-full font-bold">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
        <div className="   h-auto w-full  bg-gray-100">
          <div className="w-full  h-[200px] " />

          <div className="  grid grid-cols-1 w-[90%] mx-auto md:grid-cols-5 pb-5  gap-8">
            <div>
              <h3 className="text-xl font-bold">SHOP.CO</h3>
              <p className="text-gray-600 mt-4">
                We have clothes that suit your style and which you`re proud to
                wear. From women to men.
              </p>
              <div className="flex space-x-4 mt-4">
                <a href="#">
                  <BsTwitter />
                </a>
                <a href="#">
                  <BsFacebook />
                </a>
                <a href="#">
                  <FaInstagram />
                </a>
                <a href="#">
                  <BsPinterest />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold">COMPANY</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Works
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Career
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold">HELP</h4>
              <ul className=" space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Customer Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Delivery Details
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold">FAQ</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Account
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Manage Deliveries
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Orders
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Payments
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold">RESOURCES</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Free eBooks
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Development Tutorial
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    How to - Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-black">
                    Youtube Playlist
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className=" w-full border-b border-slate-400" />

          <div className=" flex w-[90%] mx-auto py-10 justify-between items-center">
            <p className="text-gray-600">
              Shop.co © 2000-2023, All Rights Reserved
            </p>
            <div className="flex space-x-4">
              <Image src="/images/foot/visa.png" alt="Visa" width={40} height={25} />
              <Image src="/images/foot/foot.png" alt="PayPal" width={40} height={25} />
              <Image src="/images/foot/apay.png" alt="Apple Pay" width={40} height={25} />
              <Image src="/images/foot/gpay.png" alt="Google Pay" width={40} height={25} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
