// Simple UI Components - مكونات بسيطة للاختبار
import React from 'react';

// Simple Button
export interface SimpleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
}

export const SimpleButton = React.forwardRef<HTMLButtonElement, SimpleButtonProps>(
  ({
    className = '',
    variant = 'default',
    size = 'md',
    leftIcon,
    rightIcon,
    loading,
    children,
    disabled,
    ...props
  }, ref) => {
    const baseClasses = "btn focus-ring";

    const variantClasses = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      outline: "border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50",
      ghost: "text-gray-700 bg-transparent hover:bg-gray-100",
      success: "bg-green-600 text-white hover:bg-green-700",
      danger: "bg-red-600 text-white hover:bg-red-700"
    };

    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base"
    };

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="w-4 h-4 animate-spin ml-2" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
        )}
        {!loading && leftIcon && <span className="ml-2">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="mr-2">{rightIcon}</span>}
      </button>
    );
  }
);

SimpleButton.displayName = "SimpleButton";

// Simple Card
export interface SimpleCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export const SimpleCard = React.forwardRef<HTMLDivElement, SimpleCardProps>(
  ({ className = '', hover, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`card ${hover ? 'hover-lift' : ''} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

SimpleCard.displayName = "SimpleCard";

// Simple Badge
export interface SimpleBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'error' | 'warning' | 'primary';
  size?: 'sm' | 'md';
}

export const SimpleBadge = React.forwardRef<HTMLSpanElement, SimpleBadgeProps>(
  ({ className = '', variant = 'default', size = 'sm', children, ...props }, ref) => {
    const baseClasses = "inline-flex items-center font-medium rounded-full";

    const variantClasses = {
      default: "bg-gray-100 text-gray-800",
      success: "bg-green-100 text-green-800",
      error: "bg-red-100 text-red-800",
      warning: "bg-yellow-100 text-yellow-800",
      primary: "bg-blue-100 text-blue-800"
    };

    const sizeClasses = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-3 py-1 text-sm"
    };

    return (
      <span
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

SimpleBadge.displayName = "SimpleBadge";

// Simple Input
export interface SimpleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export const SimpleInput = React.forwardRef<HTMLInputElement, SimpleInputProps>(
  ({ className = '', label, error, leftIcon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            className={`input ${leftIcon ? 'pr-10' : ''} ${error ? 'border-red-500' : ''} ${className}`}
            {...props}
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm mt-1">{error}</p>
        )}
      </div>
    );
  }
);

SimpleInput.displayName = "SimpleInput";