"use client";

import Image from "next/image";
import logo from "@/public/images/dashboard/logo.png";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  PackagePlus,
  ShoppingCart,
  Truck,
  Wallet,
  ChevronLeft,
  ChevronRight,
  Wallet2Icon,
  User,
  MessageSquare,
  Store,
} from "lucide-react";
import { CommandMenu } from "./CommandMenu";

const navigationItems = [
  {
    id: 1,
    name: "Overview",
    link: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: 2,
    name: "Products",
    link: "/products",
    icon: Package,
  },
  {
    id: 3,
    name: "Categories",
    link: "/categories",
    icon: Package,
  },
  {
    id: 4,
    name: "Brands",
    link: "/brand",
    icon: Package,
  },
  {
    id: 5,
    name: "Orders",
    link: "/view-orders",
    icon: ShoppingCart,
  },
  {
    id: 6,
    name: "Shipment",
    link: "/dispatch",
    icon: Truck,
  },
  {
    id: 7,
    name: "Payments",
    link: "/payments",
    icon: Wallet,
  },
  {
    id: 8,
    name: "Promotions",
    link: "/promotions",
    icon: Wallet2Icon,
  },
  {
    id: 9,
    name: "Reviews",
    link: "/reviews",
    icon: MessageSquare,
  },
  {
    id: 10,
    name: "Stores",
    link: "/store",
    icon: Store,
  },
  {
    id: 11,
    name: "User Management",
    link: "/user",
    icon: User,
  },
];

export const DesktopSidebar = () => {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  return (
    <div
      className={`hidden md:flex md:flex-col bg-white border-r border-gray-200 h-screen sticky top-0 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-full"
      }`}
    >
      <div className="flex items-center justify-between px-5 py-6 border-b border-gray-200">
        <div
          className={`flex items-center cursor-pointer ${
            isCollapsed ? "justify-center w-full" : ""
          }`}
          onClick={() => router.push("/dashboard")}
        >
          <Image
            src={logo}
            alt="logo"
            width={isCollapsed ? 36 : 44}
            height={isCollapsed ? 36 : 44}
            className="transition-all duration-300"
            unoptimized
          />
          {!isCollapsed && (
            <span className="ml-3 text-xl font-semibold text-gray-800">
              <span className="text-orange-400">Kinam</span>na
            </span>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </div>

      {/* Command Menu */}
      {!isCollapsed && (
        <div className="px-4 py-5">
          <CommandMenu />
        </div>
      )}

      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.link;

          return (
            <Link
              href={item.link}
              onClick={() => setActive(item.link)}
              key={item.id}
              className={`
                flex items-center px-4 py-3 rounded-lg transition-all duration-200
                ${
                  isActive
                    ? "bg-[#FFC633] text-gray-900 shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }
                ${isCollapsed ? "justify-center" : "justify-start"}
              `}
            >
              <Icon
                className={`w-6 h-6 ${
                  isActive ? "text-gray-900" : "text-gray-500"
                }`}
              />
              {!isCollapsed && (
                <span className="ml-3 text-sm md:text-base font-medium">{item.name}</span>
              )}
              {isCollapsed && <span className="sr-only">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="px-5 py-6 border-t border-gray-200">
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "space-x-3"
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-[#FFC633] flex items-center justify-center">
            <span className="text-sm font-medium text-gray-900">
              {!isCollapsed ? "AB" : "A"}
            </span>
          </div>
          {!isCollapsed && (
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">admin@kinamna.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
