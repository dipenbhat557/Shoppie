import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { QueryProvider } from "@/providers/QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/providers/AuthProvider";
import { AuthGuard } from "@/components/AuthGuard";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kinamna - Your Fashion Destination",
  description: "Discover the latest trends in fashion and lifestyle products",
  icons: {
    icon: "/icon.svg",
  },
  keywords: ["fashion", "clothing", "shoes", "accessories", "online shopping", "nepal"],
  authors: [{ name: "Kinamna" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kinamna.com",
    siteName: "Kinamna",
    title: "Kinamna - Your Fashion Destination",
    description: "Discover the latest trends in fashion and lifestyle products",
    images: [
      {
        url: "/icon.svg",
        width: 1200,
        height: 630,
        alt: "Kinamna Preview"
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <QueryProvider>
          <AuthGuard>{children}</AuthGuard>
            <Toaster />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
