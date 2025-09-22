"use client";

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(typeof window !== 'undefined' && window.innerWidth >= 1024);

  // إعادة التوجيه إلى /signin إذا لم يكن المستخدم مسجل دخوله
  useEffect(() => {
    if (status === 'loading') return;
    if (!session && pathname !== '/signin' && pathname !== '/signup') {
      router.push('/signin');
    }
  }, [session, status, pathname, router]);

  // إذا كان المسار هو صفحات المصادقة، اعرض الأطفال فقط بدون header/sidebar
  if (pathname === '/signin' || pathname === '/signup') {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  // إذا كان المستخدم مسجل دخوله، اعرض التخطيط الكامل
  if (session) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-row">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content Container */}
        <div className="flex-1 flex flex-col lg:pr-64">
          {/* Header */}
          <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

          {/* Page Content */}
          <main className="flex-1 p-6 bg-gray-100">
            {children}
          </main>
        </div>
      </div>
    );
  }

  // حالة التحميل
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  // إذا لم يكن المستخدم مسجل دخوله ولم يكن المسار /signin
  return null;
}