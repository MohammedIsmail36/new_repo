'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Components
import AddUserForm from '@/components/users/AddUserForm';
import PageHeader from '@/components/ui/PageHeader';

// Types
import type { AuthError } from '@/types/auth';

export default function AddUserPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // التحقق من تسجيل الدخول فقط - أي مستخدم مسجل يمكنه إضافة مستخدمين
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [session, status, router]);

  // معالجة نجح إضافة المستخدم
  const handleAddUserSuccess = (user: unknown) => {
    console.log('User added successfully:', user);
    router.push('/users'); // العودة إلى قائمة المستخدمين
  };

  // معالجة خطأ إضافة المستخدم
  const handleAddUserError = (error: AuthError) => {
    console.error('Add user error:', error);
  };

  // شاشة التحميل
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  // إذا لم يكن مسجل دخول، لا نعرض شيء (سيتم إعادة التوجيه)
  if (status === 'unauthenticated') {
    return null;
  }

  const breadcrumbItems = [
    // { label: 'الرئيسية', href: '/dashboard' },
    { label: 'المستخدمين', href: '/users' },
    { label: 'إضافة مستخدم جديد', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg> }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* رأس الصفحة */}
      <PageHeader
        title="إضافة مستخدم جديد"
        description="إنشاء حساب مستخدم جديد في النظام مع تحديد الصلاحيات والأدوار المناسبة"
        breadcrumbItems={breadcrumbItems}
      />

      {/* المحتوى الرئيسي shadow-sm border border-gray-200 */}
      <div className="bg-white rounded-xl">
        <div className="p-8">
          <AddUserForm
            onSuccess={handleAddUserSuccess}
            onError={handleAddUserError}
            isAdminPanel={true}
          />
        </div>
      </div>

      {/* معلومات إضافية */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-3">ملاحظات مهمة</h3>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-1">•</span>
                <span>سيتم إرسال بيانات تسجيل الدخول إلى البريد الإلكتروني المحدد</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-1">•</span>
                <span>يجب على المستخدم تفعيل حسابه عبر الرابط المرسل إليه</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-1">•</span>
                <span>يمكن تعديل الصلاحيات لاحقاً من إعدادات المستخدم</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-1">•</span>
                <span>كلمة المرور الافتراضية سيتم إنشاؤها تلقائياً ويمكن تغييرها</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}