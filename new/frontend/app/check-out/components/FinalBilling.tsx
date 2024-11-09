import Image from "next/image"
import img1 from "@/public/images/cart/tv.png"
import paymentImg from "@/public/images/check-out/payment.png"

export const FinalBilling = () => {
    return (
        <div className=" flex flex-col gap-3">
            <div className="flex justify-between">
                <Image src={img1} alt="img" width={50} height={50} />
                <div>
                    TV
                </div>
                <div>
                    $500
                </div>
            </div>
            <div className="flex justify-between">
                <Image src={img1} alt="img" width={50} height={50} />
                <div>
                    TV
                </div>
                <div>
                    $500
                </div>
            </div>
            <div className="flex justify-between">
                <div>Subtotal:</div>
                <div>$1000</div>
            </div>
            <hr className="h-px my-2 bg-gray-200 border-0"></hr>
            <div className="flex justify-between">
                <div>Shipping:</div>
                <div>Free</div>
            </div>
            <hr className="h-px my-2 bg-gray-200 border-0"></hr>
            <div className="flex justify-between">
                <div>Total:</div>
                <div>$1000</div>
            </div>
            <div className="flex justify-between">
                <div className="flex">
                    <input id="1" type="radio" name="payment" className="mr-2" />
                    <label htmlFor="1" className="text-sm text-gray-900">Bank</label>
                </div>
                <Image src={paymentImg} alt="img" width={192} height={28} />
            </div>
            <div>
                <input id="2" name="payment" type="radio" className="mr-2" />
                <label htmlFor="2" className="text-sm text-gray-900">Cash on delivery</label>
            </div>
            <div className="flex gap-2">
                <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Coupon Code" required />
                <button className="bg-[#FB641B] text-white p-2 rounded-xl">
                    Apply Cupon
                </button>
            </div>
            <button className="bg-[#FFC633] w-32 p-3 rounded-lg">
                Place Order
            </button>
        </div>
    )
}