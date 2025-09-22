"use client";

import { SessionProvider } from 'next-auth/react';
import ErrorBoundary from '@/components/ErrorBoundary';
import ToasterProvider from '@/components/ui/Toaster';
import { ToastProvider } from '@/components/ui/Toast';
import { ReactNode } from 'react';

interface ClientProvidersProps {
  children: ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <SessionProvider>
      <ErrorBoundary>
        <ToastProvider>
          {children}
        </ToastProvider>
        <ToasterProvider />
      </ErrorBoundary>
    </SessionProvider>
  );
}