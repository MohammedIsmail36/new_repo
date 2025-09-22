'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
  separator?: React.ReactNode;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  showHome = true,
  className,
  separator = <ChevronLeft className="w-4 h-4 text-gray-400 mx-2" />
}) => {
  const breadcrumbItems = showHome
    ? [{ label: 'الرئيسية', href: '/', icon: <Home className="w-4 h-4" /> }, ...items]
    : items;

  return (
    <nav
      className={cn(
        "flex items-center space-x-1 rtl:space-x-reverse text-sm text-gray-600 sticky top-0 bg-white p-2.5 rounded-lg mt-0 mb-6",
        className
      )}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-1 rtl:space-x-reverse">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="flex items-center" aria-hidden="true">
                  {separator}
                </span>
              )}

              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="flex items-center gap-1.5 hover:text-primary-600 transition-colors duration-200 text-gray-500 hover:underline"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span
                  className={cn(
                    "flex items-center gap-1.5",
                    isLast
                      ? "text-primary-900 font-medium"
                      : "text-gray-500"
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;