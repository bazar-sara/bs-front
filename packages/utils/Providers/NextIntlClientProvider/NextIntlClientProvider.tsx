'use client';

import { NextIntlClientProvider } from 'next-intl';
export function FsNextIntlClientProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  // locale: Promise<'fa' | 'en'>;
  locale: 'fa' | 'en';
}) {
  return (
    <NextIntlClientProvider
      locale={locale}
      onError={(error) => {
        if (error.code === 'MISSING_MESSAGE') {
          return;
        }
      }}
    >
      {children}
    </NextIntlClientProvider>
  );
}
