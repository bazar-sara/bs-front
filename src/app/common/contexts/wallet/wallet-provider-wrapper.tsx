'use client';
import { useAuth } from '@/app/common/hooks/use-auth';
import { WalletProvider } from '@/app/common/contexts/wallet/wallet-context';
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
