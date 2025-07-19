import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Topbar } from "@/components/Topbar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { QueryProvider } from "@/providers/QueryProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kinam Na",
  description: "Get all your necessities in one place",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <Topbar />
        <Navbar />
        {children}
        <Footer />

        <QueryProvider>{children}</QueryProvider>

      </body>
    </html>
  );
}
