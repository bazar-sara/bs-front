import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  description: 'My Shop - Manage your shop and products',
};

export default function MyShopLayout({ children }: { children: ReactNode }) {
  return children;
}

