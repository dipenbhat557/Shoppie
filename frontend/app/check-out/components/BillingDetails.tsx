import { CheckBox } from "./CheckBox";
import { FinalBilling } from "./FinalBilling";
import { Input } from "./Input";

export function BillingDetails() {
    return (
        <div className="container md:flex md:gap-10 md:justify-around pt-10">
            <div className="pb-10 flex flex-col gap-2">
                <Input labelName="First Name" type="text" />
                <Input labelName="Company Name" type="text" />
                <Input labelName="Street Name" type="text"/>
                <Input labelName="Apartment, floor, etc.(optional)" type="text"/>
                <Input labelName="Town/City" type="text"/>
                <Input labelName="Phone Number" type="number"/>
                <Input labelName="Email Address" type="email"/>
                <CheckBox />
            </div>
            <FinalBilling />
        </div>
    )
}