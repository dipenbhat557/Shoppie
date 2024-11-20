"use client";

import Image from "next/image";
import logo from "@/public/images/dashboard/logo.png";
import grid from "@/public/images/dashboard/grid.png";
import Link from "next/link";
import { useState } from "react";

const lists = [
  {
    id: 1,
    name: "Overview",
    link: "/dashboard",
  },
  {
    id: 2,
    name: "Products",
    link: "/products",
  },
  {
    id: 3,
    name: "Add Product",
    link: "/add-product",
  },
  {
    id: 4,
    name: "Orders",
    link: "/orders",
  },
  {
    id: 5,
    name: "Shipment",
    link: "/shipment",
  },
  {
    id: 6,
    name: "Payments",
    link: "/payments",
  },
];

export const DesktopSidebar = () => {
  const [active, setActive] = useState("/dashboard");
  return (
    <div className="hidden md:flex md:flex-col bg-white">
        <div className="flex justify-center">
            <Image src={logo} alt="logo" width={107} height={107} />
        </div>
      <div className="flex flex-col gap-2 p-4">
        {lists.map((list) => (
          <Link
            href={list.link}
            key={list.id}
            className={`${
              active == list.link ? "bg-[#FFC633]" : "hover:bg-gray-100"
            } p-4 rounded-lg flex gap-4`}
          >
            <Image src={grid} height={24} width={24} alt="grid" />
            <div className="text-2xl">
              {list.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
