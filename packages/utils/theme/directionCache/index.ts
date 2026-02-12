import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import type { Direction } from '@mui/material/styles';

/** Options for Emotion cache so RTL/LTR is applied to the same cache used by Next.js (AppRouterCacheProvider). */
export function getDirectionCacheOptions(direction: Direction) {
  return {
    key: 'mui',
    prepend: true,
    ...(direction === 'rtl' && {
      stylisPlugins: [prefixer, rtlPlugin],
    }),
  };
}
