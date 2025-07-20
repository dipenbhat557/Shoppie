import Image, { StaticImageData } from "next/image";
import { Card } from "@/components/ui/card";
import { ArrowUpIcon } from "lucide-react";

interface OrderCardProps {
  title: string;
  value: string;
  change: string;
  color: string;
  logo: StaticImageData;
}

export const OrderCard = ({ color, logo, title = "AVG. Order Value", value = "$ 77.21", change = "+ 3.16%" }: Partial<OrderCardProps>) => {
  const isPositiveChange = change.startsWith("+");
  
  return (
    <Card className={`flex-1 ${color ? `bg-[${color}]` : 'bg-white'}`}>
      <div className="p-6 flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <h3 className="text-gray-700 font-medium text-sm">
            {title}
          </h3>
          <div className="bg-white/80 rounded-lg p-2.5">
            <Image 
              src={logo ?? ""} 
              height={32} 
              width={32} 
              alt={title}
              className="object-contain" 
            />
          </div>
        </div>
        
        <div className="text-3xl font-semibold text-gray-900">
          {value}
        </div>
        
        <div className="flex items-center gap-2.5 text-sm">
          <span className={`flex items-center font-medium ${isPositiveChange ? 'text-green-600' : 'text-red-600'}`}>
            {change}
            <ArrowUpIcon className={`h-4 w-4 ml-1 ${!isPositiveChange && 'rotate-180'}`} />
          </span>
          <span className="text-gray-600">
            From last month
          </span>
        </div>
      </div>
    </Card>
  );
};
