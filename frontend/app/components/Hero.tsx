import star_big from "../../public/hero/star_big.svg";
import star_small from "../../public/hero/star_small.svg";
import Image from "next/image";

const Hero = () => {
  return (
    <section
      className="relative bg-[#F2F0F1] py-20 "
      style={{
        // clipPath: "polygon(41% 0, 88% 1%, 100% 50%, 83% 100%, 34% 100%, 50% 48%)",
        backgroundImage: `url("/hero/fashion.png")`,
        backgroundPosition: "right center", // Shift to the right
        backgroundRepeat: "no-repeat", // Ensure the image does not repeat
        backgroundSize: "contain", // Ensures the whole image is visible
        height: "full",
      }}
    >
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between  ">
        <div className=" px-4 sm:px-0 max-w-lg lg:w-1/2">
          <h1 className=" text-2xl sm:text-6xl  font-extrabold  tracking-wide leading-tight mb-6">
            Find Clothes That Matches Your Stylebold
          </h1>
          <p className="text-gray-700 mb-8 w-2/3">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <a
            href="products/category/men's%20clothing"
            className="inline-block px-8 py-4 bg-black text-white rounded-full"
          >
            Shop Now
          </a>
        </div>
        <div className="lg:w-1/2 mt-5 lg:mt-0 relative">
          <Image
            src={star_big}
            alt="Large Star"
            className="absolute -top-52 right-1 w-16 h-16"
          />

          {/* Small Star SVG */}
          <Image
            src={star_small}
            alt="Small Star"
            className="absolute top-1 left-1/4 transform -translate-x-1/2 w-8 h-8"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;