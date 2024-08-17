"use client";

import { RecoilRoot, useRecoilValue } from "recoil";
import { addedState, productState } from "../utils/store";
import Loading from "../components/Loading";

export default function CartAddedPopup({
  children,
}: {
  children: React.ReactNode;
}) {
  const added = useRecoilValue(addedState);
  const products = useRecoilValue(productState)

  if(products.length === 0)
    return <Loading/>
  
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
