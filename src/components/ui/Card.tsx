import React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

// Card Component Variants
const cardVariants = cva(
  "card",
  {
    variants: {
      variant: {
        default: "bg-white border-secondary-200",
        elevated: "bg-white shadow-md border-secondary-100",
        outlined: "bg-white border-2 border-secondary-200",
        filled: "bg-secondary-50 border-secondary-200",
        gradient: "bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-200"
      },
      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
        xl: "p-8"
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl"
      }
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      rounded: "lg"
    }
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  hover?: boolean;
  clickable?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, rounded, hover, clickable, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant, padding, rounded }),
          hover && "hover-lift",
          clickable && "cursor-pointer select-none",
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

// Card Header Component
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  separated?: boolean;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, separated, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col space-y-1.5",
          separated && "pb-4 border-b border-secondary-200",
          className
        )}
        {...props}
      />
    );
  }
);

CardHeader.displayName = "CardHeader";

// Card Title Component
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = 'h3', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "font-semibold leading-none tracking-tight text-lg text-primary",
          className
        )}
        {...props}
      />
    );
  }
);

CardTitle.displayName = "CardTitle";

// Card Description Component
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-secondary", className)}
    {...props}
  />
));

CardDescription.displayName = "CardDescription";

// Card Content Component
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("pt-0", className)}
    {...props}
  />
));

CardContent.displayName = "CardContent";

// Card Footer Component
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  separated?: boolean;
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, separated, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center",
          separated && "pt-4 border-t border-secondary-200",
          className
        )}
        {...props}
      />
    );
  }
);

CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants
};