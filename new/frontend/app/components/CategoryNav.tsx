import Image from "next/image";
import phome from "../../public/images/catagoryNav/phone.png";
import fashion from "../../public/images/catagoryNav/fashion.png";
import home from "../../public/images/catagoryNav/home.png";
import elec from "../../public/images/catagoryNav/electonics.png";

import { styles } from "../utils/styles";

interface Category {
  name: string;
  icon: JSX.Element;
}

const categories: Category[] = [
  {
    name: "Fashion",
    icon: <Image src={fashion} alt="Fashion" className="h-16 w-16" />,
  },
  {
    name: "Electronics",
    icon: <Image src={elec} alt="Electronics" className="h-16 w-16" />,
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
    icon: <Image src={home} alt="Furniture" className="h-16 w-16" />,
  },
  {
    name: "Appliances",
    icon: <Image src={elec} alt="Appliances" className="h-16 w-16" />,
  },
  {
    name: "Mobiles",
    icon: <Image src={phome} alt="Mobiles" className="h-16 w-16" />,
  },
  {
    name: "Appliances",
    icon: <Image src={elec} alt="Appliances" className="h-16 w-16" />,
  },
];
export const CategoryNav = () => {
  return (
    <div
      className={`bg-white   w-screen md:w-full lg:rounded-xl border border-slate-100 shadow-lg lg:w-[90%] lg:${styles.maxScreenWidth} ${styles.screenMarginAuto} ${styles.paddingY}`}
    >
      {/* Restrict the visible items to 5 and make the rest scrollable */}
      <div className="flex overflow-x-auto sm:overflow-x-scroll scrollbar-hide">
        <div className="flex   justify-evenly  sm:w-[100%] gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 items-center sm:inline-block"
            >
              <div className="lg:w-16 lg:h-16 md:w-12 md:h-12 sm:h-8 sm:w-8 p-2">
                {category.icon}
              </div>
              <span className="text-center lg:text-xl md:text-sm text-xs sm:p-2 font-medium text-gray-700">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
