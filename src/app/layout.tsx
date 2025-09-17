// "use client";

import './globals.css';
import { Inter } from 'next/font/google';
import ClientProviders from '@/components/ClientProviders';
import AuthLayout from '@/components/AuthLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'برنامج مبيعات ومشتريات ومحاسبة',
  description: 'نظام إدارة مبيعات ومشتريات وحسابات احترافي',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.className} min-h-screen bg-gray-50 antialiased`}
        style={{ fontFamily: 'Tajawal, sans-serif' }}
        suppressHydrationWarning
      >
        <ClientProviders>
          <AuthLayout>{children}</AuthLayout>
        </ClientProviders>
      </body>
    </html>
  );
}