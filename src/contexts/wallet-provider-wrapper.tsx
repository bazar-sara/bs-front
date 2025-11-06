'use client';
import { useAuth } from '@/contexts/auth-context';
import { WalletProvider } from '@/contexts/wallet-context';
import { ReactNode } from 'react';

type WalletProviderWrapperProps = {
  children: ReactNode;
};

export const WalletProviderWrapper = ({
  children,
}: WalletProviderWrapperProps) => {
  const { user } = useAuth();

  return <WalletProvider userId={user?.id || null}>{children}</WalletProvider>;
};

