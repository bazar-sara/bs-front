import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'بازارسرا - هایپرمارکت مدرن',
  description:
    'بازارسرا - هایپرمارکت مدرن و کامل شما با بهترین محصولات و خدمات',
};

export default function LandingLayout({ children }: { children: ReactNode }) {
  return children;
}
