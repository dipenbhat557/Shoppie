import Image from "next/image";
import phome from "../../public/images/phone.jpg";
import { styles } from "../utils/styles";

interface Category {
  name: string;
  icon: JSX.Element;
}

const categories: Category[] = [
  {
    name: "Fashion",
    icon: <Image src={phome} alt="Fashion" className="h-16 w-16" />,
  },
  {
    name: "Electronics",
    icon: <Image src={phome} alt="Electronics" className="h-16 w-16" />,
  },
  {
    name: "Mobiles",
    icon: <Image src={phome} alt="Mobiles" className="h-16 w-16" />,
  },
  {
    name: "Grocery",
    icon: <Image src={phome} alt="Grocery" className="h-16 w-16" />,
  },
  {
    name: "Furniture",
    icon: <Image src={phome} alt="Furniture" className="h-16 w-16" />,
  },
  {
    name: "Appliances",
    icon: <Image src={phome} alt="Appliances" className="h-16 w-16" />,
  },
  {
    name: "Mobiles",
    icon: <Image src={phome} alt="Mobiles" className="h-16 w-16" />,
  },
  {
    name: "Mobiles",
    icon: <Image src={phome} alt="Mobiles" className="h-16 w-16" />,
  },
];
export const CategoryNav = () => {
  return (
    <div
      className={`bg-white  rounded-xl border border-slate-100 shadow-lg w-[90%] mx-auto ${styles.paddingY} `}
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-0">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-16 h-16">{category.icon}</div>
            <span className="text-center text-xl font-medium text-gray-700">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
