import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { theme } from '@/lib/theme';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <Alert variant="destructive">
      <AlertTitle style={theme.typography.heading_2}>خطأ</AlertTitle>
      <AlertDescription style={theme.typography.body_text}>{message}</AlertDescription>
    </Alert>
  );
}