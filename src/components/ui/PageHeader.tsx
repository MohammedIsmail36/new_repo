'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Breadcrumb, { BreadcrumbItem } from './Breadcrumb';

export interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbItems?: BreadcrumbItem[];
  showBreadcrumb?: boolean;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumbItems = [],
  showBreadcrumb = true,
  className,
  titleClassName,
  descriptionClassName,
  children
}) => {
  return (
    <div className={cn("space-y-4 mb-6", className)}>
      {/* Breadcrumb */}
      {showBreadcrumb && breadcrumbItems.length > 0 && (
        <div className="mb-2">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      )}

      {/* Header Content */}
      <div className="flex items-start justify-between bg-white p-5 rounded-2xl">
        <div className="flex-1">
          {/* Title */}
          <h1
            className={cn(
              "text-2xl md:text-3xl font-bold text-gray-900 mb-2",
              titleClassName
            )}
          >
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p
              className={cn(
                "text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl",
                descriptionClassName
              )}
            >
              {description}
            </p>
          )}
        </div>

        {/* Additional Content (Actions, etc.) */}
        {children && (
          <div className="flex-shrink-0 ml-4">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;