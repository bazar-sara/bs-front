import type { NextConfig } from 'next';
import { readFileSync } from 'fs';
import { join } from 'path';
import createNextIntlPlugin from 'next-intl/plugin';

const pkg = JSON.parse(
  readFileSync(join(process.cwd(), 'package.json'), 'utf-8')
) as { version: string; versionDate?: string };

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    NEXT_PUBLIC_APP_VERSION: pkg.version,
    NEXT_PUBLIC_VERSION_DATE: pkg.versionDate ?? '',
  },
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
export default withNextIntl(nextConfig);
