import React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronDown, Check, X, Search } from 'lucide-react';
import { inputVariants } from './Input';

// Select Component Variants
const selectVariants = cva(
  "input focus-ring cursor-pointer",
  {
    variants: {
      variant: {
        default: "border-secondary-300 focus:border-primary-500",
        success: "border-success-300 focus:border-success-500",
        error: "border-error-300 focus:border-error-500 text-error-900",
        warning: "border-warning-300 focus:border-warning-500"
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-4 py-3 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

// Basic Select Component
export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  description?: string;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  options: SelectOption[];
  placeholder?: string;
  leftIcon?: React.ReactNode;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({
    className,
    variant,
    size,
    label,
    helperText,
    errorMessage,
    options,
    placeholder = "اختر...",
    leftIcon,
    id,
    ...props
  }, ref) => {
    const generatedId = React.useId();
  const selectId = id || generatedId;
    const actualVariant = errorMessage ? 'error' : variant;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-primary mb-2"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 z-10">
              {leftIcon}
            </div>
          )}

          <select
            ref={ref}
            id={selectId}
            className={cn(
              selectVariants({ variant: actualVariant, size }),
              leftIcon && "pr-10",
              "pl-10 appearance-none bg-white",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}

            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <ChevronDown className="h-4 w-4 text-secondary-400" />
          </div>
        </div>

        {(helperText || errorMessage) && (
          <div className="mt-2">
            {errorMessage ? (
              <p className="text-sm text-error-600" role="alert">
                {errorMessage}
              </p>
            ) : (
              <p className="text-sm text-secondary-600">
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

// Advanced Multi-Select Component
export interface MultiSelectProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  options: SelectOption[];
  value?: (string | number)[];
  onChange?: (value: (string | number)[]) => void;
  placeholder?: string;
  searchable?: boolean;
  maxSelected?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  helperText,
  errorMessage,
  options,
  value = [],
  onChange,
  placeholder = "اختر عناصر...",
  searchable = false,
  maxSelected,
  className,
  size = 'md'
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const containerRef = React.useRef<HTMLDivElement>(null);

  const filteredOptions = React.useMemo(() => {
    if (!searchQuery) return options;
    return options.filter(option =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery]);

  const selectedOptions = React.useMemo(() => {
    return options.filter(option => value.includes(option.value));
  }, [options, value]);

  const handleToggleOption = (optionValue: string | number) => {
    if (!onChange) return;

    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];

    if (maxSelected && newValue.length > maxSelected) return;

    onChange(newValue);
  };

  const handleRemoveOption = (optionValue: string | number) => {
    if (!onChange) return;
    onChange(value.filter(v => v !== optionValue));
  };

  const handleClearAll = () => {
    if (!onChange) return;
    onChange([]);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full" ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-primary mb-2">
          {label}
        </label>
      )}

      <div className="relative">
        {/* Selected Items Display */}
        <div
          className={cn(
            inputVariants({
              variant: errorMessage ? 'error' : 'default',
              size
            }),
            "cursor-pointer min-h-[40px] flex items-center justify-between",
            className
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex flex-wrap gap-1 flex-1">
            {selectedOptions.length === 0 ? (
              <span className="text-secondary-500">{placeholder}</span>
            ) : (
              selectedOptions.map((option) => (
                <span
                  key={option.value}
                  className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary-100 text-primary-800 text-sm rounded-md"
                >
                  {option.label}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveOption(option.value);
                    }}
                    className="hover:bg-primary-200 rounded-full p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))
            )}
          </div>

          <div className="flex items-center gap-2 ml-2">
            {selectedOptions.length > 0 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearAll();
                }}
                className="text-secondary-400 hover:text-secondary-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <ChevronDown
              className={cn(
                "w-4 h-4 text-secondary-400 transition-transform",
                isOpen && "rotate-180"
              )}
            />
          </div>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-secondary-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {searchable && (
              <div className="p-2 border-b border-secondary-200">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" />
                  <input
                    type="text"
                    placeholder="البحث..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pr-10 pl-3 py-2 border border-secondary-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            )}

            <div className="py-1">
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-sm text-secondary-500">
                  لا توجد خيارات
                </div>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = value.includes(option.value);
                  const isDisabled = option.disabled ||
                    (maxSelected && !isSelected && value.length >= maxSelected);

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleToggleOption(option.value)}
                      disabled={isDisabled}
                      className={cn(
                        "w-full px-4 py-2 text-right text-sm flex items-center justify-between hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed",
                        isSelected && "bg-primary-50 text-primary-700"
                      )}
                    >
                      <div>
                        <div>{option.label}</div>
                        {option.description && (
                          <div className="text-xs text-secondary-500">
                            {option.description}
                          </div>
                        )}
                      </div>
                      {isSelected && (
                        <Check className="w-4 h-4 text-primary-600" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* Helper/Error Text */}
      {(helperText || errorMessage) && (
        <div className="mt-2">
          {errorMessage ? (
            <p className="text-sm text-error-600" role="alert">
              {errorMessage}
            </p>
          ) : (
            <p className="text-sm text-secondary-600">
              {helperText}
            </p>
          )}
        </div>
      )}

      {/* Selected Count */}
      {maxSelected && (
        <div className="mt-1 text-xs text-secondary-500">
          {value.length} / {maxSelected} محدد
        </div>
      )}
    </div>
  );
};

export { Select, MultiSelect, selectVariants };