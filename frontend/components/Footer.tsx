import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-4 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
        {/* Exclusive/Subscribe */}
        <div>
          <h3 className="font-bold text-lg mb-3">Exclusive</h3>
          <div className="mb-2 font-semibold">Subscribe</div>
          <div className="mb-2 text-sm text-gray-300">Get 10% off your first order</div>
          <form className="flex items-center mt-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-black border border-gray-400 rounded-l px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none"
            />
            <button type="submit" className="bg-black border-t border-b border-r border-gray-400 rounded-r px-3 py-2 flex items-center hover:bg-gray-900">
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </form>
        </div>
        {/* Support */}
        <div>
          <h3 className="font-bold text-lg mb-3">Support</h3>
          <div className="text-sm text-gray-300 mb-1">111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</div>
          <div className="text-sm text-gray-300 mb-1">exclusive@gmail.com</div>
          <div className="text-sm text-gray-300">+88015-88888-9999</div>
        </div>
        {/* Account */}
        <div>
          <h3 className="font-bold text-lg mb-3">Account</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><a href="#" className="hover:underline">My Account</a></li>
            <li><a href="#" className="hover:underline">Login / Register</a></li>
            <li><a href="#" className="hover:underline">Cart</a></li>
            <li><a href="#" className="hover:underline">Wishlist</a></li>
            <li><a href="#" className="hover:underline">Shop</a></li>
          </ul>
        </div>
        {/* Quick Link */}
        <div>
          <h3 className="font-bold text-lg mb-3">Quick Link</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms Of Use</a></li>
            <li><a href="#" className="hover:underline">FAQ</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>
        {/* Download App */}
        <div>
          <h3 className="font-bold text-lg mb-3">Download App</h3>
          <div className="text-xs text-gray-300 mb-2">Save $3 with App New User Only</div>
          <div className="flex items-center gap-2 mb-3">
            <img src="/placeholder/qr.png" alt="QR" className="w-14 h-14 bg-white rounded" />
            <div className="flex flex-col gap-2">
              <img src="/placeholder/google-play.png" alt="Google Play" className="w-24 h-7 object-contain" />
              <img src="/placeholder/app-store.png" alt="App Store" className="w-24 h-7 object-contain" />
            </div>
          </div>
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-gray-400"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-gray-400"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-gray-400"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-gray-400"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
      {/* Bottom bar */}
      <div className="border-t border-gray-800 mt-8 pt-4 text-center text-xs text-gray-400">
        &copy; Copyright Rimel 2022. All right reserved
      </div>
    </footer>
  );
};
