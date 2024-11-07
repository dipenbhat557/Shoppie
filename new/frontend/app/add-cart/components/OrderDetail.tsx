import Counter from "./Counter";

export function OrderDetail() {
    return (
        <div>
            <div className="flex items-center gap-4">
                <div>Quantity</div>
                <Counter />
            </div>
            <div className="flex gap-2">
                <div>Price</div>
                <div className="font-semibold">$198</div>
                <div className="line-through">$232</div>
                <div className="text-sm rounded-2xl border p-1 text-[#FF3333] bg-[#FF33331A]">-20%</div>
            </div>
        </div>
    )
}