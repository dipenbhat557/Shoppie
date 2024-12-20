import { useState } from "react";

export default function Counter() {
    const [quantity, setQuantity] = useState(1);

    function decrease() {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    return (
        <div className="rounded-xl px-5 py-2 border w-28 text-center">
            <div className="flex gap-4 items-center justify-center">
                <button 
                    onClick={decrease} 
                    className="text-4xl rounded-full w-8 h-8 flex items-center justify-center"
                >
                    -
                </button>
                <div className="text-4xl font-normal">{quantity}</div>
                <button 
                    onClick={() => setQuantity(quantity + 1)} 
                    className="text-4xl rounded-full w-8 h-8 flex items-center justify-center "
                >
                    +
                </button>
            </div>
        </div>
    );
}