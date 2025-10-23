import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  description: 'login components page',
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return children;
}
