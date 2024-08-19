import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartAddedPopup from "./utils/CartAddedPopup";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shoppie",
  description: "E-commerce for assignment",
  icons: {
    icon: '/iconwhite.jpg'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <RecoilRoot>
            <Navbar />
            <CartAddedPopup>{children}</CartAddedPopup>
            <Footer />
          </RecoilRoot>
        </SessionProvider>
      </body>
    </html>
  );
}
