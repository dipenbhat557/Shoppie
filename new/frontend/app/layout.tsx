import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Topbar } from "./components/Topbar";
import { CategoryNav } from "./components/CategoryNav";
import { Footer } from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kinam Na",
  description: "Get all your necessities in one place", 
  icons: {
    icon: "/icon.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen w-full  justify-between items-center ">
          <div className="w-full flex flex-col gap-5  ">
          <Topbar/>
          <Navbar/>
          <CategoryNav/>
          </div>
          {children}
          <Footer/>
        </div>
      </body>
    </html>
  );
}
