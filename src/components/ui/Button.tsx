import React from 'react';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

// تعريف أنماط الزر باستخدام CVA
const buttonVariants = cva(
  // الأنماط الأساسية
  "btn focus-ring",
  {
    variants: {
      variant: {
        default: [
          "bg-primary-600 text-white",
          "hover:bg-primary-700",
          "active:bg-primary-800"
        ],
        secondary: [
          "bg-secondary-100 text-secondary-900 border-secondary-300",
          "hover:bg-secondary-200",
          "active:bg-secondary-300"
        ],
        outline: [
          "border-primary-600 text-primary-600 bg-transparent",
          "hover:bg-primary-50",
          "active:bg-primary-100"
        ],
        ghost: [
          "text-secondary-700 bg-transparent border-transparent",
          "hover:bg-secondary-100",
          "active:bg-secondary-200"
        ],
        success: [
          "bg-success-600 text-white",
          "hover:bg-success-700",
          "active:bg-success-800"
        ],
        danger: [
          "bg-error-600 text-white",
          "hover:bg-error-700",
          "active:bg-error-800"
        ],
        warning: [
          "bg-warning-600 text-white",
          "hover:bg-warning-700",
          "active:bg-warning-800"
        ]
      },
      size: {
        xs: "px-2 py-1 text-xs",
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
        xl: "px-8 py-4 text-lg"
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: "md"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    rounded,
    asChild = false,
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, rounded, className }),
          loading && "pointer-events-none opacity-75",
          (loading || disabled) && "cursor-not-allowed"
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="w-4 h-4 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {!loading && leftIcon && leftIcon}

        <span className={cn(
          (leftIcon || rightIcon || loading) && children && "mx-1"
        )}>
          {children}
        </span>

        {!loading && rightIcon && rightIcon}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };