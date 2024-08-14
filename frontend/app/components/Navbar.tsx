import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-orange-500 text-white px-4 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className='flex items-center justify-center gap-4'>
          <Image src="/icon.svg" height={50} width={50} alt='logo'  className='rounded-full'/>
          <span className="text-2xl font-bold">Shoppie</span>
        </Link>
        <div className="space-x-4">
          <Link href="/">
            <span className="hover:text-gray-200">Home</span>
          </Link>
          <Link href="/products">
            <span className="hover:text-gray-200">Products</span>
          </Link>
          <Link href="/cart">
            <span className="hover:text-gray-200">Cart</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
