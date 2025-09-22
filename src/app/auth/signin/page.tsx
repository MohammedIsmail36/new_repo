'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
// Components
import LoginForm from '@/components/auth/LoginForm';
// import PageHeader from '@/components/ui/PageHeader';

// Types
import type { AuthError } from '@/types/auth';

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // redirect authenticated users to dashboard
  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/dashboard');
    }
  }, [session, status, router]);

  // process the user object or token as needed
  const handleLoginSuccess = (user: unknown) => {
    console.log('Login successful:', user);
    // we can add logic here like logging activity
  };

  // process login error
  const handleLoginError = (error: AuthError) => {
    console.error('Login error:', error);
    // we can add logic here like logging errors
  };

  // if the user is already authenticated, don't render the sign-in page
  if (status === 'authenticated') {
    return null;
  }

  // Loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 rounded-2xl mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              نظام المبيعات والمحاسبة
            </h1>
            <p className="text-gray-600">
              مرحباً بك، يرجى تسجيل الدخول إلى حسابك
            </p>
          </div>

          {/* Login Form */}
          <LoginForm
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
            redirectTo="/dashboard"
            className="bg-white shadow-sm border border-gray-200"
          />

          {/* Footer */}
          <div className="text-center text-sm text-gray-500 mt-8">
            <p>© 2025 نظام المبيعات والمحاسبة. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </div>
    </div>
  );
}