'use client';

import { useState } from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { theme } from '@/lib/theme';

interface ConfirmationModalProps {
  triggerButton: React.ReactNode;
  title: string;
  description: string;
  onConfirm: () => void;
}

export default function ConfirmationModal({ triggerButton, title, description, onConfirm }: ConfirmationModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{triggerButton}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle style={theme.typography.heading_2}>{title}</AlertDialogTitle>
          <AlertDialogDescription style={theme.typography.body_text}>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel style={theme.components.button.secondary}>إلغاء</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} style={theme.components.button.primary}>تأكيد</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}