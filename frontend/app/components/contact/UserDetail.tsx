"use client";

import { InputBox } from "./InputBox";

export function UserDetail() {
  const handleSubmit = () => {};

  return (
    <form className="p-5 flex flex-col gap-3 shadow-md md:col-span-2" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 md:flex-row">
            <InputBox type="text" placeholder="Your Name"/>
            <InputBox type="email" placeholder="Your Email"/>
            <InputBox type="number" placeholder="Your Phone"/>
        </div>
      <textarea
        id="message"
        rows={8}
        className="block p-2.5 w-full text-sm text-gray-900 bg-[#F5F5F5] rounded-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
        placeholder="Your Message..."
      ></textarea>
      <div className="flex justify-end">
        <button type="submit" className=" bg-[#FB641B] w-40 text-white rounded-lg p-4">
            Send Message
        </button>
      </div>
    </form>
  );
}
