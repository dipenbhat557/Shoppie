import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientWrapper from "./utils/ClientWrapper";
import "./globals.css"
import { fetchCategories, fetchProducts } from "./utils/api";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shoppie",
  description: "E-commerce for assignment",
  icons: {
    icon: "/iconwhite.jpg"
  }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await fetchCategories();
  const products = await fetchProducts();

  return (
    <html lang="en">
      <body className={inter.className}>
       <ClientWrapper categories={categories} products={products}>{children}</ClientWrapper> 
      </body>
    </html>
  );
}