import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import { Topbar } from "../components/Topbar";
import { Footer } from "../components/Footer"

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen  w-full  justify-between items-center ">
          <div className="w-full flex flex-col gap-5  ">
          <Topbar/>
          <Navbar/>
          </div>
          {children}
          <Footer/>
        </div>
      </body>
    </html>
  );
}
