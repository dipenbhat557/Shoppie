import Image from "next/image";
import React from "react";
import foot from "../../public/images/foot/foot.png";
import master from "../../public/images/foot/master.png";
import visa from "../../public/images/foot/visa.png";
import apay from "../../public/images/foot/apay.png";
import gpay from "../../public/images/foot/gpay.png";

import { BsFacebook, BsPinterest, BsTwitter } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
export const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10  ">
      <div className=" w-full px-4 sm:px-6 lg:px-8 max-w-[90%] mx-auto">
        <div className="bg-black  max-w-[80%]     mx-auto text-white rounded-lg py-6 px-8 mb-10">
          <div className="flex  justify-between   items-center">
            <h2 className="text-5xl font-sans font-bold">
              STAY UP TO DATE ABOUT <br /> OUR LATEST OFFERS
            </h2>
            <div className="flex  flex-col gap-5 items-center space-x-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="py-2  px-4 rounded-full text-black"
              />
              <button className="bg-white text-black px-6 py-2 rounded-full font-bold">
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
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
            <ul className="mt-4 space-y-2">
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
            <ul className="mt-4 space-y-2">
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
            <ul className="mt-4 space-y-2">
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
            <ul className="mt-4 space-y-2">
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

        <div className="mt-8 flex justify-between items-center">
          <p className="text-gray-600">
            Shop.co © 2000-2023, All Rights Reserved
          </p>
          <div className="flex space-x-4">
            <Image src={visa} alt="Visa" />
            <Image src={foot} alt="PayPal" />
            <Image src={apay} alt="Apple Pay" />
            <Image src={gpay} alt="Google Pay" />
          </div>
        </div>
      </div>
    </footer>
  );
};
