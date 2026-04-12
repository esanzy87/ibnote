import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  allowedDevOrigins: ['172.30.1.74:3001', 'localhost:3001', '127.0.0.1:3001'],
};

export default withNextIntl(nextConfig);
