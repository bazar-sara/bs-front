import type { Metadata } from 'next';
import { getLocale, getMessages } from 'next-intl/server';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import './globals.css';
import { FsNextIntlClientProvider, FsThemeContextProvider } from '@fs/utils';
import { FsToaster } from '@fs/core';
import { AuthProvider } from '@/contexts/auth-context';
import { WalletProviderWrapper } from '@/contexts/wallet-provider-wrapper';
import localFont from 'next/font/local';

export const iransansxv = localFont({
  src: '../assets/fonts/iranSans/webfont/IRANSansXV.woff',
  display: 'fallback',
  variable: '--font-iransansxv',
  weight: '100 1000',
  declarations: [
    {
      prop: 'font-feature-settings',
      value: "'ss03'",
    },
  ],
});

export const iransansx = localFont({
  src: [
    {
      path: '../assets/fonts/iranSans/webfont/staticfonts/IRANSansX-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/iranSans/webfont/staticfonts/IRANSansX-Bold.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-iransansx',
  declarations: [
    {
      prop: 'font-feature-settings',
      value: "'ss03'",
    },
  ],
});

export const metadata: Metadata = {
  title: 'فروشگاه آنلاین',
  description: 'فروشگاه آنلاین با امکان خرید و فروش محصولات',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = (await getLocale()) || 'fa';
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === 'fa' ? 'rtl' : 'ltr'}
      className={`${iransansxv.variable} ${iransansx.variable}`}
      suppressHydrationWarning
    >
      <body>
        <FsThemeContextProvider>
          <AppRouterCacheProvider options={{ key: 'css' }}>
            <FsNextIntlClientProvider
              locale={locale as 'fa' | 'en'}
              messages={messages}
            >
              <AuthProvider>
                <WalletProviderWrapper>{children}</WalletProviderWrapper>
                <FsToaster />
              </AuthProvider>
            </FsNextIntlClientProvider>
          </AppRouterCacheProvider>
        </FsThemeContextProvider>
      </body>
    </html>
  );
}
