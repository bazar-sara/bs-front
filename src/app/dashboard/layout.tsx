import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  description: 'dashboard components page',
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return children;
}
