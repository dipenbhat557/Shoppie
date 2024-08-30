import { useRecoilValue } from "recoil";
import { addedState } from "./store";

interface CartAddedPopupProps {
  children: React.ReactNode;
}

export default function CartAddedPopup({
  children,
}: CartAddedPopupProps) {
  const added = useRecoilValue(addedState)
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
