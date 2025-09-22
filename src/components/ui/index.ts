// Modern UI Components - مكونات الواجهة المحدثة
// نظام تصميم موحد مع دعم Django المستقبلي

export { Button, buttonVariants, type ButtonProps } from './Button';
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
  type CardProps,
  type CardHeaderProps,
  type CardTitleProps,
  type CardFooterProps
} from './Card';
export { Input, Textarea, inputVariants, type InputProps, type TextareaProps } from './Input';
export {
  Badge,
  StatusBadge,
  PriorityBadge,
  badgeVariants,
  type BadgeProps,
  type StatusBadgeProps,
  type PriorityBadgeProps
} from './Badge';
export {
  Select,
  MultiSelect,
  selectVariants,
  type SelectProps,
  type MultiSelectProps,
  type SelectOption
} from './Select';

// New components for better UX
export { default as ConfirmDialog } from './ConfirmDialog';
export {
  ToastProvider,
  useToast,
  toast
} from './Toast';
export { default as Breadcrumb, type BreadcrumbProps, type BreadcrumbItem } from './Breadcrumb';
export { default as PageHeader, type PageHeaderProps } from './PageHeader';

// Re-export existing shadcn components for backward compatibility
// Note: Uncomment these if you have the original shadcn components
// export { button as ButtonLegacy } from './button';
// export { card as CardLegacy } from './card';

// Utility exports
export type { VariantProps } from 'class-variance-authority';