import Image from "next/image";
import phoneIcon from "../../../public/images/contact/icons-phone.png";
import mainIcon from "../../../public/images/contact/icons-mail.png";

export default function ContactCard() {
  return (
    <div className="p-10 shadow-md">
      {/* contact to us */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Image src={phoneIcon} height={30} width={30} alt="phone-icon" />
          <h1>Call To Us</h1>
        </div>
        <p>We are available 24/7, 7 days a week.</p>
        <p>Phone: +8801611112222</p>
      </div>

      <hr className="h-px my-8 bg-black border-0"></hr>

      {/* write to us */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Image src={mainIcon} height={30} width={30} alt="phone-icon" />
          <h1>Write To Us</h1>
        </div>
        <p>Fill out our form and we will contact you within 24 hours.</p>
        <p>Emails: customer@exclusive.com</p>
        <p>Emails: support@exclusive.com</p>
      </div>
    </div>
  );
}
