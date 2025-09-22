'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Components
import SignupForm from '@/components/auth/SignupForm';
import PageHeader from '@/components/ui/PageHeader';

// Types
import type { AuthError } from '@/types/auth';

export default function SignUpPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // إعادة توجيه المستخدم المسجل إلى الداشبورد
  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/dashboard');
    }
  }, [session, status, router]);

  // معالجة نجح التسجيل
  const handleSignupSuccess = (user: unknown) => {
    console.log('Signup successful:', user);
    // يمكن إضافة منطق إضافي هنا مثل تسجيل النشاط
  };

  // معالجة خطأ التسجيل
  const handleSignupError = (error: AuthError) => {
    console.error('Signup error:', error);
    // يمكن إضافة منطق إضافي هنا مثل تسجيل الأخطاء
  };

  // إذا كان المستخدم مسجل دخوله بالفعل، لا نعرض شيء
  if (status === 'authenticated') {
    return null;
  }

  // شاشة التحميل
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-gray-900">نظام المبيعات والمحاسبة</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/auth/signin" className="text-gray-600 hover:text-gray-900 transition-colors">
                تسجيل الدخول
              </a>
              <a href="/features" className="text-gray-600 hover:text-gray-900 transition-colors">
                المميزات
              </a>
              <a href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                اتصل بنا
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Hero Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              انضم إلى منصة المبيعات والمحاسبة
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
              أنشئ حسابك الآن واستمتع بأدوات إدارة الأعمال المتقدمة وسهولة التعامل مع الفواتير والمحاسبة
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">إدارة آمنة</h3>
                  <p className="text-xs text-gray-600">حماية بيانات عالية</p>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">سرعة فائقة</h3>
                  <p className="text-xs text-gray-600">أداء محسن</p>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">سهل الاستخدام</h3>
                  <p className="text-xs text-gray-600">تجربة بديهية</p>
                </div>
              </div>
            </div>
          </div>

          {/* Signup Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
            <SignupForm
              onSuccess={handleSignupSuccess}
              onError={handleSignupError}
              redirectTo="/auth/verify-email"
              className="border-0 shadow-none bg-transparent"
            />
          </div>

          {/* Trust Indicators */}
          <div className="text-center mt-8">
            <div className="flex items-center justify-center gap-6 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5-4v5a7 7 0 11-14 0V7a3 3 0 016 0v4a3 3 0 006 0V7a3 3 0 013 3z" />
                </svg>
                <span>تشفير SSL</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                <span>بيانات آمنة 100%</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12l8 8m-8-8v8m0-8H4" />
                </svg>
                <span>دعم فني 24/7</span>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              <p>© 2025 نظام المبيعات والمحاسبة. جميع الحقوق محفوظة.</p>
              <div className="flex items-center justify-center gap-4 mt-2">
                <a href="/privacy" className="hover:text-gray-700 transition-colors">سياسة الخصوصية</a>
                <span>•</span>
                <a href="/terms" className="hover:text-gray-700 transition-colors">الشروط والأحكام</a>
                <span>•</span>
                <a href="/support" className="hover:text-gray-700 transition-colors">الدعم الفني</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}