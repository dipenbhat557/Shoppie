export function DesktopTotalCart() {
    return (
        <div className="md:border md:shadow-md md:rounded-lg md:p-2 md:col-span-1 hidden md:block md:h-52">
            <div className="font-semibold text-xl">Cart Total</div>
            <div className="flex justify-between">
                <div>Subtotal:</div>
                <div>$1750</div>
            </div>
            <hr className="h-px my-2 bg-gray-200 border-0"></hr>
            <div className="flex justify-between">
                <div>Shipping:</div>
                <div>Free</div>
            </div>
            <hr className="h-px my-2 bg-gray-200 border-0"></hr>
            <div className="flex justify-between">
                <div>Total:</div>
                <div>$1750</div>
            </div>
            <div className="flex justify-center">
                <button className="bg-[#FFC633] px-4 py-2 mt-2">Proceed to checkout</button>
            </div>
        </div>
    )
}