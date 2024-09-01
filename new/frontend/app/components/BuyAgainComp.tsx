import airpods from "../../public/images/topDeals/airpods.png";
import boat from "../../public/images/topDeals/boat.png";
import headphone from "../../public/images/topDeals/headphone.png";
import phone from "../../public/images/topDeals/phone.png";
import { BuyAgainCard } from "./BuyAgainCard";

export const featuredProducts = [
  {
    imageSrc: boat,
    rating: 4,
    discount: 100,
    price: 1000,
    name: "Boats Airpods",
    altText: "Boats Airpods",
  },
  {
    imageSrc: phone,
    rating: 4,
    discount: 100,
    price: 1000,
    name: "Apple Mobiles",
    altText: "Apple Mobiles",
  },
  {
    imageSrc: airpods,
    rating: 4,
    discount: 100,
    price: 1000,
    name: "Apple Airpods",
    altText: "Apple Airpods",
  },
  {
    imageSrc: headphone,
    rating: 4,
    discount: 100,
    price: 1000,
    name: "Headset",
    altText: "Headset",
  },
  {
    imageSrc: airpods,
    rating: 4,
    discount: 100,
    price: 1000,
    name: "Apple Airpods",
    altText: "Apple Airpods",
  },

];

export const BuyAgainComp = () => {
  return (
    <div className=" flex max-w-[90%] mx-auto py-8">
      {featuredProducts.map((item, index) => {
        return (
          <BuyAgainCard
            name={item.name}
            imageSrc={item.imageSrc}
            altText={item.altText}
            rating={item.rating}
            price={item.price}
            discount={item.discount}
          />
        );
      })}
    </div>
  );
};
