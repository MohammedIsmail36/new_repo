import React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

// Badge Component Variants
const badgeVariants = cva(
  "inline-flex items-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-secondary-100 text-secondary-800 border border-secondary-200",
        primary: "bg-primary-100 text-primary-800 border border-primary-200",
        secondary: "bg-secondary-600 text-white",
        success: "bg-success-100 text-success-800 border border-success-200",
        warning: "bg-warning-100 text-warning-800 border border-warning-200",
        error: "bg-error-100 text-error-800 border border-error-200",
        outline: "text-secondary-700 border border-secondary-300 bg-transparent",
        ghost: "text-secondary-600 bg-transparent"
      },
      size: {
        xs: "px-2 py-0.5 text-xs rounded-full",
        sm: "px-2.5 py-0.5 text-xs rounded-full",
        md: "px-3 py-1 text-sm rounded-full",
        lg: "px-3 py-1.5 text-sm rounded-full"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "sm"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  onRemove?: () => void;
  icon?: React.ReactNode;
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, onRemove, icon, dot, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {dot && (
          <div className="w-2 h-2 rounded-full bg-current mr-1.5"></div>
        )}

        {icon && (
          <span className="mr-1">
            {icon}
          </span>
        )}

        {children}

        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="mr-1 p-0.5 rounded-full hover:bg-black/10 transition-colors"
            aria-label="إزالة"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>
    );
  }
);

Badge.displayName = "Badge";

// Status Badge Component - خاص بحالات الطلبات والفواتير
export interface StatusBadgeProps {
  status: 'مدفوع' | 'غير مدفوع' | 'متأخر' | 'ملغى' | 'معلق' | 'مكتمل' | 'جاري';
  isReversed?: boolean;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, isReversed, className }) => {
  const getStatusConfig = (status: string) => {
    const configs = {
      'مدفوع': { variant: 'success' as const, icon: '✓' },
      'غير مدفوع': { variant: 'error' as const, icon: '×' },
      'متأخر': { variant: 'warning' as const, icon: '!' },
      'ملغى': { variant: 'default' as const, icon: '⊘' },
      'معلق': { variant: 'warning' as const, icon: '◐' },
      'مكتمل': { variant: 'success' as const, icon: '✓' },
      'جاري': { variant: 'primary' as const, icon: '◐' }
    };

    return configs[status] || { variant: 'default' as const, icon: '?' };
  };

  const config = getStatusConfig(status);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Badge variant={config.variant} size="sm" icon={config.icon}>
        {status}
      </Badge>

      {isReversed && (
        <Badge
          variant="warning"
          size="sm"
          className="bg-orange-100 text-orange-800 border-orange-200"
        >
          مسترد
        </Badge>
      )}
    </div>
  );
};

// Priority Badge Component
export interface PriorityBadgeProps {
  priority: 'عاجل' | 'عالي' | 'متوسط' | 'منخفض';
  className?: string;
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, className }) => {
  const getPriorityConfig = (priority: string) => {
    const configs = {
      'عاجل': { variant: 'error' as const, dot: true },
      'عالي': { variant: 'warning' as const, dot: true },
      'متوسط': { variant: 'primary' as const, dot: true },
      'منخفض': { variant: 'default' as const, dot: true }
    };

    return configs[priority] || { variant: 'default' as const, dot: true };
  };

  const config = getPriorityConfig(priority);

  return (
    <Badge
      variant={config.variant}
      size="sm"
      dot={config.dot}
      className={className}
    >
      {priority}
    </Badge>
  );
};

export { Badge, StatusBadge, PriorityBadge, badgeVariants };