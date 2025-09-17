'use client';

import { Toaster } from 'sonner';
import { theme } from '@/lib/theme';

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      richColors
      dir="rtl"
      toastOptions={{
        style: {
          backgroundColor: theme.colors.white,
          border: `1px solid ${theme.colors.border}`,
          borderRadius: theme.components.card.borderRadius,
          boxShadow: theme.components.card.boxShadow,
          color: theme.colors.text_dark,
        },
      }}
    />
  );
}