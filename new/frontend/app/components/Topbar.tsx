export const Topbar = () => {
  return (
    <div className="bg-black text-white w-full p-3  ">
      <div className="flex  justify-between">
        <div className="pl-2">Delivery All over Nepal</div>

        <div className="flex justify-evenly sm:w-1/2 md:w-3/5 lg:w-2/5">
          <p>Signin</p>
          <p>Register</p>
          <p>Contact Us</p>
          <p>Become a Seller</p>
        </div>
      </div>
    </div>
  );
};
