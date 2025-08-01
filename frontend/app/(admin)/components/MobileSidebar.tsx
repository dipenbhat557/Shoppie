"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import logo from "@/public/images/dashboard/logo.png"
import { Menu } from "lucide-react"
import {
  LayoutDashboard,
  Package,
  PackagePlus,
  ShoppingCart,
  Truck,
  Wallet,
} from "lucide-react"

const navigationItems = [
  {
    id: 1,
    name: "Overview",
    link: "/dashboard",
    icon: LayoutDashboard
  },
  {
    id: 2,
    name: "Products",
    link: "/products",
    icon: Package
  },
  {
    id: 3,
    name: "Add Product",
    link: "/add-product",
    icon: PackagePlus
  },
  {
    id: 4,
    name: "Orders",
    link: "/view-orders",
    icon: ShoppingCart
  },
  {
    id: 5,
    name: "Shipment",
    link: "/dispatch",
    icon: Truck
  },
  {
    id: 6,
    name: "Payments",
    link: "/payments",
    icon: Wallet
  }
];

export function MobileSidebar() {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname ?? "/dashboard");

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            size="icon"
            className="w-10 h-10 flex items-center justify-center"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
          <SheetHeader className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Image
                src={logo}
                alt="logo"
                width={40}
                height={40}
                className="rounded-md"
                unoptimized
              />
              <span className="text-xl font-semibold text-gray-800">
                <span className="text-orange-400">Kinam</span>na
              </span>
            </div>
          </SheetHeader>

          <div className="flex flex-col px-2 py-3">
            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.link;
                
                return (
                  <Link
                    key={item.id}
                    href={item.link}
                    onClick={() => setActive(item.link)}
                    className={`
                      flex items-center px-3 py-2 rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'bg-[#FFC633] text-gray-900 shadow-sm' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }
                    `}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-gray-900' : 'text-gray-500'}`} />
                    <span className="ml-3 text-sm font-medium">
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pt-4 border-t border-gray-200 mx-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-[#FFC633] flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-900">AB</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">admin@kinamna.com</p>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
