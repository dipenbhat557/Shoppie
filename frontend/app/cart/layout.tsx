import { Inter } from 'next/font/google';
import React from 'react';
import SessionProviderWrapper from '../utils/SessionProviderWrapper';

const inter = Inter({ subsets: ["latin"] });

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      <SessionProviderWrapper>
        {children}
      </SessionProviderWrapper>
    </div>
  );
}
