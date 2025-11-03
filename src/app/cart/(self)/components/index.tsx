'use client';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CartContent } from './cart-content';

const Cart = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.type !== 'regular') {
      router.push('/login');
    }
  }, [user, router]);

  if (!user || user.type !== 'regular') {
    return null;
  }

  return <CartContent />;
};

export default Cart;

