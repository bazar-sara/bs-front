'use client';
import { useAuth } from '@/app/common/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { MainSiteChrome } from '@/app/(not-authenticated)/(self)/components/main-site-chrome';
import { CartContent } from './cart-content';

const Cart = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.type !== 'retail') {
      router.push('/login');
    }
  }, [user, router]);

  if (!user || user.type !== 'retail') {
    return null;
  }

  return (
    <MainSiteChrome>
      <CartContent />
    </MainSiteChrome>
  );
};

export default Cart;

