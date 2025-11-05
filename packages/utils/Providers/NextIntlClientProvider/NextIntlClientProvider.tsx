'use client';

import { NextIntlClientProvider } from 'next-intl';
import type { AbstractIntlMessages } from 'next-intl';

export function FsNextIntlClientProvider({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: 'fa' | 'en';
  messages: AbstractIntlMessages;
}) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
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
