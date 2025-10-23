import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  description: 'sign up components page',
};

export default function SignupLayout({ children }: { children: ReactNode }) {
  return children;
}
