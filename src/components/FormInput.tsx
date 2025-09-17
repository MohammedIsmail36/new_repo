'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { theme } from '@/lib/theme';

interface FormInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

export default function FormInput({ name, label, type = 'text', placeholder, required }: FormInputProps) {
  const { register, formState: { errors }, trigger, formState: { isValidating } } = useFormContext();

  return (
    <div className="space-y-2 relative">
      <Label htmlFor={name} style={theme.typography.body_text}>
        {label}
        {required && <span style={{ color: theme.colors.secondary_blue }}> *</span>}
      </Label>
      <div className="relative">
        <Input
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name, { onBlur: () => trigger(name) })}
          style={{
            ...theme.typography.body_text,
            borderColor: errors[name] ? 'red' : theme.colors.border,
          }}
        />
        {isValidating && (
          <Loader2 className="absolute left-2 top-1/2 transform -translate-y-1/2 animate-spin" size={16} color={theme.colors.secondary_blue} />
        )}
      </div>
      {errors[name] && (
        <span style={{ ...theme.typography.small_text, color: 'red' }}>
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
}