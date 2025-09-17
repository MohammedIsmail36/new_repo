import React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Eye, EyeOff } from 'lucide-react';

// Input Component Variants
const inputVariants = cva(
  "input focus-ring transition-colors",
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
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "md"
    }
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    variant,
    size,
    rounded,
    type = "text",
    label,
    helperText,
    errorMessage,
    leftIcon,
    rightIcon,
    showPasswordToggle,
    id,
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [inputType, setInputType] = React.useState(type);
    const generatedId = React.useId();
  const inputId = id || generatedId;

    React.useEffect(() => {
      if (type === 'password' && showPasswordToggle) {
        setInputType(showPassword ? 'text' : 'password');
      }
    }, [showPassword, type, showPasswordToggle]);

    const actualVariant = errorMessage ? 'error' : variant;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-primary mb-2"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400">
              {leftIcon}
            </div>
          )}

          <input
            type={inputType}
            ref={ref}
            id={inputId}
            className={cn(
              inputVariants({ variant: actualVariant, size, rounded }),
              leftIcon && "pr-10",
              (rightIcon || (type === 'password' && showPasswordToggle)) && "pl-10",
              className
            )}
            {...props}
          />

          {type === 'password' && showPasswordToggle && (
            <button
              type="button"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          )}

          {rightIcon && !showPasswordToggle && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400">
              {rightIcon}
            </div>
          )}
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

Input.displayName = "Input";

// Textarea Component
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    className,
    variant,
    size,
    rounded,
    label,
    helperText,
    errorMessage,
    resize = 'vertical',
    id,
    ...props
  }, ref) => {
    const generatedId = React.useId();
  const textareaId = id || generatedId;
    const actualVariant = errorMessage ? 'error' : variant;

    const resizeClasses = {
      'none': 'resize-none',
      'both': 'resize',
      'horizontal': 'resize-x',
      'vertical': 'resize-y'
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-primary mb-2"
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            inputVariants({ variant: actualVariant, size, rounded }),
            resizeClasses[resize],
            "min-h-[80px]",
            className
          )}
          {...props}
        />

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

Textarea.displayName = "Textarea";

export { Input, Textarea, inputVariants };