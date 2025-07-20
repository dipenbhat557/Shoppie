'use client'; 

import { useState } from "react";
import { OrderList } from "./OrdersList";
import { Delivered } from "./Delivered";

export const NewDeliveredOrder = () => {
  const [delivered, setDelivered] = useState(false);
    return (
      <div className="flex flex-col gap-8">
        <div className="bg-[#E6E6E6] p-2 flex gap-2 w-fit rounded-lg">
          <button className={`${delivered ? '': 'bg-white'} px-4 py-2 rounded-lg`} onClick={() => setDelivered(false)}>
            New orders
          </button>
          <button className={`${delivered ? 'bg-white': ''} px-4 py-2 rounded-lg`} onClick={() => setDelivered(true)}>
            Delivered
          </button>
        </div>

        {
          delivered ? <Delivered /> : <OrderList />
        }
      </div>
    );
  };
