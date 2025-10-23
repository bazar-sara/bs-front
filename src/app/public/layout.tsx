import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  description: 'public components page',
};

export default function PublicLayout({ children }: { children: ReactNode }) {
  return children;
}
