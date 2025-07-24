import React from 'react';
import { Mail } from 'lucide-react';

const NewsletterBanner = () => {
  return (
    <section
      className="relative z-10 w-full flex justify-center"
      style={{ pointerEvents: 'auto' }}
    >
      <div
        className="w-full max-w-3xl bg-gradient-to-br from-black via-gray-900 to-black rounded-3xl flex flex-col md:flex-row items-center justify-between px-6 py-8 md:px-10 md:py-10 shadow-2xl border border-white/10 -mb-14"
        style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}
      >
        {/* Headline */}
        <div className="flex-1 w-full text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white uppercase leading-tight tracking-tight drop-shadow">
            Stay up to date about<br className="hidden md:block" /> our latest offers
          </h2>
        </div>
        {/* Form */}
        <form className="flex flex-col gap-2 w-full max-w-xs md:w-[320px]">
          <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm">
            <Mail className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="flex-1 bg-transparent outline-none text-black placeholder-gray-400 text-sm py-1.5"
              aria-label="Email address"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-black font-semibold rounded-full py-2.5 text-base shadow hover:bg-gray-100 transition-colors"
          >
            Subscribe to Newsletter
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterBanner; 