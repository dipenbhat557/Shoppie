'use client';

import { useState } from "react";
import { OngoingCard } from "./OngoingCard";
import { CompletedCard } from "./CompletedCard";

export const Main = () => {
    //false = completed, true = ongoing
    const [orders, setOrders] = useState(false);
  return (
    <div className="container">
      <div className="rounded-lg bg-[#E6E6E6] p-2 flex gap-2 w-fit">
        <button className={`${orders ? 'bg-white': ''} p-2 px-5 rounded-lg`} onClick={()=>setOrders(true)}>
            Ongoing
        </button>
        <button className={`${!orders ? 'bg-white': ''} p-2 px-5 rounded-lg`} onClick={()=>setOrders(false)}>
            Completed
        </button>
      </div>

      <div>
        {
            orders ? (
                <div className="py-2 flex flex-col gap-2 md:grid md:grid-cols-2">
                    <OngoingCard status="Accepted" />
                    <OngoingCard status="Placed" />
                    <OngoingCard status="Shipped" />
                    <OngoingCard status="Delivering" />
                </div>
            ) : (
                <div className="py-2 flex flex-col gap-2">
                    <CompletedCard  />
                    <CompletedCard  />
                    <CompletedCard  />
                </div>
            )
        }
      </div>
    </div>
  );
}