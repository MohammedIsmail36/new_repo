"use client";

import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { theme } from '@/lib/theme';

interface SearchableSelectProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  required?: boolean;
  onChange?: (value: string) => void; // خاصية جديدة للتعامل مع التغييرات خارج النماذج
  defaultValue?: string;
}

export default function SearchableSelect({ name, label, options, required, onChange, defaultValue }: SearchableSelectProps) {
  const formContext = useFormContext();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedValue, setSelectedValue] = useState(defaultValue || '');

  const errors = formContext ? formContext.formState.errors : {};
  const setValue = formContext ? formContext.setValue : undefined;

  useEffect(() => {
    if (defaultValue && setValue) {
      setValue(name, defaultValue);
    }
  }, [defaultValue, name, setValue]);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    if (setValue) {
      setValue(name, value, { shouldValidate: true });
    }
    if (onChange) {
      onChange(value);
    }
    setOpen(false);
    setSearch('');
  };

  return (
    <div className="space-y-1">
      <label
        style={{
          color: theme.colors.text_light,
          fontSize: theme.typography.body_text.fontSize,
        }}
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Input
            value={selectedValue ? options.find((opt) => opt.value === selectedValue)?.label || '' : ''}
            placeholder="اختر..."
            readOnly
            className="cursor-pointer"
            style={{
              borderColor: errors[name] ? theme.colors.error : theme.colors.border,
            }}
          />
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ابحث..."
            className="mb-2"
          />
          <ul className="max-h-48 overflow-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className="p-2 hover:bg-blue-50 cursor-pointer rounded"
                  style={{ color: theme.colors.text_light }}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">لا توجد نتائج</li>
            )}
          </ul>
        </PopoverContent>
      </Popover>
      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name]?.message as string}</p>
      )}
    </div>
  );
}