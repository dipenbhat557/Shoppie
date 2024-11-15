import Image, { StaticImageData } from "next/image";


export const OrderCard = ({color, logo}: {color: string, logo: StaticImageData }) => {
  return (
    <div className={`flex-1 flex flex-col gap-4 bg-[${color}] p-4 rounded-xl`}>
      <div className="flex justify-between">
        <div>AVG . Order Value</div>
        <div>
          <Image src={logo} height={38} width={36} alt="img" />
        </div>
      </div>
      <div>$ 77.21</div>
      <div>
        <span className="text-[#2D7B34]">+ 3.16%</span> From last month
      </div>
    </div>
  );
};
