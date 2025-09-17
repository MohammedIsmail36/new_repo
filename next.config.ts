import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 reactStrictMode: true,
  transpilePackages: ['@mui/icons-material', '@mui/material'],
  i18n: {
    locales: ['ar'],
    defaultLocale: 'ar',
  },

  headers: () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
      ],
    },
  ],
}

export default nextConfig