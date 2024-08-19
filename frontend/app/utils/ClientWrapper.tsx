'use client';

import { RecoilRoot, useRecoilValue } from 'recoil';
import Navbar from '../components/Navbar';
import CartAddedPopup from './CartAddedPopup';
import Footer from '../components/Footer';
import { SessionProvider } from 'next-auth/react';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
        <SessionProvider>
          <RecoilRoot>
            <Navbar />
            <CartAddedPopup >{children}</CartAddedPopup>
            <Footer />
          </RecoilRoot>
        </SessionProvider>
  );
}
