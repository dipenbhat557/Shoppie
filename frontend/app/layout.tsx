import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientWrapper from "./utils/ClientWrapper";
import "./globals.css"

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
       <ClientWrapper>{children}</ClientWrapper> 
      </body>
    </html>
  );
}