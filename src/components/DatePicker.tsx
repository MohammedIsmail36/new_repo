'use client';

import { useFormContext } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { Label } from '@/components/ui/label';
import { theme } from '@/lib/theme';
import arLocale from 'date-fns/locale/ar-SA';

interface DatePickerProps {
  name: string;
  label: string;
  required?: boolean;
}

export default function DatePicker({ name, label, required }: DatePickerProps) {
  const { setValue, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-2">
      <Label htmlFor={name} style={theme.typography.body_text}>
        {label}
        {required && <span style={{ color: theme.colors.secondary_blue }}> *</span>}
      </Label>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={arLocale}>
        <MuiDatePicker
          onChange={(date) => setValue(name, date ? date.toISOString().split('T')[0] : '', { shouldValidate: true })}
          slotProps={{
            textField: {
              fullWidth: true,
              sx: {
                '& .MuiInputBase-root': { ...theme.typography.body_text, direction: 'rtl' },
                '& .MuiInputBase-input': { borderColor: errors[name] ? 'red' : theme.colors.border },
              },
            },
          }}
        />
      </LocalizationProvider>
      {errors[name] && (
        <span style={{ ...theme.typography.small_text, color: 'red' }}>
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
}