import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  description: 'ui components page',
};

export default function UIComponentsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
