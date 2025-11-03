import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  description: 'Shopping Cart - Your selected products',
};

export default function CartLayout({ children }: { children: ReactNode }) {
  return children;
}

