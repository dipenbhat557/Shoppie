import { styles } from "../utils/styles";

export const Topbar = () => {
  return (
    <div className="bg-black text-white w-full p-3  text-[8px] md:text-xs lg:text-sm  ">
      <div className={`flex ${styles.maxScreenWidth}  ${styles.screenMarginAuto}  justify-between`}>
        <div className="pl-2">Delivery All over Nepal</div>

        <div className="flex justify-evenly sm:w-[60%] md:w-3/5 lg:w-2/5">
          <p>Signin</p>
          <p>Register</p>
          <p>Contact Us</p>
          <p>Become a Seller</p>
        </div>
      </div>
    </div>
  );
};
