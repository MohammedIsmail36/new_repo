"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  ShoppingCart,
  Package,
  Warehouse,
  Book,
  BarChart,
  Users,
  Settings,
  X,
  Building2,
  UserCheck,
  Truck
} from 'lucide-react';

const menuItems = [
  {
    id: 'dashboard',
    title: 'لوحة التحكم',
    icon: LayoutDashboard,
    href: '/dashboard'
  },
  {
    id: 'sales',
    title: 'المبيعات',
    icon: ShoppingCart,
    href: '/sales',
    children: [
      { title: 'إدارة المبيعات', href: '/sales/management' },
      { title: 'عروض الأسعار', href: '/sales/quotes' },
      { title: 'فواتير المبيعات', href: '/sales/invoices' },
    ],
  },
  {
    id: 'purchases',
    title: 'المشتريات',
    icon: Package,
    href: '/purchases',
    children: [
      { title: 'إدارة المشتريات', href: '/purchases/management' },
      { title: 'فواتير المشتريات', href: '/purchases/invoices' },
    ],
  },
  {
    id: 'inventory',
    title: 'المخزون',
    icon: Warehouse,
    href: '/inventory'
  },
  {
    id: 'accounts',
    title: 'الحسابات',
    icon: Book,
    href: '/accounts',
    children: [
      { title: 'شجرة الحسابات', href: '/accounts/chart-of-accounts' },
      { title: 'القيود اليومية', href: '/accounts/journal-entry' },
      { title: 'سندات القبض', href: '/accounts/receipts' },
      { title: 'سندات الصرف', href: '/accounts/payments' },
      { title: 'أرصدة البنوك', href: '/accounts/bank-balances' },
    ],
  },
  {
    id: 'reports',
    title: 'التقارير',
    icon: BarChart,
    href: '/reports',
    children: [
      { title: 'التقارير المالية', href: '/reports/financial' },
      { title: 'التقارير الضريبية', href: '/reports/tax' },
      { title: 'تقارير المبيعات', href: '/reports/sales' },
      { title: 'تقارير المشتريات', href: '/reports/purchases' },
    ],
  },
  {
    id: 'customers',
    title: 'العملاء',
    icon: UserCheck,
    href: '/customers'
  },
  {
    id: 'suppliers',
    title: 'الموردين',
    icon: Truck,
    href: '/suppliers'
  },
  {
    id: 'users',
    title: 'المستخدمين',
    icon: Users,
    href: '/users'
  },
  {
    id: 'settings',
    title: 'الإعدادات',
    icon: Settings,
    href: '/settings'
  },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());

  // Auto-expand parent menu if child is active
  useEffect(() => {
    const activeParent = menuItems.find(item =>
      item.children && item.children.some(child => pathname === child.href)
    );

    if (activeParent) {
      setExpandedMenus(prev => new Set([...prev, activeParent.id]));
    }
  }, [pathname]);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => {
      const newSet = new Set(prev);
      if (newSet.has(menuId)) {
        newSet.delete(menuId);
      } else {
        newSet.add(menuId);
      }
      return newSet;
    });
  };

  const isMenuActive = (item: any) => {
    if (pathname === item.href) return true;
    if (item.children) {
      return item.children.some((child: any) => pathname === child.href);
    }
    return false;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 right-0 h-screen w-64 bg-white
        transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0
        flex flex-col
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">نظام المحاسبة</h2>
              <p className="text-xs text-gray-500">إدارة شاملة</p>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = isMenuActive(item);
              const isExpanded = expandedMenus.has(item.id);
              const Icon = item.icon;

              return (
                <li key={item.id}>
                  {/* Main Menu Item */}
                  {item.children ? (
                    <button
                      onClick={() => toggleMenu(item.id)}
                      className={`
                        w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg
                        transition-colors duration-200
                        ${isActive
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-4">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                        <span>{item.title}</span>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded ? 'rotate-90' : ''
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`
                        w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg
                        transition-colors duration-200
                        ${isActive
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-4">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                        <span>{item.title}</span>
                      </div>
                    </Link>
                  )}

                  {/* Submenu */}
                  {item.children && isExpanded && (
                    <ul className="mt-2 mr-8 space-y-1">
                      {item.children.map((child) => {
                        const isChildActive = pathname === child.href;
                        return (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={onClose}
                              className={`
                                block px-3 py-2 text-sm rounded-lg transition-colors duration-200
                                ${isChildActive
                                  ? 'bg-blue-50 text-blue-700 font-medium'
                                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }
                              `}
                            >
                              {child.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4">
          <div className="text-center text-xs text-gray-500">
            <p>الإصدار 2.0.0</p>
            <p className="mt-1">© 2024 نظام المحاسبة المتقدم</p>
          </div>
        </div>
      </aside>
    </>
  );
}