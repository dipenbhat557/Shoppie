import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RecoilWrapper from "./components/RecoilWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shoppie",
  description: "E-commerce for assignment",
  icons: {
    icon: '/icon.svg'
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
        <RecoilWrapper>{children}</RecoilWrapper>
      </body>
    </html>
  );
}


