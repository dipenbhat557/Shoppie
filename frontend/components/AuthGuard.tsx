'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const publicRoutes = ['/signin', '/signup', '/forgot-password'];

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const isPublicRoute = publicRoutes.includes(pathname);

    if (!accessToken && !isPublicRoute) {
      router.push('/signin');
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  if (!isAuthenticated && !publicRoutes.includes(pathname)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFC633]"></div>
      </div>
    );
  }

  return <>{children}</>;
}