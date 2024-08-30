'use client';

import { RecoilRoot, useRecoilValue } from 'recoil';
import CartAddedPopup from './CartAddedPopup';
import Footer from '../components/Footer';
import { SessionProvider } from 'next-auth/react';
import { ProductData } from './store';
import Navbar from '../components/Navbar';
import ProductFetcher from '../components/ProductFetcher';

export default function ClientWrapper({ children,categories,products }: { children: React.ReactNode,categories:string[],products:ProductData[] }) {
  return (
        <SessionProvider>
          <RecoilRoot>
            <ProductFetcher/>
            <div className='min-h-screen flex flex-col justify-between'>
              <Navbar categories={categories} products={products}/>
              <CartAddedPopup >{children}</CartAddedPopup>
              <Footer />
            </div>
          </RecoilRoot>
        </SessionProvider>
  );
}
