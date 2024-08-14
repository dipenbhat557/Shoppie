'use client'

import { useSession } from 'next-auth/react';
import ProtectedRoute from '../components/ProtectedRoute';

export default function Dashboard() {
  const session = useSession()
  
  return (
    <ProtectedRoute>
      <div>Welcome to the Dashboard!,{session?.data?.user?.name}</div>
    </ProtectedRoute>
  );
}
