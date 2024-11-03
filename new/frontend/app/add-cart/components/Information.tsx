import { OrderDetail } from "./OrderDetail";

export function Information() {
  return (
    <div className="flex flex-col md:flex-row gap-2 md:col-span-3">
      <div>
        <div className="pb-2">
          Dell MS116 Wired Optical Mouse, 1000DPI, LED Tracking, Scrolling
          Wheel, Plug and Play
        </div>
        <div className="text-[#30A35E]">In Stock</div>

        <div className="flex gap-5">
          <div className="font-semibold">
            <div>Brand</div>
            <div>Size</div>
            <div>Highlight 3</div>
          </div>
          <div>
            <div>Noise</div>
            <div>No size</div>
            <div>Noise</div>
          </div>
        </div>
        <div className="md:flex md:gap-4 hidden">
            <div className="text-[#FB641B]">Delete</div>
            <div className="text-[#00000033]">|</div>
            <div className="text-[#FB641B]">Share</div>
        </div>
      </div>
      <OrderDetail />
    </div>
  );
}
