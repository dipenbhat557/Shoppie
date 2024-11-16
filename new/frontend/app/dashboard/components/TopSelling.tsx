import Image from "next/image";
import shoe from "@/public/images/dashboard/shoe.png";

export function TopSelling() {
  return (
    <div className="bg-white p-2 rounded-xl flex flex-col gap-2 flex-1">
      <div className="flex items-center justify-between">
        <div>Top Selling Product</div>
        <div className="p-2 bg-[#F7F7F7]">See All Product</div>
      </div>
      <Product />
      <Product />
      <Product />
    </div>
  );

  function Product() {
    return (
      <div className="flex items-center gap-4 justify-between">
        <div className="flex gap-2">
          <Image src={shoe} alt="Average" width={67} height={67} />
          <div className="flex flex-col gap-2">
            <div>Red Tape Sports Shoes for Men</div>
            <div className="text-sm">12,429 Sales</div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-green-600">Available</div>
          <div>135 Stocks Remaining</div>
        </div>
      </div>
    );
  }
}
