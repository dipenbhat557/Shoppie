import Image from "next/image";
import Link from "next/link";

const MainLogo = () => (
  <Link href="/" className="flex items-center justify-center gap-4">
    <Image
      src="/icon.png"
      height={50}
      width={50}
      alt="logo"
      className="rounded-full"
    />
    <span className="text-2xl font-bold">Shoppie</span>
  </Link>
);

export default MainLogo;
