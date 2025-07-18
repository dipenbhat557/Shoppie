'use client'

import * as React from "react"
import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/drawer"
import { PriceRange } from "./PriceRange"

export function FilterMobile() {
  const [goal, setGoal] = React.useState(350)

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Filters</Button>
      </DrawerTrigger>
      <DrawerContent className="h-5/6">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Filters</DrawerTitle>
          </DrawerHeader>
          <hr className="w-11/12 h-0.5 my-4 bg-gray-100 border-0 rounded md:my-10"></hr>
            <div className="p-5 flex flex-col gap-4">
                <div>Price</div>
                <PriceRange />
            </div>
          <DrawerFooter>
            <Button>Search</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
