'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import LoadingScreen from '@/components/loading';

export default function LogoutPage() {
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    const performLogout = async () => {
      await logout();
      router.push('/login');
    };
    
    performLogout();
  }, [logout, router]);

  return <LoadingScreen />;
}
