'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  UserPlus,
  AlertCircle,
  CheckCircle,
  Loader2,
  Check
} from 'lucide-react';

// UI Components
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { useToast, toast } from '@/components/ui/Toast';

// Validation
import {
  registerSchema,
  type RegisterFormData,
  checkPasswordStrength,
  validateUsernameOrEmail
} from '@/lib/auth/authValidation';

// Types
import type { AuthError } from '@/types/auth';

interface SignupFormProps {
  onSuccess?: (user: any) => void;
  onError?: (error: AuthError) => void;
  redirectTo?: string;
  className?: string;
}

export default function SignupForm({
  onSuccess,
  onError,
  redirectTo = '/auth/verify-email',
  className
}: SignupFormProps) {
  // State
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Hooks
  const router = useRouter();
  const { showToast } = useToast();

  // Form setup
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid, isDirty }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      agreeToTerms: false,
      subscribeToNewsletter: false
    }
  });

  // Watch form values
  const username = watch('username');
  const email = watch('email');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const agreeToTerms = watch('agreeToTerms');

  // Password strength check
  const passwordStrength = password ? checkPasswordStrength(password) : null;

  // Handle form submission
  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    clearErrors();

    try {
      // محاكاة إرسال البيانات إلى API
      // في المستقبل سيتم استبدالها باستدعاء Django API
      await new Promise(resolve => setTimeout(resolve, 2000));

      // محاكاة نجاح التسجيل
      const success = Math.random() > 0.3; // 70% نسبة نجاح للاختبار

      if (success) {
        showToast(toast.success(
          'تم إنشاء الحساب بنجاح',
          'يرجى تفعيل حسابك عبر الرابط المرسل إلى بريدك الإلكتروني',
          5000
        ));

        onSuccess?.(data);
        router.push(redirectTo);
      } else {
        // محاكاة أخطاء مختلفة
        const errorType = Math.random();
        if (errorType > 0.7) {
          setError('username', {
            type: 'manual',
            message: 'اسم المستخدم مستخدم بالفعل'
          });
        } else if (errorType > 0.4) {
          setError('email', {
            type: 'manual',
            message: 'البريد الإلكتروني مسجل بالفعل'
          });
        } else {
          throw new Error('خطأ في الخادم');
        }
      }
    } catch (error) {
      console.error('Registration error:', error);

      const authError: AuthError = {
        type: 'SERVER_ERROR',
        message: 'حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.',
      };

      onError?.(authError);

      showToast(toast.error(
        'فشل في إنشاء الحساب',
        'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.',
        5000
      ));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="space-y-6 pb-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl mb-4 shadow-md">
            <UserPlus className="w-7 h-7 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
            إنشاء مستخدم جديد
          </CardTitle>
          <p className="text-gray-600 text-sm leading-relaxed">
            املأ البيانات التالية لإنشاء حساب جديد في النظام
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* الاسم الأول واسم العائلة */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                الاسم الأول
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <Input
                  {...register('firstName')}
                  type="text"
                  placeholder="Ahmed"
                  className={`pr-10 ${errors.firstName ? 'border-red-500' : ''}`}
                  disabled={isLoading}
                  autoComplete="given-name"
                  dir="ltr"
                />
              </div>
              {errors.firstName && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                اسم العائلة
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <Input
                  {...register('lastName')}
                  type="text"
                  placeholder="Mohamed"
                  className={`pr-10 ${errors.lastName ? 'border-red-500' : ''}`}
                  disabled={isLoading}
                  autoComplete="family-name"
                  dir="ltr"
                />
              </div>
              {errors.lastName && (
                <p className="text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* اسم المستخدم */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              اسم المستخدم
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <User className="w-5 h-5 text-gray-400" />
              </div>
              <Input
                {...register('username')}
                type="text"
                placeholder="ahmed_mohamed"
                className={`pr-10 pl-10 ${errors.username ? 'border-red-500' : ''}`}
                disabled={isLoading}
                autoComplete="username"
                dir="ltr"
              />
              {username && validateUsernameOrEmail(username) === 'username' && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              )}
            </div>
            {errors.username && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.username.message}
              </p>
            )}
          </div>

          {/* البريد الإلكتروني */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-gray-400" />
              </div>
              <Input
                {...register('email')}
                type="email"
                placeholder="ahmed@example.com"
                className={`pr-10 pl-10 ${errors.email ? 'border-red-500' : ''}`}
                disabled={isLoading}
                autoComplete="email"
                dir="ltr"
              />
              {email && validateUsernameOrEmail(email) === 'email' && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              )}
            </div>
            {errors.email && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* رقم الهاتف (اختياري) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              رقم الهاتف <span className="text-gray-400">(اختياري)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Phone className="w-5 h-5 text-gray-400" />
              </div>
              <Input
                {...register('phoneNumber')}
                type="tel"
                placeholder="+966 50 123 4567"
                className={`pr-10 ${errors.phoneNumber ? 'border-red-500' : ''}`}
                disabled={isLoading}
                autoComplete="tel"
                dir="ltr"
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* كلمة المرور */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              كلمة المرور
            </label>
            <div className="relative">
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className={`w-full px-4 py-2 pr-10 border border-gray-300 rounded-md transition-colors focus:outline-none focus:ring-1 focus:ring-primary-200 focus:border-primary-400 ${errors.password ? 'border-red-500' : ''}`}
                disabled={isLoading}
                autoComplete="new-password"
                dir="ltr"
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* مؤشر قوة كلمة المرور */}
            {password && passwordStrength && (passwordFocused || password.length > 0) && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">قوة كلمة المرور:</span>
                  <span className={`text-sm font-medium ${passwordStrength.color}`}>
                    {passwordStrength.strength}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      passwordStrength.percentage <= 40 ? 'bg-red-500' :
                      passwordStrength.percentage <= 60 ? 'bg-yellow-500' :
                      passwordStrength.percentage <= 80 ? 'bg-blue-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${passwordStrength.percentage}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  {Object.entries(passwordStrength.checks).map(([key, passed]) => (
                    <div key={key} className={`flex items-center gap-1 ${passed ? 'text-green-600' : 'text-gray-400'}`}>
                      <Check className="w-3 h-3" />
                      <span>
                        {key === 'minLength' && '8 أحرف على الأقل'}
                        {key === 'hasLowercase' && 'حرف صغير'}
                        {key === 'hasUppercase' && 'حرف كبير'}
                        {key === 'hasNumbers' && 'رقم'}
                        {key === 'hasSpecialChars' && 'رمز خاص'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {errors.password && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.password.message}
              </p>
            )}
          </div>

          {/* تأكيد كلمة المرور */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              تأكيد كلمة المرور
            </label>
            <div className="relative">
              <input
                {...register('confirmPassword')}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                className={`w-full px-4 py-2 pr-10 pl-10 border border-gray-300 rounded-md transition-colors focus:outline-none focus:ring-1 focus:ring-primary-200 focus:border-primary-400 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                disabled={isLoading}
                autoComplete="new-password"
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              {confirmPassword && password && confirmPassword === password && (
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              )}
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* الموافقة على الشروط */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <input
                {...register('agreeToTerms')}
                type="checkbox"
                id="agreeToTerms"
                className={`w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 focus:ring-offset-0 mt-0.5 ${
                  errors.agreeToTerms ? 'border-red-500' : ''
                }`}
                disabled={isLoading}
              />
              <label htmlFor="agreeToTerms" className="text-sm text-gray-700 leading-relaxed">
                أوافق على{' '}
                <Link href="/terms" className="text-primary-600 hover:text-primary-500 underline">
                  الشروط والأحكام
                </Link>
                {' '}و{' '}
                <Link href="/privacy" className="text-primary-600 hover:text-primary-500 underline">
                  سياسة الخصوصية
                </Link>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {errors.agreeToTerms.message}
              </p>
            )}

            <div className="flex items-center gap-3">
              <input
                {...register('subscribeToNewsletter')}
                type="checkbox"
                id="subscribeToNewsletter"
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 focus:ring-offset-0"
                disabled={isLoading}
              />
              <label htmlFor="subscribeToNewsletter" className="text-sm text-gray-700">
                أرغب في تلقي النشرة الإخبارية والتحديثات
              </label>
            </div>
          </div>

          {/* زر إنشاء الحساب */}
          <Button
            type="submit"
            className="w-full"
            disabled={!isValid || !isDirty || !agreeToTerms || isLoading}
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                جاري إنشاء الحساب...
              </>
            ) : (
              <>
                <UserPlus className="w-5 h-5 ml-2" />
                إنشاء الحساب
              </>
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="pt-6">
        <div className="w-full text-center">
          <p className="text-sm text-gray-600">
            لديك حساب بالفعل؟{' '}
            <Link
              href="/auth/signin"
              className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
            >
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}