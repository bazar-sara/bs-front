'use client';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ShopManagement } from './shop-management';

const MyShop = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.type !== 'wholesale') {
      router.push('/login');
    }
  }, [user, router]);

  if (!user || user.type !== 'wholesale') {
    return null;
  }

  return <ShopManagement />;
};

export default MyShop;

