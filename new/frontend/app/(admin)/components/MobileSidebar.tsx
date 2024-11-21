"use client"

import logo from "@/public/images/dashboard/logo.png"
import grid from "@/public/images/dashboard/grid.png"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { list } from "postcss"
import { useState } from "react"

const lists = [{
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
  link: "/view-orders",
},
{
  id: 5,
  name: "Shipment",
  link: "/dispatch",
},
{
  id: 6,
  name: "Payments",
  link: "/payments",
}]


export function MobileSidebar() {
  const [active, setActive] = useState("/dashboard");
  return (
    <div className="gap-2 md:hidden w-40">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">{"Menu"}</Button>
          </SheetTrigger>
          <SheetContent side={"top"}>
            <SheetHeader >
              <div>
                <Image
                  src={logo}
                  alt="logo"
                  width={107}
                  height={107}
                />
              </div>
            </SheetHeader>
            <div className="flex flex-col gap-2 pb-2">
              {
                lists.map((list) => (
                  <Link onClick={() => setActive(list.link)} href={list.link} key={list.id} className={`${active == list.link ?'bg-[#FFC633]':'hover:bg-gray-100'} p-4 rounded-lg flex items-center gap-4`}>
                    <div>
                      <Image
                        src={grid}
                        height={24}
                        width={24}
                        alt="grid"
                      />
                    </div>
                    <div className="text-2xl">{list.name}</div>
                  </Link>
                ))
              }
            </div>
            <SheetFooter>
              <SheetClose asChild>
                {/* <Button type="submit">Close</Button> */}
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
    </div>
  )
}
