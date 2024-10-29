'use client';

import { useState } from "react";
import Counter from "./Counter";

export function BuyDetails() {
    const [color, setColor] = useState('bg-[#A0BCE0]');
    const [size, setSize] = useState('m');
    
    return (
        <div className="flex flex-col gap-2">
            <div>
                <div className="flex gap-2">
                    <div>
                        Color: 
                    </div>
                    <div 
                        onClick={() => setColor("bg-[#A0BCE0]")} 
                        className={`w-5 h-5 rounded-full ${color === "bg-[#A0BCE0]" ? 'border-solid border-black border-2' : ''} bg-[#A0BCE0]`}
                    ></div>
                    <div 
                        onClick={() => setColor("bg-[#E07575]")} 
                        className={`w-5 h-5 rounded-full ${color === "bg-[#E07575]" ? 'border-solid border-black border-2' : ''} bg-[#E07575]`}
                    ></div>
                </div>
            </div>
            <div className="flex gap-4 items-center">
                <div>Size:</div>
                 <div className="flex gap-2">
                    <div onClick={()=> setSize('xs')} className={`p-2 cursor-pointer rounded-lg border ${size == 'xs' ? 'bg-[#DB4444]' : 'bg-white'}`}>XS</div>
                    <div onClick={()=> setSize('s')} className={`p-2 cursor-pointer rounded-lg border ${size == 's' ? 'bg-[#DB4444]' : 'bg-white'}`}>S</div>
                    <div onClick={()=> setSize('m')} className={`p-2 cursor-pointer rounded-lg border ${size == 'm' ? 'bg-[#DB4444]' : 'bg-white'}`}>M</div>
                    <div onClick={()=> setSize('l')} className={`p-2 cursor-pointer rounded-lg border ${size == 'l' ? 'bg-[#DB4444]' : 'bg-white'}`}>L</div>
                    <div onClick={()=> setSize('xl')} className={`p-2 cursor-pointer rounded-lg border ${size == 'xl' ? 'bg-[#DB4444]' : 'bg-white'}`}>XL</div>
                 </div>
            </div>
            <Counter />
            <div className="flex gap-4">
                <button className="bg-[#FFC633] font-bold py-2 px-7">Buy now</button>
                <button className="bg-[#FB641B] font-bold py-2 px-7">Add to cart</button>
            </div>
            <hr className="h-px my-8 bg-black border-0"></hr>
        </div>
    )
}