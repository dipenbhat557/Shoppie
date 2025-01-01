import { Ratings } from "@/app/components/Rating";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import frame from "@/public/images/product-id/Frame.png";

export default function ReviewCard() {
  return (
    <div className="flex border rounded-2xl p-2">
      <div className=" flex flex-col gap-2">
        <div className="flex justify-between">
          <Ratings rating={4} variant="yellow" totalstars={5} />
          <Ellipsis />
        </div>
        <div className="flex">
          <div>Samantha D.</div>
          <Image src={frame} alt="frame" width={24} height={24} />
        </div>
        <div className="pb-2">
          &quot;I absolutely love this t-shirt! The design is unique and the
          fabric feels so comfortable. As a fellow designer, I appreciate the
          attention to detail. It&apos;s become my favorite go-to shirt.&quot;
        </div>
        <div>Posted on August 14, 2023</div>
      </div>
    </div>
  );
}
