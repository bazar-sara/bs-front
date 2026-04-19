'use client';

import { ReactNode, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import { TurquoiseGradient } from './styled-components';
import HeaderComponent from './header';
import Footer from './footer';

export type MainSiteChromeProps = {
  children: ReactNode;
  /**
   * Home page: sections sit under the fixed header (hero is full-viewport).
   * Inner pages: add top padding so content clears the app bar.
   */
  edgeToEdge?: boolean;
};

export function MainSiteChrome({
  children,
  edgeToEdge = false,
}: MainSiteChromeProps) {
  const pathname = usePathname();
  const router = useRouter();

  const scrollToSection = useCallback(
    (sectionId: string) => {
      if (pathname === '/') {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }
      router.push(`/#${sectionId}`);
    },
    [pathname, router]
  );

  return (
    <TurquoiseGradient>
      <HeaderComponent scrollToSection={scrollToSection} />
      {edgeToEdge ? (
        children
      ) : (
        <Box
          component="main"
          sx={{
            pt: { xs: 8, md: 9 },
            pb: { xs: 3, md: 5 },
            minHeight: '100vh',
          }}
        >
          {children}
        </Box>
      )}
      <Footer scrollToSection={scrollToSection} />
    </TurquoiseGradient>
  );
}
