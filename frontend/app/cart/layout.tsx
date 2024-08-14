import { Inter } from 'next/font/google';
import React from 'react'
import SessionProviderWrapper from '../components/SessionProviderWrapper';

const inter = Inter({ subsets: ["latin"] });
export default async function CartLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  )
}
