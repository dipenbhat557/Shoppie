"use client";

import { RecoilRoot, useRecoilValue } from "recoil";
import { addedState } from "../utils/store";

export default function CartAddedPopup({
  children,
}: {
  children: React.ReactNode;
}) {
  const added = useRecoilValue(addedState);
  
  return (
    <div className="relative">
      {added && (
        <p className="fixed z-30 top-5 right-2 transform -translate-x-1/2 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg">
          Item added to cart
        </p>
      )}
      {children}
    </div>
  );
}
