'use client';

import { useState } from "react";
import { ChevronUp } from 'lucide-react';
import { ChevronDown } from 'lucide-react';

export default function Counter() {
    const [quantity, setQuantity] = useState(1);

    function decrease() {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    return (
        <div className="rounded-xl p-2 border text-center w-28">
            <div className="flex gap-4 items-center justify-center">
                <div className="text-xl font-normal">{quantity}</div>
                <div className="flex flex-col">
                    <button 
                        onClick={() => setQuantity(quantity + 1)} 
                        className=""
                    >
                        <ChevronUp />
                    </button>

                    <button 
                        onClick={decrease} 
                        className=" "
                    >
                        <ChevronDown />
                    </button>
                </div>
            </div>
        </div>
    );
}